# Laboratorio 7: eval estadística A/B

## Objetivo

Comparar dos prompts, modelos o workflows sin decidir por una impresión. Construirás una eval pareada con intervalos y análisis por slices.

## Dataset

Reúne 80–200 casos representativos. Cada fila necesita:

```text
case_id, input, expected_or_rubric, domain, difficulty, risk, source
```

Reserva un test retenido. Deduplica contra ejemplos usados en prompts y tuning.

## Hipótesis

Escribe antes de ejecutar:

```text
Baseline A: ...
Candidato B: ...
Métrica principal: ...
Mejora mínima útil: ...
Guardrails: ...
Slices críticos: ...
Presupuesto de coste/latencia: ...
```

## Ejecución

1. Congela versiones y parámetros.
2. Ejecuta A y B sobre los mismos IDs.
3. Aleatoriza orden si hay juez humano/LLM.
4. Guarda outputs completos, score y error.
5. Repite muestras si la salida es estocástica.
6. Calcula diferencia por caso.
7. Haz bootstrap pareado por `case_id`.

Pseudocódigo:

```python
diffs = []
for _ in range(5000):
    sample_ids = resample(case_ids, replace=True)
    diffs.append(mean(score_b[id] - score_a[id] for id in sample_ids))

interval = percentile(diffs, [2.5, 97.5])
```

## Tabla

| Métrica | A | B | Δ | IC 95 % | Decisión |
|---|---:|---:|---:|---:|---|
| Éxito | | | | | |
| Error factual | | | | | |
| Acción insegura | | | | | |
| Coste/caso | | | | | |
| Latencia p95 | | | | | |

## Revisión cualitativa

Inspecciona:

- 20 casos donde B gana;
- 20 donde pierde;
- desacuerdos del juez;
- fallos en slices críticos;
- ejemplos donde ambos obtienen buena nota por la razón equivocada.

## Trampas

- cambiar dataset a mitad del experimento;
- usar test para reescribir el prompt y volver a llamarlo test;
- afirmar equivalencia porque el intervalo incluye cero;
- ignorar coste o seguridad;
- remuestrear turns correlacionados como independientes;
- elegir la métrica después de ver resultados.

## Entrega

Dataset versionado, configuración, outputs, script de scoring, intervalos, matriz de errores y una decisión: promover, rechazar o recopilar más datos.

Profundización: [evaluación estadística](../14-ampliacion-avanzada/13-evaluacion-estadistica-y-contaminacion.md).
