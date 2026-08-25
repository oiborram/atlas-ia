# Skills, MCP, plugins y AGENTS.md

Estas cuatro superficies resuelven problemas distintos.

## Mapa de elección

| Si quieres… | Usa | Evita |
|---|---|---|
| Norma del repositorio | `AGENTS.md` | Repetirla en cada prompt |
| Procedimiento reusable | Skill | Un `AGENTS.md` de cientos de páginas |
| Datos/acciones externas | MCP/connector | Copiar secretos al chat |
| Distribuir un flujo completo | Plugin | Instalación manual de cinco piezas |
| Petición de una sola vez | Prompt | Persistirla globalmente |

## AGENTS.md

Codex lee `AGENTS.md` antes de trabajar. Puede combinar guía global, raíz del repo y archivos más específicos en subdirectorios; la guía más cercana prevalece. Pon aquí:

- estructura del repo;
- comandos de build/test/lint;
- convenciones y límites;
- qué significa “terminado”;
- reglas de revisión importantes.

No pongas documentación enciclopédica ni secretos. Usa archivos anidados para reglas locales. [Documentación de AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Ejemplo:

```markdown
# AGENTS.md

## Verificación
- Ejecuta `pnpm test` tras cambiar TypeScript.
- Ejecuta la prueba e2e afectada si cambia una ruta pública.

## Límites
- No añadas dependencias de producción sin justificarlo.
- No modifiques migraciones ya desplegadas.
```

## Skills

Una skill es un workflow reusable: instrucciones enfocadas y, si hace falta, referencias, plantillas o scripts. Codex puede descubrirla por descripción o puedes invocarla explícitamente. Úsala cuando el mismo procedimiento reaparezca: crear un tipo de documento, desplegar con un pipeline concreto o revisar UI según un sistema de diseño.

Una skill debe explicar cuándo se activa, pasos, recursos, controles y verificación. Si necesita acceso externo, puede usar herramientas disponibles; no debería esconder permisos. [Documentación oficial de skills](https://learn.chatgpt.com/docs/build-skills).

## MCP

MCP conecta Codex con tools y recursos expuestos por servidores. Es apropiado para APIs, bases de datos, docs o herramientas de desarrollo. Cada servidor añade contexto y superficie de riesgo; habilita solo los necesarios. [MCP en Codex](https://learn.chatgpt.com/docs/extend/mcp).

## Plugins y complementos

En la nomenclatura actual, un plugin puede agrupar skills, connectors, servidores MCP, UI, hooks y plantillas de tareas programadas. Es la unidad instalable/distribuible; MCP es solo una posible pieza. Tras instalar, algunas capacidades necesitan autenticación y un chat nuevo. [Plugins](https://learn.chatgpt.com/docs/plugins) y [arquitectura para crearlos](https://developers.openai.com/plugins/build/plugins).

## Checklist antes de instalar

- ¿Quién publica y mantiene el plugin?
- ¿Qué skills, hooks y servidores incluye?
- ¿Qué cuentas y scopes solicita?
- ¿Qué datos salen del equipo?
- ¿Las acciones requieren aprobación?
- ¿Cómo se deshabilita, revoca y actualiza?
