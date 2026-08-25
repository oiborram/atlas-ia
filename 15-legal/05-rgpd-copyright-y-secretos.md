# RGPD, copyright, licencias y secretos

> **Estado:** revisado el 25 de agosto de 2026.

## El AI Act no sustituye al RGPD

El AI Act clasifica sistemas y prácticas. El RGPD regula tratamientos de datos personales. Si un chatbot almacena nombres, conversaciones, direcciones IP o embeddings vinculables a personas, hay que analizar RGPD aunque el chatbot no sea de alto riesgo.

## Ciclo de datos personales

### Inventario

Incluye más que el dataset principal:

- datos de entrenamiento, validación y prueba;
- prompts, archivos, respuestas y correcciones;
- telemetría, identificadores, logs y metadatos;
- embeddings, índices vectoriales y cachés;
- datos inferidos y perfiles;
- memorias de agentes y trazas de herramientas;
- copias de seguridad y datos enviados a subencargados.

### Base jurídica y finalidad

Consentimiento, contrato, obligación legal, interés vital, misión pública e interés legítimo no son comodines intercambiables. Define cada finalidad. «Mejorar la IA» suele ser demasiado abierto. El interés legítimo exige necesidad, ponderación y expectativas razonables; no legitima todo *scraping* ni reutilización.

### Transparencia y derechos

La información debe explicar quién trata, para qué, qué categorías y fuentes, conservación, destinatarios, transferencias y derechos. Cuando hay decisiones automatizadas o perfiles relevantes, se añade información significativa sobre lógica y consecuencias, sin convertir el aviso en una fórmula incomprensible.

### Decisiones automatizadas

El artículo 22 RGPD protege frente a decisiones **basadas únicamente** en tratamiento automatizado que produzcan efectos jurídicos o afecten de modo similar significativamente. Existen excepciones limitadas, pero requieren medidas como intervención humana, expresar el punto de vista e impugnar.

La firma mecánica de un humano no siempre rompe la automatización. Debe poder revisar datos, razonamiento, contexto y resultado, y tener autoridad real para cambiarlo.

### EIPD

Una evaluación de impacto en protección de datos es normalmente necesaria cuando el tratamiento puede entrañar alto riesgo: evaluación sistemática, decisiones significativas, datos sensibles a gran escala, vigilancia, biometría, menores o combinación novedosa de tecnologías y datos. Se realiza **antes**, se actualiza con cambios y puede exigir consulta previa a la autoridad si el riesgo residual sigue alto.

### ¿Un modelo es anónimo?

No se presume. El Comité Europeo de Protección de Datos indica que la valoración es caso por caso. Para considerar anónimo un modelo debe existir evidencia suficiente de que, con medios razonables, no pueden extraerse datos personales del entrenamiento ni obtenerse salidas relativas a las personas cuyos datos se usaron. Ataques de pertenencia, memorización y extracción importan.

Si el entrenamiento usó datos personales ilícitamente, esa ilicitud puede afectar al despliegue posterior. La respuesta depende de circunstancias, medidas y base jurídica; no se «lava» automáticamente publicando los pesos.

## Transferencias y proveedores

Al usar una API extranjera comprueba:

- ubicación de tratamiento y soporte;
- subencargados y cambios;
- mecanismo de transferencia: decisión de adecuación, cláusulas tipo u otro;
- evaluación de legislación del tercer país y medidas suplementarias;
- retención, aislamiento, entrenamiento con datos del cliente y borrado;
- capacidad de atender acceso, supresión, oposición y portabilidad.

Una opción «no entrenamos con tus datos» no responde por sí sola a localización, logs de abuso, soporte humano ni subprocesadores.

## Copyright: cuatro problemas distintos

### 1. Acceso y minería para entrenar

La Directiva (UE) 2019/790 contiene:

- una excepción específica de minería de textos y datos para investigación científica por organismos de investigación e instituciones culturales con acceso lícito;
- una excepción más general para obras accesibles lícitamente, condicionada a que el titular no haya reservado expresamente los derechos, por ejemplo de forma legible por máquina para contenido en línea.

Acceso público no equivale siempre a permiso absoluto. Hay que considerar reserva, medidas técnicas, contrato de acceso, derecho de bases de datos y legislación nacional.

### 2. Salidas que reproducen

Una salida puede infringir si reproduce expresión protegida de forma relevante. La probabilidad depende de memorizar, prompt, longitud, singularidad y transformaciones. Los controles incluyen deduplicación, filtrado, pruebas de regurgitación, límites de cita y canal de retirada.

### 3. Autoría de la salida

En la UE la protección de autor parte de una creación intelectual propia de un autor humano. No hay una regla armonizada que otorgue automáticamente copyright al usuario de cualquier salida generada. La contribución humana en selección, estructura y edición puede ser relevante, pero el resultado depende del caso y del derecho nacional.

### 4. Contrato y licencia

Aunque una salida no infrinja, el contrato puede repartir derechos, garantías e indemnidad. En código hay que detectar licencias copyleft, avisos, patentes y compatibilidad. «Generado por IA» no garantiza originalidad ni licencia limpia.

## Obligaciones de GPAI sobre copyright

Los proveedores de modelos de propósito general deben implantar una política de cumplimiento del copyright de la UE, identificar y respetar reservas de derechos y publicar un resumen del contenido de entrenamiento usando la plantilla de la Comisión. Esto no decide por sí solo litigios de copyright, pero crea transparencia y disciplina documental.

## Secretos empresariales y confidencialidad

Antes de enviar información a una IA pregunta:

1. ¿la organización puede divulgarla a ese proveedor?
2. ¿el contrato impone confidencialidad y limitación de uso?
3. ¿quién accede durante soporte o revisión de abuso?
4. ¿se retiene o usa para mejorar modelos?
5. ¿puede borrarse y auditarse?
6. ¿hay una alternativa local o empresarial?

La protección de secreto exige medidas razonables para mantenerlo secreto. Copiar claves, código privado, estrategia, datos de clientes o documentos bajo NDA a una cuenta de consumo puede destruir control y generar incumplimientos aunque no haya una filtración pública.

## Política práctica de datos para IA

| Clase | Ejemplo | Tratamiento recomendado |
|---|---|---|
| Público autorizado | documentación propia publicada | herramientas aprobadas |
| Interno | procesos no públicos | proveedor empresarial y controles |
| Confidencial | contratos, roadmap, código | entorno autorizado, minimización y logging |
| Restringido | salud, biometría, credenciales | prohibición por defecto; excepción aprobada |

## Fuentes oficiales

- [RGPD, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [LOPDGDD, BOE](https://www.boe.es/eli/es/lo/2018/12/05/3)
- [Opinión 28/2024 sobre modelos de IA, EDPB](https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en)
- [Guía AEPD para adecuación al RGPD](https://www.aepd.es/guias/adecuacion-rgpd-ia.pdf)
- [Directiva 2019/790 sobre copyright digital](https://eur-lex.europa.eu/eli/dir/2019/790/oj)
- [Resumen de entrenamiento para GPAI, Comisión Europea](https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content)
- [Ley de Secretos Empresariales, BOE](https://www.boe.es/eli/es/l/2019/02/20/1)

