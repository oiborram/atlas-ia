# Lab 1 — Tokens y embeddings sin matemáticas

## Objetivo

Observar que caracteres, tokens y significado no son equivalentes.

## Pruebas

1. Tokeniza la misma frase en español, inglés y un lenguaje poco representado.
2. Añade espacios, emojis, un UUID y un bloque de código.
3. Compara tokens totales y fragmentos.
4. Genera embeddings para pares: sinónimos, homónimos y negaciones.
5. Busca vecinos por similitud y anota falsos positivos.

## Dataset sugerido

```csv
id,text,expected_group
1,El banco aprobó el préstamo,finance
2,La entidad concedió crédito,finance
3,Nos sentamos en el banco del parque,furniture
4,El banco no aprobó el préstamo,negated_finance
```

## Preguntas

- ¿La negación queda demasiado cerca de la afirmación?
- ¿Los identificadores exactos sobreviven a búsqueda semántica?
- ¿Qué idioma consume más contexto?

## Entrega

Una tabla con tokenizer/modelo, tokens por caso y top-3 vecinos. Concluye cuándo añadirías búsqueda léxica.
