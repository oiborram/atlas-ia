# Codex a fondo: guía práctica actual

**Última revisión:** 2026-08-25.  
**Fuente principal:** documentación oficial de OpenAI; la disponibilidad depende de plan, plataforma, región, rollout y políticas del workspace.

## Primero, una aclaración de nombres

**Cowork** es el nombre de una experiencia de Anthropic/Claude. En el ecosistema actual de OpenAI, la superficie comparable para trabajo de conocimiento es **ChatGPT Work**; **Codex** es la experiencia orientada a construir, comprender, probar y revisar software. Ambos conviven en la app de escritorio de ChatGPT. [Mapa oficial de superficies](https://learn.chatgpt.com/).

## El sistema mental correcto

| Necesidad | Superficie de Codex/ChatGPT |
|---|---|
| Conversar o explorar | Chat |
| Crear entregables de conocimiento | ChatGPT Work |
| Trabajar con repos y terminal | Codex local/CLI/IDE/app |
| Trabajo aislado paralelo | Worktree o cloud environment |
| Repetir un método | Skill |
| Conectar datos/acciones | Plugin, connector o MCP |
| Convención durable de repo | `AGENTS.md` |
| Objetivo de horas/días | Goal mode |
| Repetición temporal | Scheduled task / automation |
| Ver y depurar UI | Browser + Computer Use/CDP |

## Bucle de alto rendimiento

```mermaid
flowchart LR
    O[Outcome] --> C[Contexto]
    C --> K[Constraints]
    K --> D[Definition of done]
    D --> E[Ejecución]
    E --> T[Tests y evidencia]
    T --> R[Review del diff/resultado]
    R -->|falla| E
    R -->|pasa| F[Entrega]
```

Un buen prompt de Codex contiene objetivo, contexto, restricciones y verificación. OpenAI recomienda tratarlo como un compañero configurable: contexto correcto, `AGENTS.md` para orientación durable, MCP para sistemas externos, skills para flujos repetidos y automatizaciones solo cuando el flujo ya sea estable. [Best practices oficiales](https://learn.chatgpt.com/guides/best-practices).

## Índice

1. [Skills, MCP, plugins y AGENTS.md](01-skills-mcp-plugins-y-agents.md)
2. [Browser, Worktrees, Goal y automatizaciones](02-browser-worktrees-goal-y-automatizaciones.md)
3. [Recetas para sacar el máximo partido](03-recetas-de-trabajo.md)

## Sección hermana: de usar Codex a diseñar el proceso

Para mejorar la corrección de cualquier sistema —no solo Codex— continúa con [Prompting, loop engineering y graph engineering](../13-prompting-loop-graph-engineering/README.md). Allí se separan generación, observación, verificación, reparación y aprobación mediante estados y métricas explícitas.

## Regla de seguridad

Dar un Goal no amplía permisos. Instalar un plugin no aprueba todas sus acciones. Conectar una cuenta no convierte sus datos en instrucciones confiables. Conserva mínimo privilegio y revisa operaciones con impacto real.
