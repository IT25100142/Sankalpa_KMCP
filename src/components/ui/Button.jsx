import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { magnetSpring } from '../../motion/presets'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

const MotionLink = motion(Link)

const STRENGTH_BY_SIZE = {
  sm: 0.12,
  md: 0.16,
  lg: 0.2,
}

const MAX_BY_SIZE = {
  sm: 6,
  md: 8,
  lg: 12,
}

function clamp(value, max) {
  if (value > max) return max
  if (value < -max) return -max
  return value
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  target,
  rel,
  type,
  onClick,
  disabled,
  ariaBusy,
  children,
}) {
  const reduce = useReducedMotion()
  const elRef = useRef(null)
  const rafRef = useRef(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, magnetSpring)
  const y = useSpring(my, magnetSpring)

  const strength = STRENGTH_BY_SIZE[size] ?? STRENGTH_BY_SIZE.md
  const cap = MAX_BY_SIZE[size] ?? MAX_BY_SIZE.md

  const updateFromEvent = useCallback(
    (e) => {
      const el = elRef.current
      if (!el || reduce) return
      const r = el.getBoundingClientRect()
      const cx2 = r.left + r.width / 2
      const cy2 = r.top + r.height / 2
      const dx = e.clientX - cx2
      const dy = e.clientY - cy2
      const px = ((e.clientX - r.left) / r.width) * 100
      const py = ((e.clientY - r.top) / r.height) * 100
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        mx.set(clamp(dx * strength, cap))
        my.set(clamp(dy * strength, cap))
        el.style.setProperty('--mx', `${px}%`)
        el.style.setProperty('--my', `${py}%`)
      })
    },
    [reduce, strength, cap, mx, my],
  )

  const handleMove = (e) => updateFromEvent(e)
  const handleLeave = () => {
    if (reduce) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    mx.set(0)
    my.set(0)
    const el = elRef.current
    if (el) {
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }
  }

  const base =
    'inline-flex items-center justify-center rounded-full font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-linen-50 disabled:opacity-50 disabled:pointer-events-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-sm',
  }

  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    link: 'btn-link',
  }

  const cls = cx(base, sizes[size] || sizes.md, variants[variant] || variants.primary, className)

  const motionStyle = reduce || variant === 'link' ? undefined : { x, y, willChange: 'transform' }
  const motionProps = {
    style: motionStyle,
    onPointerMove: variant === 'link' ? undefined : handleMove,
    onPointerLeave: variant === 'link' ? undefined : handleLeave,
    whileTap: reduce ? undefined : { scale: 0.97 },
    transition: { type: 'spring', ...magnetSpring },
  }

  if (to) {
    return (
      <MotionLink ref={elRef} to={to} className={cls} onClick={onClick} {...motionProps}>
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
      </MotionLink>
    )
  }
  if (href) {
    const safeRel = target === '_blank' ? rel || 'noreferrer' : rel
    return (
      <motion.a
        ref={elRef}
        href={href}
        target={target}
        rel={safeRel}
        className={cls}
        onClick={onClick}
        {...motionProps}
      >
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={elRef}
      type={type || 'button'}
      onClick={onClick}
      className={cls}
      disabled={disabled}
      aria-busy={ariaBusy ? true : undefined}
      {...motionProps}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
