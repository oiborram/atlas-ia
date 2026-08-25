# Prompting, loop engineering y graph engineering

> Cómo diseñar sistemas que no solo produzcan una respuesta plausible, sino que acumulen **evidencia de que es correcta**.

Esta unidad es hermana de [Codex a fondo](../12-codex/README.md). Codex explica una herramienta concreta; aquí se estudia el método general que sirve con cualquier LLM, agente u orquestador.

## La idea esencial

Un prompt mejora la primera propuesta. Un **bucle** permite observar, comprobar y corregir. Un **grafo** decide qué pasos pueden ejecutarse, repetirse, bifurcarse o requerir aprobación.

```mermaid
flowchart LR
    P[Prompt<br/>define el contrato] --> C[Candidato]
    C --> V[Verificador externo]
    V -->|evidencia de fallo| R[Reparación]
    R --> V
    V -->|criterios satisfechos| S[Salida]
    V -->|riesgo o ambigüedad| H[Revisión humana]
```

La precisión no sale de pedir «piensa mejor» muchas veces. Sale de combinar:

- una especificación comprobable;
- contexto relevante y fuentes trazables;
- herramientas que devuelven observaciones reales;
- verificadores distintos del generador cuando sea posible;
- límites de coste, iteraciones y permisos;
- evaluaciones sobre casos representativos.

## Índice

1. [Prompting orientado a resultados correctos](01-prompting-para-exactitud.md)
2. [Contexto, fuentes y salidas estructuradas](02-contexto-evidencia-y-estructura.md)
3. [Loop engineering: observar, verificar y reparar](03-loop-engineering.md)
4. [Graph engineering: convertir el proceso en arquitectura](04-graph-engineering.md)
5. [Verificadores, jueces y evals](05-verificacion-jueces-y-evals.md)
6. [Patrones y plantillas reutilizables](06-patrones-y-plantillas.md)
7. [Laboratorio: construir y medir un sistema autocorrectivo](07-laboratorio-loop-verificable.md)

## Ruta rápida por necesidad

| Necesidad | Patrón inicial | Verificación preferida |
|---|---|---|
| Responder con hechos actuales | Recuperar → responder → comprobar citas | Fuente primaria y fecha |
| Modificar código | Reproducir → parchear → probar → revisar diff | Tests, tipos, lint y repro |
| Extraer datos | Prompt + esquema tipado + reintento acotado | Validador de esquema y reglas |
| Resolver lógica o cálculo | Descomponer → calcular → comprobar | Código, solver o invariantes |
| Crear contenido abierto | Variantes → rúbrica → selección → edición | Rúbrica + revisión humana |
| Ejecutar una acción sensible | Proponer → validar política → aprobar → ejecutar | Control determinista + persona |

## Tres niveles que no conviene confundir

| Nivel | Qué controlas | Ejemplo |
|---|---|---|
| Prompt engineering | Una llamada al modelo | Objetivo, contexto, formato y límites |
| Loop engineering | La evolución del estado | Generar, usar tool, verificar, reparar, parar |
| Graph engineering | La topología del sistema | Rutas, paralelismo, gates, subgrafos y recuperación |

Un grafo puede contener bucles; un bucle puede llamar a varios prompts. La frontera útil no es académica: es saber **dónde vive cada garantía**. El modelo propone; el código restringe; la herramienta observa; el evaluador mide; la persona asume las decisiones que no deben automatizarse.

## Regla de oro

> Si no puedes describir cómo sabrás que la respuesta es correcta, todavía no has terminado de diseñar la petición.

Esto no significa que toda tarea tenga una verdad binaria. En tareas creativas, «correcto» puede significar cumplir una rúbrica, respetar la voz de marca y no inventar datos. En tareas factuales o ejecutables, debe significar algo más fuerte: citas que sostienen cada afirmación, tests que pasan, cálculos reproducibles o invariantes satisfechas.

**Última revisión:** 2026-08-25. Las recomendaciones de producto se contrastan con la [guía oficial de prompting de OpenAI](https://learn.chatgpt.com/docs/prompting); los patrones de investigación enlazan sus papers primarios en cada lección.
