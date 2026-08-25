# Browser, Computer Use y coding agents

## Tres niveles de herramienta

| Nivel | Ejemplo | Preferencia |
|---|---|---|
| API semántica | `create_issue(title, body)` | Más estable y validable |
| DOM/CDP | Localizar botón, leer red/consola | Útil para web y depuración |
| Píxeles/ratón/teclado | Computer Use | Universal, pero frágil |

Usa la interfaz de mayor nivel disponible. Computer Use es valioso para sistemas sin API, pero sufre cambios visuales, modales, OCR, latencia y acciones ambiguas.

## Coding agent

Combina búsqueda de archivos, edición, terminal, Git, tests y a veces navegador. Su ventaja sobre autocompletar es cerrar el bucle:

```text
entender → cambiar → ejecutar → leer fallo → corregir → revisar diff
```

## Barreras sanas

- sandbox y mínimo privilegio;
- secretos fuera del contexto si no son necesarios;
- aprobación para publicar, pagar, borrar o desplegar;
- diffs pequeños y revisables;
- tests que el agente no pueda debilitar sin alerta;
- logs de herramientas y resultados;
- identidad clara de las contribuciones automatizadas.

La inyección indirecta es el gran riesgo: una web, issue o documento puede contener instrucciones para el agente. Los datos no confiables no deben ascender a instrucciones de sistema.
