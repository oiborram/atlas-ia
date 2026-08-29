# Más allá del texto: difusión, multimodalidad y ciencia

## Modelos de difusión

En lugar de predecir el siguiente token, un modelo de difusión aprende a revertir ruido gradualmente. En generación de imagen, parte de ruido y realiza pasos de *denoising* condicionados por texto.

```text
ruido → formas vagas → composición → detalles → imagen
```

Muchas implementaciones trabajan en un espacio latente comprimido para abaratar el proceso. No “pegan imágenes” de manera literal, aunque pueden memorizar o reproducir patrones de entrenamiento y plantean cuestiones de autoría y licencia.

## Multimodalidad

Un sistema multimodal representa texto, imagen, audio o vídeo en espacios compatibles y aprende a cruzarlos. Según el diseño puede:

- describir una captura;
- razonar sobre un diagrama;
- transcribir y responder voz;
- generar imagen, audio o vídeo;
- controlar acciones físicas mediante visión-lenguaje-acción.

Convertir una imagen en tokens visuales no elimina los fallos de percepción. Un modelo puede leer una gráfica compleja y equivocarse al contar objetos sencillos: la **frontera irregular**.

Leer un documento es un caso multimodal con requisitos propios: además de reconocer caracteres, hay que reconstruir orden de lectura, tablas, campos, coordenadas y confianza. La lección [OCR y Document AI](06-ocr-document-ai-y-comprension-documental.md) desarrolla el pipeline y su evaluación.

## De juegos a biología

AlphaFold no es un LLM, pero representa otra consecuencia de combinar aprendizaje profundo, representación y búsqueda/optimización en un dominio científico. La tradición de AlphaGo influyó en la cultura de sistemas que descubren estructura, no solo imitan ejemplos. En 2024 el trabajo de predicción de estructuras de proteínas fue reconocido con parte del Nobel de Química. [Retrospectiva de DeepMind sobre AlphaGo](https://deepmind.google/blog/10-years-of-alphago/).

## Lección de arquitectura

“IA generativa” agrupa objetivos distintos: siguiente token, eliminación de ruido, predicción de estructura, acciones de robot. La interfaz puede ser la misma caja de chat, pero el mecanismo y la evaluación correcta cambian.

Profundización: [CLIP, VLM, difusión, audio y vídeo](../14-ampliacion-avanzada/09-multimodal-imagen-audio-video.md).
