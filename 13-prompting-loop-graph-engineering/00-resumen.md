# Resumen de prompt, context, loop y graph engineering

Esta unidad separa cuatro estrategias complementarias para orquestar un agente. **Prompt engineering** diseña el contrato de cada llamada; **context engineering** selecciona evidencia, memoria, herramientas y estado; **loop engineering** convierte una respuesta en un ciclo de acción, observación, verificación y reparación; **graph engineering** gobierna rutas, paralelismo, delegación, aprobaciones y recuperación.

Las cuatro capas se combinan: un grafo contiene bucles, cada vuelta construye un contexto y cada llamada usa un prompt. La unidad incluye verificadores, jueces, pruebas contra la sicofancia y rutas de recuperación; también distingue el caché de contexto de su compactación. Cierra conectando este diseño con runtimes persistentes como OpenClaw, sin asumir que más agentes, más pasos o más infraestructura producen automáticamente una respuesta mejor.
