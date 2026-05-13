import { motion, useReducedMotion } from 'framer-motion'
import { easeEditorial, transition as t } from '../motion/presets'

const pageVariants = {
  initial: { opacity: 0, y: 32, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...t.pageEnter, delay: 0.18 },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: t.pageExit,
  },
}

const maskVariants = {
  initial: { y: '100%' },
  animate: {
    y: '-100%',
    transition: { duration: 0.85, ease: easeEditorial },
  },
  exit: {
    y: '0%',
    transition: { duration: 0.55, ease: easeEditorial },
  },
}

export default function PageTransition({ children, className = '' }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <motion.main
        id="main-content"
        tabIndex={-1}
        className={`relative min-h-screen outline-none ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {children}
      </motion.main>
    )
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-bottom"
        variants={maskVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          background:
            'linear-gradient(180deg, #0a0a0a 0%, #141414 55%, #0a0a0a 100%)',
          boxShadow: '0 -40px 120px rgba(10,8,6,0.5)',
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(251,113,133,0.18), transparent 60%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(217,119,6,0.14), transparent 60%)',
          }}
        />
      </motion.div>

      <motion.main
        id="main-content"
        tabIndex={-1}
        className={`relative min-h-screen outline-none ${className}`}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </>
  )
}
