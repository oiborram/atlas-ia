# 2023–2026 — Modelos chinos de pesos abiertos, *uncensored* y *abliterated*

La IA local no es solo Llama, Mistral o Gemma. Desde 2023, laboratorios chinos han publicado algunas de las familias de pesos abiertos más influyentes para programación, razonamiento, multilingüismo y agentes. Al mismo tiempo, las comunidades locales popularizaron variantes llamadas *uncensored* o *abliterated*. Son fenómenos relacionados por la posibilidad de modificar los pesos, pero no significan lo mismo.

## Primero: pesos abiertos no equivale a código abierto

Un modelo de **pesos abiertos** permite descargar sus parámetros y ejecutarlos fuera del servicio del fabricante. Eso no garantiza que conozcamos sus datos, su receta completa de entrenamiento, todos sus filtros ni que la licencia permita cualquier uso. La [Open Source AI Definition de la OSI](https://opensource.org/ai/open-source-ai-definition) exige además información sobre los datos y el código necesario para estudiar y modificar el sistema.

```text
servicio web/API = modelo + prompt del proveedor + filtros + versión privada + políticas

checkpoint local = pesos descargados + plantilla de chat + runtime + configuración propia
```

Por eso dos productos con el mismo nombre pueden responder de manera diferente. Descargar un checkpoint elimina algunos controles externos del servicio, pero no borra los comportamientos aprendidos durante el preentrenamiento o el postentrenamiento.

## El ecosistema chino de pesos abiertos

No existe un único «modelo chino». Hay empresas, equipos, arquitecturas, licencias y objetivos distintos. Estas familias sirven como mapa del ecosistema, no como un ranking permanente:

| Familia | Organización | Por qué importa para un programador |
|---|---|---|
| **Qwen** | Alibaba | Amplio abanico de tamaños, modelos densos y MoE, multilingüismo, visión, código y uso de herramientas. La serie [Qwen3](https://qwenlm.github.io/blog/qwen3/) consolidó modos *thinking/non-thinking*; el repositorio oficial mantiene los checkpoints posteriores de [Qwen3.6](https://github.com/QwenLM/Qwen3.6). |
| **DeepSeek** | DeepSeek | Popularizó una combinación muy eficiente de MoE, MLA, FP8 y MTP con [DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3), y razonamiento entrenado con RL y destilación con [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1). |
| **GLM** | Z.ai/Zhipu | Familia bilingüe y posteriormente multimodal y agéntica. [GLM-5](https://github.com/zai-org/GLM-5) representa la evolución hacia modelos MoE de escala de centro de datos orientados a código y herramientas. |
| **Kimi** | Moonshot AI | [Kimi K2](https://github.com/MoonshotAI/Kimi-K2) puso el foco en inteligencia agéntica y uso de tools; [Kimi K2.5](https://github.com/MoonshotAI/Kimi-K2.5) añadió capacidades multimodales y checkpoints con cuantización nativa. |
| **MiniMax** | MiniMax | La serie M2 se orientó a programación y workflows agénticos; [MiniMax-M2.7](https://github.com/MiniMax-AI/MiniMax-M2.7) publica pesos y guías para tool calling y serving. |

También existen familias como **Yi**, **Baichuan**, **InternLM** o **Skywork**, además de modelos especializados en visión, audio, OCR y código. Los nombres cambian con rapidez; las preguntas duraderas son qué pesos están disponibles, bajo qué licencia, qué hardware necesitan y cómo rinden en tus casos.

## Por qué supusieron un cambio

El efecto no fue únicamente bajar precios. Estas publicaciones convirtieron técnicas antes asociadas a laboratorios cerrados en componentes inspeccionables y desplegables:

- **MoE a gran escala:** muchos parámetros totales, pero solo una fracción activa por token.
- **Razonamiento abierto:** checkpoints base, modelos de razonamiento y destilados más pequeños que podían estudiarse y adaptarse.
- **Eficiencia como innovación:** FP8, MLA, MTP, atención híbrida y cuantizaciones publicadas junto al modelo.
- **Agentes como objetivo de entrenamiento:** tool calling, código y ejecución multietapa dejan de ser una capa añadida únicamente por la aplicación.
- **Competencia global:** un equipo puede comparar proveedores, ejecutar modelos en su propia infraestructura y conservar una versión fija.

> **Abierto no significa pequeño.** Algunos checkpoints MoE necesitan varios servidores y cientos de GB de memoria aunque activen una porción reducida de sus parámetros. Que los pesos se puedan descargar no implica que quepan en un portátil.

## Censura, alineamiento y sesgo: cuatro capas diferentes

La palabra «censura» suele mezclar mecanismos distintos:

1. **Datos de entrenamiento:** determinan qué hechos, idiomas y perspectivas aprendió el modelo.
2. **Postentrenamiento:** enseña preferencias, estilo, seguridad y respuestas ante temas sensibles.
3. **Prompt y filtros del servicio:** el proveedor puede bloquear entradas o salidas sin modificar los pesos.
4. **Aplicación que lo integra:** añade sus propias reglas, permisos y moderación.

Investigaciones comparativas han encontrado diferencias de rechazo y sesgo político entre idiomas y modelos, pero no justifican asumir que todos los checkpoints chinos se comportan igual. Véase el estudio de PoPETS [*An Analysis of Chinese Censorship Bias in LLMs*](https://petsymposium.org/popets/2025/popets-2025-0122.pdf). Para una evaluación profesional hay que probar el **checkpoint, plantilla, idioma y runtime exactos**, y repetir la prueba después de cualquier actualización.

## Qué significa *uncensored*

**Uncensored** es una etiqueta comunitaria, no una especificación técnica. Normalmente indica que una variante se ha ajustado para rechazar menos peticiones, pero puede proceder de métodos muy diferentes:

| Método posible | Qué cambia |
|---|---|
| Fine-tuning con respuestas sin rechazo | Aprende un estilo más obediente |
| Mezcla o fusión de modelos | Combina comportamientos de varios checkpoints |
| LoRA de «desrestricción» | Añade un adaptador que reduce ciertos rechazos |
| Edición de activaciones o pesos | Interviene directamente en mecanismos internos |
| Solo una plantilla de chat distinta | Puede evitar rechazos inducidos por el formato sin cambiar pesos |

La etiqueta no demuestra que el modelo sea más exacto, neutral, privado o capaz. A veces solo sustituye «no puedo ayudar» por una respuesta incorrecta pero segura de sí misma.

## Qué significa *abliterated*

**Abliteration** —juego de palabras entre *ablation* y *obliteration*— suele referirse a localizar una dirección interna asociada al rechazo y reducir o eliminar su efecto en activaciones o pesos. El trabajo [*Refusal in Language Models Is Mediated by a Single Direction*](https://arxiv.org/abs/2406.11717) mostró en varios modelos que intervenir sobre una dirección del espacio de activaciones podía suprimir rechazos con cambios limitados en otros benchmarks.

Una analogía funcional:

```text
petición → representación interna ─┬─ dirección de contenido
                                  └─ dirección asociada al rechazo

abliteration: debilitar la segunda dirección antes de producir la respuesta
```

Esto no «libera el conocimiento verdadero» escondido dentro del modelo. Modifica un comportamiento aprendido y puede afectar de forma desigual a categorías distintas. Investigación posterior encontró que el rechazo es más complejo que un único interruptor universal: [*There Is More to Refusal in Large Language Models than a Single Direction*](https://arxiv.org/abs/2602.02132).

## Riesgos de eliminar rechazos

Un modelo que nunca dice «no» puede parecer más útil en una demo y ser peor componente de un sistema real:

- puede generar malware, fraude, acoso o instrucciones peligrosas con menos fricción;
- pierde la capacidad útil de rechazar tareas imposibles, ambiguas o sin datos suficientes;
- puede obedecer con más facilidad una *prompt injection* encontrada en una web o documento;
- sigue alucinando: menor rechazo no equivale a mayor conocimiento;
- una modificación comunitaria puede degradar tool calling, razonamiento o formato estructurado;
- su procedencia, dataset de ajuste y cadena de suministro pueden ser difíciles de auditar.

En un agente, el riesgo crece porque una mala respuesta deja de ser texto y puede convertirse en una acción. No conectes un modelo desrestringido directamente a shell, correo, repositorios o sistemas de producción sin permisos mínimos, sandbox, confirmaciones y registro de acciones.

## Usos legítimos

Las variantes con menos rechazo pueden ser útiles para investigación de alineamiento, *red teaming*, escritura de ficción, clasificación de contenido difícil o dominios regulados donde el modelo general sobrerrechaza consultas válidas. El patrón seguro consiste en separar capacidad y política:

```text
modelo flexible
      ↓
validador de entrada → permisos de tools → verificador de salida → aprobación humana
```

La política no debería depender únicamente de que el propio modelo decida autocontrolarse. Los límites importantes deben vivir también en el runtime y en los permisos de cada herramienta.

## Checklist antes de descargar o desplegar

| Pregunta | Por qué importa |
|---|---|
| ¿Es el repositorio oficial o una variante comunitaria? | Reduce suplantación y riesgo de cadena de suministro |
| ¿Pesos, código y licencia permiten el uso previsto? | «Descargable» no implica uso comercial irrestricto |
| ¿Requiere `trust_remote_code` o scripts personalizados? | Puede ejecutar código del repositorio |
| ¿Qué cambió respecto al modelo base? | *Uncensored* sin receta es una caja negra adicional |
| ¿Se evaluó en español y en el dominio real? | Los rechazos y capacidades varían por idioma |
| ¿Mantiene tool calling y formatos estructurados? | Una variante puede degradar justo la capacidad necesaria |
| ¿Qué acciones puede ejecutar? | La seguridad depende más del runtime que del tono del modelo |
| ¿Hay hashes, versión fijada y procedencia documentada? | Permite reproducir y auditar el despliegue |

La decisión correcta no es «alineado o sin censura» en abstracto. Es elegir un checkpoint evaluado para una tarea concreta y rodearlo de controles proporcionales a los datos y acciones que podrá tocar.
