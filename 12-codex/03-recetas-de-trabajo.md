# Recetas para sacar el máximo partido a Codex

## 1. Implementación verificable

```text
Investiga primero el flujo afectado y resume la causa.
Implementa el cambio mínimo compatible con [restricciones].
Añade o actualiza la prueba que habría detectado el fallo.
Ejecuta [comandos]. Revisa el diff por regresiones y cambios no relacionados.
Entrega causa, archivos, evidencia y riesgos restantes.
```

## 2. Diagnóstico sin autorizar cambios

```text
Diagnostica [síntoma]. Puedes inspeccionar archivos y ejecutar comprobaciones
de solo lectura. No cambies código ni configuración. Dame hipótesis ordenadas,
evidencia que confirma/descarta cada una y el arreglo mínimo recomendado.
```

## 3. Rediseño visual con Browser

```text
Audita primero la pantalla en desktop y móvil. Identifica jerarquía, estados,
accesibilidad y problemas de responsive. Implementa solo después del audit.
Verifica visualmente los estados loading/empty/error/success y reduced motion.
```

## 4. Subagentes

Delega investigación o suites independientes. Da a cada subagente una salida concreta y evita que dos editen la misma zona. El agente principal integra y verifica; no copies conclusiones sin evidencia.

## 5. Skill después de la segunda repetición

Cuando un proceso se repita y ya funcione, pide convertirlo en skill con trigger, pasos, inputs, outputs, fallos y verificación. No automatices un proceso que todavía cambia cada vez.

## 6. MCP bajo demanda

Activa el servidor solo para la tarea, limita scopes y desactívalo después si no es habitual. Para datos privados usa el connector/MCP autenticado, no búsqueda web ni memoria.

## 7. Review de agente

Revisa en este orden:

1. ¿Entendió la intención?
2. ¿Cambió solo el alcance pedido?
3. ¿La prueba demuestra comportamiento o solo está verde?
4. ¿Tocó verificadores, permisos o dependencias?
5. ¿Qué no pudo verificar?
6. ¿El cambio es reversible?

## 8. Modo plan antes de implementar

**Revisado el 2026-08-28 con OpenAI Docs.** La aplicación documenta `/plan` para activar o desactivar la planificación multietapa; la CLI también permite una petición como `/plan Propón una migración para este servicio`. No confundas el comando con `/reasoning` ni con activar un objetivo persistente. [Comandos de la app](https://learn.chatgpt.com/docs/reference/slash-commands), [referencia de la CLI](https://learn.chatgpt.com/docs/developer-commands?surface=cli#switch-to-plan-mode-with-plan).

Ejemplo de petición para usar dentro del modo plan:

```text
Investiga cómo funciona [módulo] y propón un plan para [objetivo].
No implementes ni cambies configuración durante esta fase.
Separa hechos inspeccionados, supuestos y decisiones que debo tomar.
Incluye archivos afectados, alternativas, riesgos y pruebas de aceptación.
Señala si mi enfoque contradice los requisitos o la evidencia.
Termina con una propuesta para revisar, no con cambios aplicados.
```

Revisa las decisiones y autoriza después la implementación con alcance explícito. Mantén separados los permisos para desplegar o modificar datos. Si el trabajo será largo, puedes usar el plan revisado para redactar el Goal; la documentación propone ese orden, no identifica ambos modos. [Planificar un Goal](https://learn.chatgpt.com/docs/reference/slash-commands#set-or-manage-a-goal-with-goal).

Comprueba la superficie y versión que utilizas: no atribuyas al modo una garantía de sandbox por su nombre. Historia y límites: [evolución del modo plan](../06-era-agent-tools/05-evolucion-del-modo-plan.md).

## Antipatrones

- “Hazlo perfecto” sin criterios.
- Autorizar full access para evitar una aprobación molesta.
- Añadir reglas puntuales a `AGENTS.md` hasta convertirlo en ruido.
- Instalar muchos MCP “por si acaso”.
- Confiar en que el agente recuerda información de otro task.
- Aceptar el resumen sin revisar diff, pruebas o fuentes.
