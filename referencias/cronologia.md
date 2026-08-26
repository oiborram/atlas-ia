# Cronología razonada 2016–2026

No todos los lanzamientos son invenciones. La columna “qué cambió” separa hito técnico, producto e infraestructura.

| Fecha | Hito | Qué cambió |
|---:|---|---|
| ene. 2016 | Paper AlphaGo | Política + valor + búsqueda + self-play |
| mar. 2016 | AlphaGo 4–1 Lee Sedol | La capacidad se vuelve acontecimiento público |
| jun. 2017 | Transformer | Atención paralelizable sustituye recurrencia central |
| oct. 2017 | AlphaGo Zero | Aprendizaje desde reglas y self-play, sin partidas humanas |
| 2018 | GPT y BERT | Pretraining Transformer generalizable |
| feb. 2019 | GPT-2 | Generación coherente a escala y debate de publicación |
| ene.–may. 2020 | Scaling laws y GPT-3 | Escalado y few-shot como estrategia |
| may. 2020 | RAG | Memoria paramétrica + recuperación externa |
| 2020–2021 | Difusión y CLIP | Generación visual + espacio compartido imagen–texto |
| 2020 | AlphaFold2 | Aprendizaje profundo transforma predicción estructural |
| 2021 | GitHub Copilot preview | IA generativa entra en el editor |
| 2021 | LoRA | Adaptación eficiente sin actualizar todos los pesos |
| ene.–mar. 2022 | CoT e InstructGPT | Pasos intermedios + preferencias humanas |
| mar. 2022 | Chinchilla | Datos y parámetros deben escalar conjuntamente |
| may. 2022 | FlashAttention | Atención exacta consciente de jerarquía de memoria |
| 2022 | Difusión / Stable Diffusion | Generación visual masiva y local |
| 30 nov. 2022 | ChatGPT | Conversación convierte el modelo en interfaz universal |
| oct. 2022–2023 | ReAct y Toolformer | Razonar/actuar y aprender uso de tools |
| feb. 2023 | LLaMA | Modelos menores y pesos accesibles aceleran ecosistema local |
| jun. 2023 | Function calling | Tool call estructurado se vuelve primitive de API |
| 2023 | QLoRA, DPO, LLaVA y RT-2 | Adaptación 4-bit, preferencias directas y modelos VLM/VLA |
| sep. 2023 | PagedAttention/vLLM | La gestión paginada de KV transforma el serving |
| 2023 | `llama.cpp`, GGUF, GPT Engineer | IA local y generación de aplicaciones |
| 2023–2024 | LoRA, GPTQ/AWQ, MoE popular | Adaptación y serving eficientes |
| ene. 2024 | Mixtral | MoE abierto populariza parámetros activos vs totales |
| abr. 2024 | Investigación MTP | Predicción de varios futuros como señal y acelerador |
| jun. 2024 | Dirección de rechazo y *abliteration* | La interpretabilidad permite editar mecanismos de rechazo en pesos abiertos |
| sep. 2024 | OpenAI o1 | Test-time compute y “thinking” como producto |
| oct. 2024 | Computer Use | Modelo actúa por interfaces visuales |
| 25 nov. 2024 | MCP | Protocolo abierto de herramientas/contexto |
| dic. 2024 | DeepSeek-V3 | MoE + MLA + MTP + entrenamiento FP8 eficiente |
| ene. 2025 | DeepSeek-R1 | RL de razonamiento y destilados abiertos |
| 2025–2026 | Qwen, DeepSeek, GLM, Kimi y MiniMax | El ecosistema chino de pesos abiertos compite en razonamiento, código, multimodalidad y agentes |
| 2025 | Coding agents asíncronos | Issue → entorno → cambio → test → PR |
| 2025 | Agentes físicos VLA | Visión/lenguaje empiezan a gobernar acciones robot |
| dic. 2025 | MCP a Linux Foundation/AAIF | Gobernanza más neutral del estándar |
| ene. 2026 | Cowork y Moltbook | Trabajo agéntico de escritorio y red agente–agente |
| feb.–may. 2026 | Modelos oro IMO, Co-Scientist | Razonamiento y ciencia multiagente |
| may. 2026 | Goal mode estable en Codex | Objetivos durables de horas/días |
| jul. 2026 | Escape de eval y brecha HF | Capacidad ciber cruza un sandbox defectuoso a producción |
| jul.–ago. 2026 | Incidente AISI | Agentes usan identidades falsas e ingeniería social real |
| jul. 2026 | Gemini Robotics 2 | Control corporal y colaboración multi-robot |
| jul. 2026 | GPT‑5.6 y Kimi K3 | Familias frontier cerradas y pesos multimodales agénticos a gran escala |
| ago. 2026 | Qwen3.8, Grok 4.6 y GLM‑5.3 | Código, multimodalidad y agentes de larga duración intensifican la competencia |

## Fotografía del 26 de agosto de 2026

Los modelos de esta última fila no forman por sí mismos una nueva era: representan una competencia acelerada entre sistemas completos. OpenAI, Anthropic, Google DeepMind y xAI combinan modelos cerrados con productos y plataformas; Moonshot, Alibaba, DeepSeek y MiniMax empujan los pesos abiertos; Z.ai anunció los pesos de GLM‑5.3, todavía pendientes en esta fecha; Meta y Mistral combinan estrategias de acceso, especialización y distribución. El detalle y su metodología de actualización están en [Panorama actual](../16-panorama-actual/00-resumen.md).

## Eras de este curso

Las fechas se solapan porque una técnica nace como paper, madura como implementación y después cambia productos. MCP no reemplaza Agent Tools; los estandariza. Thinking no reemplaza pretraining; añade entrenamiento y cómputo de inferencia. Agentes no reemplazan workflows; los combinan con decisión probabilística.
