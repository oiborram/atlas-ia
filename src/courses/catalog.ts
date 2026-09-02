import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface CourseAppProps {
  onExitCourse: () => void
}

export interface CourseDefinition {
  id: string
  eyebrow: string
  title: string
  description: string
  status: string
  scope: string
  accent: string
  App: LazyExoticComponent<ComponentType<CourseAppProps>>
}

export const courses: CourseDefinition[] = [
  {
    id: 'ai-atlas',
    eyebrow: 'Curso 01 · Inteligencia artificial',
    title: 'AI Atlas',
    description: 'Una ruta cronológica y funcional desde AlphaGo hasta los agentes, el razonamiento y la IA actual.',
    status: 'Disponible',
    scope: '16 secciones · 14 con modo podcast',
    accent: 'De modelos a agentes',
    App: lazy(() => import('./ai-atlas/AiAtlasApp')),
  },
]

export function getCourse(courseId: string): CourseDefinition | undefined {
  return courses.find((course) => course.id === courseId)
}
