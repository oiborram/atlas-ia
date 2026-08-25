import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Books, CirclesThreePlus, FileText, Timer } from '@phosphor-icons/react'
import { categories, documents } from '../content'

interface HomeCoverProps {
  onNavigate: (path: string) => void
}

const timeline = categories.filter((category) => category.index >= 2 && category.index <= 9)

export function HomeCover({ onNavigate }: HomeCoverProps) {
  const reduceMotion = useReducedMotion()
  const totalMinutes = documents.reduce((sum, document) => sum + document.readingMinutes, 0)
  const stats = [
    { value: documents.length, label: 'documentos', icon: FileText },
    { value: categories.length - 1, label: 'secciones', icon: Books },
    { value: `${Math.round(totalMinutes / 60)} h`, label: 'de lectura', icon: Timer },
  ]

  return (
    <section className="atlas-cover" aria-labelledby="atlas-cover-title">
      <div className="cover-grid" aria-hidden="true" />
      <div className="orbit-field" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className={`orbit orbit-${index + 1}`}
            animate={reduceMotion ? undefined : { rotate: index % 2 ? -360 : 360 }}
            transition={{ duration: 28 + index * 12, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <motion.span
          className="orbit-core"
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.div
        className="cover-copy"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="eyebrow"><CirclesThreePlus size={16} /> Curso vivo · edición 2026</div>
        <h1 id="atlas-cover-title">Entender la IA como<br /><em>un sistema de ideas.</em></h1>
        <p>
          De AlphaGo a los agentes autónomos. Un atlas cronológico y funcional para programadores que quieren comprender qué cambió, por qué importa y cómo se construye.
        </p>
        <div className="cover-actions">
          <motion.button
            type="button"
            className="primary-action"
            onClick={() => onNavigate('00-guia/01-como-usar-el-curso.md')}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            Empezar el recorrido <ArrowRight size={18} />
          </motion.button>
          <span className="cover-hint">Pulsa <kbd>⌘ K</kbd> para buscar</span>
        </div>
      </motion.div>
      <motion.div
        className="cover-stats"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.28 } } }}
        initial="hidden"
        animate="visible"
      >
        {stats.map(({ value, label, icon: Icon }) => (
          <motion.div key={label} variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
            <Icon size={17} />
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="era-timeline" aria-label="Recorrido cronológico">
        <div className="timeline-line" />
        {timeline.map((category, index) => (
          <motion.button
            type="button"
            key={category.id}
            onClick={() => onNavigate(category.documents[0].path)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 + index * 0.055, duration: 0.42 }}
            whileHover={{ y: -5 }}
          >
            <span className="timeline-node" />
            <small>{index === 0 ? '2016' : index === timeline.length - 1 ? 'HOY' : `0${index + 1}`}</small>
            <strong>{category.shortLabel}</strong>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

