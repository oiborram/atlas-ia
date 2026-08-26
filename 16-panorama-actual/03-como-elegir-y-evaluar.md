# Cómo elegir y evaluar en un mercado que cambia

## Empieza por el trabajo, no por la marca

“¿Cuál es el mejor modelo?” no tiene respuesta útil sin una tarea, restricciones y criterio de éxito. Describe primero un lote representativo de trabajo real: entradas normales, casos límite, datos sensibles, herramientas disponibles y daños posibles.

| Caso | Candidatos que conviene comparar | Señal principal | Riesgo que no debe ocultar el promedio |
|---|---|---|---|
| Asistente de programación | Frontier cerrado, modelo abierto de código y opción rápida | Issues resueltas con tests verdes | Cambios inseguros o fuera de alcance |
| Extracción documental | Modelo multimodal y modelo pequeño especializado | Exactitud por campo y trazabilidad | Inventar un valor ilegible |
| Investigación | Modelo con búsqueda y un flujo RAG propio | Afirmaciones respaldadas por fuentes | Citas inexistentes o descontextualizadas |
| Atención al cliente | Modelo rápido con recuperación | Resolución, latencia y escalado correcto | Exponer datos o prometer acciones imposibles |
| Agente operativo | Varios modelos con las mismas herramientas | Objetivos completados sin intervención | Acción irreversible o exceso de permisos |
| Datos regulados | API regional y despliegue controlado | Cumplimiento + utilidad | Transferencias, retención y falta de auditoría |
| Alto volumen | Modelos pequeños y rutas en cascada | Coste por caso resuelto | Degradación en idiomas o casos raros |

## Protocolo mínimo de comparación

1. **Congela el problema.** Reúne entre 30 y 200 casos reales, según variabilidad y riesgo, con resultados aceptables y fallos graves definidos.
2. **Fija las condiciones.** Usa el mismo contexto, herramientas, límite temporal, número de intentos y política de razonamiento.
3. **Registra versiones.** Guarda proveedor, identificador exacto, fecha, parámetros, *prompt*, herramientas y dependencias. Un alias “latest” no es reproducible.
4. **Mide el resultado final.** En código, ejecuta tests; en extracción, compara campos; en investigación, abre las fuentes. Evita juzgar solo el estilo.
5. **Separa calidad y riesgo.** Un 92 % medio puede esconder un 2 % de acciones inaceptables. Mide esos fallos por separado.
6. **Cuenta todo el coste.** Tokens de entrada/salida, razonamiento, caché, búsqueda, herramientas, reintentos, GPU y revisión humana.
7. **Haz revisión ciega cuando importe.** Oculta el nombre del modelo para reducir preferencias de marca y alterna el orden de respuestas.
8. **Prueba en sombra.** Antes de darle capacidad de actuar, ejecuta el sistema sobre tráfico real sin aplicar sus decisiones.
9. **Despliega con límites.** Presupuesto, tiempo máximo, permisos mínimos, aprobaciones y una ruta de parada.
10. **Repite tras cada cambio.** Un modelo nuevo, una versión distinta o una herramienta añadida invalidan parte de la evidencia anterior.

## Una ficha de decisión reproducible

```yaml
caso: corregir incidencias pequeñas en un monorepo
fecha: 2026-08-26
candidatos:
  - proveedor/modelo-version-exacta
  - repositorio/pesos@revision
condiciones:
  tiempo_maximo: 20_min
  intentos: 1
  herramientas: [buscar, editar, tests]
metricas:
  - tests_verdes
  - cambio_dentro_de_alcance
  - vulnerabilidades_nuevas
  - coste_por_issue_resuelta
controles:
  - sandbox
  - sin_secretos_de_produccion
  - aprobacion_para_publicar
```

## Cómo tratar los benchmarks públicos

Un benchmark sirve para decidir qué candidatos merece la pena probar, no para adjudicar automáticamente la compra. Antes de comparar cifras, pregunta:

- ¿Es el mismo conjunto y la misma versión?
- ¿Se permitió búsqueda, código, herramientas o múltiples intentos?
- ¿Cuánto razonamiento y tiempo recibió cada modelo?
- ¿La puntuación la produjo un humano, un juez automático o tests ejecutables?
- ¿Existe contaminación: ejemplos del benchmark en los datos de entrenamiento?
- ¿La cifra es independiente o la publica el propio proveedor?

La señal más fuerte combina tests deterministas, revisión humana con rúbrica y telemetría de producción. Un “LLM juez” ayuda a escalar comparaciones, pero también hereda sesgos, preferencias de estilo e inestabilidad; debe calibrarse contra humanos.

## Estrategias sanas de arquitectura

### Modelo principal más ruta de escalado

Empieza con un modelo rápido. Escala a otro más capaz cuando haya baja confianza, alto riesgo, fallo de verificación o complejidad detectada. La ruta necesita métricas: sin ellas solo añade complejidad.

### Generador más verificador independiente

Un modelo propone y otra señal comprueba: compilador, tests, esquema, motor de reglas, búsqueda o revisor humano. Dos llamadas al mismo modelo sin evidencia externa pueden repetir el mismo error.

### Portabilidad deliberada

Aísla el proveedor detrás de contratos propios para mensajes, herramientas y resultados estructurados. Conserva un conjunto de evals ejecutable. La portabilidad total es imposible —los modelos se comportan distinto—, pero estas capas reducen el coste de comparar y migrar.

## Cuándo dejar de buscar

El modelo adecuado no es el líder absoluto: es el primero que supera el umbral de calidad y seguridad con coste, latencia y condiciones aceptables. Optimizar eternamente contra cada lanzamiento crea más churn que valor. Establece una cadencia de reevaluación y reabre la decisión cuando cambie una necesidad, un riesgo o una versión relevante.
