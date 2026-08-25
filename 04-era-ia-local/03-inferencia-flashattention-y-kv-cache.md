# El motor de inferencia: KV cache, FlashAttention y rendimiento

## Dos fases por petición

| Fase | Qué hace | Suele limitarla |
|---|---|---|
| Prefill | Procesa todo el prompt en paralelo | Cómputo y ancho de banda |
| Decode | Genera tokens uno a uno | Movimiento de memoria y latencia |

## KV cache

En cada token nuevo, la atención necesita claves y valores de tokens anteriores. Recalcularlos sería desperdicio; la **KV cache** los conserva. Acelera generación, pero crece con capas, longitud, batch y precisión.

> **No confundir:** cuantizar pesos reduce el archivo/modelo; cuantizar KV cache reduce memoria de contexto. Son decisiones separadas.

## FlashAttention

La atención convencional escribe grandes matrices intermedias en memoria HBM. FlashAttention reorganiza el cálculo en bloques para reutilizar la SRAM rápida del chip y reducir lecturas/escrituras, manteniendo atención exacta. Es una optimización **IO-aware**: cambia cómo se calcula, no lo que matemáticamente se calcula. El paper informó mejoras sustanciales y habilitó contextos mayores: [Dao et al., 2022](https://arxiv.org/abs/2205.14135).

Analogía: no reduces los datos de la consulta; cambias el plan de ejecución para que no viaje repetidamente al almacenamiento lento.

## Otras palancas

| Técnica | Idea | Trade-off |
|---|---|---|
| Batching continuo | Mezclar peticiones activas | Throughput vs latencia individual |
| Paged attention | Gestionar KV como páginas | Runtime más complejo |
| Speculative decoding | Modelo pequeño propone; grande verifica | Depende de aceptación |
| MQA/GQA | Compartir K/V entre heads | Menor KV con posible coste de calidad |
| Offload CPU/GPU | Dividir capas o tensores | Funciona con poca VRAM, más tráfico |
| Kernel fusion | Unir operaciones | Dependencia de hardware/backend |

## Métricas que no debes mezclar

- **TTFT:** tiempo hasta el primer token.
- **Tokens/s:** velocidad después del primer token.
- **Throughput:** tokens o peticiones totales por segundo.
- **P50/P95/P99:** distribución de latencia.
- **Memoria pico:** no solo tamaño estable.

Optimizar una puede empeorar otra.

Profundización: [serving, PagedAttention, continuous batching y capacity planning](../14-ampliacion-avanzada/11-serving-produccion-y-capacidad.md).
