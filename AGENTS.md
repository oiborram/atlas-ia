# Atlas IA: mantenimiento de audios

Los audios sticky de “Profesor IA” narran todos los Markdown de cada sección. Antes de modificar contenido, conserva el resultado inicial de esta comprobación; vuelve a ejecutarla antes de cerrar una tarea o desplegar:

Las categorías `referencias`, `14-ampliacion-avanzada` y `15-legal` están excluidas de todos los audios. No deben generar, exigir ni mostrar clips-resumen ni narraciones completas de Profesor IA. Legal es contenido exclusivamente escrito por ahora; no crees grabaciones TTS para esa sección. Solo las otras 14 secciones numeradas participan en esta comprobación.

```powershell
npm run audio:check
```

Si la comprobación indica que una sección está desactualizada, **no regeneres el audio automáticamente**. Avisa al usuario y separa siempre las secciones que ya estaban pendientes al comenzar de las que ha desactualizado la tarea actual. Espera una autorización explícita. Solo después de recibirla, regenera únicamente la sección indicada con la misma voz y TTS de Iris:

```powershell
.\scripts\generate-professor-audios.ps1 -Only <id-de-seccion>
```

No edites a mano `src/professorAudioManifest.json`. El generador registra por sección el timestamp real de síntesis, la última modificación observada, la huella del texto normalizado que recibe Iris y el SHA-256 del OGG. `updatedAt` indica una actualización del manifiesto, no una generación de audio. La interfaz desactiva cualquier audio cuyo texto narrable no coincida; la comprobación de agente valida también el archivo de audio.

No crees jobs, heartbeats, tareas programadas, watchers ni procesos en segundo plano para generar, comprobar, mantener o desplegar estos audios. Toda generación o regeneración debe ejecutarse de forma interactiva y únicamente tras la autorización explícita del usuario. Si el usuario no la ha dado, limítate a informar del desfase y preguntar si quiere regenerar.
