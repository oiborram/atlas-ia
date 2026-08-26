import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowsIn,
  ArrowsOut,
  Command,
  List,
  MagnifyingGlass,
  Moon,
  Sun,
} from '@phosphor-icons/react'
import { documents, getDocumentNeighbors, homeDocument } from './content'
import { AmbientBackground } from './components/AmbientBackground'
import { HomeCover } from './components/HomeCover'
import { MarkdownArticle } from './components/MarkdownArticle'
import { SearchDialog } from './components/SearchDialog'
import { Sidebar } from './components/Sidebar'
import { TableOfContents } from './components/TableOfContents'

type Theme = 'light' | 'dark'

function readPathFromHash(): string {
  const match = window.location.hash.match(/^#\/doc\/([^?]+)/)
  if (!match) return homeDocument.path
  try {
    const path = decodeURIComponent(match[1])
    return documents.some((document) => document.path === path) ? path : homeDocument.path
  } catch {
    return homeDocument.path
  }
}

function initialTheme(): Theme {
  const stored = window.localStorage.getItem('atlas-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [currentPath, setCurrentPath] = useState(readPathFromHash)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [stageMode, setStageMode] = useState(false)
  const [activeHeading, setActiveHeading] = useState('')
  const articleScrollRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const current = useMemo(
    () => documents.find((document) => document.path === currentPath) || homeDocument,
    [currentPath],
  )
  const neighbors = getDocumentNeighbors(current)
  const { scrollYProgress } = useScroll({ container: articleScrollRef })
  const readingProgress = useSpring(scrollYProgress, { stiffness: 170, damping: 28, mass: 0.35 })

  const navigate = useCallback((path: string, anchor?: string) => {
    const hash = `#/doc/${encodeURIComponent(path)}${anchor ? `?anchor=${encodeURIComponent(anchor)}` : ''}`
    if (window.location.hash === hash) {
      if (anchor) globalThis.document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      else articleScrollRef.current?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    } else {
      window.location.hash = hash
    }
    setMobileNavOpen(false)
  }, [reduceMotion])

  useEffect(() => {
    const onHashChange = () => {
      const path = readPathFromHash()
      setCurrentPath(path)
      const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
      const anchor = params.get('anchor')
      window.setTimeout(() => {
        if (anchor) globalThis.document.getElementById(anchor)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
        else articleScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
      }, 80)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [reduceMotion])

  useEffect(() => {
    globalThis.document.documentElement.dataset.theme = theme
    window.localStorage.setItem('atlas-theme', theme)
  }, [theme])

  useEffect(() => {
    globalThis.document.title = `${current.title} · Atlas IA`
  }, [current.title])

  useEffect(() => {
    const root = articleScrollRef.current
    if (!root) return
    const elements = current.headings
      .filter((heading) => heading.depth === 2)
      .map((heading) => globalThis.document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element))
    setActiveHeading(elements[0]?.id || '')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveHeading(visible[0].target.id)
      },
      { root, rootMargin: '-12% 0px -76% 0px', threshold: [0, 1] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [current])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing = target.matches('input, textarea, [contenteditable="true"]')
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMobileNavOpen(false)
      }
      if (!typing && event.key.toLowerCase() === 'p') setStageMode((value) => !value)
      if (!typing && event.key.toLowerCase() === 't') setTheme((value) => value === 'dark' ? 'light' : 'dark')
      if (!typing && event.altKey && event.key === 'ArrowRight' && neighbors.next) navigate(neighbors.next.path)
      if (!typing && event.altKey && event.key === 'ArrowLeft' && neighbors.previous) navigate(neighbors.previous.path)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate, neighbors.next, neighbors.previous])

  const pageContent = current.path === 'README.md'
    ? current.content.replace(/^#\s+.+\r?\n/, '')
    : current.content

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
      <div className={`app-shell ${stageMode ? 'is-stage-mode' : ''}`}>
        <AmbientBackground />
        <motion.div className="reading-progress" style={{ scaleX: readingProgress }} />
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-button" type="button" onClick={() => setMobileNavOpen(true)} aria-label="Abrir navegación">
              <List size={20} />
            </button>
            <button className="brand" type="button" onClick={() => navigate('README.md')} aria-label="Ir a la portada">
              <motion.span className="brand-mark" whileHover={{ rotate: 8, scale: 1.05 }}>
                <span>A</span>
              </motion.span>
              <span className="brand-copy"><strong>Atlas</strong><small>Inteligencia Artificial</small></span>
            </button>
          </div>
          <div className="topbar-context">
            <span>{current.categoryLabel}</span>
            <i />
            <strong>{current.title}</strong>
          </div>
          <div className="topbar-actions">
            <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)} aria-label="Buscar en el Atlas">
              <MagnifyingGlass size={17} />
              <span>Buscar</span>
              <kbd><Command size={12} /> K</kbd>
            </button>
            <button type="button" onClick={() => setStageMode((value) => !value)} aria-label={stageMode ? 'Salir del modo escenario' : 'Activar modo escenario'} title="Modo escenario · P">
              {stageMode ? <ArrowsIn size={18} /> : <ArrowsOut size={18} />}
            </button>
            <button type="button" onClick={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} aria-label="Cambiar tema" title="Cambiar tema · T">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <Sidebar current={current} mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} onNavigate={navigate} />

        <main className="article-scroll" ref={articleScrollRef} tabIndex={-1}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.article
              className="article-canvas"
              key={current.path}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.992 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.995 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.path === 'README.md' ? (
                <HomeCover onNavigate={navigate} />
              ) : (
                <div className="article-kicker">
                  <span>{String(Math.floor(current.index / 100)).padStart(2, '0')}</span>
                  <i />
                  <span>{current.categoryLabel}</span>
                  <span className="article-reading-time">{current.readingMinutes} min</span>
                </div>
              )}
              <MarkdownArticle document={current} content={pageContent} onNavigate={navigate} />
              <nav className="document-pagination" aria-label="Navegación entre documentos">
                {neighbors.previous ? (
                  <motion.button type="button" onClick={() => navigate(neighbors.previous!.path)} whileHover={{ x: -4 }}>
                    <ArrowLeft size={20} />
                    <span><small>Anterior</small><strong>{neighbors.previous.title}</strong></span>
                  </motion.button>
                ) : <span />}
                {neighbors.next && (
                  <motion.button className="next-document" type="button" onClick={() => navigate(neighbors.next!.path)} whileHover={{ x: 4 }}>
                    <span><small>Siguiente</small><strong>{neighbors.next.title}</strong></span>
                    <ArrowRight size={20} />
                  </motion.button>
                )}
              </nav>
              <footer className="course-footer">
                <span>Atlas práctico de Inteligencia Artificial</span>
                <span>Revisión 26.08.2026</span>
              </footer>
            </motion.article>
          </AnimatePresence>
        </main>

        <TableOfContents document={current} activeId={activeHeading} />

        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
      </div>
    </MotionConfig>
  )
}

export default App
