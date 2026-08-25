# Lab 4 — Un agente, una herramienta y límites claros

## Objetivo

Implementar un bucle ReAct mínimo con una tool de solo lectura, por ejemplo consultar una base SQLite de prueba.

## Contrato

```json
{
  "name": "query_sales_summary",
  "description": "Devuelve agregados; no acepta SQL libre",
  "parameters": {
    "type": "object",
    "properties": {
      "month": {"type": "string", "pattern": "^\\d{4}-\\d{2}$"}
    },
    "required": ["month"],
    "additionalProperties": false
  }
}
```

## Límites

- máximo 5 pasos;
- timeout por llamada;
- sin red;
- solo datos sintéticos;
- schema validado fuera del modelo;
- log de argumentos y resultado;
- estado final estructurado.

## Casos

Prueba mes válido, formato inválido, petición fuera de alcance, intento de SQL injection, resultado vacío y fallo de herramienta.

## Pregunta final

¿Necesitabas realmente un agente o bastaba un parser + llamada determinista? Esa respuesta forma parte del laboratorio.
