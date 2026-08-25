# Laboratorios

Los laboratorios están diseñados para aprender por contraste. No fijan una herramienta concreta cuando el concepto puede probarse con varias.

| Lab | Resultado | Coste/riesgo |
|---|---|---|
| [1. Anatomía de tokens](01-tokens-y-embeddings.md) | Ver cómo el texto cambia de representación | Bajo |
| [2. Benchmark de cuantización](02-benchmark-de-cuantizacion.md) | Medir calidad/velocidad/memoria local | Bajo |
| [3. RAG pequeño pero evaluado](03-rag-con-evaluacion.md) | Buscador con citas y dataset de regresión | Bajo |
| [4. Agente con una tool](04-agente-con-una-tool.md) | Bucle controlado y logs | Medio, usar sandbox |
| [5. Eval adversarial](05-eval-de-prompt-injection.md) | Medir inyección indirecta | Solo entorno aislado |
| [6. Presupuesto de memoria y serving](06-presupuesto-de-memoria-y-serving.md) | Predecir y medir VRAM, contexto y latencia | Bajo/medio |
| [7. Eval estadística A/B](07-eval-estadistica-a-b.md) | Comparar sistemas con intervalos y slices | Bajo |
| [8. RAG híbrido y reranking](08-rag-hibrido-y-reranking.md) | Aislar retrieval, reranking y generación | Bajo/medio |
| [9. RAG frente a fine-tuning](09-rag-vs-finetuning.md) | Elegir adaptación con evidencia | Medio; GPU local opcional |

## Contrato de laboratorio

Cada experimento debe registrar versiones, hardware, datos, parámetros, resultado y limitaciones. Nunca uses credenciales de producción ni datos privados reales.
