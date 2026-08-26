import { motion, useReducedMotion } from 'motion/react'
import { ListBullets, Timer } from '@phosphor-icons/react'
import type { CourseDocument } from '../content'

interface TableOfContentsProps {
  document: CourseDocument
  activeId: string
}

export function TableOfContents({ document, activeId }: TableOfContentsProps) {
  const reduceMotion = useReducedMotion()
  const primaryHeadings = document.headings.filter((heading) => heading.depth === 2)

  return (
    <aside className="toc-panel" aria-label="En esta página">
      <div className="toc-reading">
        <span className="toc-reading-icon"><Timer size={18} weight="duotone" /></span>
        <span className="toc-reading-copy">
          <small>Tiempo de lectura</small>
          <strong>{document.readingMinutes} min</strong>
        </span>
        <motion.i
          className="toc-reading-pulse"
          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.82, 1, 0.82] }}
          transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
      <div className="toc-heading">
        <div className="toc-title"><ListBullets size={17} /> En esta página</div>
        <span>{primaryHeadings.length} {primaryHeadings.length === 1 ? 'apartado' : 'apartados'}</span>
      </div>
      {primaryHeadings.length > 0 ? (
        <nav aria-label="Índice del documento">
          <ol className="toc-list">
            {primaryHeadings.map((heading, index) => (
              <li key={heading.id}>
                <a
                  className={`toc-link ${activeId === heading.id ? 'is-active' : ''}`}
                  href={`#${heading.id}`}
                  aria-current={activeId === heading.id ? 'location' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    globalThis.document.getElementById(heading.id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
                  }}
                >
                  <span className="toc-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{heading.text}</span>
                  {activeId === heading.id && <motion.i layoutId="toc-active-dot" className="toc-active-dot" />}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <p className="toc-empty">Este documento es una lectura breve sin apartados principales.</p>
      )}
    </aside>
  )
}
