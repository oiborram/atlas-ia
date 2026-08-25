# Lab 2 — Benchmark de cuantización

## Objetivo

Comparar el mismo modelo en varias precisiones sin confundir tamaño con calidad.

## Fija antes de medir

- modelo y revisión;
- prompt/template;
- contexto y seed si aplica;
- backend y versión;
- hardware y temperatura;
- 20+ casos de tu dominio.

## Matriz

| Variante | Archivo | RAM/VRAM pico | TTFT | tokens/s | calidad | errores de formato |
|---|---:|---:|---:|---:|---:|---:|
| FP16/BF16 | | | | | | |
| Q8 | | | | | | |
| Q6/Q5 | | | | | | |
| Q4 | | | | | | |

Incluye extracción exacta, código, español, contexto largo y al menos un caso adversarial.

## Criterio

Elige la variante más pequeña que supera tu umbral, no la más rápida de una demo. Registra también consumo en reposo y si KV cache cambia con el contexto.
