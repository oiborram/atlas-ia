# Laboratorio 8: RAG híbrido y reranking

## Objetivo

Demostrar qué aporta cada etapa de un RAG comparando lexical, vector, híbrido y reranking sobre el mismo corpus.

## Corpus y preguntas

Usa 50–500 documentos con estructura y versión. Crea al menos 40 preguntas:

- coincidencia exacta: ID, función o error;
- paráfrasis semántica;
- dato temporal con versiones;
- multihop;
- sin respuesta;
- documentos con texto de prompt injection.

Etiqueta documentos relevantes y la respuesta/fuente esperada.

## Variantes

| Variante | Retrieval | Reranker | Generador |
|---|---|---|---|
| A | BM25 | no | igual para todas |
| B | embeddings | no | igual |
| C | BM25 + vector + RRF | no | igual |
| D | híbrido | cross-encoder | igual |

Mantener el generador constante permite atribuir diferencias a retrieval.

## Métricas por capa

- recall@1/5/10;
- MRR/nDCG;
- evidencia útil por token de contexto;
- respuesta correcta;
- soporte de citas;
- abstención cuando no existe respuesta;
- latencia y coste por etapa.

## Procedimiento

1. Parsea preservando títulos, secciones, fechas y ACL simuladas.
2. Compara chunk fijo, por sección y padre–hijo en una muestra.
3. Construye los dos índices.
4. Ejecuta A–D con los mismos queries.
5. Inspecciona misses del retriever antes de culpar al LLM.
6. Añade un context builder que deduplique y resuelva versiones.
7. Verifica soporte de cada claim.
8. Inyecta instrucciones en documentos y confirma que no se ejecutan.

## Ablaciones

- sin metadatos de fecha;
- top-k 3, 10 y 30;
- sin deduplicación;
- query original frente a reescrita;
- fragmento pequeño frente a padre completo;
- reranker sobre 10 frente a 100 candidatos.

## Resultado esperado

No busques que una variante gane todo. BM25 debería ser competitivo en identificadores; dense en paráfrasis; reranking puede mejorar precisión con coste. Si no ocurre, investiga tokenizer, embeddings, corpus y etiquetas.

## Entrega

Pipeline, dataset, tablas por etapa, cinco análisis de fallo y una recomendación de configuración bajo un presupuesto real.

Profundización: [contexto largo y RAG avanzado](../14-ampliacion-avanzada/08-contexto-largo-y-rag-avanzado.md).
