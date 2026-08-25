# Sistemas de inferencia

## Memoria aproximada

```text
memoria total ≈ pesos + KV cache + activaciones/buffers + runtime + fragmentación
```

En decode con batch alto, el ancho de banda de memoria domina: para cada token se recorren pesos. Por eso reducir bits y agrupar peticiones puede elevar throughput.

## KV cache en detalle

Crece aproximadamente con capas × tokens × batch × cabezas KV × dimensión × bytes. GQA/MQA reducen cabezas K/V. Paged attention asigna bloques no contiguos y disminuye fragmentación, facilitando batching continuo.

## Prefill/decode y scheduling

Prefill es paralelizable pero puede bloquear decodes interactivos. Servidores modernos separan o priorizan fases, trocean prefills largos y agrupan secuencias activas.

## Speculative decoding

Un draft barato propone varios tokens; el target calcula en paralelo si los acepta según su distribución. Si coinciden mucho, se reducen pasos secuenciales sin cambiar la distribución objetivo. Si la aceptación es baja, el overhead puede anular la mejora.

## Cuantización de sistema

Evalúa por tensor y kernel. Un formato de 4 bits puede ser más lento que 8 bits si el hardware debe dequantizar sin kernels eficientes. Tamaño teórico, memoria real y velocidad son métricas distintas.

## Contexto largo

Combina límites de arquitectura, posición, KV, atención y calidad de recuperación. Técnicas: sliding window, atención dispersa, compresión, memoria recurrente y retrieval externo. Ninguna convierte contexto en memoria perfecta.
