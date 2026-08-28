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
| Chain-of-thought | Tokens/pasos intermedios para resolver una tarea |
| Checkpoint | Snapshot de pesos o estado de trabajo |
| Compactador de contexto / Context compaction | Reduce historial activo mediante limpieza, resúmenes o estado estructurado; puede perder información. [Explicación](../06-era-agent-tools/02-memoria-planificacion-y-fiabilidad.md#compactadores-de-contexto) |
| Computer Use | Control por percepción visual y acciones de interfaz |
| Connector | Integración autenticada con un servicio externo |
| Context cache / Caché de contexto / Prompt caching | Reutiliza el procesamiento de entradas compartidas; no resume ni amplía la ventana. [Explicación](../04-era-ia-local/03-inferencia-flashattention-y-kv-cache.md#context-cache-caché-de-contexto-entre-peticiones) |
| Context window | Máximo de tokens disponibles en una ejecución |
| Continuous batching | Incorporar y retirar secuencias entre pasos de decode |
| Context engineering | Selección y estructura de todo lo que ve el modelo |
| Cuantización | Representar pesos/activaciones con menos bits |
| Decode | Fase autoregresiva que genera tokens |
| Dense model | Activa prácticamente todos sus parámetros por token |
| Destilación | Entrenar un alumno con señales de un modelo profesor |
| Diffusion | Generación mediante reversión gradual de ruido |
| DPO | Ajuste directo con pares preferido/rechazado |
| Embedding | Vector que representa token, texto u otro objeto |
| Epoch | Pasada por un conjunto de entrenamiento |
| Eval | Prueba con casos, criterios y métrica |
| Fine-tuning | Entrenamiento adicional sobre un modelo existente |
| FSDP/ZeRO | Particionado de pesos, gradientes y estados entre dispositivos |
| FlashAttention | Algoritmo exacto de atención que reduce IO de memoria |
| Foundation model | Modelo general reutilizable para muchas tareas |
| Frontier model | Modelo cercano al máximo de capacidad disponible en su fecha |
| Function calling | Salida estructurada que solicita una función al runtime |
| GQA/MQA | Atención que comparte claves/valores entre heads |
| GGUF | Formato de archivo de tensores y metadatos del ecosistema GGML |
| Goal mode | Objetivo durable con progreso a largo plazo |
| Grounding | Anclar respuesta en evidencia o entorno |
| Guardrail | Control que limita o detecta conducta no deseada |
| Hallucination | Contenido plausible no soportado por evidencia |
| Head | Subespacio paralelo dentro de atención o salida |
| In-context learning | Adaptación temporal mediante ejemplos en el prompt |
| Inference | Ejecutar pesos congelados para producir una salida |
| KV cache | Claves/valores anteriores conservados durante generación |
| Latent | Representación interna comprimida |
| LLM | Gran modelo de lenguaje |
| LoRA | Adaptación mediante matrices pequeñas añadidas |
| LSH/MinHash | Técnicas aproximadas para detectar contenido casi duplicado |
| Loss | Número que resume el error de entrenamiento |
| MCP | Protocolo abierto para contexto, recursos y herramientas |
| MLA | Atención que comprime representaciones de claves/valores |
| MoE | Capas con expertos y router de activación parcial |
| Modo plan / Plan Mode | Fase de exploración y propuesta revisable antes de implementar; no equivale a thinking ni concede permisos. [Historia y uso](../06-era-agent-tools/05-evolucion-del-modo-plan.md) |
| MTP | Objetivo que predice varios tokens futuros |
| Multimodal | Procesa o genera más de una modalidad |
| Optimizer | Algoritmo que actualiza pesos con gradientes |
| Open weights | Pesos descargables; no implica sistema completamente abierto |
| Parámetro/peso | Número aprendido que configura el modelo |
| PEFT | Ajuste eficiente de pocos parámetros |
| Plugin | Paquete instalable de skills, tools, conectores u otras piezas |
| Policy | Estrategia que elige la próxima acción |
| Prefill | Procesamiento paralelo del prompt inicial |
| Pretraining | Entrenamiento general a gran escala |
| Prompt | Instrucciones y datos aportados a una ejecución |
| Prompt injection | Contenido no confiable intenta alterar instrucciones |
| RAG | Recuperación de documentos antes de generar |
| Reciprocal Rank Fusion | Regla para combinar rankings de recuperadores distintos |
| Reasoning model | Modelo postentrenado para deliberación multietapa |
| ReAct | Bucle intercalado de razonamiento, acción y observación |
| Reranker | Modelo que reordena resultados recuperados |
| Reward hacking | Satisfacer una métrica sin cumplir la intención |
| RL | Aprendizaje por refuerzo a partir de recompensa |
| RLHF/RLAIF | RL con feedback humano/de IA |
| RoPE | Codificación posicional rotatoria |
| Sandbox | Entorno aislado con acceso acotado |
| Self-play | Generar experiencia compitiendo con versiones propias |
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
| Token | Unidad discreta que procesa el modelo |
| Tool | Capacidad externa invocable |
| Transformer | Arquitectura basada en atención y bloques feed-forward |
| Uncensored | Etiqueta informal para una variante ajustada para rechazar menos; no garantiza calidad ni ausencia de sesgo |
| VLA/VLM | Modelo visión-lenguaje-acción / visión-lenguaje |
| Vector database | Índice para almacenar/buscar embeddings |
| Worktree | Checkout Git adicional ligado a otra rama |
