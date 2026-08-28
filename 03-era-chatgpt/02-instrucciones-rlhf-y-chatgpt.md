# 2022 — De completar texto a seguir instrucciones

Un modelo base competente no sabe qué papel ocupa. Puede imitar al usuario, continuar una lista o inventar. La pieza decisiva para los asistentes fue el **postentrenamiento**.

## Receta simplificada

1. **SFT:** humanos escriben respuestas deseables; el modelo las imita.
2. **Preferencias:** evaluadores comparan varias salidas.
3. **Modelo de recompensa o preferencia:** aprende a puntuar salidas.
4. **Optimización:** se ajusta la política para producir respuestas preferidas.
5. **Evals y mitigaciones:** se comprueba utilidad, seguridad y regresiones.

El trabajo de [InstructGPT](https://arxiv.org/abs/2203.02155) mostró algo crucial: evaluadores humanos prefirieron un modelo de 1,3B ajustado a GPT-3 de 175B en su distribución de prompts. La alineación de comportamiento podía pesar más que el tamaño.

## RLHF, RLAIF y optimización directa

| Familia | Señal principal | Riesgo |
|---|---|---|
| RLHF | Preferencias humanas + RL | Sesgos y coste de etiquetado |
| RLAIF | Crítica/preferencia de otro modelo | Amplificar errores del juez |
| DPO y variantes | Pares preferido/rechazado sin bucle RL completo | Sobreajuste a preferencias |
| RL verificable | Recompensa calculable: tests, respuesta exacta | Hackear el verificador |

## 30 de noviembre de 2022

OpenAI lanzó ChatGPT como *research preview* conversacional, emparentado con InstructGPT. La interfaz fue parte del avance: historial, preguntas de seguimiento y una caja de texto universal redujeron la fricción de usar un modelo. Fuente: [anuncio original de ChatGPT](https://openai.com/index/chatgpt/).

## Alineado no significa verdadero

El postentrenamiento enseña estilos y preferencias. Puede hacer al modelo más útil, pero también más convincente al equivocarse, más complaciente o demasiado reacio. La solución no es una única función de recompensa: hacen falta datos diversos, evaluaciones, herramientas y supervisión.

Un caso importante es la **sicofancia**: adoptar la postura del usuario sin que la evidencia lo justifique. Tiene una [lección propia con historia, ejemplos y evaluación](05-sicofancia-de-modelos.md).
