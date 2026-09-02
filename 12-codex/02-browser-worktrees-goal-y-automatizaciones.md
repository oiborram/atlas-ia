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

## Resets manuales que puede regalar OpenAI

Codex aplica límites de uso que se renuevan según sus propias ventanas. Además, OpenAI puede conceder ocasionalmente a una cuenta uno o más **créditos gratuitos de reset manual**. Un crédito de este tipo permite reiniciar el límite de Codex antes de que termine la ventana normal. No es una prestación garantizada para todos los planes, no aparece con una periodicidad prometida y puede tener fecha de caducidad.

No debe confundirse con:

- borrar el contexto de un chat;
- cambiar de modelo;
- esperar al reinicio normal de una ventana;
- comprar créditos o saldo para la API de OpenAI;
- aumentar de forma permanente los límites del plan.

### Cómo comprobarlo y activarlo

1. Consulta el panel de uso de Codex o pregunta al agente cuánto uso queda y si la cuenta tiene algún reset disponible.
2. Revisa la cantidad, el tipo y, cuando se muestre, la fecha de caducidad. La ausencia de un crédito significa que no hay nada que activar, no que exista un error.
3. Da una orden explícita, por ejemplo: **«Usa uno de mis resets manuales de Codex ahora»**. Consultar el estado no consume el crédito; activarlo sí requiere esa autorización directa.
4. Comprueba el resultado. Sólo debe darse por aplicado cuando Codex confirme que se realizó un nuevo reset. También puede responder que el crédito ya se canjeó, que no queda ninguno o que en ese momento no hay uso que reiniciar.

El agente no puede inventar, comprar ni transferir estos créditos, ni aplicarlos a otra cuenta. Tampoco debe consumirlos como parte de una automatización o por iniciativa propia: son un recurso manual y su activación necesita una decisión consciente del usuario. La documentación pública de OpenAI todavía no describe este beneficio ocasional con el mismo detalle que la interfaz; por eso conviene tomar la disponibilidad que muestra la cuenta como fuente de verdad y no asumir que seguirá existiendo sin cambios. Los [límites de uso de ChatGPT](https://learn.chatgpt.com/es-419/docs/enterprise/usage-limits) dependen además del plan y no equivalen a los límites de la API.

## Scheduled tasks / automations

Codex permite **crear tareas automatizadas** desde la app de escritorio o desde ChatGPT en la web. Se describen en lenguaje natural indicando qué debe hacerse y cuándo; después aparecen en la vista **Scheduled**, donde pueden revisarse sus ejecuciones, pausarse, editarse o eliminarse. La interfaz de gestión no está disponible en Codex CLI ni en la extensión IDE. [Documentación oficial de Scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app).

Hay dos formas de continuidad:

| Tipo | Úsalo cuando | Contexto |
|---|---|---|
| Tarea programada independiente | Cada ejecución debe empezar desde el prompt guardado y producir un resultado nuevo | Proyecto y entorno configurados para esa tarea |
| Tarea programada dentro de un chat | Quieres que Codex vuelva a la misma conversación y continúe con su contexto | Historial y estado del chat existente |

En la app de escritorio, una tarea puede trabajar con un proyecto local y ejecutarse en su directorio o en un worktree aislado. El ordenador debe permanecer encendido y la aplicación en ejecución cuando necesite archivos locales. En web puede usar archivos subidos, skills, plugins y servicios conectados, pero no conserva acceso directo a una carpeta local.

### Cómo crear una tarea útil

Primero prueba el prompt como una tarea normal. Cuando el resultado sea estable, pide a Codex algo como:

```text
Cada lunes a las 09:00, revisa las dependencias de este proyecto.
Usa avisos oficiales, no modifiques archivos y devuelve solo:
- vulnerabilidades nuevas;
- versión afectada y versión corregida;
- evidencia enlazada;
- acción recomendada.
Si no hay cambios, indica «sin novedades».
```

La definición debe contener:

- frecuencia o evento de inicio;
- proyecto y fuentes permitidas;
- salida esperada y criterio para notificar;
- permisos y acciones expresamente prohibidas;
- condición de parada o de escalado;
- comportamiento ante fallos, datos ausentes o equipo desconectado.

**Goal no es una automatización.** Goal mantiene un objetivo largo y permite que una tarea continúe trabajando hasta cumplir una definición de terminado. Scheduled task decide *cuándo volver a ejecutar* un prompt. Puedes combinarlos sólo si necesitas ambas propiedades, pero una ejecución larga no debe hacerse periódica por defecto.

Programa únicamente workflows ya probados manualmente. En repos Git, un worktree ayuda a aislar cambios, pero no sustituye permisos, revisión ni límites. Usa el mínimo acceso: una tarea desatendida con capacidad de escribir, publicar o enviar mensajes tiene un radio de impacto mayor.
