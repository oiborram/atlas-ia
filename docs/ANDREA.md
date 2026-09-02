# Andrea · Arquitectura de cursos

Andrea es una aplicación de formación extensible que reúne varios cursos bajo una sola biblioteca, una sola URL y el mismo contrato de despliegue. Al entrar, el usuario elige un curso; cada curso conserva después su navegación, contenido y herramientas propias.

El primer curso disponible es **AI Atlas**, el Atlas práctico de Inteligencia Artificial que ya existía en este repositorio. Los enlaces históricos `#/doc/...` siguen abriendo AI Atlas para no romper marcadores ni referencias compartidas.

## Estructura

```text
src/
├── App.tsx                         Biblioteca y resolución del curso
├── courseRouting.ts               Rutas canónicas y compatibilidad histórica
├── courses/
│   ├── catalog.ts                 Registro único de cursos
│   └── ai-atlas/AiAtlasApp.tsx    Aplicación del curso AI Atlas
└── components/CourseLibrary.tsx   Selector de cursos de Andrea
```

Para añadir un curso:

1. Crea su aplicación dentro de `src/courses/<id>/`.
2. Expón un componente que acepte `CourseAppProps` para poder volver a la biblioteca.
3. Añade su definición a `src/courses/catalog.ts` mediante `lazy(() => import(...))`.
4. Usa `#/course/<id>` como ruta estable y añade rutas internas a partir de ella si son necesarias.
5. Añade pruebas del registro, la entrada, la salida y los enlaces profundos del curso.

Los cursos se cargan de forma diferida: incorporar uno nuevo no aumenta el coste inicial de abrir la biblioteca. El selector y todos los cursos viajan en el mismo artefacto estático y no exigen cambiar `Dockerfile`, Nginx ni el contrato de Lisa.

## AI Atlas y audio

AI Atlas conserva sus Markdown y recursos en las ubicaciones actuales. Sus audios de Profesor IA siguen el control manual documentado en `AGENTS.md`: se comprueba si están actualizados, se avisa si no lo están y sólo se regeneran tras autorización expresa. Andrea no crea tareas programadas, watchers ni regeneraciones automáticas.
