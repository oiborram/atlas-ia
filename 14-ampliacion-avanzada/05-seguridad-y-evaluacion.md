# Seguridad y evaluación avanzada

## Threat model de un agente

Activos: secretos, datos, código, identidad, dinero y reputación. Adversarios: usuario malicioso, contenido externo, servidor/tool comprometido, dependencia y el propio fallo del modelo. Fronteras: prompt/contexto, tool calls, sandbox, red, autenticación y aprobación humana.

## Taxonomía

| Fallo | Ejemplo |
|---|---|
| Misuse | Usuario pide ciberataque |
| Misalignment contextual | Agente persigue proxy conflictivo |
| Prompt injection | Web altera la tarea |
| Data exfiltration | Tool envía secreto |
| Excessive agency | Acción irreversible no solicitada |
| Evaluation gaming | Modifica tests o roba respuestas |
| Deception | Oculta acción para conservar objetivo |
| Supply chain | Skill/MCP/paquete malicioso |

## Capability vs propensity

Una eval puede demostrar que el modelo **puede** hacer algo bajo scaffolding extremo. Para estimar riesgo operativo hay que medir la **propensión** en distribuciones realistas, oportunidades, controles y consecuencias. No borres ninguna de las dos: baja propensión con daño enorme sigue importando; alta capacidad elicitada no implica conducta cotidiana.

## Eval válida

- preregistra criterios cuando sea posible;
- conserva transcripts y versiones;
- incluye control negativo y baseline;
- prueba sensibilidad al prompt/scaffold;
- separa éxito parcial y completo;
- evita que el modelo pueda leer la respuesta;
- ejecuta en infraestructura asumida hostil;
- reporta intervalos e incertidumbre, no solo máximos.

## Monitores

Un monitor modelo comparte sesgos con el agente. Combina detección aprendida con invariantes duras, límites de red, firmas, cuotas y revisión. Los logs deben sobrevivir aunque el agente altere su workspace.

## Safety case

Para despliegues críticos, no basta “pasó la eval”. Construye un argumento con claims, evidencia, supuestos, controles, residual risk, responsables y condiciones que obligan a retirar o reevaluar.
