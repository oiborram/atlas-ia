import { motion, useReducedMotion } from 'motion/react'

export function AmbientBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="ambient-field" aria-hidden="true">
      <motion.div
        className="ambient-glow ambient-glow-a"
        animate={reduceMotion ? undefined : {
          x: [0, 118, 38, -24, 0],
          y: [0, 48, 116, 34, 0],
          scale: [1, 1.14, 0.94, 1.06, 1],
        }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="ambient-glow ambient-glow-b"
        animate={reduceMotion ? undefined : {
          x: [0, -132, -42, 34, 0],
          y: [0, -86, 42, 92, 0],
          scale: [1, 0.9, 1.16, 1.04, 1],
        }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="ambient-sweep"
        animate={reduceMotion ? undefined : {
          x: ['0%', '430%'],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.div
        className="ambient-orbit-chart ambient-orbit-chart-a"
        animate={reduceMotion ? undefined : {
          rotate: 360,
          x: [0, -42, 0],
          y: [0, 38, 0],
        }}
        transition={{
          rotate: { duration: 24, ease: 'linear', repeat: Infinity },
          x: { duration: 12, ease: 'easeInOut', repeat: Infinity },
          y: { duration: 15, ease: 'easeInOut', repeat: Infinity },
        }}
      >
        <span className="ambient-ring ambient-ring-inner" />
        <span className="ambient-node ambient-node-a" />
        <span className="ambient-node ambient-node-b" />
      </motion.div>
      <motion.div
        className="ambient-orbit-chart ambient-orbit-chart-b"
        animate={reduceMotion ? undefined : {
          rotate: -360,
          x: [0, 54, 0],
          y: [0, -44, 0],
        }}
        transition={{
          rotate: { duration: 32, ease: 'linear', repeat: Infinity },
          x: { duration: 17, ease: 'easeInOut', repeat: Infinity },
          y: { duration: 14, ease: 'easeInOut', repeat: Infinity },
        }}
      >
        <span className="ambient-ring ambient-ring-inner" />
        <span className="ambient-node ambient-node-a" />
      </motion.div>
    </div>
  )
}
