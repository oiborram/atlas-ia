# 15. Hardware, energía y economía del cómputo

La IA moderna está condicionada por cuatro recursos: capacidad de memoria, ancho de banda, cómputo y comunicación. El cuello de botella cambia entre entrenamiento, prefill, decode, batch y hardware.

## El modelo mental del tejado

El *roofline model* relaciona rendimiento con intensidad aritmética:

```text
intensidad = operaciones / bytes movidos
rendimiento ≤ min(pico_cómputo,
                  ancho_de_banda × intensidad)
```

Si haces pocas operaciones por cada peso leído, eres memory-bound. Si reutilizas matrices en un batch grande, sube la intensidad y puedes ser compute-bound.

## Por qué decode choca con memoria

En decode autoregresivo con batch pequeño, cada token necesita recorrer muchos pesos para producir poca salida. Los ALUs esperan datos. [AI and Memory Wall](https://arxiv.org/abs/2403.14123) analiza cómo el ancho de banda crece más despacio que FLOPS.

Consecuencias:

- cuantización puede acelerar al mover menos bytes;
- batching reutiliza pesos entre secuencias;
- speculative decoding amortiza viajes al modelo grande;
- MoE activa menos parámetros, pero requiere routing/comunicación;
- HBM y cachés importan tanto como TFLOPS.

## Capacidad de memoria

Estimación de pesos:

```text
memoria_pesos ≈ parámetros × bits_por_peso / 8 + metadatos
```

Ejemplos ideales antes de overhead:

| Modelo | FP16 | 8 bit | 4 bit |
|---:|---:|---:|---:|
| 3B | 6 GB | 3 GB | 1,5 GB |
| 7B | 14 GB | 7 GB | 3,5 GB |
| 70B | 140 GB | 70 GB | 35 GB |

Suma KV cache, buffers, runtime, sistema y fragmentación. Los formatos 4-bit suelen guardar escalas por bloque.

## GPU, CPU y aceleradores

| Recurso | Fortalezas | Límite típico |
|---|---|---|
| GPU | paralelismo y ecosistema de kernels | coste, VRAM, energía |
| CPU | RAM abundante y accesible | ancho de banda y throughput |
| NPU/ASIC | eficiencia en operaciones objetivo | flexibilidad/software |
| Apple/UMA | memoria unificada y local | ancho de banda/compatibilidad según modelo |
| Edge accelerator | latencia/privacidad local | capacidad y operadores soportados |

La compatibilidad de kernels decide si una precisión anunciada aporta velocidad. Una GPU antigua puede almacenar int4 pero calcular tras dequantizar con una ruta lenta.

## Interconexión

Cuando un modelo cruza dispositivos, cada capa puede intercambiar datos. Distingue:

- PCIe dentro del servidor;
- NVLink/NVSwitch u homólogos;
- InfiniBand/Ethernet entre nodos;
- topología y oversubscription;
- latencia frente a bandwidth.

Un cluster es un sistema de red con GPUs, no una suma de tarjetas.

## Utilización útil

No confundas:

- GPU utilization del driver;
- ocupación de kernels;
- FLOPS logrados;
- Model FLOP Utilization;
- tokens/s que pasan eval y SLO;
- disponibilidad del servicio.

Una GPU al 100 % puede estar ejecutando padding, recomputación o solicitudes que acabarán rechazadas.

## Coste total

```text
TCO = hardware/amortización
    + energía y refrigeración
    + red y almacenamiento
    + operación e ingeniería
    + capacidad ociosa
    + fallos y reemplazos
    + licencias/servicios
```

Para una API añade precio por input/output, tool calls, caché, reintentos y revisión humana. Para local añade horas de ingeniería y oportunidad del capital.

## Unidad económica correcta

No compares solo €/millón de tokens. Usa:

- coste por tarea correcta;
- coste por sesión dentro del SLO;
- coste por caso no escalado a humano;
- energía por output útil;
- coste incremental de subir un punto de calidad.

Un modelo barato que necesita tres reintentos y revisión puede ser más caro.

## Energía

Energía de una run:

```text
kWh ≈ potencia_media_kW × horas × PUE
```

PUE incorpora overhead de infraestructura, no la fuente de electricidad. Para emisiones necesitas intensidad de carbono temporal/local y metodología explícita.

La [IEA, Energy and AI](https://www.iea.org/reports/energy-and-ai) estima demanda a escala de centros de datos y enfatiza impactos locales de red. Su actualización [Key Questions on Energy and AI 2026](https://www.iea.org/reports/key-questions-on-energy-and-ai) muestra que la eficiencia por tarea puede mejorar mientras la demanda total crece por más uso: efecto rebote.

## Decisiones de sostenibilidad

- elegir el modelo mínimo que pasa eval;
- cachear de forma segura;
- batch y scheduling;
- cuantizar con medición de calidad;
- limitar outputs innecesarios;
- usar RAG/SLM para rutas simples;
- mover trabajos flexibles a horas/regiones adecuadas;
- medir por tarea útil;
- alargar vida de hardware cuando el TCO lo permita.

## Comprar, alquilar o API

| Opción | Conviene cuando | Riesgo |
|---|---|---|
| API | demanda variable, velocidad de producto | dependencia, coste marginal, datos |
| Cloud GPU | control temporal y experimentación | disponibilidad y egress |
| On-prem | carga estable, control, capacidad operativa | capital, utilización, obsolescencia |
| Edge | privacidad/latencia/offline | modelo menor y heterogeneidad |

Haz análisis de sensibilidad con utilización, longitud y precio. El punto de equilibrio cambia si el servicio solo está activo ocho horas al día.

Vuelve al [índice de ampliación avanzada](README.md) o practica con los [laboratorios](../10-laboratorios/README.md).
