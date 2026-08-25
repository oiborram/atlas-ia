# Ampliación avanzada

Esta segunda capa abre la caja negra sin convertir la ruta principal en un curso de matemáticas. Requiere comodidad con arrays multidimensionales, complejidad algorítmica y sistemas.

| Documento | Profundiza en |
|---|---|
| [1. Transformer por dentro](01-transformer-por-dentro.md) | Q/K/V, softmax, residuals, posiciones |
| [2. Entrenamiento y alineamiento](02-entrenamiento-y-alineamiento.md) | loss, gradientes, optimización, SFT/RL |
| [3. Sistemas de inferencia](03-sistemas-de-inferencia.md) | memoria, KV, batching, speculative decoding |
| [4. Arquitecturas y técnicas](04-arquitecturas-y-tecnicas.md) | MoE, MQA/GQA, RoPE, Mamba, multimodal |
| [5. Seguridad y evaluación](05-seguridad-y-evaluacion.md) | threat models, evals, control y evidencia |
| [6. Datos y curación](06-datos-tokenizacion-y-curacion.md) | procedencia, filtros, deduplicación, tokenización y mezclas |
| [7. Adaptación de modelos](07-adaptacion-rag-finetuning-lora-dpo.md) | RAG vs SFT, LoRA, QLoRA, RLHF y DPO |
| [8. Contexto largo y RAG avanzado](08-contexto-largo-y-rag-avanzado.md) | chunking, híbrido, reranking, contexto efectivo y eval por capas |
| [9. Multimodalidad](09-multimodal-imagen-audio-video.md) | CLIP, VLM, difusión, audio y vídeo |
| [10. Entrenamiento distribuido](10-entrenamiento-distribuido.md) | DP, ZeRO/FSDP, tensor/pipeline, precisión y checkpoints |
| [11. Serving y capacidad](11-serving-produccion-y-capacidad.md) | prefill/decode, PagedAttention, batching, cache y SLO |
| [12. Interpretabilidad](12-interpretabilidad-y-edicion.md) | probing, patching, superposición, SAE y model editing |
| [13. Evaluación estadística](13-evaluacion-estadistica-y-contaminacion.md) | intervalos, bootstrap, calibración, slices y contaminación |
| [14. Robótica e IA encarnada](14-robotica-e-ia-encarnada.md) | grounding, VLA, sim-to-real, control y seguridad física |
| [15. Hardware, energía y economía](15-hardware-energia-y-economia.md) | memory wall, roofline, TCO, energía y compra vs API |

## Rutas sugeridas

- **Entrenar:** 2 → 6 → 7 → 10 → 13.
- **Construir RAG:** 7 → 8 → 11 → 13.
- **Operar modelos locales:** 3 → 11 → 15.
- **Entender la frontera:** 4 → 9 → 12 → 14.
- **Gobernar un sistema:** 5 → 13 → 15.

Regla: vuelve siempre del mecanismo a una decisión de ingeniería. Saber la fórmula sin saber cuándo falla no es dominio práctico.
