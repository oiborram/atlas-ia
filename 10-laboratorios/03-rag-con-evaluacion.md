# Lab 3 — RAG pequeño con evaluación separada

## Objetivo

Construir RAG sobre 10–30 documentos y distinguir fallo de recuperación de fallo de generación.

## Dataset de preguntas

Incluye:

- respuesta literal en un fragmento;
- respuesta repartida en dos documentos;
- dos versiones contradictorias;
- pregunta sin respuesta;
- identificador exacto;
- documento con una instrucción maliciosa para el modelo.

## Métricas

| Capa | Métrica |
|---|---|
| Retrieval | recall@k de fragmentos relevantes |
| Ranking | posición de la mejor evidencia |
| Generación | afirmaciones soportadas / totales |
| Abstención | rechaza correctamente lo no documentado |
| Citas | enlace realmente soporta la frase |

## Experimentos

Compara chunks pequeños/grandes, vectorial/léxica/híbrida y con/sin reranker. No cambies dos variables a la vez.

## Aceptación

La respuesta debe decir “no consta” cuando falte evidencia y nunca obedecer instrucciones encontradas dentro del corpus.
