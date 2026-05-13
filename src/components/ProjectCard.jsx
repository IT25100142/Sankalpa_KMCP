import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import Tag from './ui/Tag'
import { Button } from './ui/Button'
import { easeSmooth, transition as motionTransition } from '../motion/presets'

function makeTilt(e, rect, strength = 12) {
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  const rx = (0.5 - py) * strength
  const ry = (px - 0.5) * strength
  return { rx, ry, px, py }
}

const liftShadow =
  '0 1px 0 rgba(255,255,255,0.65), 0 12px 48px rgba(10,10,10,0.12), 0 32px 80px rgba(10,10,10,0.08)'

export default function ProjectCard({ project, index = 0 }) {
  const reduce = useReducedMotion()
  const delay = useMemo(() => 0.1 + index * 0.06, [index])
  const tiltRaf = useRef(0)

  useEffect(() => () => {
    if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current)
  }, [])

  const onTiltMove = (e) => {
    if (reduce) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const { rx, ry, px, py } = makeTilt(e, rect, 10)
    if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current)
    tiltRaf.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      el.style.setProperty('--mx', `${Math.round(px * 100)}%`)
      el.style.setProperty('--my', `${Math.round(py * 100)}%`)
    })
  }

  const onTiltLeave = (e) => {
    if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current)
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return (
    <motion.article
      className="group relative rounded-3xl overflow-hidden surface hairline text-obsidian-950"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: easeSmooth }}
      whileHover={
        reduce
          ? {}
          : {
              boxShadow: liftShadow,
              y: -1,
              transition: motionTransition.hoverCard,
            }
      }
    >
      <motion.div
        className="relative h-44 w-full"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-white/50 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-accent-500/15 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-obsidian-950/10 blur-2xl" />
        </div>
        <div className="absolute left-5 bottom-5 right-5 flex items-center justify-between gap-3">
          <div className="text-xs font-semibold text-obsidian-950/75">Thumbnail</div>
          <div className="h-7 w-7 rounded-xl border border-obsidian-950/15 bg-white/60" />
        </div>
      </motion.div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-obsidian-950">{project.title}</h3>
        </div>
        <p className="mt-2 text-sm text-obsidian-950/65 leading-relaxed">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags || []).slice(0, 4).map((t) => (
            <Tag key={t}>
              {t}
            </Tag>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button to={`/projects/${project.slug}`} size="sm">
            Read case study
          </Button>
          {project.demoUrl ? (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-sm px-4 py-2"
              whileTap={{ scale: 0.98 }}
            >
              Live Demo
            </motion.a>
          ) : null}
          {project.githubUrl ? (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-sm px-4 py-2"
              whileTap={{ scale: 0.98 }}
            >
              GitHub
            </motion.a>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-transparent" />
      </div>
    </motion.article>
  )
}

