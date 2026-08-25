# 12. Interpretabilidad: mirar dentro sin confundir mapa y territorio

La interpretabilidad intenta explicar qué representaciones y cálculos producen un comportamiento. No es lo mismo que pedir al modelo una explicación: esa narración también es una salida generada y puede no describir su mecanismo causal.

## Niveles de explicación

| Nivel | Pregunta | Herramienta típica |
|---|---|---|
| Conductual | ¿Cuándo falla? | datasets, contrastes, adversariales |
| Atribución | ¿Qué entrada influyó? | gradientes, saliency, perturbación |
| Representación | ¿Qué información codifica? | probes, similitud, SAE |
| Mecanístico | ¿Qué componentes causan el cálculo? | ablation, patching, circuitos |
| Edición | ¿Se puede cambiar una asociación concreta? | model editing, steering |

Una correlación en una activación no demuestra que el modelo la use. Necesitas intervención.

## Anatomía útil del Transformer

El residual stream acumula contribuciones de atención y MLP. Una lectura mecanística busca:

- heads que copian o enrutan información;
- MLP que detectan/transforman features;
- direcciones en el espacio residual;
- composición entre capas;
- logits que cada componente favorece.

Los nombres «head de nombres» o «neurona de honestidad» son hipótesis, no identidades naturales.

## Probing

Entrena un clasificador simple sobre activaciones para predecir una propiedad. Si funciona, la información es decodificable; no prueba que el modelo la use ni que esté localizada ahí. Controles:

- baseline sobre embeddings/posición;
- etiquetas aleatorias;
- probe de capacidad limitada;
- generalización a distribuciones nuevas;
- intervención posterior.

## Ablation y activation patching

En ablation anulas o sustituyes un componente y observas el cambio. En activation patching:

1. ejecutas un ejemplo limpio;
2. ejecutas uno corrupto;
3. copias una activación limpia a la run corrupta;
4. mides cuánto recupera la respuesta.

Esto localiza rutas causales, pero una ablación fuera de distribución puede crear artefactos. Usa sustituciones por media o controles y compara varias métricas.

## Superposición

Un modelo puede representar más features que dimensiones aprovechando direcciones casi ortogonales. Una neurona responde entonces a conceptos no relacionados: es *polysemantic*. [Toy Models of Superposition](https://arxiv.org/abs/2209.10652) ofrece un modelo simple de este fenómeno.

Consecuencia: inspeccionar neuronas individuales puede ser la resolución equivocada.

## Sparse autoencoders (SAE)

Un SAE aprende a reconstruir activaciones mediante un conjunto mucho mayor de features que se activan de forma escasa:

```text
activación del modelo → encoder SAE → pocas features activas
                      → decoder SAE → reconstrucción
```

[Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html) aplicó esta técnica a un modelo de producción grande y encontró features interpretables. Limitaciones:

- reconstrucción imperfecta;
- features muertas o que se dividen al aumentar diccionario;
- selección subjetiva de ejemplos;
- alto coste;
- interpretar algunas features no implica entender el modelo completo;
- steering de una feature puede tener efectos colaterales.

## Model editing

[ROME](https://arxiv.org/abs/2202.05262) localiza y modifica asociaciones factuales en pesos. Parece una vía para corregir conocimiento sin reentrenar, pero hay cuatro criterios:

- **eficacia:** cambia el hecho objetivo;
- **paráfrasis/generalización:** cambia formulaciones equivalentes;
- **especificidad:** no altera hechos no relacionados;
- **persistencia/compatibilidad:** sobrevive a usos y ediciones posteriores.

Editar «la capital de X» no resuelve dependencias temporales, procedencia ni derecho al borrado. Para conocimiento cambiante, RAG suele ser más gobernable.

## Logit lens y atribución

Proyectar activaciones intermedias al vocabulario muestra qué tokens parecen favorecidos en cada capa. Es intuitivo, pero la representación puede rotar y estar preparada para capas posteriores. Trátalo como visualización exploratoria, no como prueba final.

## Interpretabilidad para ingeniería

Casos donde aporta:

- comparar modelo base y post-entrenado;
- localizar features asociadas a jailbreaks o memorias;
- estudiar por qué una cuantización daña una capacidad;
- investigar dependencia de idioma/posición;
- construir detectores internos experimentales;
- generar hipótesis para evals conductuales.

No reemplaza red-teaming, tests de sistema ni controles de permisos. Un mecanismo entendido puede combinarse de formas inesperadas en otra distribución.

## Protocolo de evidencia

```text
observación → hipótesis → intervención causal → controles
            → replicación en casos/modelos → límites
```

Publica ejemplos negativos y tasa de cobertura. «Encontramos una feature de X» es mucho más débil que «intervenir X cambia de forma específica este comportamiento en esta distribución».

Siguiente: [evaluación estadística](13-evaluacion-estadistica-y-contaminacion.md).
