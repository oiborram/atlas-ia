# Evals, benchmarks y la frontera irregular

Una **eval** convierte una expectativa en casos y una forma de puntuar. Un benchmark público es una eval compartida; puede orientar, pero se contamina, satura o aleja del producto.

## Pirámide de evaluación

```text
          Producción: calidad, incidentes, coste
       Pruebas end-to-end con herramientas reales
    Casos de negocio y regresión propios
  Benchmarks de dominio
Benchmarks generales
```

## Métricas importantes

| Tipo | Ejemplos |
|---|---|
| Calidad | exactitud, pass@k, preferencia, groundedness |
| Agente | éxito de tarea, pasos, recuperaciones, intervención humana |
| Sistema | latencia, coste, tokens, memoria, disponibilidad |
| Seguridad | prompt injection, fuga, abuso de herramientas, sobre-rechazo |

## Frontera irregular

El [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/2026-report-executive-summary) resume una paradoja: sistemas excelentes en matemática, código o ciencia todavía fallan al contar objetos, razonar físicamente o recuperarse de errores básicos. El [AI Index 2026](https://hai.stanford.edu/ai-index) da un ejemplo gráfico: nivel oro en la IMO mientras el mejor modelo acertaba relojes analógicos solo alrededor de la mitad.

No extrapoles una capacidad: “resuelve olimpiadas” no implica “maneja bien mi calendario”.

## Dataset mínimo propio

Guarda para cada caso: entrada, contexto, resultado esperado, criterios, riesgos, versión de modelo/prompt/herramientas y evidencia obtenida. Ejecuta regresiones al cambiar cualquier pieza.

Profundización: [intervalos, bootstrap, calibración, slices y contaminación](../14-ampliacion-avanzada/13-evaluacion-estadistica-y-contaminacion.md).
