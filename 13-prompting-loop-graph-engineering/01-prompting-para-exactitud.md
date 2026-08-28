# 1. Prompting orientado a resultados correctos

## Un prompt es un contrato, no un conjuro

Un LLM completa texto condicionado por el contexto. No interpreta «hazlo perfecto» como una prueba formal. Lo que sí ayuda es convertir la intención en un contrato que el resultado pueda satisfacer o incumplir.

```text
Objetivo: qué resultado debe existir al terminar.
Contexto: qué información cambia la respuesta y cuál manda si hay conflicto.
Restricciones: qué no debe cambiar, inventar o ejecutar.
Salida: formato, audiencia, extensión y estructura.
Criterios: comprobaciones observables de terminado.
Incertidumbre: qué hacer cuando faltan datos o hay contradicciones.
```

La documentación actual de OpenAI lo resume como **Goal, Context, Output y Boundaries**, y recomienda pedir una comprobación final en trabajos importantes. No es obligatorio rellenar siempre las seis partes: un prompt corto puede bastar para una tarea corta. [Prompting oficial](https://learn.chatgpt.com/docs/prompting).

## De petición vaga a especificación verificable

| Vago | Verificable |
|---|---|
| «Investiga esta librería» | «Compara las versiones soportadas hoy usando documentación oficial; devuelve una tabla y fecha cada dato cambiante» |
| «Arregla el bug» | «Reproduce estos cinco pasos, conserva la API pública, añade una prueba de regresión y vuelve a ejecutar el repro» |
| «Resume el PDF» | «Extrae tesis, método, límites declarados y tres cifras; indica página y separa texto del autor de tu inferencia» |
| «Dame la mejor arquitectura» | «Propón tres opciones bajo estas cargas y presupuesto; explicita supuestos, riesgos y criterio de descarte» |

La diferencia principal no es la longitud. Es que la segunda columna define **evidencia esperada**.

## La plantilla mínima: O-C-R-V

Para uso cotidiano basta con cuatro bloques:

```text
OUTCOME
Quiero decidir si debemos migrar el servicio X a Y.

CONTEXT
Usa estos requisitos, métricas y documentación oficial. Si dos fuentes
se contradicen, prioriza la más reciente y señala el conflicto.

RESTRICTIONS
No supongas cifras ausentes. No modifiques nada. Distingue hechos,
estimaciones e inferencias.

VERIFICATION
Entrega una matriz requisito → evidencia → conclusión. Antes de terminar,
comprueba que cada recomendación tenga al menos una evidencia enlazada.
```

## Instrucciones que suelen mejorar la exactitud

### 1. Define autoridad y actualidad

«Usa fuentes» es insuficiente. Di qué tipo de fuente cuenta y la fecha de corte:

```text
Para comportamiento de la API, usa documentación oficial y repositorio del
proveedor. Usa blogs de terceros solo para encontrar pistas, no como autoridad.
Verifica cualquier dato que pueda haber cambiado desde 2025.
```

### 2. Pide separación epistémica

Una respuesta es más auditable si etiqueta lo que sabe:

```text
Separa:
- Hecho: afirmación directamente sostenida por una fuente o medición.
- Inferencia: conclusión derivada; explica de qué evidencia sale.
- Supuesto: dato no comprobado que condiciona la respuesta.
- Desconocido: información necesaria que no se pudo obtener.
```

### 3. Define una política de abstención

No pidas seguridad teatral. Da una salida útil para la incertidumbre:

```text
Si la evidencia no basta, responde «no determinado» y enumera qué prueba
resolvería la duda. No completes huecos con una estimación silenciosa.
```

### 4. Exige criterios de aceptación

Para código, un criterio ejecutable es más fuerte que «revisa bien»:

```text
Terminado significa:
- el fallo se reproduce antes y deja de reproducirse después;
- pasa la prueba de regresión;
- pasan tipos y lint en los archivos afectados;
- el diff no cambia la API pública.
```

### 5. Usa ejemplos cuando definen una frontera

Los ejemplos *few-shot* son útiles si enseñan una taxonomía, formato o caso límite. Incluye positivos y negativos:

```text
Entrada: «Cancelado por el usuario» → categoría: user_cancelled
Entrada: «Timeout al cobrar» → categoría: payment_timeout
No clasifiques «sin stock» como payment_timeout aunque el pedido no termine.
```

No añadas decenas de ejemplos por costumbre. Las instrucciones redundantes, herramientas irrelevantes y ejemplos obsoletos consumen atención; la guía de modelos de OpenAI recomienda prompts y toolsets más austeros, medidos con evals propios. [Model guidance](https://developers.openai.com/api/docs/guides/latest-model).

## ¿Pedir razonamiento paso a paso?

La investigación de [Chain-of-Thought](https://arxiv.org/abs/2201.11903) mostró mejoras en determinadas tareas de razonamiento al producir pasos intermedios. Pero una explicación extensa no demuestra verdad: el modelo puede construir una justificación coherente para una conclusión falsa.

En producto suele ser mejor pedir **artefactos verificables** que una transcripción exhaustiva del pensamiento:

- ecuaciones, código o consultas ejecutables;
- lista de supuestos;
- citas asociadas a afirmaciones;
- plan breve y resultado de cada comprobación;
- contraejemplo que invalidaría la respuesta.

Para modelos de razonamiento modernos, describe bien el objetivo y deja espacio para resolverlo. No micromanejes una cadena mental que no puedes validar.

## Evitar la sicofancia sin forzar el desacuerdo

La [sicofancia de modelos](../03-era-chatgpt/05-sicofancia-de-modelos.md) puede convertir una revisión en una justificación de lo que ya queríamos hacer. Propuesta de prompt para separar opinión y evidencia:

```text
Mi propuesta es una hipótesis, no una conclusión que debas defender.
Evalúa requisitos, evidencia y alternativas con los mismos criterios.
Separa preferencias de hechos. Indica qué prueba cambiaría tu conclusión.
Si estoy equivocado, explica por qué; si estoy en lo cierto, no inventes objeciones.
No declares correcto un plan ni una implementación sin las verificaciones acordadas.
```

Esto es una ayuda de diseño, no una garantía. Para probarla, crea tres versiones del mismo caso: pregunta neutral, usuario que afirma la respuesta correcta y usuario que afirma una incorrecta. Mantén igual la evidencia y evalúa por separado corrección y cambios injustificados. Añade un cuarto caso con evidencia nueva válida: el modelo también debe saber rectificar.

No premies automáticamente una respuesta más crítica. El objetivo es independencia respecto a la presión del interlocutor, no llevarle la contraria por sistema.

## Anti-patrones frecuentes

| Anti-patrón | Por qué falla | Sustitución |
|---|---|---|
| «Eres el mayor experto del mundo» | Cambia el tono, no crea evidencia | Define fuentes y pruebas |
| Repetir «muy importante» | Añade ruido y conflictos | Una restricción clara, una vez |
| «No alucines» | No especifica qué hacer ante un hueco | Política de abstención |
| Pedir certeza porcentual libre | El número puede no estar calibrado | Nivel de evidencia + prueba faltante |
| Formato gigante para una tarea simple | Oculta lo importante | Mínimo contrato suficiente |
| Hacer que el modelo genere y apruebe sin feedback | Comparte los mismos puntos ciegos | Verificador externo o independiente |

## Escalera de esfuerzo

No toda consulta necesita un sistema de agentes:

1. Prompt directo.
2. Prompt con contexto, restricciones y comprobación final.
3. Recuperación o herramienta externa.
4. Generación + verificador + reparación.
5. Varias candidatas + selección.
6. Grafo con gates y aprobación humana.

Sube un peldaño cuando el error sea costoso o la medición muestre un fallo; no porque la arquitectura suene más avanzada.

Siguiente: [contexto, fuentes y salidas estructuradas](02-contexto-evidencia-y-estructura.md).
