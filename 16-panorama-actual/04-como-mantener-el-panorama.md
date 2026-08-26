# Cómo mantener actualizado el panorama

## Una taxonomía contra el hype

Cada novedad debe llevar un estado. Sin él, una promesa acaba escrita como si fuera una capacidad disponible.

| Estado | Evidencia mínima | Cómo redactarlo |
|---|---|---|
| Publicado | Pesos, API o producto accesible y documentación verificable | “Está disponible…” |
| Preview | Acceso limitado o experimental confirmado | “Está en preview…” |
| Anunciado | Compromiso oficial con fecha o ventana futura | “El laboratorio anunció…” |
| Reportado | Terceros fiables, sin confirmación primaria suficiente | “Se ha reportado…” |
| Rumor | Filtración o conversación no verificable | No incorporarlo al tablero principal |
| Retirado | Aviso oficial o acceso comprobablemente cerrado | Conservar fecha y sustituto, si existe |

Así se explica GLM‑5.3 con precisión: **modelo/API publicado; pesos anunciados**. Cada artefacto puede tener un estado distinto.

## Jerarquía de fuentes

1. Repositorio, *model card*, documentación API o publicación oficial del laboratorio.
2. Paper técnico y anexos de evaluación.
3. Registro de licencia, artefactos descargables y proveedores de inferencia.
4. Evaluaciones independientes con metodología y versiones reproducibles.
5. Prensa especializada para contexto, nunca como única prueba de una capacidad.
6. Redes sociales y tablas virales como pista para investigar, no como evidencia final.

Una fuente primaria también tiene incentivos comerciales. Sirve para confirmar qué anunció o publicó la organización; no convierte sus comparaciones en resultados independientes.

## Registro de actualización

Para cada cambio, guarda una ficha pequeña:

```yaml
fecha_de_revision: 2026-08-26
laboratorio: Moonshot AI
artefacto: Kimi K3
estado:
  api: publicado
  pesos: publicado
  codigo_inferencia: publicado
fuentes_primarias:
  - https://github.com/MoonshotAI/Kimi-K3
cambio_desde_revision_anterior: alta inicial
impacto_curricular: panorama_actual_y_modelos_abiertos
pendiente_de_verificar: benchmarks independientes
```

## Cadencia sensata

- **Semanal:** corregir lanzamientos mayores, retiradas y cambios de acceso que vuelvan falsa una página.
- **Mensual:** revisar el tablero completo y ejecutar las evals internas sobre candidatos relevantes.
- **Trimestral:** reconsiderar arquitectura, proveedor, costes, contratos y riesgos.
- **Por evento:** revisar inmediatamente tras un incidente, cambio de licencia, nueva obligación legal o deprecación.

La fecha del encabezado debe indicar la última revisión real, no el último cambio tipográfico.

## Checklist para aceptar una novedad

- [ ] ¿Existe un identificador de modelo o artefacto inequívoco?
- [ ] ¿Distinguimos producto, API, pesos y código?
- [ ] ¿La licencia permite el uso que describimos?
- [ ] ¿Las cifras indican quién las midió y en qué condiciones?
- [ ] ¿Separamos capacidad anunciada de prueba independiente?
- [ ] ¿Hay una consecuencia práctica para el lector o solo un nuevo nombre?
- [ ] ¿Hemos fijado fecha y enlace primario?
- [ ] ¿Cambian los riesgos, el cumplimiento o los permisos necesarios?

## Qué merece entrar en el curso

No todo lanzamiento crea una era. Este tablero puede cambiar cada mes; la narrativa histórica solo debe cambiar cuando aparezca una capacidad, interfaz o infraestructura que altere de forma duradera cómo se construye software. Esa separación mantiene actualizado el curso sin convertirlo en un feed de noticias.
