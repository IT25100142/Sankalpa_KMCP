import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Card({
  as: As = 'div',
  className = '',
  interactive = false,
  spotlight = false,
  children,
}) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const rafRef = useRef(0)

  const handleMove = useCallback(
    (e) => {
      if (reduce || !spotlight) return
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * 100
      const py = ((e.clientY - r.top) / r.height) * 100
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${px}%`)
        el.style.setProperty('--my', `${py}%`)
      })
    },
    [reduce, spotlight],
  )

  return (
    <As
      ref={rootRef}
      onPointerMove={spotlight ? handleMove : undefined}
      className={cx(
        'group relative isolate overflow-hidden',
        'surface rounded-3xl text-obsidian-950 transition-[box-shadow,transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        interactive &&
          'hover:shadow-cardHover hover:border-obsidian-950/[0.09] motion-safe:hover:-translate-y-0.5',
        className,
      )}
    >
      {spotlight && !reduce ? <span aria-hidden className="spotlight" /> : null}
      <div className="relative z-[1]">{children}</div>
    </As>
  )
}
