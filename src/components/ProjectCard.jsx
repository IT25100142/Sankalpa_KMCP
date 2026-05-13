import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useCallback, useMemo, useRef } from 'react'
import Tag from './ui/Tag'
import { Button } from './ui/Button'
import { easeOutExpo, tiltSpring } from '../motion/presets'

const TILT_STRENGTH = 14

export default function ProjectCard({ project, index = 0 }) {
  const reduce = useReducedMotion()
  const delay = useMemo(() => 0.1 + index * 0.06, [index])
  const rootRef = useRef(null)
  const rafRef = useRef(0)

  const coverSrc = String(project.coverSrc || '').trim()
  const coverAlt = String(project.coverAlt || project.title || '').trim() || project.title
  const coverLabel = project.year ? String(project.year) : project.title

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, tiltSpring)
  const sy = useSpring(ry, tiltSpring)
  const rotateX = useTransform(sx, (v) => `${v}deg`)
  const rotateY = useTransform(sy, (v) => `${v}deg`)

  // Cover-image parallax: image floats slightly with cursor.
  const ix = useMotionValue(0)
  const iy = useMotionValue(0)
  const isx = useSpring(ix, { stiffness: 120, damping: 18, mass: 0.5 })
  const isy = useSpring(iy, { stiffness: 120, damping: 18, mass: 0.5 })

  const handleMove = useCallback(
    (e) => {
      if (reduce) return
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const tiltX = (0.5 - py) * TILT_STRENGTH
      const tiltY = (px - 0.5) * TILT_STRENGTH
      const parX = (px - 0.5) * 12
      const parY = (py - 0.5) * 12
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        rx.set(tiltX)
        ry.set(tiltY)
        ix.set(parX)
        iy.set(parY)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
      })
    },
    [reduce, rx, ry, ix, iy],
  )

  const handleLeave = () => {
    if (reduce) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rx.set(0)
    ry.set(0)
    ix.set(0)
    iy.set(0)
    const el = rootRef.current
    if (el) {
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }
  }

  return (
    <motion.article
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="group relative isolate rounded-3xl overflow-hidden surface hairline text-obsidian-950 transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-cardHover hover:border-obsidian-950/[0.09]"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
      whileHover={reduce ? {} : { y: -4 }}
      style={reduce ? undefined : { transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      <motion.div
        className="relative h-44 sm:h-48 w-full overflow-hidden"
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }
        }
      >
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { x: isx, y: isy }}
        >
          {coverSrc ? (
            <motion.img
              src={coverSrc}
              alt={coverAlt}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{ scale: 1 }}
              whileHover={reduce ? undefined : { scale: 1.08 }}
              transition={{ duration: 0.9, ease: easeOutExpo }}
              style={{ willChange: 'transform' }}
            />
          ) : null}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-white/72 via-white/25 to-obsidian-950/[0.03] ${
              coverSrc ? 'opacity-90' : ''
            }`}
          />
          <div className="absolute inset-0">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-amber-100/20 blur-2xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/[0.14] via-obsidian-950/[0.02] to-transparent" />
        </motion.div>

        <div className="absolute left-5 bottom-5 right-5 flex items-center justify-between gap-3 z-[2]">
          <div className="text-xs font-semibold tracking-wide text-obsidian-950/75 line-clamp-1">
            {coverLabel}
          </div>
          <div className="h-7 w-7 shrink-0 rounded-xl border border-obsidian-950/12 bg-white/[0.78] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
        </div>
      </motion.div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl sm:text-2xl tracking-[-0.01em] text-obsidian-950">{project.title}</h3>
        </div>
        <p className="mt-2 text-sm text-semantic-body leading-relaxed">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags || []).slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button to={`/projects/${project.slug}`} size="sm">
            Read case study
          </Button>
          {project.demoUrl ? (
            <Button href={project.demoUrl} target="_blank" size="sm">
              Live Demo
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button href={project.githubUrl} target="_blank" variant="ghost" size="sm">
              GitHub
            </Button>
          ) : null}
        </div>
      </div>

      {/* Cursor-following spotlight glow */}
      {!reduce ? <span aria-hidden className="spotlight" /> : null}

      {/* Animated gradient edge ring on hover */}
      {!reduce ? <span aria-hidden className="edge-ring" /> : null}
    </motion.article>
  )
}
