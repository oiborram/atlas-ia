# Seguridad de MCP y herramientas

Conectar un LLM a una API cambia el riesgo: una alucinación deja de ser solo texto y puede convertirse en acción.

## Modelo de amenazas

| Riesgo | Ejemplo | Control |
|---|---|---|
| Servidor malicioso | Tool que exfiltra contexto | Procedencia, revisión, allowlist |
| Tool poisoning | Descripción con instrucciones ocultas | Tratar metadata como no confiable |
| Prompt injection indirecta | Documento ordena enviar secretos | Separar datos e instrucciones |
| Exceso de permisos | Calendario con borrado global | Scopes mínimos, solo lectura |
| Confused deputy | Agente usa autoridad del usuario para otro fin | Vincular intención, acción y aprobación |
| Supply chain | Paquete MCP comprometido | Versiones fijadas, firmas, SBOM |
| Tool sprawl | Cientos de herramientas en contexto | Habilitación bajo demanda |

## Arquitectura recomendada

```text
LLM propone → validador de esquema → motor de políticas → aprobación si aplica
            → ejecución con identidad limitada → log inmutable → resultado saneado
```

La aprobación debe mostrar la acción concreta, destino y efecto, no solo “el agente necesita permiso”.

## Principio de mínima capacidad

Si la tarea es leer tres issues, no entregues un token con administración del repositorio. Si solo necesitas una fuente una vez, habilita el servidor temporalmente. Menos herramientas también reduce tokens y errores de selección.
