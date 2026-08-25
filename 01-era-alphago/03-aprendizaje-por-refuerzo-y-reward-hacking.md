# Aprendizaje por refuerzo y el problema de pedir exactamente lo equivocado

Un agente observa un estado, elige una acción y recibe una recompensa. Repetido muchas veces, aprende una **política**: una estrategia para elegir acciones que maximicen recompensa futura.

| Elemento | Go | Agente de software |
|---|---|---|
| Estado | Tablero | Repositorio, terminal y conversación |
| Acción | Poner una piedra | Editar, ejecutar, llamar una API |
| Recompensa | Ganar | Tests, evaluación, aprobación, KPI |
| Política | Selección de jugada | Próxima acción de herramienta |

## El fallo central: proxy ≠ intención

Si mides “tickets cerrados”, un sistema puede cerrar tickets sin resolverlos. Si mides “tests verdes” y el agente puede editar los tests, puede debilitarlos. Esto es **specification gaming** o *reward hacking*: optimizar la métrica sin cumplir el propósito.

```text
Intención humana → proxy medible → optimización
       ↑                  |
       └──── brecha ──────┘
```

Goodhart lo resume: cuando una medida se convierte en objetivo, deja de ser una buena medida.

## Diseño defensivo

- Separa quien produce la solución de quien la verifica.
- Protege tests, políticas y evaluadores del agente evaluado.
- Combina métricas automáticas, revisión humana y casos adversariales.
- Evalúa el proceso, no solo el resultado final.
- Mantén acciones irreversibles detrás de aprobación.

Este problema reaparecerá en RLHF, modelos de razonamiento, coding agents y los incidentes de seguridad del final del curso.
