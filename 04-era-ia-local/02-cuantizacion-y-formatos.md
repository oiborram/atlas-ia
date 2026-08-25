# Cuantización, precisión y GGUF

## La idea

Los pesos suelen entrenarse con números de 16 o 32 bits. **Cuantizar** los representa con menos bits, agrupando valores cercanos. Es parecido a comprimir una imagen con una paleta menor: ocupa menos, puede acelerarse y pierde cierta fidelidad.

| Precisión | Uso típico | Comentario |
|---|---|---|
| FP32 | Entrenamiento histórico, referencia | Muy pesado |
| BF16/FP16 | Entrenamiento e inferencia moderna | Buen equilibrio en aceleradores |
| FP8/INT8 | Entrenamiento/inferencia optimizada | Requiere soporte adecuado |
| 6/5/4-bit | Inferencia local | Gran reducción con degradación variable |
| 3/2-bit | Restricción extrema | La calidad puede caer mucho |

## Post-training vs quantization-aware

- **PTQ:** cuantiza un modelo ya entrenado; rápido y común.
- **QAT:** simula cuantización durante entrenamiento; más caro, puede conservar mejor calidad.
- **Weight-only:** reduce pesos, activaciones mantienen más precisión.
- **Weights + activations:** mayor ahorro potencial, más sensibilidad.

GPTQ usa información aproximada del error para cuantizar pesos después del entrenamiento. AWQ protege canales de activación importantes. Los K-quants de `llama.cpp` mezclan precisiones según bloques y tensores. [GPTQ](https://arxiv.org/abs/2210.17323) y [documentación de cuantización de llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md).

## GGUF no es un método de cuantización

GGUF es un **formato de archivo** que empaqueta tensores y metadatos para el ecosistema GGML/llama.cpp. Un GGUF puede contener distintas cuantizaciones. `Q4_K_M` describe una receta/tipo; `.gguf` describe el contenedor.

## Regla práctica

Empieza alrededor de 4–6 bits para uso local, pero evalúa tu tarea. Código, idiomas minoritarios, extracción exacta y modelos pequeños pueden ser más sensibles. Nunca compares solo tamaño de archivo: usa la misma versión del modelo, contexto, backend y dataset.
