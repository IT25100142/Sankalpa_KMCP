import { Link } from 'react-router-dom'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
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
  children,
}) {
  const base =
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-50 disabled:opacity-50 disabled:pointer-events-none'

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

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    const safeRel = target === '_blank' ? rel || 'noreferrer' : rel
    return (
      <a href={href} target={target} rel={safeRel} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type || 'button'} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

