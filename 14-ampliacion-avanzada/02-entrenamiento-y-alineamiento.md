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

## Sicofancia y señales de preferencia

Un modelo de recompensa aproxima juicios de preferencia; no mide la verdad directamente. Si los datos mezclan corrección con aprobación social, optimizar esa señal puede favorecer el acuerdo. [Sharma et al.](https://arxiv.org/abs/2310.13548) investigan esa relación; no conviene extrapolar sus resultados a toda arquitectura o postentrenamiento.

[Wei et al.](https://arxiv.org/abs/2308.03958) estudian una intervención con datos sintéticos que reduce la dependencia de la opinión del usuario en sus pruebas. La lección técnica es evaluar qué conducta aprende la señal, no asumir que mayor tamaño o más ajuste resuelven el problema.

Como diseño experimental, empareja prompts con evidencia idéntica y posturas distintas. Mantén modelo, configuración y distribución de tareas; usa varias ejecuciones y una referencia externa. Mide tanto acuerdo incorrecto como desacuerdo incorrecto, y añade casos donde la nueva evidencia sí exige cambiar de respuesta. Un descenso del acuerdo puede reflejar contrarianismo, no mejor calibración.

Repite la evaluación después de cambiar datos de preferencia, instrucciones, juez o versión del modelo. No basta con medir satisfacción o una tasa de aprobación agregada. Introducción y ejemplos: [sicofancia de modelos](../03-era-chatgpt/05-sicofancia-de-modelos.md).

## Catastrophic forgetting y mezclas

Especializar demasiado puede borrar capacidades. Se mezclan datos generales, se usan adaptadores o regularización y se ejecutan evals de regresión.

## Datos sintéticos

Permiten escalar problemas y soluciones verificables, como self-play o generación de código. El filtro es esencial: entrenar sobre errores sintéticos crea bucles de degradación. Diversidad de generadores y verificadores independientes reduce el riesgo.
