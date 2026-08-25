# Memoria, planificación y fiabilidad de agentes

## Cuatro memorias que suelen confundirse

| Tipo | Ejemplo | Persistencia |
|---|---|---|
| Contexto inmediato | Mensajes y resultados recientes | Una llamada/tarea |
| Resumen | Compresión de pasos anteriores | Hasta que se reemplace |
| Memoria episódica | Qué ocurrió en tareas previas | Almacén externo |
| Memoria semántica | Hechos/documentos recuperables | Base documental/vectorial |

Los pesos no cambian por recordar tu preferencia. Una memoria externa se recupera y vuelve a entrar como contexto.

## Planificar

- **Plan-first:** crea pasos y luego ejecuta. Bueno para dependencias; puede quedar obsoleto.
- **ReAct:** decide tras cada observación. Adaptable; puede deambular.
- **Jerárquico:** un coordinador delega subtareas. Escala; añade comunicación y errores de integración.
- **Workflow determinista + agente:** código fija el esqueleto y el modelo decide solo donde hay ambigüedad. Suele ser el mejor patrón de producción.

## Condiciones de parada

Un agente necesita límites de pasos, tiempo, coste, repetición y acciones. También una salida explícita: `complete`, `needs_approval`, `blocked` o `failed`. “Seguir hasta resolver” sin presupuesto ni verificador puede crear bucles costosos.

## Fiabilidad

```text
éxito total ≈ éxito paso1 × paso2 × ... × pasoN
```

Incluso un 98 % por paso cae a ~67 % tras 20 pasos independientes. La realidad no es independiente, pero la intuición sirve: los horizontes largos exigen checkpoints, reintentos selectivos y verificación.
