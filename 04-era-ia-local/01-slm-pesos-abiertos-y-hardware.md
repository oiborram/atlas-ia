# 2022–2024 — SLM, pesos abiertos e IA local

Un **SLM** (*small language model*) no tiene un umbral universal. Significa un modelo lo bastante pequeño y enfocado para menor coste, latencia o ejecución local.

## Por qué la IA local importó

La familia LLaMA mostró en 2023 que modelos menores, bien entrenados, podían competir con modelos mucho mayores en varios benchmarks. El ecosistema de `llama.cpp`, GGUF y cuantizaciones hizo posible ejecutarlos en CPU, Apple Silicon y GPU de consumo. Fuentes: [paper LLaMA](https://ai.meta.com/research/publications/llama-open-and-efficient-foundation-language-models/) y [`llama.cpp`](https://github.com/ggml-org/llama.cpp).

| Ventaja local | Coste local |
|---|---|
| Privacidad y control de datos | Tú gestionas parches y seguridad |
| Coste marginal predecible | Hardware y electricidad |
| Baja latencia sin red | Menor capacidad que la frontera cloud |
| Versiones fijadas | Selección y evaluación del modelo |
| Funciona sin conexión | Contexto limitado por RAM/VRAM |

## Open source vs open weights

| Publicado | ¿Basta para “open source” completo? |
|---|---|
| Pesos | No |
| Código de inferencia | No |
| Arquitectura | No |
| Datos/receta de entrenamiento | Se acerca, depende de licencia y acceso |
| Licencia con restricciones de uso | Puede no cumplir definiciones OSI |

Di **pesos abiertos** cuando solo puedes descargar el modelo.

## Presupuesto de memoria mental

El peso bruto aproximado es:

```text
parámetros × bits por parámetro / 8
```

Un 8B a 4 bits ronda 4 GB solo para pesos, pero necesitas margen para metadatos, buffers, KV cache y runtime. La longitud de contexto puede ser el factor que agote la memoria aunque el archivo quepa.

## Elegir tamaño

No elijas por leaderboard general. Crea 20–100 casos de tu trabajo, mide exactitud, formato, latencia, tokens/segundo, memoria y fallos. Un 7B especializado puede superar a un modelo grande genérico en una tarea estrecha y perder ampliamente al salir de ella.
