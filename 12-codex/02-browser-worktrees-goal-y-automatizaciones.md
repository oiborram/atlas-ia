# Browser, Worktrees, Goal y automatizaciones

## Navegador integrado

El Browser de la app de escritorio mantiene un perfil separado del navegador habitual, permite previsualizar apps, anotar elementos y, con Computer Use, abrir, hacer clic, escribir, capturar y verificar. Para usar la sesión normal de Chrome existe la extensión. No está disponible como navegador integrado en CLI o extensión IDE. [Documentación de Browser](https://learn.chatgpt.com/docs/browser).

Para frontend:

```text
Arranca la app, abre http://localhost:3000/settings con @Browser,
reproduce el overflow a 390 px, corrige solo el layout afectado,
vuelve a verificar visualmente y adjunta evidencia.
```

Developer mode puede dar acceso controlado a CDP para DOM, consola, red y performance. Requiere aprobación y puede exponer internals sensibles.

## Local vs Worktree vs Cloud

| Entorno | Usa cuando | Riesgo |
|---|---|---|
| Local | Quieres editar tu checkout actual | Colisión con tus cambios |
| Worktree | Tarea paralela o programada | Después hay que integrar/limpiar |
| Cloud | Trabajo alojado y reproducible | Contexto/credenciales distintos |

Dos tareas que escriben el mismo checkout son una carrera. Usa worktrees para ramas aisladas. [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees).

## Goal mode

`/goal` convierte el texto en primer prompt y criterio de completado para trabajo que puede durar horas o días. Debe incluir:

- **Outcome:** artefacto observable.
- **Constraints:** límites, compatibilidad y autoridad.
- **Verification:** pruebas y métricas.

Puedes pausar, reanudar, editar y dirigir el objetivo. Si aún no está claro, usa `/plan` para convertir la idea en un Goal medible. Goal no cambia sandbox ni aprobaciones. [Long-running work](https://learn.chatgpt.com/docs/long-running-work) y [Goal mode](https://learn.chatgpt.com/docs/prompting#goal-mode).

Ejemplo:

```text
/goal Migra el proyecto a TypeScript estricto conservando comportamiento.
No introduzcas `any` explícitos ni nuevas dependencias de runtime.
Termina cuando compile, pase la suite completa y el diff final no contenga
archivos generados ni cambios no relacionados.
```

## Scheduled tasks / automations

Programa solo un workflow ya probado manualmente. Las tareas web usan contexto subido/conectado; las tareas locales necesitan equipo y app disponibles. En repos Git, un worktree aísla cambios programados.

Incluye frecuencia, fuente, criterio para reportar, condición de parada y qué hacer ante fallo. Usa el mínimo acceso: una tarea desatendida con acceso completo tiene un radio de impacto mayor. [Automations](https://learn.chatgpt.com/docs/automations).
