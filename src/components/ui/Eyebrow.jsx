function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Eyebrow({ as: As = 'div', className = '', children }) {
  return (
    <As
      className={cx(
        'text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-semantic-muted',
        className,
      )}
    >
      {children}
    </As>
  )
}
