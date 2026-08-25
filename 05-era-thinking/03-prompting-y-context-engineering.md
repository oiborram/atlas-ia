# Prompting y context engineering

Un prompt no “programa” pesos; configura una ejecución. Trátalo como especificación, no como conjuro.

## Prompt robusto

```markdown
## Objetivo
Qué resultado observable debe existir.

## Contexto
Archivos, datos y estado relevante.

## Restricciones
Qué no cambiar, seguridad, compatibilidad.

## Criterios de aceptación
Pruebas que debe superar.

## Entrega
Formato, audiencia y nivel de detalle.
```

## Context engineering

Es diseñar todo lo que el modelo ve:

- instrucciones del sistema y usuario;
- ejemplos;
- documentos recuperados;
- inventario y esquemas de herramientas;
- historial y resúmenes;
- estado del entorno;
- resultados de acciones previas.

## Orden de prioridad práctico

1. Objetivo inequívoco.
2. Evidencia y archivos correctos.
3. Criterios de terminado verificables.
4. Permisos y límites.
5. Ejemplos cuando el formato sea difícil.
6. Estilo.

## Fallos comunes

- Prompt larguísimo que mezcla reglas permanentes y petición puntual.
- Pedir “lo mejor” sin métrica.
- Ocultar el caso límite en prosa irrelevante.
- Inyectar toda la base documental “por si acaso”.
- Confiar en frases como “no alucines” en lugar de exigir fuentes/abstención.
- Pedir cadena de pensamiento privada en vez de respuesta verificable y breve justificación.

Continúa con la unidad aplicada de [prompting, loop engineering y graph engineering](../13-prompting-loop-graph-engineering/README.md), donde esta especificación se convierte en bucles con evidencia, gates y evals.
