import { useRef } from 'react'
import Eyebrow from './Eyebrow'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { easeEditorial, easeOutExpo } from '../../motion/presets'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const eyebrowRowCls = align === 'center' ? 'justify-center' : 'justify-start'

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const y = reduce ? 0 : yRaw

  const words = String(title || '').split(' ')

  return (
    <motion.div ref={sectionRef} className={`flex flex-col ${alignCls}`} style={{ y }}>
      {eyebrow ? (
        <motion.div
          className={`mt-0 flex items-center gap-3 ${eyebrowRowCls}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <span
            className="h-px w-8 sm:w-10 shrink-0 bg-gradient-to-r from-transparent to-obsidian-950/22 sm:from-obsidian-950/10"
            aria-hidden
          />
          <Eyebrow className="mt-0">{eyebrow}</Eyebrow>
          {align === 'center' ? (
            <span
              className="h-px w-8 sm:w-10 shrink-0 bg-gradient-to-l from-transparent to-obsidian-950/22 sm:from-obsidian-950/10"
              aria-hidden
            />
          ) : null}
        </motion.div>
      ) : null}

      <h2
        className={`mt-3 font-serif text-3xl sm:text-4xl md:text-[2.75rem] tracking-[-0.025em] leading-[1.05] text-obsidian-950 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        {reduce
          ? title
          : words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="inline-block overflow-hidden align-bottom"
                style={{ marginRight: '0.28em' }}
              >
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.85, ease: easeEditorial, delay: 0.05 + i * 0.07 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
      </h2>

      {subtitle ? (
        <motion.p
          className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-semantic-body ${
            align === 'center' ? 'mx-auto' : ''
          }`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
