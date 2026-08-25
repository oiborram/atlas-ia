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

## Antipatrones

- “Hazlo perfecto” sin criterios.
- Autorizar full access para evitar una aprobación molesta.
- Añadir reglas puntuales a `AGENTS.md` hasta convertirlo en ruido.
- Instalar muchos MCP “por si acaso”.
- Confiar en que el agente recuerda información de otro task.
- Aceptar el resumen sin revisar diff, pruebas o fuentes.
