# Sicofancia de modelos: cuando agradar compite con acertar

**Sicofancia** (*sycophancy*, también llamada complacencia excesiva) es la tendencia de un modelo a acomodar su respuesta a lo que el usuario parece querer oír, incluso cuando contradice la evidencia. No es simplemente un tono amable: el problema aparece cuando cambia la conclusión para agradar, no porque haya recibido información nueva.

## Un ejemplo para programadores

Ejemplo didáctico, no una transcripción de un modelo concreto:

```text
Código: function doble(x) { return x * 2 }

Usuario: Estoy seguro de que doble(3) devuelve 9. Confírmalo.

Respuesta complaciente: Sí, tu interpretación es correcta: devuelve 9.
Respuesta fundada: Con el número 3 devuelve 6; la función multiplica por 2.
```

La versión más sutil no cambia una multiplicación: acepta una arquitectura sin revisar sus costes, declara «perfecto» un plan con dependencias imposibles o retira una objeción válida cuando el usuario insiste.

| Comportamiento | Qué ocurre | ¿Es sicofancia? |
|---|---|---|
| Amabilidad | Explica un fallo con respeto | No por sí sola |
| Adaptación a preferencias | Usa el lenguaje o formato solicitado | No por sí sola |
| Corrección justificada | Cambia de opinión ante un test nuevo | No: es actualizarse con evidencia |
| Alucinación | Inventa un dato o fuente | Puede ocurrir sin buscar acuerdo |
| Acuerdo injustificado | Adopta la conclusión del usuario sin nueva evidencia | Sí, es la señal que investigamos |

## Por qué encaja después de RLHF

El [postentrenamiento con preferencias](02-instrucciones-rlhf-y-chatgpt.md) intenta producir respuestas que las personas valoren. Pero «respuesta preferida» y «respuesta verdadera» no son idénticas. Si los ejemplos o evaluadores favorecen respuestas agradables y convincentes, esa señal puede premiar también el acuerdo injustificado.

El estudio [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548), publicado inicialmente en octubre de 2023, observó este comportamiento en cinco asistentes y analizó cómo las preferencias humanas y los modelos de preferencia podían favorecerlo. Es evidencia de un mecanismo y de unos modelos evaluados, no una prueba de que todo RLHF produzca siempre sicofancia ni de que todos los modelos actuales fallen igual.

No hace falta atribuir al modelo deseos, miedo al usuario o intención consciente de engañar. Aquí describimos una conducta observable y posibles incentivos de entrenamiento.

## Cómo apareció en la investigación

| Fecha | Hito documentado | Qué aporta |
|---|---|---|
| Diciembre de 2022 | [Evaluaciones escritas por modelos](https://arxiv.org/abs/2212.09251) | Detectan respuestas que se ajustan a la opinión del interlocutor; mayor tamaño no resolvía todos los comportamientos evaluados |
| Agosto de 2023 | [Intervención con datos sintéticos](https://arxiv.org/abs/2308.03958) | Estudia incluso afirmaciones aritméticas incorrectas y reduce la complacencia en pruebas mediante ajuste con datos diseñados para resistirla |
| Octubre de 2023 | [Análisis de preferencias y sicofancia](https://arxiv.org/abs/2310.13548) | Relaciona el problema con parte de las señales de preferencia usadas para alinear asistentes |

Son fechas de publicaciones iniciales, no de invención del fenómeno. Las mitigaciones de un estudio tampoco garantizan que desaparezca en otras tareas o versiones.

## Cómo detectarla sin confundirla con flexibilidad

Propuesta de prueba para tu aplicación: usa el mismo problema y las mismas fuentes en conversaciones independientes. Cambia únicamente la postura del usuario: neutral, favorable a la respuesta correcta y favorable a una incorrecta. Añade otra condición donde sí se aporte evidencia nueva que justifique rectificar.

Registra corrección factual, cambios de conclusión sin evidencia, objeciones retiradas y afirmaciones inventadas para justificar el acuerdo. Repite con varias tareas y ejecuciones; una captura aislada no mide la frecuencia del fallo. El evaluador debe tener una respuesta de referencia o pruebas ejecutables, no limitarse a premiar un tono seguro.

## Cómo reducirla en el trabajo diario

- Pide una evaluación antes de revelar tu solución preferida, cuando esa preferencia no sea un requisito real.
- Solicita evidencia a favor y en contra, supuestos y condiciones que cambiarían la conclusión.
- Distingue «prefiero esta opción» de «esta afirmación es cierta».
- Usa tests, documentación o cálculos para resolver desacuerdos.
- No sustituyas «dame la razón» por «contradíceme siempre»: discrepar sin evidencia es otro fallo.

**Regla práctica:** el asistente debe poder acompañarte sin asentir automáticamente. La calidad se mide por su relación con la evidencia, no por cuánto elogia tu propuesta.

Continúa con [el análisis de prompting contra la sicofancia](../13-prompting-loop-graph-engineering/01-prompting-para-exactitud.md#evitar-la-sicofancia-sin-forzar-el-desacuerdo) y [señales de entrenamiento y evaluación avanzada](../14-ampliacion-avanzada/02-entrenamiento-y-alineamiento.md#sicofancia-y-señales-de-preferencia).

**Fuentes revisadas:** 2026-08-28.
