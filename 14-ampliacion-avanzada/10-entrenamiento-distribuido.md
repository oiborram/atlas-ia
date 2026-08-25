# 10. Entrenamiento distribuido: memoria, comunicación y fallos

Entrenar un modelo grande consiste en mantener aceleradores ocupados mientras se mueven pesos, activaciones, gradientes y estados del optimizador. Añadir GPUs no garantiza acelerar: también añade comunicación y puntos de fallo.

## Qué ocupa memoria

Para cada parámetro pueden coexistir:

- peso usado en forward;
- gradiente;
- copia maestra en mayor precisión;
- momentos del optimizador Adam;
- activaciones por token y capa;
- buffers temporales y comunicaciones.

Por eso «7B parámetros × 2 bytes = 14 GB» no calcula memoria de entrenamiento. Activaciones crecen con batch, secuencia y capas; el optimizador puede ocupar varias veces los pesos.

## Paralelismos

| Tipo | Reparte | Coste principal |
|---|---|---|
| Data parallel | batches; replica modelo | all-reduce de gradientes |
| Tensor parallel | una multiplicación/capa | comunicación frecuente por capa |
| Pipeline parallel | grupos de capas | burbujas y activaciones entre etapas |
| Sequence/context parallel | tokens de la secuencia | intercambio de activaciones/KV |
| Expert parallel | expertos MoE | all-to-all y balance de routing |

[Megatron-LM](https://arxiv.org/abs/1909.08053) desarrolló tensor parallelism intra-capa; trabajos posteriores combinaron tensor, pipeline y data parallelism a gran escala ([Megatron distribuido](https://arxiv.org/abs/2104.04473)).

## Data parallel y acumulación

Cada réplica calcula gradientes sobre un microbatch y luego los agrega. El batch global aproximado es:

```text
microbatch × pasos_de_acumulación × réplicas_data_parallel
```

Si aumentas GPUs sin ajustar la receta, cambia el batch efectivo y con él la dinámica de optimización. Escalar learning rate no es automático para todas las fases.

## ZeRO y FSDP

[ZeRO](https://arxiv.org/abs/1910.02054) elimina réplicas innecesarias repartiendo estado:

- Stage 1: estados del optimizador;
- Stage 2: además gradientes;
- Stage 3: además parámetros.

FSDP aplica una idea similar: reúne shards justo antes de usarlos y vuelve a liberarlos. Ahorras memoria a cambio de comunicación. Si la red es lenta, shardear agresivamente puede empeorar throughput.

## Pipeline y burbuja

Divide capas entre dispositivos. Mientras una etapa procesa un microbatch, otras pueden trabajar en diferentes microbatches. Al arrancar y vaciar el pipeline hay dispositivos ociosos: la burbuja. Más microbatches la reducen, pero aumentan activaciones pendientes y complejidad.

La partición debe equilibrar tiempo, no número de capas: embeddings, MoE o heads multimodales pueden costar distinto.

## Activation checkpointing

En vez de guardar todas las activaciones del forward, guarda puntos y recomputa el resto durante backward. Intercambia memoria por FLOPs. Es útil cuando la memoria limita batch o longitud, pero puede hacer que una run compute-bound deje de escalar.

## Precisión mixta

- FP32: estable, caro.
- BF16: rango similar a FP32 con menos mantisa; preferido en hardware moderno.
- FP16: requiere atención a underflow y loss scaling.
- FP8: reduce memoria/ancho de banda, exige escalado y kernels compatibles.

Mantén ciertas reducciones, normas o estados en mayor precisión. Detecta NaN/Inf temprano y registra escalas.

## Red e interconexión

Dentro de un nodo, NVLink/NVSwitch suele ser mucho más rápido que la red entre nodos. Coloca tensor parallel dentro de dominios rápidos y data/pipeline entre dominios según el perfil. Métricas:

- compute utilization;
- tiempo en collectives;
- ancho de banda efectivo;
- stragglers;
- tokens/s por GPU;
- model FLOP utilization;
- tiempo perdido en checkpoint.

## Estabilidad de entrenamiento

Señales a observar:

- loss global y por dominio;
- gradient norm y clipping;
- learning rate;
- activaciones/updates anómalos;
- balance y dropped tokens en MoE;
- NaN/Inf;
- divergencia entre réplicas;
- throughput y temperatura del hardware.

Ante un spike, conserva checkpoint, batch/IDs de datos, seed y métricas. Saltar silenciosamente el batch impide reproducir y puede ocultar datos corruptos.

## Checkpoints fiables

Un checkpoint incluye más que pesos:

- modelo shardeado;
- optimizador y scheduler;
- contador de tokens/steps;
- RNG por proceso;
- dataloader y orden de datos;
- tokenizer/config;
- receta y commit de código.

Escribe de forma atómica, verifica hashes y practica restauración. Un checkpoint nunca probado es una esperanza, no una estrategia.

## Elegir estrategia

1. Estima memoria sin paralelismo.
2. Activa precisión mixta y checkpointing.
3. Usa data parallel si el modelo cabe.
4. Shardea estados con FSDP/ZeRO.
5. Añade tensor/pipeline solo cuando sea necesario.
6. Perfila comunicación antes de escalar nodos.
7. Cambia una dimensión cada vez y mide tokens/s **útiles**, no solo ocupación.

Siguiente: [serving y capacidad](11-serving-produccion-y-capacidad.md).
