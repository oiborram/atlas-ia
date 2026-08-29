# Mapa de cobertura curricular

Este documento hace visibles los huecos y evita que “completo” signifique una lista desordenada.

| Dominio | Nivel funcional | Ampliación | Práctica/caso |
|---|---|---|---|
| Historia AlphaGo → agentes | Eras 01–08 | Cronología | Casos 2023–26 |
| Qué es un modelo | 01/02 | Transformer + training | Lab tokens |
| Datos y entrenamiento | 01/02/03 | Advanced 02/06/10 | Evals A/B |
| Data lake, data warehouse y lakehouse | — | Advanced 06, medallion y arquitectura de datos para IA | Snapshots, corpus RAG, features y evals gobernadas |
| Tokens/embeddings/contexto | 02 | Transformer | Lab 1 |
| RAG, contexto largo y memoria | 03/06 | Advanced 08 | Labs 3/8 |
| Lexical + vector, hybrid retrieval, embeddings y reranking | 03 | Advanced 08, fusión RRF y fallos por etapa | Lab 8, comparación controlada |
| Grafos de conocimiento, ontologías y entity resolution | 03/06 | Advanced 16, property graph y RDF/OWL | GraphRAG y práctica de modelado |
| Neo4j, Memgraph, Neptune y ArangoDB | — | Advanced 16, lenguajes y operación | Consultas Cypher, SPARQL y AQL |
| Graph embeddings y GNN: GCN/GAT/GraphSAGE | — | Advanced 16 | Link prediction con baselines y control de leakage |
| RLHF/alineamiento | 03/05 | Training/safety | Scheming |
| Sicofancia de modelos | 03/05-sicofancia-de-modelos | Advanced 02, señales de preferencia | 13/01, prompts con posturas contrapuestas |
| SLM/local | 04 | Advanced 03/11/15 | Labs 2/6 |
| Cuantización/GGUF | 04 | Inference | Lab 2 |
| FlashAttention/KV | 04 | Transformer/inference | Benchmark |
| Context cache / caché de contexto | 04, motor de inferencia | Advanced 11, identidad y aislamiento | 13/02, medir reutilización y TTFT |
| Compactadores de contexto | 06, memoria de agentes | Advanced 08, pérdida de información | 13/02, relevo validado y evaluación |
| LoRA/MoE/MTP | 04 | Advanced 04/07 | Lab 9 |
| Modelos chinos open weights y variantes uncensored/abliterated | 04 | Advanced 05/12 | Checklist de despliegue |
| Hardware y runtimes de IA local | 04 | Memoria, banda, CPU/GPU/APU | Benchmark y árbol de decisión |
| Zero/One/Few-Shot, CoT, Self-Consistency, Least-to-Most, Tree/Graph/Program of Thoughts | 05/01 | In-context learning, reasoning y búsqueda | 13/01 y 13/04, evals por coste y exactitud |
| Thinking/reasoning models | 05 | Training/search | Evals |
| Tools/agentes | 06 | Safety | Lab 4/5 |
| Frameworks de agentes: LangGraph, CrewAI, AutoGen, Semantic Kernel, Microsoft Agent Framework, OpenAI Agents SDK, Google ADK y alternativas | 06/06-frameworks-de-agentes | Estado, plugins, grafos, persistencia e interoperabilidad | Comparación reproducible en tres implementaciones |
| Guardarraíles, anti-alucinación y control de bucles | 06/07-guardarrailes-evals-y-control-de-fallos | Defensa en profundidad, grounding, permisos y circuit breakers | Evals por capa, bypass, sobrebloqueo y loop verificable |
| Evolución del modo plan | 06/05-evolucion-del-modo-plan | ReAct, Plan-and-Solve y control de ejecución | 12/03 y 13/06, plan revisable |
| MCP/protocolos | 07 | Safety | Codex |
| Multiagente/objetivos | 08 | Systems/safety | Codex Goal |
| Productos y aplicaciones | 09 | — | Lovable/n8n |
| Sociedad/trabajo/Markdown | 03/09 | — | Stack Overflow |
| Multimodalidad | 03 | Advanced 09 | Evals por modalidad |
| Interpretabilidad | — | Advanced 12 | Ablation/patching |
| Entrenamiento distribuido | — | Advanced 10 | Presupuesto de memoria |
| Serving y capacity planning | 04/08 | Advanced 11/15 | Lab 6 |
| Robótica e IA encarnada | 08 | Advanced 14 | Casos VLA |
| Evaluación estadística | 05/13 | Advanced 13 | Lab 7 |
| Seguridad/incidentes | 08/09/11 | Advanced 05/13/14 | Lab 5 |
| Data exfiltration y PII redaction | 06/07-guardarrailes | Advanced 05 y Legal 05/07 | Red team, egress, minimización y eval por categoría |
| Codex actual | 12 | — | Recetas |
| Prompting y context engineering | 05/13 | — | Plantillas + laboratorio 13 |
| Loop/graph engineering | 06/08/13 | Sistemas/safety | Laboratorio 13 |
| Verificación y LLM-as-a-judge | 05/13 | Advanced safety | Evals + laboratorio 13 |
| Ragas, DeepEval y Langfuse | 13/05-verificacion-jueces-y-evals | Métricas, tests, tracing y evaluación online | Dataset → experimento → canary → regresión |
| AI Act y clasificación por riesgo | 15 | Roles, calendario y GPAI | Árboles de decisión |
| RGPD, copyright y secretos | 09/15 | Datos, licencias y transferencias | Casos RAG y chatbot |
| España, empleo y sector público | 15 | AESIA y regulación sectorial | Checklist de RR. HH. |
| Cumplimiento profesional de IA | 15 | Normas UE y panorama mundial | Expediente y controles |
| Panorama de laboratorios y modelos actuales | 16 | Sistemas, apertura y distribución | Tablero fechado |
| Selección y comparación de modelos | 16 | Evals, routing y coste total | Protocolo reproducible |
| Vigilancia de lanzamientos y hype | 16 | Jerarquía de fuentes | Registro de actualización |

## Próximas expansiones razonables

- laboratorios ejecutables empaquetados con una stack local concreta;
- fine-tuning ejecutable con datasets descargables y hardware concreto;
- serving multi-nodo con telemetría real;
- jurisprudencia comentada y seguimiento automatizado de cambios por jurisdicción;
- robótica práctica, que requiere simulador o hardware.

Se consideran expansión porque la versión actual ya entrega el mapa conceptual completo y una ruta práctica; añadirlos exige elegir herramientas, hardware o jurisdicción.
