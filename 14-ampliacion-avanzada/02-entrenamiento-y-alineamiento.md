# Entrenamiento y alineamiento

## Cross-entropy en lenguaje llano

Si el token correcto recibe probabilidad baja, la pérdida es alta. El entrenamiento minimiza la media de esta sorpresa sobre muchos tokens.

Backprop aplica regla de la cadena para calcular cómo cambiar cada parámetro. Optimizers como AdamW mantienen estadísticas de gradientes y separan decaimiento de pesos. Learning-rate schedules calientan y luego reducen el paso.

## Estabilidad y escala

- mixed precision reduce memoria y aumenta throughput;
- gradient accumulation simula batches mayores;
- data/tensor/pipeline/expert parallelism reparte trabajo;
- checkpointing intercambia cómputo por memoria;
- clipping y normalización evitan picos;
- deduplicación reduce memorización y contaminación.

## Etapas

| Etapa | Optimiza | Puede degradar |
|---|---|---|
| Pretraining | Predicción general | Utilidad conversacional |
| Continued pretraining | Dominio/idioma | Capacidades fuera del dominio |
| SFT | Seguir ejemplos | Diversidad, calibración |
| Preference tuning | Preferencia humana/modelo | Verdad si “suena bien” gana |
| RL verificable | Resultado comprobable | Integridad del verificador |
| Safety tuning | Límites y rechazo | Sobre-rechazo |

## Catastrophic forgetting y mezclas

Especializar demasiado puede borrar capacidades. Se mezclan datos generales, se usan adaptadores o regularización y se ejecutan evals de regresión.

## Datos sintéticos

Permiten escalar problemas y soluciones verificables, como self-play o generación de código. El filtro es esencial: entrenar sobre errores sintéticos crea bucles de degradación. Diversidad de generadores y verificadores independientes reduce el riesgo.
