# De APIs a convenciones para agentes

MCP no es la única capa de estandarización. El ecosistema empezó a converger también en archivos y protocolos legibles:

| Capa | Ejemplo | Responde a |
|---|---|---|
| Instrucciones de repo | `AGENTS.md` | ¿Cómo se trabaja aquí? |
| Workflow reusable | Skill | ¿Cómo hago esta tarea repetida? |
| Paquete instalable | Plugin | ¿Cómo distribuyo skills + tools + integraciones? |
| Tool/context protocol | MCP | ¿Cómo descubro y llamo capacidades? |
| Agent-to-agent | A2A y similares | ¿Cómo delegan agentes entre sí? |
| API estructurada | JSON Schema/OpenAPI | ¿Qué argumentos acepta una acción? |

## Por qué suelen ser Markdown + metadatos

Markdown es legible para humanos, fácil de versionar y ya forma parte del corpus de desarrollo. YAML/JSON aportan campos parseables. La combinación permite que una instrucción sea revisable en PR y consumible por un agente.

## Evitar la sopa de estándares

No adoptes un protocolo solo por moda. Pregunta:

1. ¿Hay más de un consumidor real?
2. ¿Necesitamos descubrimiento dinámico?
3. ¿Qué autoridad cruza la frontera?
4. ¿Cómo se versiona y revoca?
5. ¿Qué parte sería más simple como CLI o API?

Una CLI bien diseñada puede ser la mejor herramienta para un agente: entrada/salida clara, permisos del sistema y fácil reproducción.
