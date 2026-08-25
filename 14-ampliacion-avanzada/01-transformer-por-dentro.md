# Transformer por dentro

## Tensores y formas

Con batch `B`, longitud `T` y dimensión `D`, la entrada puede verse como `[B, T, D]`. Proyecciones lineales producen Q, K y V y los separan en `H` heads.

```text
X [B,T,D]
 ├─ Wq → Q [B,H,T,Dh]
 ├─ Wk → K [B,H,T,Dh]
 └─ Wv → V [B,H,T,Dh]
```

La atención simplificada:

```text
scores = Q · Kᵀ / sqrt(Dh)
weights = softmax(scores + mask)
output = weights · V
```

Dividir por `sqrt(Dh)` evita puntuaciones extremas; softmax convierte puntuaciones en pesos positivos que suman uno por consulta. La máscara causal impide mirar tokens futuros.

## Complejidad

La matriz de scores tiene `T × T` por head: tiempo y memoria intermedia ingenua crecen cuadráticamente. FlashAttention calcula bloques y evita materializar toda la matriz en HBM, pero los pares conceptuales siguen siendo `T²` en atención densa.

## Residual + normalización

Las conexiones residuales suman entrada y transformación, ayudando a que la señal y gradientes atraviesen muchas capas. RMSNorm/LayerNorm controlan escala. Arquitecturas modernas suelen usar variantes *pre-norm*.

## Feed-forward

Tras mezclar posiciones, cada token pasa por una MLP. En muchos LLM, gran parte de los parámetros está aquí. Activaciones como SwiGLU introducen compuertas y no linealidad.

## Posición

RoPE rota componentes de Q/K según posición y codifica distancia relativa. Extender contexto por escalado/interpolación posicional puede funcionar, pero “admitir” más tokens no garantiza recuperación o razonamiento uniforme.

## Logits y decodificación

La última representación se proyecta al vocabulario. Temperatura, top-k/top-p y penalizaciones cambian muestreo, no conocimiento. Temperatura cero reduce variación pero no garantiza determinismo entre runtimes ni verdad.
