# 2017–2020 — El lenguaje se convierte en números

## Tokenización

Un modelo no recibe palabras directamente. Un **tokenizer** transforma texto en identificadores. Un token puede ser una palabra, parte de una palabra, signo o espacio.

```text
"cuantización" → ["cu", "ant", "ización"] → [4912, 733, 18421]
```

La división exacta depende del vocabulario del modelo. Por eso:

- idiomas o código poco representados pueden consumir más tokens;
- contar caracteres no predice exactamente el coste;
- cambiar tokenizer hace incompatibles los pesos de entrada/salida;
- un contexto de 100 000 tokens no equivale a recordar perfectamente 100 000 tokens.

## Embeddings

Una tabla convierte cada id en vector. Durante las capas, el vector deja de representar solo el token y pasa a representar **ese token en ese contexto**.

```text
"banco" + "dinero" → región contextual financiera
"banco" + "río"    → región contextual geográfica
```

Los embeddings externos usados en búsqueda siguen una idea relacionada: textos semánticamente parecidos quedan próximos y pueden recuperarse por similitud.

## Ventana de contexto

Es el búfer de trabajo de una llamada: instrucciones, historial, documentos, descripciones de herramientas y resultados. Tiene tres límites distintos:

| Límite | Pregunta |
|---|---|
| Capacidad | ¿Cuántos tokens caben? |
| Recuperación | ¿Encuentra el detalle relevante dentro de ellos? |
| Atención efectiva | ¿Lo usa bien sin distraerse? |

Más contexto puede empeorar una respuesta si introduce instrucciones contradictorias o ruido. La disciplina moderna se llama **context engineering**: seleccionar, ordenar, resumir y aislar el contexto necesario.

## Embedding no es base de datos vectorial

- El modelo de embeddings crea vectores.
- El índice vectorial almacena y busca esos vectores.
- El *retriever* decide qué fragmentos recuperar.
- El LLM redacta con los fragmentos.

Juntas, estas piezas forman muchos sistemas RAG; ninguna por separado “conoce tus documentos”.
