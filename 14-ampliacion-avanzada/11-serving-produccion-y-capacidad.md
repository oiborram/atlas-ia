# 11. Serving de LLMs: latencia, throughput y capacidad

Servir un LLM no es ejecutar la misma red muchas veces de forma independiente. Las peticiones tienen prompts y salidas de longitud distinta, compiten por KV cache y avanzan token a token.

## Dos fases

| Fase | Trabajo | Suele limitar |
|---|---|---|
| Prefill | Procesa todos los tokens de entrada en paralelo | Cómputo |
| Decode | Produce un token por secuencia e iteración | Ancho de banda/memoria |

Métricas esenciales:

- **TTFT:** time to first token;
- **TPOT/ITL:** tiempo entre tokens;
- latencia end-to-end;
- input/output tokens por segundo;
- solicitudes por segundo;
- p50, p95 y p99;
- queue time y tasa de rechazo.

Una media baja puede esconder usuarios esperando segundos en p99.

## Modelo de memoria

```text
memoria ≈ pesos + KV cache + activaciones temporales + runtime
```

Para una estimación simplificada de KV por secuencia:

```text
2 × capas × tokens × heads_KV × head_dim × bytes
```

El `2` representa K y V. GQA/MQA reducen `heads_KV`. La cifra real depende de layout, bloques, cuantización y overhead.

## Continuous batching

Un batch estático espera a que termine la secuencia más larga. El *iteration-level scheduling* inserta nuevas solicitudes y retira terminadas entre pasos de decode. Mejora utilización, pero el scheduler debe proteger SLOs: maximizar throughput sin límite puede empeorar TTFT.

## PagedAttention

La KV cache tiene tamaños variables y puede fragmentar memoria. [PagedAttention/vLLM](https://arxiv.org/abs/2309.06180) la divide en bloques, como memoria virtual, facilitando asignación y compartición de prefijos.

Ventajas:

- menos memoria desperdiciada;
- batches mayores;
- copy-on-write para varias ramas;
- prefix caching.

No elimina la KV; administra mejor su crecimiento.

## Caching

| Cache | Reutiliza | Precaución |
|---|---|---|
| Respuesta | salida completa para entrada idéntica | datos personales y caducidad |
| Prompt/prefix | KV de prefijos compartidos | versión exacta de modelo/prompt |
| Semantic | respuesta para consulta parecida | equivalencia difícil de garantizar |
| Retrieval | resultados de búsqueda | frescura y ACL |

Incluye tenant, permisos, versiones y parámetros relevantes en la clave. Un hit incorrecto puede filtrar información.

### Context cache: identidad, aislamiento y rentabilidad

La coincidencia de prefijo no es similitud semántica. En vLLM, la identidad de un bloque incluye sus tokens y la cadena de bloques anteriores, además de información relevante como el adaptador LoRA o las entradas multimodales. Cambiar un token temprano puede impedir reutilizar los bloques posteriores. El diseño también contempla separación mediante *cache salt* para aislar grupos de confianza. Ese mecanismo no sustituye los controles de acceso de la aplicación. [Diseño de prefix caching de vLLM](https://docs.vllm.ai/en/latest/design/prefix_caching/).

Como protocolo de medición, compara caché fría, caliente y bajo presión de memoria; registra tokens reutilizados, TTFT p95, memoria retenida y rendimiento con concurrencia. En local, conservar bloques también compite por memoria con nuevas peticiones. En APIs, calcula el coste total incluyendo creación, lectura y almacenamiento cuando se facturen; un descuento por token no garantiza ahorro con pocas reutilizaciones. [Facturación y límites de caché explícita de Gemini](https://ai.google.dev/gemini-api/docs/generate-content/caching).

Si una compactación reescribe el historial, cambia el prefijo cacheable. Mantén estables las partes que realmente lo sean y mide el coste de reconstrucción. Introducción funcional: [caché de contexto](../04-era-ia-local/03-inferencia-flashattention-y-kv-cache.md#context-cache-caché-de-contexto-entre-peticiones).

## Decoding

- greedy: reproducible, puede ser miope;
- temperature/top-p: diversidad;
- beam search: útil en tareas con score secuencial, caro en LLM chat;
- speculative decoding: un modelo pequeño propone varios tokens y el grande los verifica;
- constrained decoding: restringe gramática o esquema.

Speculative decoding acelera si el draft acierta y el overhead no domina; no cambia la distribución objetivo cuando se implementa correctamente.

## Paralelismo de inferencia

- **Replica/data parallel:** copias completas para más tráfico.
- **Tensor parallel:** divide capas cuando no caben o necesitas menor latencia.
- **Pipeline:** menos común para decode interactivo por burbujas.
- **Expert parallel:** reparte MoE.
- **Prefill/decode disaggregation:** pools distintos optimizados por fase.

Tensor parallel añade comunicación por token. A veces dos réplicas independientes dan más throughput que una réplica dividida en dos GPUs.

## Cuantización en serving

Cuantizar pesos reduce memoria y tráfico. KV cuantizada ayuda en contexto largo. Mide:

- calidad por dominio, no solo perplexity;
- kernels realmente disponibles;
- prefill frente a decode;
- overhead de dequantización;
- tamaño de batch donde aparece la ventaja;
- estabilidad en outliers.

Un formato pequeño en disco no implica una ruta rápida en tu hardware.

## Capacity planning

1. Mide distribución real de tokens de entrada y salida.
2. Define SLO de TTFT y TPOT por clase de tráfico.
3. Benchmarkea combinaciones de batch y concurrencia.
4. Calcula capacidad al p95, no con prompt medio.
5. Reserva margen para picos, fallos y despliegues.
6. Separa colas de trabajos largos/interactivos.
7. Aplica límites y backpressure antes de saturar.

Ejemplo conceptual:

```text
capacidad_útil = throughput_medido
                 × factor_de_SLO
                 × factor_de_disponibilidad
                 × margen_operativo
```

No uses TFLOPS pico del fabricante como tokens/s.

## Observabilidad

Correlaciona request → cola → retrieval/tools → prefill → decode → streaming. Registra longitudes, cache hit, batch efectivo, memoria, stop reason, errores y versión. Evita guardar prompts sensibles sin necesidad.

## Degradación controlada

Ante saturación:

- rechaza con retry-after;
- limita output;
- enruta a modelo menor para clases permitidas;
- reduce contexto con una política explícita;
- desactiva opciones costosas;
- preserva acciones críticas y seguridad.

No trunques silenciosamente una instrucción o fuente autoritativa.

Siguiente: [interpretabilidad](12-interpretabilidad-y-edicion.md).
