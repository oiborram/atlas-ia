# La evolución del modo plan: de proponer pasos a revisar antes de ejecutar

El **modo plan** (*Plan Mode*) separa el diseño de una intervención de su ejecución. El agente investiga lo que existe, aclara decisiones importantes y entrega una propuesta revisable antes de implementar. El cambio relevante para un programador no es que aparezca una lista numerada, sino poder corregir el rumbo antes de que se modifiquen muchos archivos.

## Una evolución, no una invención aislada

Los antecedentes de [AlphaGo](../01-era-alphago/01-alphago-el-punto-de-partida.md) ya muestran que evaluar alternativas y actuar son trabajos distintos. Eso no convierte su búsqueda sobre Go en el modo plan de un editor: son sistemas diferentes. La cronología siguiente reúne hitos documentados, sin atribuir a un producto la invención de toda la planificación con IA.

| Fecha | Hito | Qué cambió |
|---|---|---|
| Enero de 2022 | [Chain-of-Thought](https://arxiv.org/abs/2201.11903) | Los pasos intermedios ayudan en ciertas tareas; todavía no constituyen un control de ejecución |
| Octubre de 2022 | [ReAct](https://arxiv.org/abs/2210.03629) | Intercala razonamiento, acciones y observaciones para ajustar lo que se hace |
| Mayo de 2023 | [Plan-and-Solve](https://arxiv.org/abs/2305.04091) | Propone dividir el problema en subtareas y resolverlas siguiendo el plan; es una técnica de prompting, no una interfaz con permisos |
| 7 de octubre de 2025 | [Plan Mode de Cursor](https://cursor.com/blog/plan-mode) | Integra investigación del repositorio, aclaraciones y un plan editable con referencias a archivos |
| 21 de noviembre de 2025 | [Cursor 2.1](https://cursor.com/changelog/2-1) | Mejora la interacción para responder preguntas durante la planificación |
| Estado verificado en agosto de 2026 | [Codex: `/plan`](https://learn.chatgpt.com/docs/reference/slash-commands) y [Claude Code: planificar antes de editar](https://code.claude.com/docs/en/common-workflows#plan-before-editing) | La planificación existe como modo explícito del producto; esta fecha es de comprobación, no de su lanzamiento inicial |

## Por qué supuso un cambio en la forma de trabajar

Nuestra lectura de esta evolución es que desplazó parte del trabajo humano desde corregir un resultado ya construido hacia revisar decisiones antes de construirlo. Cursor describe planes que se pueden editar; Claude Code documenta explorar y proponer sin editar hasta la aprobación. Son ejemplos de cómo la interfaz vuelve revisable una fase que antes podía quedar mezclada con la implementación. [Cursor](https://cursor.com/blog/plan-mode), [Claude Code](https://code.claude.com/docs/en/common-workflows#plan-before-editing).

Antes: «añade autenticación» podía iniciar inmediatamente cambios sobre una interpretación incompleta. Con una fase de plan: primero se revisan el sistema existente, alternativas, alcance, compatibilidad, pruebas y decisiones pendientes. El plan permite detectar un supuesto erróneo antes de invertir en él.

Esto puede ahorrar retrabajo, pero añade tiempo inicial. No hay un multiplicador universal de productividad: importa el tiempo total hasta una solución correcta, incluida la revisión humana.

## Plan, thinking, checklist y Goal no son lo mismo

| Concepto | Función | Lo que no garantiza |
|---|---|---|
| Thinking / reasoning | Cómputo de razonamiento para resolver | Que exista una fase de revisión humana |
| Checklist del agente | Registrar pasos y progreso | Que se haya detenido la ejecución |
| Modo plan | Separar exploración y propuesta de implementación | Aislamiento técnico idéntico en todos los productos |
| Plan-and-execute | Organizar planificación y ejecución, incluso automáticamente | Aprobación humana entre fases |
| Goal | Mantener un objetivo a lo largo del tiempo | Un plan correcto ni permisos adicionales |

La documentación de OpenAI distingue `/plan`, `/reasoning` y `/goal`, y propone planificar un objetivo antes de activarlo cuando necesita definición. [Comandos de la aplicación](https://learn.chatgpt.com/docs/reference/slash-commands).

## Qué debe contener un plan útil

Propuesta de contrato mínimo para una migración:

```text
Objetivo: migrar la validación sin cambiar respuestas de la API.
Evidencia inicial: rutas, tests y contratos realmente inspeccionados.
Decisiones pendientes: compatibilidad, errores y dependencias permitidas.
Pasos: prueba de comportamiento → adaptación → integración → regresión.
Verificación: comandos y casos que demostrarán compatibilidad.
Límites: no cambiar datos ni desplegar durante la planificación.
Revisión: volver al plan si aparece una incompatibilidad no prevista.
```

Un plan que dice «implementar, probar, terminar» aporta poca información. Uno que menciona archivos inexistentes sólo parece concreto. Pide referencias comprobables y separa decisiones del usuario de suposiciones del modelo.

## Límites y errores frecuentes

- **Sobreplanificar:** una corrección trivial quizá sólo necesite un repro, un parche y una prueba.
- **Plan obsoleto:** si un test o una dependencia contradice lo previsto, hay que revisarlo.
- **Aprobación ambigua:** aceptar el enfoque no autoriza cualquier borrado, publicación o acceso posterior.
- **Falsa seguridad:** el nombre del modo no sustituye sandbox, permisos de herramientas ni controles externos.
- **Plan complaciente:** puede racionalizar la arquitectura favorita del usuario. Aplica las pruebas contra la [sicofancia](../03-era-chatgpt/05-sicofancia-de-modelos.md).

Para evaluar si compensa, compara tareas similares con y sin fase de plan. Mide tiempo total, cambios descartados, regresiones, preguntas útiles y cumplimiento del alcance; no sólo cantidad de código ni longitud del plan.

Aplicación práctica: [modo plan en Codex](../12-codex/03-recetas-de-trabajo.md#8-modo-plan-antes-de-implementar) y [plantilla de planificación con revisión](../13-prompting-loop-graph-engineering/06-patrones-y-plantillas.md#i-planificación-con-revisión-antes-de-ejecutar).

**Fuentes y comportamiento de producto revisados:** 2026-08-28.
