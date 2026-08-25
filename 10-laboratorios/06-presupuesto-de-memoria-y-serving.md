# Laboratorio 6: presupuesto de memoria y serving

## Objetivo

Predecir si un modelo cabe en tu hardware y contrastar la estimación con una ejecución. Aprenderás por qué tamaño en disco, VRAM y throughput no son equivalentes.

## Material

- un runtime local que muestre uso de memoria y tokens/s;
- dos modelos de distinto tamaño o dos cuantizaciones del mismo;
- prompts de 256, 2k y 8k tokens;
- una hoja CSV o Markdown para resultados.

No descargues un modelo sin revisar licencia y espacio disponible.

## Estimación previa

Registra:

```text
memoria_pesos = parámetros × bits / 8 + escalas/metadatos
memoria_KV = 2 × capas × tokens × heads_KV × head_dim × bytes
overhead = runtime + buffers + sistema
```

Si no conoces heads KV o dimensión, marca la estimación como intervalo. No ajustes la predicción después de medir sin conservar la original.

## Matriz experimental

| Modelo/formato | Contexto | Concurrencia | VRAM/RAM pico | TTFT | tok/s decode | Calidad |
|---|---:|---:|---:|---:|---:|---|
| | 256 | 1 | | | | |
| | 2k | 1 | | | | |
| | 8k | 1 | | | | |
| | 2k | 4 | | | | |

Usa las mismas preguntas para todas las variantes. Añade al menos:

- copia o extracción exacta;
- razonamiento sencillo;
- código;
- español con tildes/Unicode;
- una tarea donde deba abstenerse.

## Procedimiento

1. Mide memoria en reposo.
2. Carga modelo y registra incremento.
3. Ejecuta warm-up.
4. Repite cada celda al menos tres veces.
5. Separa prefill de decode cuando el runtime lo permita.
6. Incrementa contexto hasta acercarte al límite sin provocar swapping destructivo.
7. Compara estimado y real.
8. Explica diferencias: metadata, KV, buffers, offload, fragmentación.

## Preguntas

- ¿La cuantización acelera decode o solo permite que quepa?
- ¿Qué ocurre con TTFT al crecer prompt?
- ¿Qué ocurre con memoria al crecer contexto?
- ¿La concurrencia mejora throughput total y empeora latencia individual?
- ¿Qué capacidad se pierde antes con menor precisión?

## Entrega

- hardware, drivers, runtime y commits/versiones;
- fórmulas y predicción original;
- tabla con media y dispersión;
- gráfica contexto → memoria y contexto → TTFT;
- recomendación basada en un SLO explícito;
- límites del experimento.

Profundización: [serving y capacidad](../14-ampliacion-avanzada/11-serving-produccion-y-capacidad.md) y [hardware/economía](../14-ampliacion-avanzada/15-hardware-energia-y-economia.md).
