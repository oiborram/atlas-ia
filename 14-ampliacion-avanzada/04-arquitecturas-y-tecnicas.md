# Arquitecturas y técnicas más allá del Transformer básico

## Tabla de piezas

| Técnica | Problema | Idea |
|---|---|---|
| GQA/MQA | KV cache grande | Compartir K/V entre grupos/heads |
| RoPE | Orden y distancia | Rotación dependiente de posición |
| MoE | Capacidad cara | Router activa pocos expertos |
| MLA | KV e inferencia | Comprimir representaciones latentes K/V |
| MTP | Objetivo uno-a-uno | Predecir futuros múltiples auxiliares |
| State Space Models/Mamba | Secuencias largas | Estado recurrente selectivo lineal |
| Diffusion Transformer | Generación no autoregresiva visual | Transformer dentro del proceso de denoising |
| VLM | Texto + visión | Encoder/proyector visual + modelo de lenguaje |
| VLA | Acción física | Visión/lenguaje condicionan acciones |

## Dense vs MoE

Un modelo dense activa prácticamente todos sus parámetros por token. MoE mantiene capacidad total alta con activación parcial, pero debe alojar expertos, balancear tráfico y comunicar tokens entre dispositivos. “671B total / 37B activos” no se comporta como un dense 37B en memoria ni como uno 671B en cómputo.

## SSM y arquitecturas híbridas

Los State Space Models procesan secuencias manteniendo un estado compacto y pueden escalar linealmente con longitud. Mamba añadió selectividad dependiente de la entrada. Los híbridos combinan atención —excelente para acceso asociativo— con capas recurrentes/SSM eficientes.

## Multimodal

Una imagen puede dividirse en patches y codificarse como tokens; audio en frames/features; vídeo añade tiempo. Un proyector alinea modalidades con el espacio del LLM. Para generar otra modalidad suele añadirse un decoder especializado.

## Arquitectura no es producto

La calidad final depende de datos, objetivo, postentrenamiento, herramientas y serving. Dos modelos con bloques similares pueden comportarse de forma muy diferente.
