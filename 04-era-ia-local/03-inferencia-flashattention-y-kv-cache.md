# El motor de inferencia: KV cache, FlashAttention y rendimiento

## Dos fases por petición

| Fase | Qué hace | Suele limitarla |
|---|---|---|
| Prefill | Procesa todo el prompt en paralelo | Cómputo y ancho de banda |
| Decode | Genera tokens uno a uno | Movimiento de memoria y latencia |

## KV cache

En cada token nuevo, la atención necesita claves y valores de tokens anteriores. Recalcularlos sería desperdicio; la **KV cache** los conserva. Acelera generación, pero crece con capas, longitud, batch y precisión.

> **No confundir:** cuantizar pesos reduce el archivo/modelo; cuantizar KV cache reduce memoria de contexto. Son decisiones separadas.

## Context cache: caché de contexto entre peticiones

**Context cache**, *context caching* o **prompt/prefix caching** reutiliza el procesamiento de una entrada compartida entre llamadas. Imagina un asistente que recibe siempre el mismo manual y luego una pregunta distinta: puede aprovechar el trabajo anterior sobre el manual, sin generar de nuevo la misma respuesta. En motores como vLLM se reutilizan bloques de KV del prefijo coincidente. [Funcionamiento de Automatic Prefix Caching](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching.html).

| Concepto | Qué conserva | Qué no hace |
|---|---|---|
| KV cache durante generación | Cálculos de tokens anteriores | No implica reutilización entre peticiones |
| Caché de contexto/prefijo | Procesamiento de una entrada compartida | No resume ni aumenta la ventana de contexto |
| Caché de respuestas | Una salida ya generada | No produce una respuesta nueva |
| Compactador de contexto | Estado o resumen más pequeño | No conserva necesariamente todos los detalles |

El ahorro principal del *prefix caching* está en el **prefill**, no en acelerar cada token del **decode**. Si cada entrada es diferente o casi todo el tiempo se dedica a generar, el beneficio puede ser pequeño. También sirve en IA local si el runtime lo soporta; no es exclusivo de una API cloud. [Límites de vLLM](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching.html).

En APIs hay cachés **implícitas**, detectadas por el servicio, y **explícitas**, que la aplicación crea y referencia. Por ejemplo, Gemini documenta caché implícita en Interactions y explícita en `generateContent`: no se deben asumir las mismas opciones en todas las APIs. El contenido cacheado sigue contando dentro del límite de contexto. Revisa modelo compatible, tamaño mínimo, caducidad o **TTL** y costes de almacenamiento/lectura antes de estimar ahorro. [Caché implícita](https://ai.google.dev/gemini-api/docs/caching) y [caché explícita de Gemini](https://ai.google.dev/gemini-api/docs/generate-content/caching).

**Regla práctica:** coloca las instrucciones estables y el material común antes de la pregunta variable, manteniendo separados sus roles y niveles de confianza. No cambies el significado ni omitas información necesaria para conseguir un hit.

Continúa con [compactadores de contexto](../06-era-agent-tools/02-memoria-planificacion-y-fiabilidad.md#compactadores-de-contexto) y [caching en producción](../14-ampliacion-avanzada/11-serving-produccion-y-capacidad.md#caching).

## FlashAttention

La atención convencional escribe grandes matrices intermedias en memoria HBM. FlashAttention reorganiza el cálculo en bloques para reutilizar la SRAM rápida del chip y reducir lecturas/escrituras, manteniendo atención exacta. Es una optimización **IO-aware**: cambia cómo se calcula, no lo que matemáticamente se calcula. El paper informó mejoras sustanciales y habilitó contextos mayores: [Dao et al., 2022](https://arxiv.org/abs/2205.14135).

Analogía: no reduces los datos de la consulta; cambias el plan de ejecución para que no viaje repetidamente al almacenamiento lento.

## Otras palancas

| Técnica | Idea | Trade-off |
|---|---|---|
| Batching continuo | Mezclar peticiones activas | Throughput vs latencia individual |
| Paged attention | Gestionar KV como páginas | Runtime más complejo |
| Speculative decoding | Modelo pequeño propone; grande verifica | Depende de aceptación |
| MQA/GQA | Compartir K/V entre heads | Menor KV con posible coste de calidad |
| Offload CPU/GPU | Dividir capas o tensores | Funciona con poca VRAM, más tráfico |
| Kernel fusion | Unir operaciones | Dependencia de hardware/backend |

## Métricas que no debes mezclar

- **TTFT:** tiempo hasta el primer token.
- **Tokens/s:** velocidad después del primer token.
- **Throughput:** tokens o peticiones totales por segundo.
- **P50/P95/P99:** distribución de latencia.
- **Memoria pico:** no solo tamaño estable.

Optimizar una puede empeorar otra.

Profundización: [serving, PagedAttention, continuous batching y capacity planning](../14-ampliacion-avanzada/11-serving-produccion-y-capacidad.md).
