# 13. Evaluación estadística, incertidumbre y contaminación

Una eval produce una estimación, no una verdad eterna. Cambia con el muestreo de casos, la aleatoriedad del modelo, el prompt, el juez, las tools y el entorno.

## Unidad experimental

Antes de calcular una media define:

- población objetivo: ¿qué peticiones reales representa?;
- unidad: pregunta, conversación, repositorio o tarea completa;
- criterio de éxito;
- número de ejecuciones por caso;
- versión de modelo/prompt/tools;
- dependencias y fecha;
- subgrupos de riesgo.

No trates 100 turns del mismo chat como 100 observaciones independientes.

## Métricas según tarea

| Tipo | Métricas |
|---|---|
| Clasificación | accuracy, precision/recall, F1, matriz de confusión |
| Retrieval | recall@k, MRR, nDCG |
| Código | pass@k, tasa de tests, regresiones |
| Agente | task success, pasos, acciones inválidas, coste |
| Factual | soporte por claim, contradicción, abstención |
| Producción | SLO, error rate, coste, escalado humano |

[HELM](https://arxiv.org/abs/2211.09110) defendió evaluación multidimensional: precisión por sí sola oculta robustez, calibración, equidad, toxicidad y eficiencia.

## Intervalos de confianza

Si el modelo acierta `k` de `n`, `k/n` es una estimación. Muestra intervalo, especialmente con pocos casos. Para diferencias entre dos sistemas usa un diseño **pareado**: ambos resuelven los mismos ejemplos.

Bootstrap pareado conceptual:

```text
1. Muestrea con reemplazo N IDs de caso.
2. Calcula score_B - score_A sobre esos IDs.
3. Repite miles de veces.
4. Usa percentiles para un intervalo.
```

Remuestrea la unidad independiente adecuada. Si hay varios turns por conversación, remuestrea conversaciones.

## Potencia y efecto mínimo

«No hay diferencia significativa» no significa equivalencia. Quizá el dataset sea pequeño. Decide antes qué mejora mínima justificaría el coste y estima cuántos casos necesitas. Reporta tamaño de efecto e intervalo, no solo p-value.

## Variabilidad de generación

Un único sample mide una realización. Para tareas estocásticas:

- fija configuración para comparabilidad;
- ejecuta varias seeds/samples;
- reporta media y dispersión;
- distingue pass@1 de pass@k;
- no elijas retrospectivamente el mejor output sin contabilizar coste.

En agentes también varían buscador, web, APIs y reloj. Guarda trazas y snapshots cuando sea posible.

## Calibración

Un sistema calibrado que declara 80 % de probabilidad debería acertar aproximadamente 80 % en casos comparables. Los porcentajes verbales de un LLM no están garantizados como probabilidades calibradas.

Alternativas prácticas:

- clases de evidencia con definiciones;
- probabilidad derivada de un clasificador calibrado;
- selective prediction: responder solo por encima de umbral;
- curvas coverage–risk;
- medir falsa abstención y error no abstendido.

## Jueces humanos y LLM

Mide acuerdo entre anotadores, no solo mayoría. Mantén guía con ejemplos frontera y adjudica desacuerdos. Para LLM judges:

- aleatoriza orden;
- oculta identidad;
- separa dimensiones;
- calibra contra humanos;
- analiza preferencia por longitud/familia;
- conserva outputs crudos.

Una rúbrica estable puede sesgar consistentemente; reproducibilidad no implica validez.

## Contaminación

Hay varios niveles:

1. texto fuente visto durante pretraining;
2. pregunta exacta vista;
3. pregunta y respuesta/solución vistas;
4. benchmark usado en post-training;
5. prompt de evaluación usado para optimizar el producto.

Los benchmarks públicos se vuelven objetivos de entrenamiento. [LiveBench](https://arxiv.org/abs/2406.19314) responde con preguntas recientes y scoring objetivo, pero ningún diseño elimina para siempre el problema.

Protecciones:

- test privado rotatorio;
- datos posteriores al cutoff;
- generación paramétrica con respuesta verificable;
- canaries;
- búsqueda de n-grams/minhash;
- holdout por fuente/organización/tiempo;
- auditoría de prompts y datasets de tuning.

## Slice analysis

La media puede mejorar mientras empeora español, contextos largos o acciones sensibles. Define slices antes de mirar resultados:

```text
idioma × dominio × dificultad × longitud × tool × riesgo
```

No publiques cientos de cortes diminutos como conclusiones firmes; corrige por exploración o trátalos como hipótesis para un nuevo test.

## Regresión y promoción

Un candidato se promueve si:

- supera umbral principal con incertidumbre aceptable;
- no viola guardrails;
- no degrada slices críticos más del margen;
- cumple coste y SLO;
- pasa revisión de una muestra de desacuerdos;
- tiene rollback y monitorización online.

Ejecuta evals offline, canary y luego monitorización. La distribución real cambia y los usuarios encuentran casos que el benchmark no imaginó.

Siguiente: [robótica e IA encarnada](14-robotica-e-ia-encarnada.md).
