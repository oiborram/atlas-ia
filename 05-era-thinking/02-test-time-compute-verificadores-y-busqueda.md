# Test-time compute, verificadores y búsqueda

La escala clásica invierte más al entrenar. **Test-time compute** invierte más para una petición difícil: más pasos, candidatos, búsquedas o revisiones.

## Patrones

| Patrón | Cómo funciona | Riesgo |
|---|---|---|
| Self-consistency | Generar varias rutas y votar | Consenso de errores correlacionados |
| Best-of-N | Generar N y puntuar | El juez puede premiar apariencia |
| Tree/graph search | Expandir y podar estados | Coste explosivo |
| Verificador | Comprobar solución o pasos | Reward hacking del verificador |
| Ejecución | Correr código/tests | Tests incompletos o manipulables |
| Debate/crítica | Modelos revisan modelos | Coste y sesgo compartido |

AlphaGo ya combinaba propuesta, valoración y búsqueda. Los sistemas de razonamiento recuperan el patrón en dominios lingüísticos, pero el “tablero” puede ser ambiguo. La [lección anterior](01-de-chain-of-thought-a-reasoning-models.md) explica cómo se llegó desde ejemplos *Few-Shot* y cadenas lineales hasta árboles, grafos y programas ejecutables.

## Resultado verificable vs juez aprendido

`2 + 2 = 4`, compilar un programa o pasar un test tienen señales relativamente objetivas. La calidad de una estrategia o un texto depende de criterios abiertos. Cuanto más subjetivo el objetivo, más peligroso delegar todo a un juez modelo.

## Regla de producción

Escala el cómputo con el valor y dificultad, pero escala también la verificación. No tiene sentido pagar diez trayectorias si el selector final no distingue una respuesta correcta de una convincente.
