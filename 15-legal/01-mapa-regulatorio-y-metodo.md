# El mapa regulatorio: una pila, no una sola ley

> **Estado:** revisado el 25 de agosto de 2026.

## Qué regula cada capa

| Capa | Pregunta principal | Ejemplo de riesgo |
|---|---|---|
| AI Act | ¿Qué clase de sistema y de uso es? | selección de candidatos, chatbot, *deepfake* |
| RGPD y LOPDGDD | ¿Se tratan datos personales de forma lícita? | prompts con datos de clientes |
| Propiedad intelectual | ¿Se pueden copiar, entrenar, generar o distribuir estos materiales? | RAG sobre libros o código |
| Secretos y contrato | ¿Se podía entregar esa información al proveedor? | código privado en un chatbot público |
| Empleo e igualdad | ¿La IA altera derechos laborales o discrimina? | ranking automatizado de empleados |
| Consumo y plataformas | ¿La práctica engaña o perjudica al usuario? | reseñas sintéticas no identificadas |
| Ciberseguridad | ¿El producto y la organización gestionan vulnerabilidades e incidentes? | agente con acceso a producción |
| Seguridad de producto | ¿El software defectuoso causa daños? | IA en maquinaria o dispositivo médico |
| Regulación sectorial | ¿Hay reglas especiales por actividad? | crédito, salud, seguros, educación |

Cumplir una fila no neutraliza las demás. El marcado CE de un producto no legitima el tratamiento de datos personales; una base jurídica RGPD tampoco convierte en admisible una práctica prohibida por el AI Act.

## Método de análisis en ocho pasos

### 1. Definir el uso real

Evita descripciones como «usamos GPT». Documenta:

- finalidad y decisión que apoya;
- usuarios, personas afectadas y territorio;
- entradas, fuentes de datos y salidas;
- modelo, versión, herramientas y proveedores;
- autonomía: propone, decide o ejecuta;
- consecuencias de un error y posibilidad de reversión.

### 2. Dibujar la cadena de valor

Una empresa puede ser **responsable del despliegue** al usar un servicio, pero convertirse en **proveedor** si lo comercializa con su nombre, lo modifica sustancialmente o cambia su finalidad hacia un uso de alto riesgo. El contrato no puede borrar una función que la ley atribuye por lo que realmente hace la organización.

### 3. Determinar territorios

El AI Act alcanza a operadores establecidos en la UE y también a determinados proveedores o desplegadores de fuera cuando el sistema o su resultado se utiliza en la UE. El RGPD puede aplicarse a organizaciones extracomunitarias que ofrecen bienes o servicios o monitorizan a personas en la UE. Después se comprueban las jurisdicciones de clientes, trabajadores, datos y distribución.

### 4. Clasificar el AI Act

En este orden:

1. ¿Queda fuera del ámbito, por ejemplo ciertos usos puramente personales o de investigación antes de comercializar?
2. ¿Es una práctica prohibida?
3. ¿Es un modelo de propósito general, un sistema de IA o ambos?
4. ¿Es un sistema de alto riesgo por producto regulado o por un caso del anexo III?
5. ¿Activa transparencia del artículo 50?
6. Si nada de lo anterior, ¿es de riesgo limitado o mínimo?

### 5. Trazar datos y contenido

Por cada fuente registra propietario, origen, licencia, finalidad, base jurídica, categorías personales, residencia, plazo de conservación y transferencias. Incluye prompts, telemetría, feedback, logs, embeddings, cachés, copias de seguridad y datasets de evaluación. Un embedding de información personal no deja de ser automáticamente dato personal.

### 6. Superponer normas sectoriales

El uso en empleo, crédito, seguros, educación, salud, justicia, policía, migración, infraestructuras críticas o productos físicos merece una revisión especializada incluso antes de conocer la clasificación final del AI Act.

### 7. Convertir obligaciones en evidencia

Una política sin evidencia es difícil de defender. Conserva inventario, evaluaciones, actas de aprobación, contratos, pruebas, logs, formación, incidencias, decisiones humanas y cambios de modelo.

### 8. Revalidar cambios

Reclasifica cuando cambien modelo, datos, finalidad, autonomía, usuarios, país o integración. Un asistente interno puede pasar a alto riesgo si se reutiliza para puntuar candidatos.

## Qué significa «responsable» en documentos distintos

No mezcles vocabularios:

| Norma | Término | Significado aproximado |
|---|---|---|
| AI Act | responsable del despliegue (*deployer*) | usa un sistema bajo su autoridad, salvo uso personal no profesional |
| RGPD | responsable del tratamiento (*controller*) | decide fines y medios del tratamiento personal |
| RGPD | encargado (*processor*) | trata datos por cuenta del responsable |
| Contrato | cliente/proveedor | relación comercial, no clasificación legal completa |

Una empresa puede ser desplegadora bajo el AI Act y responsable del tratamiento bajo RGPD. Su proveedor SaaS puede ser proveedor de IA y encargado RGPD, aunque puede actuar como responsable independiente para finalidades propias.

## Cuándo escalar obligatoriamente

Detén el lanzamiento y pide revisión jurídica y técnica cuando exista cualquiera de estos indicios:

- biometría, emoción, inferencia de atributos sensibles o vigilancia;
- menores o personas vulnerables;
- decisiones sobre empleo, crédito, seguro, salud, educación, justicia o servicios públicos;
- decisiones exclusivamente automatizadas con efecto jurídico o similar;
- datos sensibles, secretos, grandes volúmenes obtenidos por *scraping* o transferencias internacionales;
- agentes capaces de pagar, publicar, borrar, contratar, sancionar o controlar infraestructura;
- entrenamiento o ajuste con obras protegidas o repositorios cuya licencia no esté clara;
- despliegue multinacional sin matriz de jurisdicciones.

## Regla práctica de prudencia

Si no puedes responder **quién decide, con qué datos, sobre quién, para qué y cómo se impugna**, todavía no tienes un sistema listo para producción.

## Fuentes oficiales

- [Reglamento de IA consolidado, EUR-Lex](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727)
- [Navegar el AI Act, Comisión Europea](https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act)
- [Guía introductoria, AESIA](https://aesia.digital.gob.es/storage/media/01-guia-introductoria-al-reglamento-de-ia.pdf)
- [RGPD, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

