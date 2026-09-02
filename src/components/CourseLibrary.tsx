import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, BookOpenText, Moon, Stack, Sun } from '@phosphor-icons/react'
import type { CourseDefinition } from '../courses/catalog'

type Theme = 'light' | 'dark'

interface CourseLibraryProps {
  courses: CourseDefinition[]
  onOpenCourse: (courseId: string) => void
}

function initialTheme(): Theme {
  const stored = window.localStorage.getItem('atlas-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function CourseLibrary({ courses, onOpenCourse }: CourseLibraryProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    globalThis.document.documentElement.dataset.theme = theme
    window.localStorage.setItem('atlas-theme', theme)
    globalThis.document.title = 'Andrea · Biblioteca de cursos'
  }, [theme])

  return (
    <main className="course-library">
      <div className="library-orbit library-orbit-a" aria-hidden="true" />
      <div className="library-orbit library-orbit-b" aria-hidden="true" />
      <header className="library-header">
        <a className="andrea-brand" href="#/courses" aria-label="Andrea, biblioteca de cursos">
          <span className="andrea-mark">A</span>
          <span><strong>Andrea</strong><small>Sistema de formación</small></span>
        </a>
        <button className="library-theme" type="button" onClick={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} aria-label="Cambiar tema">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <section className="library-intro" aria-labelledby="library-title">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="library-kicker"><Stack size={17} /> Biblioteca de aprendizaje</p>
          <h1 id="library-title">Elige qué quieres<br />aprender hoy.</h1>
          <p className="library-lead">Andrea reúne cursos vivos, navegables y diseñados para entender sistemas complejos con criterio.</p>
        </motion.div>
        <div className="library-index" aria-label={`${courses.length} curso disponible`}>
          <strong>{String(courses.length).padStart(2, '0')}</strong>
          <span>curso<br />disponible</span>
        </div>
      </section>

      <section className="course-list" aria-label="Cursos">
        {courses.map((course, index) => (
          <motion.button
            className="course-entry"
            type="button"
            key={course.id}
            onClick={() => onOpenCourse(course.id)}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.07, duration: 0.48 }}
            whileHover={reduceMotion ? undefined : { x: 6 }}
          >
            <span className="course-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="course-entry-copy">
              <span className="course-eyebrow">{course.eyebrow}</span>
              <strong>{course.title}</strong>
              <span className="course-description">{course.description}</span>
            </span>
            <span className="course-entry-meta">
              <span className="course-status"><i /> {course.status}</span>
              <span>{course.scope}</span>
              <span>{course.accent}</span>
            </span>
            <span className="course-open"><BookOpenText size={19} /><span>Abrir curso</span><ArrowRight size={18} /></span>
          </motion.button>
        ))}
      </section>

      <footer className="library-footer">
        <span>Una biblioteca, múltiples recorridos.</span>
        <span>Los nuevos cursos se incorporan sin cambiar de aplicación.</span>
      </footer>
    </main>
  )
}
