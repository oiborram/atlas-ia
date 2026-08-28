# Memoria, planificación y fiabilidad de agentes

## Cuatro memorias que suelen confundirse

| Tipo | Ejemplo | Persistencia |
|---|---|---|
| Contexto inmediato | Mensajes y resultados recientes | Una llamada/tarea |
| Resumen | Compresión de pasos anteriores | Hasta que se reemplace |
| Memoria episódica | Qué ocurrió en tareas previas | Almacén externo |
| Memoria semántica | Hechos/documentos recuperables | Base documental/vectorial |

Los pesos no cambian por recordar tu preferencia. Una memoria externa se recupera y vuelve a entrar como contexto.

## Compactadores de contexto

Un **compactador de contexto** (*context compaction*) es el componente que reduce el historial activo para poder continuar una tarea larga. Puede combinar reglas de limpieza con un modelo que redacte un resumen. No necesita ser un modelo especializado ni modifica los pesos del LLM: prepara lo que verá en la siguiente llamada.

La analogía útil es un **relevo entre programadores**: el siguiente turno necesita saber qué se pretende, qué se cambió, qué falló y qué queda pendiente; no leer otra vez cada línea del terminal.

| Estrategia | Qué reduce | Riesgo |
|---|---|---|
| Limpieza de resultados de tools | Logs antiguos, duplicados y salidas voluminosas | Perder evidencia todavía necesaria |
| Resumen del historial | Mensajes antiguos convertidos en una síntesis | Omitir matices o introducir errores |
| Estado estructurado y referencias | Mantiene decisiones, pendientes y rutas a originales | Depender de artefactos inaccesibles o desactualizados |

La compactación se usa para sostener tareas que superan una sola ventana; la síntesis puede perder información, por lo que no equivale a comprimir un ZIP sin pérdidas. Anthropic describe este enfoque junto con limpieza de tools y notas persistentes en su [guía de context engineering de septiembre de 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

**No es caché de contexto:** la caché evita repetir procesamiento; el compactador cambia la información activa. Ninguno garantiza memoria perfecta. Conserva los originales según la política de acceso y retención de la aplicación, distingue hechos de hipótesis y no conviertas un resumen generado en una nueva autorización del usuario.

Práctica: [cómo diseñar y comprobar un relevo de contexto](../13-prompting-loop-graph-engineering/02-contexto-evidencia-y-estructura.md#práctica-caché-y-compactación-en-un-bucle).

## Planificar

- **Plan-first:** crea pasos y luego ejecuta. Bueno para dependencias; puede quedar obsoleto.
- **ReAct:** decide tras cada observación. Adaptable; puede deambular.
- **Jerárquico:** un coordinador delega subtareas. Escala; añade comunicación y errores de integración.
- **Workflow determinista + agente:** código fija el esqueleto y el modelo decide solo donde hay ambigüedad. Suele ser el mejor patrón de producción.

La [evolución del modo plan](05-evolucion-del-modo-plan.md) explica cómo estas ideas pasaron de técnicas de prompting a interfaces que separan explorar, proponer, revisar y ejecutar. Mostrar un checklist mientras se trabaja no equivale a estar en modo plan.

## Condiciones de parada

Un agente necesita límites de pasos, tiempo, coste, repetición y acciones. También una salida explícita: `complete`, `needs_approval`, `blocked` o `failed`. “Seguir hasta resolver” sin presupuesto ni verificador puede crear bucles costosos.

## Fiabilidad

```text
éxito total ≈ éxito paso1 × paso2 × ... × pasoN
```

Incluso un 98 % por paso cae a ~67 % tras 20 pasos independientes. La realidad no es independiente, pero la intuición sirve: los horizontes largos exigen checkpoints, reintentos selectivos y verificación.
