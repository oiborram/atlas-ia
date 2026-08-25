# ChatGPT, Stack Overflow y por qué Markdown ganó otra vez

## “ChatGPT mató Stack Overflow”

Es un titular útil pero incompleto.

La actividad de Stack Overflow ya descendía antes de ChatGPT. Su lanzamiento aceleró el desplazamiento: estudios causales estimaron una caída de actividad posterior y un estudio publicado en 2026 calculó una reducción media de preguntas del 14,09 %, que alcanzaba el 27,88 % en mayo de 2023. A la vez, trabajos más recientes encontraron contribuciones menos numerosas pero preguntas y respuestas más largas o difíciles. Fuentes: [Scientific Reports, 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11074245/), [Information Systems Research, 2026](https://pubsonline.informs.org/doi/abs/10.1287/isre.2023.0561) y [“Stack Overflow Is Not Dead Yet”](https://arxiv.org/abs/2509.05879).

```text
Antes: problema → buscar → abrir 8 pestañas → adaptar respuesta
Ahora: problema + contexto → diálogo → propuesta personalizada → verificar
```

El cambio real es **latencia de conocimiento**: el asistente sintetiza y adapta inmediatamente. El coste es perder señales comunitarias como votos, debate, autoría y correcciones públicas. Si menos humanos publican conocimiento abierto, los futuros sistemas también pierden datos frescos.

La encuesta 2025 de Stack Overflow mostraba la tensión: más desarrolladores desconfiaban de la precisión de la IA (46 %) que los que confiaban (33 %). [Datos de la encuesta](https://survey.stackoverflow.co/2025/ai).

## Markdown: no nació para la IA

Markdown fue creado en 2004 para que un documento estructurado siguiera siendo legible como texto plano. CommonMark apareció para resolver ambigüedades entre implementaciones; GitHub Flavored Markdown añadió tablas, tareas y otras extensiones. Fuentes: [especificación GFM](https://github.github.com/gfm/) y [CommonMark](https://github.com/commonmark/commonmark-spec).

## Por qué encaja tan bien con modelos y agentes

- Es texto plano: tokenizable, versionable y fácil de producir.
- Expresa jerarquía con pocos símbolos.
- Separa código con cercas claras.
- Funciona en README, issues, documentación y chat.
- Se puede transformar a HTML, PDF o AST.
- Los repositorios públicos contienen enormes cantidades de ejemplos.

No existe una “estandarización de Markdown por la IA”. La IA heredó un formato ya dominante en comunidades de programadores y lo reforzó. El resultado moderno son archivos como `README.md`, `AGENTS.md`, skills y prompts durables.

## Regla práctica para documentos de agentes

Usa títulos descriptivos, listas cortas, código cercado con lenguaje, tablas solo para comparaciones y enlaces relativos. Evita depender de HTML específico o de un dialecto sin declararlo.
