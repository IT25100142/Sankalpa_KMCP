function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Eyebrow({ as: As = 'div', className = '', children }) {
  return (
    <As className={cx('text-xs tracking-[0.24em] uppercase text-semantic-muted', className)}>{children}</As>
  )
}
