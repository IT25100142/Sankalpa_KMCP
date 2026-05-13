function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Card({ as: As = 'div', className = '', interactive = false, children }) {
  return (
    <As
      className={cx(
        'surface rounded-3xl text-obsidian-950 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        interactive && 'hover:shadow-lift motion-safe:hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </As>
  )
}
