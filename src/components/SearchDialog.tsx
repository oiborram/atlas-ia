import { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, FileText, MagnifyingGlass, X } from '@phosphor-icons/react'
import type { CourseDocument } from '../content'
import { documents, toPlainText } from '../content'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  onNavigate: (path: string) => void
}

const searchItems = documents.map((document) => ({
  ...document,
  searchable: toPlainText(document.content),
}))

export function SearchDialog({ open, onClose, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [selection, setSelection] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const fuse = useMemo(
    () => new Fuse(searchItems, {
      keys: [
        { name: 'title', weight: 0.55 },
        { name: 'categoryLabel', weight: 0.2 },
        { name: 'searchable', weight: 0.25 },
      ],
      threshold: 0.32,
      ignoreLocation: true,
    }),
    [],
  )

  const results: CourseDocument[] = query.trim()
    ? fuse.search(query.trim(), { limit: 12 }).map((result) => result.item)
    : documents.slice(0, 12)

  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelection(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => setSelection(0), [query])

  const select = (document: CourseDocument) => {
    onNavigate(document.path)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Buscar en el Atlas"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <div className="search-input-row">
              <MagnifyingGlass size={21} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    setSelection((value) => Math.min(value + 1, results.length - 1))
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    setSelection((value) => Math.max(value - 1, 0))
                  }
                  if (event.key === 'Enter' && results[selection]) select(results[selection])
                  if (event.key === 'Escape') onClose()
                }}
                placeholder="Busca conceptos, técnicas o herramientas..."
                aria-label="Buscar"
              />
              <button type="button" onClick={onClose} aria-label="Cerrar búsqueda"><X size={18} /></button>
            </div>
            <div className="search-results" role="listbox">
              {results.length ? results.map((document, index) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={index === selection}
                  className={index === selection ? 'is-selected' : ''}
                  key={document.path}
                  onMouseEnter={() => setSelection(index)}
                  onClick={() => select(document)}
                >
                  <span className="search-result-icon"><FileText size={18} /></span>
                  <span className="search-result-copy">
                    <strong>{document.title}</strong>
                    <small>{document.categoryLabel}</small>
                  </span>
                  <ArrowRight size={17} />
                </button>
              )) : (
                <div className="search-empty">
                  <MagnifyingGlass size={30} />
                  <strong>Sin coincidencias</strong>
                  <span>Prueba con un concepto más general.</span>
                </div>
              )}
            </div>
            <div className="search-footer"><span>↑↓ navegar</span><span>↵ abrir</span><span>esc cerrar</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

