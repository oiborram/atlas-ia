# 2022–2025 — La era Thinking

## Chain-of-thought (CoT)

En 2022, experimentos mostraron que incluir ejemplos con pasos intermedios mejoraba tareas aritméticas, simbólicas y de sentido común en modelos suficientemente grandes. [Paper CoT](https://arxiv.org/abs/2201.11903).

La explicación funcional: generar pasos crea **tokens de trabajo**. Cada paso se convierte en contexto para el siguiente; el modelo no tiene que saltar directamente del problema a la respuesta.

## “Pensar” tiene tres significados distintos

| Término informal | Mecanismo real |
|---|---|
| “Piensa paso a paso” | Prompt que solicita una traza |
| Reasoning model | Postentrenamiento para usar deliberación de forma productiva |
| Thinking budget | Más cómputo/tokens/ramas durante inferencia |

En septiembre de 2024, OpenAI presentó o1: rendimiento creciente con más RL de entrenamiento y más cómputo durante la respuesta. [Anuncio técnico](https://openai.com/index/learning-to-reason-with-llms/). DeepSeek-R1-Zero mostró en 2025 comportamientos de razonamiento emergentes mediante RL con recompensas verificables, aunque con problemas de legibilidad y mezcla de idiomas; R1 añadió datos iniciales y entrenamiento multietapa. [DeepSeek-R1](https://arxiv.org/abs/2501.12948).

## No es magia introspectiva

Una traza puede contener racionalizaciones o pasos incorrectos. La cadena mostrada al usuario puede ser un resumen y no el proceso interno completo. No uses “explicó su razonamiento” como prueba de fidelidad.

## Cuándo gastar más cómputo

- problemas con respuesta verificable;
- programación con tests;
- planificación con restricciones;
- ciencia/matemática donde se pueden revisar pasos;
- decisiones de alto impacto, siempre con fuentes y experto.

Para redacción simple, clasificación o extracción, un modelo rápido y una buena validación pueden ser mejores.
