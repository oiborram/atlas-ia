# LoRA, destilación, MoE y MTP: hacer más con menos

## LoRA y PEFT

En vez de modificar todos los pesos, **LoRA** aprende pequeñas matrices adicionales. El modelo base queda congelado y el adaptador captura la especialización. Sirve para tono, formato o dominio; no es la herramienta ideal para mantener hechos que cambian a diario, donde RAG suele encajar mejor.

## Destilación

Un modelo “alumno” aprende de salidas o señales de un “profesor”. Reduce coste de inferencia y puede transferir estilo o razonamiento. También transfiere errores, sesgos y cobertura limitada del profesor.

## Mixture of Experts (MoE)

Cada capa contiene varios bloques expertos; un router activa solo algunos por token. Hay muchos parámetros totales, pero menos parámetros activos por paso.

```text
token → router → expertos 2 y 7 → combinación → siguiente capa
```

Mixtral 8x7B, por ejemplo, selecciona dos de ocho expertos por token; el paper distingue 47B parámetros accesibles y 13B activos: [Mixtral of Experts](https://arxiv.org/abs/2401.04088). MoE ahorra cómputo relativo, pero complica balanceo, memoria y comunicación entre dispositivos.

## Multi-Token Prediction (MTP)

El objetivo clásico predice `t+1`. MTP añade cabezas que intentan predecir varios futuros (`t+1`, `t+2`…) desde el mismo tronco. Esto ofrece señal de entrenamiento más densa y candidatos para decodificación especulativa.

```text
estado t ─┬─ head 1 → token t+1
          ├─ head 2 → token t+2
          └─ head 3 → token t+3
```

La investigación de Meta encontró mayor eficiencia muestral y hasta 3× de aceleración en configuraciones concretas de predicción de cuatro tokens; no es una garantía universal. [Paper MTP](https://arxiv.org/abs/2404.19737). DeepSeek-V3 incorporó MTP como objetivo auxiliar junto con MoE y MLA: [informe técnico](https://arxiv.org/abs/2412.19437).

> **No confundir:** entrenar para predecir varios tokens no significa que todos se acepten ciegamente al generar. Normalmente hay verificación o dependencias que limitan la paralelización.

## Tabla de decisión

| Necesidad | Técnica candidata |
|---|---|
| Adaptar comportamiento barato | LoRA/PEFT |
| Servir un alumno más pequeño | Destilación |
| Aumentar capacidad sin activar todo | MoE |
| Señal futura más densa/decodificación | MTP |
| Reducir memoria de pesos ya entrenados | Cuantización |

Profundización: [cómo elegir entre RAG, SFT, LoRA, QLoRA y DPO](../14-ampliacion-avanzada/07-adaptacion-rag-finetuning-lora-dpo.md).
