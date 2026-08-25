# Operar agentes en producción

Un agente no es una función pura. Es un proceso que toma decisiones probabilísticas y actúa sobre estado externo. Necesita observabilidad similar a un sistema distribuido y controles similares a un operador privilegiado.

## Traza mínima

```text
task_id → modelo/versión → contexto hash → decisión → tool call
        → autorización → resultado → coste/latencia → checkpoint → estado final
```

No registres secretos ni cadenas privadas innecesarias. Conserva suficiente evidencia para reproducir acciones y explicar quién autorizó qué.

## Guardrails en capas

| Capa | Control |
|---|---|
| Modelo | entrenamiento de seguridad, clasificación |
| Prompt | límites y política clara |
| Tool schema | tipos y campos restringidos |
| Policy engine | reglas fuera del modelo |
| Identidad | credenciales por agente/tarea |
| Sandbox | filesystem/red/proceso acotados |
| Aprobación | humano para impacto alto |
| Monitor | anomalías, coste, loops |
| Verificación | tests, invariantes, reconciliación |

## Estados, no prosa

Define `pending`, `running`, `waiting_approval`, `blocked`, `complete`, `failed`, `cancelled`. El orquestador debe imponer transiciones y timeouts; no depender de que el LLM “recuerde parar”.

## Kill switch real

Debe estar fuera de las capacidades editables por el agente, revocar credenciales, detener procesos y preservar logs. Un script modificable dentro del mismo workspace no es un control independiente.
