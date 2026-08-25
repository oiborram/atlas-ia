# Laboratorio 9: decidir entre RAG y fine-tuning

## Objetivo

Comparar cuatro maneras de especializar un modelo en un dominio:

1. prompt;
2. RAG;
3. LoRA/QLoRA;
4. LoRA + RAG.

El laboratorio no exige entrenar un modelo grande. Usa uno pequeño y un dominio acotado.

## Diseño

Separa el dataset en capacidades:

| Slice | Qué mide |
|---|---|
| Hechos de dominio | conocimiento recuperable |
| Hechos actualizados | facilidad de actualización |
| Formato/estilo | conducta repetitiva |
| Uso de evidencia | citar e ignorar distractores |
| Fuera de dominio | regresión/olvido |
| Sin evidencia | abstención |

No pongas las respuestas del test en el corpus de SFT.

## Baselines

### Prompt

Instrucción y pocos ejemplos, sin documentos externos.

### RAG

Mismo modelo base, retrieval evaluado y citas.

### Adaptador

Entrena sobre conducta/formato y, de forma deliberada, algunos hechos estables. Registra base, tokenizer, template, rank, alpha, módulos, LR, épocas y seed.

### Híbrido

Adaptador que aprende a usar/ignorar documentos, con el mismo índice RAG.

## Eval

| Métrica | Prompt | RAG | LoRA | Híbrido |
|---|---:|---:|---:|---:|
| Hechos correctos | | | | |
| Actualización sin reentrenar | | | | |
| Formato válido | | | | |
| Citas soportadas | | | | |
| Abstención | | | | |
| Regresión general | | | | |
| Latencia/coste | | | | |

Después de medir, cambia cinco hechos del corpus y repite sin reentrenar. Esta prueba hace visible la diferencia entre memoria paramétrica y no paramétrica.

## Controles

- prueba de duplicación train–test;
- modelo base evaluado con la misma chat template;
- igual presupuesto de output;
- retrieval medido independientemente;
- adaptador cargado sobre la revisión exacta;
- muestra manual de respuestas sintéticas de train;
- rollback al base.

## Preguntas finales

- ¿Qué mejora viene de conducta y cuál de conocimiento?
- ¿El adaptador memoriza o generaliza el formato?
- ¿RAG falla por retrieval o por uso del contexto?
- ¿El híbrido justifica complejidad y coste?
- ¿Qué mecanismo permite borrar o actualizar un dato?

## Entrega

Matriz de decisión, configuración reproducible, eval retenida, análisis de regresiones y recomendación por tipo de requisito; no una respuesta universal.

Profundización: [adaptación y fine-tuning](../14-ampliacion-avanzada/07-adaptacion-rag-finetuning-lora-dpo.md).
