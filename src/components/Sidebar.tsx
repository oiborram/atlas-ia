import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BookOpenText,
  CaretDown,
  Check,
  Circle,
  House,
  X,
} from '@phosphor-icons/react'
import { categories, type CourseDocument } from '../content'

interface SidebarProps {
  current: CourseDocument
  mobileOpen: boolean
  onMobileClose: () => void
  onNavigate: (path: string) => void
}

export function Sidebar({ current, mobileOpen, onMobileClose, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setCollapsed((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const content = (
    <div className="sidebar-content">
      <div className="sidebar-mobile-head">
        <span>Navegación</span>
        <button type="button" onClick={onMobileClose} aria-label="Cerrar navegación"><X size={19} /></button>
      </div>
      <button className={`home-link ${current.path === 'README.md' ? 'is-active' : ''}`} type="button" onClick={() => onNavigate('README.md')}>
        <House size={17} weight={current.path === 'README.md' ? 'fill' : 'regular'} />
        <span>Portada del Atlas</span>
        {current.path === 'README.md' && <motion.span layoutId="sidebar-active" className="active-rail" />}
      </button>
      <div className="sidebar-label"><BookOpenText size={14} /> Biblioteca</div>
      <nav aria-label="Unidades del curso">
        {categories.filter((category) => category.id !== 'root').map((category) => {
          const isCollapsed = collapsed.has(category.id)
          const categoryActive = current.categoryId === category.id
          return (
            <div className="nav-category" key={category.id}>
              <button
                className={`category-toggle ${categoryActive ? 'has-active' : ''}`}
                type="button"
                onClick={() => toggle(category.id)}
                aria-expanded={!isCollapsed}
              >
                <span className="category-index">{String(category.index).padStart(2, '0')}</span>
                <span>{category.label}</span>
                <CaretDown size={14} className={isCollapsed ? 'is-collapsed' : ''} />
              </button>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    className="category-documents"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {category.documents.map((document) => {
                      const active = document.path === current.path
                      return (
                        <button
                          type="button"
                          key={document.path}
                          className={`document-link ${active ? 'is-active' : ''}`}
                          onClick={() => onNavigate(document.path)}
                          title={document.title}
                        >
                          <span className="doc-state">{active ? <Check size={12} weight="bold" /> : <Circle size={7} weight="fill" />}</span>
                          <span>{document.title}</span>
                          {active && <motion.span layoutId="sidebar-active" className="active-rail" />}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      <aside className="sidebar desktop-sidebar">{content}</aside>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-nav-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onMobileClose}>
            <motion.aside
              className="sidebar mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 38 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

