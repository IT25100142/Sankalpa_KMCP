import { motion, useReducedMotion } from 'framer-motion'
import { transition as t } from '../motion/presets'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: t.pageEnter,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: t.pageExit,
  },
}

export default function PageTransition({ children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      className={`relative min-h-screen outline-none ${className}`}
      variants={
        reduce
          ? {
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.2 } },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }
          : pageVariants
      }
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}

