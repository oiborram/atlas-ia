import { motion } from 'motion/react'
import { ListBullets, Timer } from '@phosphor-icons/react'
import type { CourseDocument } from '../content'

interface TableOfContentsProps {
  document: CourseDocument
  activeId: string
}

export function TableOfContents({ document, activeId }: TableOfContentsProps) {
  return (
    <aside className="toc-panel" aria-label="En esta página">
      <div className="toc-meta">
        <Timer size={16} />
        <span>{document.readingMinutes} min de lectura</span>
      </div>
      <div className="toc-title"><ListBullets size={16} /> En esta página</div>
      {document.headings.length > 0 ? (
        <nav>
          {document.headings.map((heading) => (
            <a
              key={heading.id}
              className={`toc-link depth-${heading.depth} ${activeId === heading.id ? 'is-active' : ''}`}
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault()
                globalThis.document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {activeId === heading.id && <motion.span layoutId="toc-marker" className="toc-marker" />}
              {heading.text}
            </a>
          ))}
        </nav>
      ) : (
        <p className="toc-empty">Lectura breve, sin subsecciones.</p>
      )}
    </aside>
  )
}
