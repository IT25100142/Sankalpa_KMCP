import Eyebrow from './Eyebrow'
import { motion, useReducedMotion } from 'framer-motion'
import { easeSmooth } from '../../motion/presets'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const reduce = useReducedMotion()
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <motion.div
      className={`flex flex-col ${alignCls}`}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.88, ease: easeSmooth }}
    >
      {eyebrow ? <Eyebrow className="mt-0 text-neutral-500">{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl tracking-[-0.02em] leading-tight text-obsidian-950">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}

