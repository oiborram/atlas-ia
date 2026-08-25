# Europa: normas que se superponen al AI Act

> **Estado:** revisado el 25 de agosto de 2026. Esta unidad es un mapa de alerta; cada sector requiere su análisis especializado.

## Matriz rápida

| Área | Normas destacadas | Qué añade |
|---|---|---|
| Datos | RGPD, ePrivacy, Data Act | licitud, derechos, acceso y uso de datos |
| Plataformas | DSA, DMA, P2B | recomendadores, anuncios, riesgos sistémicos, transparencia |
| Consumo | UCPD, derechos de consumidores, DSA | prácticas engañosas, información, reclamación |
| Ciberseguridad | NIS2, DORA, Cyber Resilience Act | gestión y reporte de riesgos e incidentes |
| Producto | Product Liability, GPSR, Machinery | seguridad, conformidad y daños por software |
| Empleo | derecho laboral, igualdad, Platform Work | consulta, no discriminación, revisión humana |
| Salud | MDR, IVDR, datos de salud | evidencia clínica, seguridad y vigilancia |
| Finanzas | DORA, MiFID, crédito, seguros | gobernanza de modelos y protección del cliente |
| Propiedad intelectual | DSM Copyright, bases de datos, secretos | entrenamiento, reservas y reutilización |

## Servicios digitales y consumidores

El **Digital Services Act** regula intermediarios y plataformas. Los sistemas de recomendación, moderación y publicidad pueden activar obligaciones de explicación, opciones, trazabilidad publicitaria y, para plataformas muy grandes, evaluación y mitigación de riesgos sistémicos. El hecho de usar IA no elimina responsabilidad por contenido ilícito o patrones oscuros.

Las normas de prácticas comerciales desleales pueden actuar ante:

- afirmaciones falsas sobre capacidad, exactitud o «humanidad» del servicio;
- reseñas, avatares o testimonios sintéticos engañosos;
- interfaces que manipulan una decisión económica;
- omisión de límites materiales;
- discriminación o precios personalizados sin transparencia exigible.

El artículo 50 del AI Act y el derecho de consumo se acumulan: una etiqueta de IA técnicamente correcta no vuelve lícita una práctica engañosa.

## Ciberseguridad

### NIS2

Las entidades esenciales o importantes de sectores cubiertos deben gestionar riesgo, cadena de suministro, continuidad, vulnerabilidades, criptografía y reporte de incidentes. Un sistema de IA entra en ese programa como activo, proveedor y nueva superficie de ataque.

### DORA

En finanzas, DORA exige resiliencia operativa digital, gestión de riesgo TIC, pruebas, incidentes y control de terceros. Comprar un modelo o agente en la nube no externaliza la responsabilidad de la entidad financiera.

### Cyber Resilience Act

El Reglamento (UE) 2024/2847 impone requisitos horizontales a productos con elementos digitales: seguridad desde diseño, gestión de vulnerabilidades y soporte. Coordina algunos requisitos con sistemas de IA de alto riesgo. Su aplicación es escalonada; hay que verificar fechas por obligación y categoría de producto.

### Riesgos específicos de agentes

- *prompt injection* que altera instrucciones;
- exfiltración mediante herramientas o contexto recuperado;
- abuso de credenciales con privilegios excesivos;
- acciones irreversibles sin aprobación;
- dependencia de paquetes o MCP maliciosos;
- datos sensibles persistidos en memoria o logs;
- actualizaciones silenciosas del modelo.

Estos riesgos deben entrar en *threat modeling*, pruebas, mínimo privilegio, segregación, límites de gasto, confirmación y respuesta a incidentes.

## Responsabilidad por productos y daños

La Directiva (UE) 2024/2853 moderniza la responsabilidad por productos defectuosos e incluye software y sistemas de IA. Se aplica a productos introducidos o puestos en servicio después del 9 de diciembre de 2026, una vez transpuesta conforme al marco nacional. Puede abarcar defectos ligados a actualizaciones bajo control del fabricante y facilita aspectos probatorios en sistemas complejos.

El software libre desarrollado o suministrado fuera de una actividad comercial tiene una exclusión específica, pero integrar ese software en un producto comercial no borra las obligaciones del operador comercial.

La retirada de la propuesta separada de Directiva de responsabilidad por IA no significa ausencia de responsabilidad. Siguen existiendo producto defectuoso, responsabilidad contractual y extracontractual, RGPD, consumo y normas sectoriales.

## Maquinaria y productos físicos

El Reglamento de Maquinaria (UE) 2023/1230 contempla componentes digitales y software de seguridad, incluidos componentes con comportamiento autoevolutivo mediante aprendizaje automático. Exige evaluación de riesgos, registros y resistencia a alteraciones. Tras el AI Omnibus, la coordinación sectorial gana peso y el calendario de IA de alto riesgo integrada en productos llega a 2028.

También hay regímenes propios para vehículos, aviación, ferrocarril, juguetes, ascensores, equipos marinos y otros listados en el anexo I.

## Salud

Una IA con finalidad médica puede ser software como producto sanitario bajo MDR o IVDR. Importan finalidad declarada, clase de riesgo, evidencia clínica, sistema de calidad, vigilancia, cambios y organismo notificado. Además:

- los datos de salud son categoría especial bajo RGPD;
- hay secreto profesional y seguridad clínica;
- la explicación al profesional no sustituye validación sobre población y entorno reales;
- una actualización del modelo puede exigir control de cambios o reevaluación.

Un asistente administrativo sanitario y un sistema que recomienda diagnóstico no son el mismo caso jurídico.

## Finanzas, crédito y seguros

Los casos de crédito y ciertos seguros aparecen en el anexo III del AI Act. También se aplican normas de solvencia, conducta, explicabilidad, protección del consumidor, prevención de discriminación y gestión de modelos. Deben vigilarse:

- variables *proxy* y sesgos históricos;
- calidad y procedencia de datos alternativos;
- decisión exclusivamente automatizada;
- información de denegación y reclamación;
- deriva, estabilidad y validación independiente;
- resiliencia y dependencia de proveedores.

## Educación, menores y accesibilidad

Admisión, evaluación o asignación educativa puede ser alto riesgo. Con menores, la ponderación de privacidad y manipulación se endurece. Deben contemplarse accesibilidad, adaptaciones, sesgo lingüístico, fraude, derecho de revisión y proporcionalidad de vigilancia.

La Ley Europea de Accesibilidad y las obligaciones nacionales pueden afectar interfaces y servicios digitales. Un chatbot accesible necesita teclado, lectores de pantalla, contraste, lenguaje comprensible y alternativa no conversacional cuando corresponda.

## Publicidad, elecciones y medios

El contenido sintético político o de interés público activa transparencia, pero también reglas electorales, audiovisuales, de publicidad y plataformas. Etiquetar un *deepfake* no legitima suplantación, difamación, uso no consentido de imagen o interferencia electoral.

## Fuentes oficiales

- [Digital Services Act](https://eur-lex.europa.eu/eli/reg/2022/2065/oj)
- [Directiva NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)
- [Reglamento DORA](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [Cyber Resilience Act](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)
- [Directiva de responsabilidad por productos](https://eur-lex.europa.eu/eli/dir/2024/2853/oj)
- [Reglamento de Maquinaria](https://eur-lex.europa.eu/eli/reg/2023/1230/oj)
- [Reglamento de productos sanitarios](https://eur-lex.europa.eu/eli/reg/2017/745/oj)
- [Data Act](https://eur-lex.europa.eu/eli/reg/2023/2854/oj)

