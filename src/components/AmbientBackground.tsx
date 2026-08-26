import { motion, useReducedMotion } from 'motion/react'

export function AmbientBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="ambient-field" aria-hidden="true">
      <motion.div
        className="ambient-glow ambient-glow-a"
        animate={reduceMotion ? undefined : {
          x: [0, 64, 18, 0],
          y: [0, 34, 82, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="ambient-glow ambient-glow-b"
        animate={reduceMotion ? undefined : {
          x: [0, -74, -24, 0],
          y: [0, -52, 28, 0],
          scale: [1, 0.94, 1.1, 1],
        }}
        transition={{ duration: 27, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="ambient-orbit-chart ambient-orbit-chart-a"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
      >
        <span className="ambient-ring ambient-ring-inner" />
        <span className="ambient-node ambient-node-a" />
        <span className="ambient-node ambient-node-b" />
      </motion.div>
      <motion.div
        className="ambient-orbit-chart ambient-orbit-chart-b"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 46, ease: 'linear', repeat: Infinity }}
      >
        <span className="ambient-ring ambient-ring-inner" />
        <span className="ambient-node ambient-node-a" />
      </motion.div>
    </div>
  )
}
