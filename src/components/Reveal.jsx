import { motion, useReducedMotion } from 'framer-motion'

// Subtiele fade/translate-in op scroll. Houd het rustig en consistent.
export default function Reveal({ children, as = 'div', delay = 0, y = 22, className, style }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
