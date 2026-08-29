# Glosario funcional

| Término | Explicación breve |
|---|---|
| Activación | Valor temporal producido por una capa durante una ejecución |
| Abliteration | Intervención que reduce mecanismos internos de rechazo modificando activaciones o pesos |
| Agent/Agente | Sistema con objetivo, bucle, herramientas, estado y condición de parada |
| AGENTS.md | Instrucciones versionadas para agentes dentro de un repositorio |
| Alignment | Hacer que el comportamiento se acerque a intención y restricciones humanas |
| Attention | Mezcla ponderada de información entre posiciones de una secuencia |
| Backpropagation | Cálculo de cómo cada peso contribuyó al error |
| Base model | Modelo preentrenado antes de ajuste conversacional |
| Batch | Grupo de ejemplos o peticiones procesados juntos |
| Bootstrap | Remuestreo para estimar incertidumbre de una métrica |
| Benchmark | Conjunto compartido de evaluación |
| BF16/FP16/FP8 | Formatos numéricos de distinta precisión/coste |
| Chain-of-Thought (CoT) | Ruta lineal de pasos intermedios generados para resolver una tarea. No demuestra que la explicación sea fiel. [Explicación](../05-era-thinking/01-de-chain-of-thought-a-reasoning-models.md#chain-of-thought-una-ruta-lineal-de-pasos) |
| Checkpoint | Snapshot de pesos o estado de trabajo |
| Circuit breaker | Control que detiene llamadas a una dependencia tras fallos repetidos para evitar cascadas y reintentos sin fin |
| Compactador de contexto / Context compaction | Reduce historial activo mediante limpieza, resúmenes o estado estructurado; puede perder información. [Explicación](../06-era-agent-tools/02-memoria-planificacion-y-fiabilidad.md#compactadores-de-contexto) |
| Computer Use | Control por percepción visual y acciones de interfaz |
| Connector | Integración autenticada con un servicio externo |
| Context cache / Caché de contexto / Prompt caching | Reutiliza el procesamiento de entradas compartidas; no resume ni amplía la ventana. [Explicación](../04-era-ia-local/03-inferencia-flashattention-y-kv-cache.md#context-cache-caché-de-contexto-entre-peticiones) |
| Context window | Máximo de tokens disponibles en una ejecución |
| Continuous batching | Incorporar y retirar secuencias entre pasos de decode |
| Context engineering | Selección y estructura de todo lo que ve el modelo |
| Cuantización | Representar pesos/activaciones con menos bits |
| Decode | Fase autoregresiva que genera tokens |
| Data exfiltration / Exfiltración de datos | Salida de información hacia un usuario, herramienta, destino o registro no autorizado. [Controles](../06-era-agent-tools/07-guardarrailes-evals-y-control-de-fallos.md#data-exfiltration-cuando-los-datos-salen-por-una-ruta-permitida) |
| Data lake | Repositorio escalable para datos crudos y diversos, normalmente sobre object storage y con múltiples motores de procesamiento. [Comparativa](../14-ampliacion-avanzada/06-datos-tokenizacion-y-curacion.md#data-lake-data-warehouse-y-lakehouse) |
| Data warehouse | Almacén analítico de datos estructurados y curados, optimizado para SQL, BI y métricas compartidas |
| DeepEval | Framework para expresar casos, métricas y umbrales de sistemas LLM como evaluaciones automatizables |
| Dense model | Activa prácticamente todos sus parámetros por token |
| Destilación | Entrenar un alumno con señales de un modelo profesor |
| Diffusion | Generación mediante reversión gradual de ruido |
| DPO | Ajuste directo con pares preferido/rechazado |
| Embedding | Vector que representa token, texto u otro objeto |
| Entity resolution / Resolución de entidades | Proceso que decide qué registros representan la misma entidad real conservando identidad y procedencia. [Explicación](../14-ampliacion-avanzada/16-grafos-de-conocimiento-bases-de-grafos-y-gnn.md#resolución-de-entidades-saber-cuándo-dos-registros-son-el-mismo) |
| Epoch | Pasada por un conjunto de entrenamiento |
| Eval | Prueba con casos, criterios y métrica |
| Fine-tuning | Entrenamiento adicional sobre un modelo existente |
| Few-Shot | Adaptación temporal mediante unos pocos ejemplos dentro del prompt, sin actualizar pesos. [Explicación](../05-era-thinking/01-de-chain-of-thought-a-reasoning-models.md#zero-shot-one-shot-y-few-shot) |
| Framework de agentes | Librería o runtime que coordina estado, tools, transiciones, checkpoints y observabilidad alrededor de uno o más modelos. [Comparativa](../06-era-agent-tools/06-frameworks-de-agentes.md) |
| FSDP/ZeRO | Particionado de pesos, gradientes y estados entre dispositivos |
| FlashAttention | Algoritmo exacto de atención que reduce IO de memoria |
| Foundation model | Modelo general reutilizable para muchas tareas |
| Frontier model | Modelo cercano al máximo de capacidad disponible en su fecha |
| Function calling | Salida estructurada que solicita una función al runtime |
| GQA/MQA | Atención que comparte claves/valores entre heads |
| GNN / Graph Neural Network | Red que aprende representaciones agregando información de nodos y vecinos de un grafo. [GCN y GAT](../14-ampliacion-avanzada/16-grafos-de-conocimiento-bases-de-grafos-y-gnn.md#gnn-aprender-pasando-mensajes-por-el-grafo) |
| Graph embedding | Vector aprendido para un nodo, relación o grafo que aproxima alguna noción útil de estructura o similitud |
| GraphRAG | Recuperación que combina entidades, relaciones o recorridos de un grafo con evidencia documental para una generación |
| GGUF | Formato de archivo de tensores y metadatos del ecosistema GGML |
| Goal mode | Objetivo durable con progreso a largo plazo |
| Grounding | Anclar respuesta en evidencia o entorno |
| Guardrail / Guardarraíl | Control de entrada, contexto, ejecución o salida que limita, detecta o responde a un fallo definido. [Diseño y evaluación](../06-era-agent-tools/07-guardarrailes-evals-y-control-de-fallos.md) |
| Hallucination | Contenido plausible no soportado por evidencia |
| Hybrid retrieval | Recuperación que fusiona candidatos lexicales y vectoriales antes de construir el contexto. [Explicación](../14-ampliacion-avanzada/08-contexto-largo-y-rag-avanzado.md#hybrid-retrieval-dos-candidatos-una-lista) |
| Head | Subespacio paralelo dentro de atención o salida |
| In-context learning | Adaptación temporal mediante ejemplos en el prompt |
| Inference | Ejecutar pesos congelados para producir una salida |
| KV cache | Claves/valores anteriores conservados durante generación |
| Knowledge graph / Grafo de conocimiento | Grafo de entidades y relaciones con tipos, significado y procedencia, diseñado para consultar conocimiento conectado |
| Latent | Representación interna comprimida |
| Langfuse | Plataforma de observabilidad LLM que relaciona trazas, sesiones, scores, datasets y experimentos |
| Lakehouse | Arquitectura que añade tablas, transacciones, catálogo y gobierno de warehouse sobre almacenamiento de data lake |
| LLM | Gran modelo de lenguaje |
| LoRA | Adaptación mediante matrices pequeñas añadidas |
| LSH/MinHash | Técnicas aproximadas para detectar contenido casi duplicado |
| Loss | Número que resume el error de entrenamiento |
| Least-to-Most | Descomponer un problema en subtareas simples y resolverlas en orden reutilizando resultados anteriores |
| MCP | Protocolo abierto para contexto, recursos y herramientas |
| MLA | Atención que comprime representaciones de claves/valores |
| MoE | Capas con expertos y router de activación parcial |
| Modo plan / Plan Mode | Fase de exploración y propuesta revisable antes de implementar; no equivale a thinking ni concede permisos. [Historia y uso](../06-era-agent-tools/05-evolucion-del-modo-plan.md) |
| MTP | Objetivo que predice varios tokens futuros |
| Multimodal | Procesa o genera más de una modalidad |
| Optimizer | Algoritmo que actualiza pesos con gradientes |
| Open weights | Pesos descargables; no implica sistema completamente abierto |
| Ontología | Vocabulario formal que define conceptos, relaciones y reglas compartidas de un dominio |
| Parámetro/peso | Número aprendido que configura el modelo |
| PEFT | Ajuste eficiente de pocos parámetros |
| PII redaction | Detección y eliminación o sustitución de datos identificativos antes de procesarlos, mostrarlos o persistirlos. No garantiza anonimización. [Explicación](../06-era-agent-tools/07-guardarrailes-evals-y-control-de-fallos.md#pii-redaction-masking-y-pseudonimización) |
| Plugin | Paquete instalable de skills, tools, conectores u otras piezas |
| Policy | Estrategia que elige la próxima acción |
| Property graph | Modelo de nodos y aristas tipadas donde ambos pueden tener propiedades |
| Program of Thoughts (PoT) | Expresar parte del razonamiento como programa para delegar el cálculo a un intérprete |
| Prefill | Procesamiento paralelo del prompt inicial |
| Pretraining | Entrenamiento general a gran escala |
| Prompt | Instrucciones y datos aportados a una ejecución |
| Prompt injection | Contenido no confiable intenta alterar instrucciones |
| RAG | Recuperación de documentos antes de generar |
| Ragas | Biblioteca de métricas y experimentación para evaluar RAG, agentes y otras aplicaciones LLM |
| RDF | Modelo W3C que representa información como triples sujeto–predicado–objeto |
| Reciprocal Rank Fusion | Regla para combinar rankings de recuperadores distintos |
| Reasoning model | Modelo postentrenado para deliberación multietapa |
| ReAct | Bucle intercalado de razonamiento, acción y observación |
| Reranker | Modelo que reordena resultados recuperados |
| Reward hacking | Satisfacer una métrica sin cumplir la intención |
| RL | Aprendizaje por refuerzo a partir de recompensa |
| RLHF/RLAIF | RL con feedback humano/de IA |
| RoPE | Codificación posicional rotatoria |
| Sandbox | Entorno aislado con acceso acotado |
| Schema | Contrato que define tipos, propiedades, relaciones y restricciones permitidas en los datos |
| SPARQL | Lenguaje de consulta para grafos RDF |
| Self-play | Generar experiencia compitiendo con versiones propias |
| Self-Consistency | Muestrear varias rutas de razonamiento y agregar la respuesta que converge; no equivale a verificarla externamente |
| Semantic Kernel | SDK de Microsoft que compone servicios de IA, plugins, function calling y filtros alrededor de un kernel para integrarlos con aplicaciones C#, Python o Java. [Explicación](../06-era-agent-tools/06-frameworks-de-agentes.md#semantic-kernel-integrar-modelos-con-software-empresarial) |
| Sicofancia / Sycophancy | Acuerdo con la postura del usuario sin evidencia suficiente, distinto de amabilidad o corrección justificada. [Explicación](../03-era-chatgpt/05-sicofancia-de-modelos.md) |
| Skill | Workflow reusable con instrucciones y recursos |
| SLM | Modelo de lenguaje pequeño/eficiente, sin umbral universal |
| Sparse autoencoder | Modelo que descompone activaciones en features escasas |
| Softmax | Convierte scores en una distribución normalizada |
| Speculative decoding | Draft propone tokens; target los verifica |
| SFT | Ajuste supervisado con demostraciones |
| System card | Informe de capacidades, riesgos, evals y mitigaciones |
| Tensor | Array multidimensional de números |
| Tensor/Pipeline parallelism | Repartir operaciones de una capa o grupos de capas entre dispositivos |
| Test-time compute | Cómputo extra usado al responder |
| Tree/Graph of Thoughts | Búsqueda sobre varias rutas; el árbol ramifica y retrocede, mientras el grafo también puede fusionar o realimentar ramas. [Explicación](../05-era-thinking/01-de-chain-of-thought-a-reasoning-models.md#tree-of-thoughts-explorar-puntuar-y-retroceder) |
| Token | Unidad discreta que procesa el modelo |
| Tool | Capacidad externa invocable |
| Transformer | Arquitectura basada en atención y bloques feed-forward |
| Uncensored | Etiqueta informal para una variante ajustada para rechazar menos; no garantiza calidad ni ausencia de sesgo |
| VLA/VLM | Modelo visión-lenguaje-acción / visión-lenguaje |
| Vector database | Índice para almacenar/buscar embeddings |
| Worktree | Checkout Git adicional ligado a otra rama |
