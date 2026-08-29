# n8n, Lovable y el cambio de interfaz del software

## n8n: workflow determinista + nodos inteligentes

n8n representa procesos como un grafo de nodos. Antes de los LLM ya servía para automatizar APIs; los agentes añadieron decisiones sobre datos no estructurados. Su valor no es “que la IA haga todo”, sino mezclar:

- pasos deterministas para transformar, enrutar y guardar;
- un modelo para clasificar, extraer o decidir;
- herramientas con credenciales acotadas;
- historial de ejecución y reintentos.

La propia guía de n8n distingue workflow tradicional, AI-enhanced y agentic: [guía de workflows agénticos](https://blog.n8n.io/ai-agentic-workflows/).

## n8n como capa de automatización LLMOps y AgentOps

n8n también puede coordinar partes del ciclo operativo: refrescar un índice RAG, disparar evals al cambiar un prompt, comparar un candidato con el baseline, pedir aprobación, promover una versión mediante API y alertar ante una regresión. Su documentación incorpora workflows de evaluación y entornos apoyados en Git.

Eso no lo convierte en un sistema LLMOps completo. El registro de versiones, los datasets, las trazas, las políticas y los gates deben seguir teniendo contratos claros y fuentes de verdad durables. El canvas coordina; no demuestra por sí solo reproducibilidad, calidad ni autorización.

La ampliación [MLOps, LLMOps y AgentOps: operar IA sin depender de la suerte](../14-ampliacion-avanzada/17-mlops-llmops-y-automatizacion-con-n8n.md) desarrolla el ciclo completo, compara Airflow, Argo, Kubeflow, SageMaker, Azure ML, MLflow y LlamaIndex, y explica los límites de n8n en producción.

## Lovable: del código al resultado conversacional

GPT Engineer nació como proyecto open source de terminal en 2023. Su versión web evolucionó y se renombró Lovable a finales de 2024, llevando conversación, prototipado, edición visual, backend y despliegue a usuarios menos técnicos. [Historia oficial](https://lovable.dev/gpt-engineer).

## “Vibe coding”

Describe construir guiando por lenguaje natural y juzgando resultados, con poca inspección línea a línea. Es excelente para prototipos, exploración UI y herramientas desechables. Se vuelve peligroso cuando el software toca dinero, identidad, seguridad, migraciones o datos personales.

| Vibe coding sano | Vibe coding temerario |
|---|---|
| Prototipo con datos falsos | Producción con secretos reales |
| Git y versiones reversibles | Edición directa sin historial |
| Tests y preview aislada | “Se ve bien” como única prueba |
| Entender arquitectura antes de escalar | Acumular código no comprendido |

La nueva habilidad del programador es subir de nivel: especificar, diseñar límites, dar contexto, evaluar y revisar consecuencias.
