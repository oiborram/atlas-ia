# 2016–2020 — NLP: del texto a los modelos de lenguaje

**Natural Language Processing (NLP)** —procesamiento del lenguaje natural o **PLN** en español— es el campo que construye sistemas capaces de analizar, transformar o generar lenguaje humano. Un LLM pertenece a NLP, pero NLP es mucho más amplio que un chatbot.

Antes de los grandes modelos ya existían correctores, buscadores, filtros de spam, traductores, analizadores gramaticales, extractores de entidades y sistemas de voz. La revolución Transformer no inventó el procesamiento del lenguaje: cambió cuánto podía reutilizarse un mismo modelo entre tareas y cuánto contexto podía integrar.

## Qué entra y qué sale

La entrada puede ser una frase, un documento o una colección. La salida depende de la tarea:

| Tarea | Entrada | Salida funcional |
|---|---|---|
| Clasificación | correo | `spam`, `no_spam` |
| Sentimiento | reseña | positivo, neutral, negativo |
| Detección de idioma | texto | `es`, `en`, `ca`… |
| NER | contrato | personas, empresas, fechas, importes |
| Etiquetado gramatical | oración | sustantivo, verbo, sujeto, objeto… |
| Traducción | texto en español | texto equivalente en inglés |
| Resumen | documento | versión más corta |
| Question answering | pregunta + evidencia | respuesta o fragmento relevante |
| Generación | instrucciones + contexto | texto nuevo |
| Embeddings | texto | vector para búsqueda o clasificación |

El mismo problema empresarial admite soluciones muy diferentes. Para extraer un número de pedido con formato fijo puede bastar una expresión regular. Para distinguir una queja irónica quizá haga falta un modelo entrenado. Para responder preguntas abiertas sobre políticas internas puede convenir retrieval + LLM.

## Un pipeline clásico de NLP

Los sistemas anteriores a los LLM solían encadenar componentes especializados:

```mermaid
flowchart LR
    T[Texto crudo] --> N[Normalizar]
    N --> S[Segmentar frases]
    S --> K[Tokenizar]
    K --> L[Lemas y etiquetas]
    L --> P[Dependencias y entidades]
    P --> A[Regla o modelo de tarea]
    A --> O[Salida estructurada]
```

Cada etapa añade anotaciones que la siguiente puede aprovechar. La [documentación de spaCy](https://spacy.io/usage/linguistic-features) muestra ejemplos actuales de tokenización, lematización, *part-of-speech tagging*, dependencias y entidades nombradas.

La ventaja es la inspección: puedes ver qué entidad o regla falló. La desventaja es la propagación de errores. Si la tokenización separa mal un identificador, el reconocedor de entidades puede no recuperarse.

## Conceptos lingüísticos sin estudiar lingüística completa

### Tokenización

Divide el texto en unidades. En NLP clásico suelen parecer palabras y signos; en un LLM pueden ser subpalabras. La segmentación depende del idioma: espacios, contracciones, abreviaturas, emoji y sistemas de escritura no se comportan igual.

### Lematización

Reduce variantes a una forma base útil: `fui`, `fueron` y `es` pueden relacionarse con `ser`; `comprando` con `comprar`. No es simplemente quitar sufijos.

### Part-of-speech tagging

Asigna categorías gramaticales en contexto. `Banco` puede ser sustantivo en «el banco aprobó» y una forma verbal en otro contexto. Las etiquetas facilitan reglas más precisas que buscar una palabra aislada.

### Dependencias

Representan relaciones entre palabras: quién realiza una acción, qué recibe el efecto o qué modifica a qué. Son útiles para extracción, aunque una frase ambigua puede admitir varios análisis.

### Named Entity Recognition

**NER** localiza y clasifica fragmentos como persona, organización, ubicación, fecha, producto o dinero. Reconocer `Apple` como empresa no identifica todavía qué registro concreto representa; esa segunda tarea es *entity linking* o resolución de entidades.

## Cuatro etapas históricas que conviven

| Enfoque | Cómo funciona | Sigue siendo útil cuando… |
|---|---|---|
| Reglas y diccionarios | patrones escritos por personas | el formato y las excepciones están muy controlados |
| ML estadístico | features + clasificador entrenado por tarea | necesitas un modelo pequeño, rápido y explicable |
| Redes neuronales especializadas | embeddings, CNN/RNN/LSTM, encoder–decoder | hay datos etiquetados y una tarea estable |
| Transformers y modelos preentrenados | un modelo aprende representaciones reutilizables a gran escala | necesitas contexto, transferencia entre tareas o generación |

La aparición de BERT y GPT alrededor de 2018 consolidó el **pretraining + adaptación**. En vez de entrenar cada tarea desde cero, se preentrena una representación general del lenguaje y después se ajusta, se guía con ejemplos o se usa mediante prompting.

Esto desplazó mucho trabajo manual, pero no volvió inútiles las herramientas anteriores. Una lista cerrada, una regex o un clasificador pequeño pueden ser más baratos, deterministas y privados que un LLM.

## Comprensión y generación no son magia separada

Las tareas de NLP suelen agruparse así:

- **clasificación de secuencia:** etiqueta un texto completo;
- **clasificación de tokens:** etiqueta fragmentos, como NER;
- **extracción:** devuelve spans, relaciones o campos;
- **recuperación:** encuentra textos relevantes;
- **sequence-to-sequence:** traduce, resume o transforma;
- **modelado de lenguaje:** estima qué texto es probable y genera continuaciones.

Un Transformer puede reutilizarse entre varias familias, pero la salida correcta y su evaluación siguen siendo distintas. Un resumen fluido no se evalúa como un detector de spam; una respuesta conversacional no sustituye un extractor de importes con contrato estricto.

## NLP clásico frente a LLM

| Necesidad | Primera opción razonable |
|---|---|
| Patrón estable y exacto | parser, regex o reglas |
| Etiquetas cerradas con muchos ejemplos | clasificador pequeño o encoder ajustado |
| NER de dominio con spans auditables | pipeline NLP entrenado + reglas |
| Similitud y búsqueda semántica | embeddings + índice |
| Transformación abierta o muchas tareas | LLM con salida estructurada |
| Respuesta sobre documentos | retrieval + LLM, con citas y abstención |
| Decisión sensible | modelo como señal; regla y revisión como autoridad |

Un anti-patrón moderno es llamar a un LLM para todo. Si necesitas detectar veinte códigos exactos en millones de líneas, una solución clásica puede consumir órdenes de magnitud menos recursos y fallar de forma más predecible.

También existe la combinación híbrida:

```text
reglas de alta precisión
  -> modelo pequeño para casos habituales
  -> LLM para cola ambigua
  -> revisión humana para alto riesgo
```

## Español, multilingüismo y dominio

La calidad no se transfiere automáticamente entre idiomas. Cambian morfología, segmentación, orden, dialectos, nombres y cantidad de datos disponibles. Un sistema excelente en noticias inglesas puede fallar en contratos españoles o mensajes con mezcla de español, catalán e inglés.

Evalúa por:

- idioma y variante regional;
- texto formal, chat, abreviaturas y errores;
- jerga del dominio;
- longitud y estructura;
- entidades frecuentes y raras;
- grupos demográficos cuando la tarea pueda producir daño.

Traducir todo a inglés antes de procesar puede simplificar el pipeline, pero añade pérdida semántica, coste, latencia y otra transferencia de datos.

## Métricas según la tarea

| Tarea | Métrica común | Lo que puede ocultar |
|---|---|---|
| Clasificación | accuracy, precision, recall, F1 | clases raras y costes distintos de error |
| NER | precision/recall/F1 por span | límites parcialmente correctos y tipos críticos |
| Traducción | BLEU, chrF, COMET | errores terminológicos o legales concretos |
| Resumen | ROUGE y evaluación semántica | factualidad y omisiones graves |
| QA extractivo | exact match y token F1 | respuestas equivalentes con otra forma |
| Generación | rúbrica, preferencia, éxito de tarea | sesgo del juez y variabilidad |

No optimices una métrica sin observar el impacto. En moderación puede importar más el recall de una categoría grave; en extracción financiera, un dígito incorrecto puede ser peor que omitir el campo y pedir revisión.

## Fallos frecuentes

- dataset que no representa producción;
- etiquetas inconsistentes entre anotadores;
- leakage entre train y test por documentos duplicados;
- tokenización diferente entre entrenamiento e inferencia;
- normalización que borra información útil;
- negaciones, ironía o referencias que exigen contexto;
- entidades nuevas después del entrenamiento;
- sesgo por idioma, dialecto o grupo;
- métrica agregada que esconde una clase crítica;
- salida plausible tratada como hecho verificado.

## Práctica: resolver lo mismo de tres formas

Construye un clasificador de tickets con 100–300 ejemplos y tres rutas:

1. palabras clave y reglas;
2. embeddings + clasificador simple;
3. LLM con ejemplos y salida JSON.

Usa el mismo test retenido. Compara F1 por categoría, latencia, coste, capacidad de explicar el error y mantenimiento al añadir una categoría. Después crea un router híbrido que use la opción barata cuando su confianza sea suficiente.

## Idea para recordar

**NLP es el campo; un LLM es una familia de herramientas dentro de él. El avance no consiste en sustituir todas las reglas y modelos pequeños, sino en elegir la abstracción menos costosa que resuelva el lenguaje real de tu dominio.**

Relaciona esta lección con [tokens, embeddings y contexto](01-tokens-embeddings-y-contexto.md), [Transformer y atención](02-transformer-y-atencion.md), [pretraining](03-pretraining-siguiente-token-y-escalado.md) y [RAG](../03-era-chatgpt/01-rag-y-conocimiento-externo.md).
