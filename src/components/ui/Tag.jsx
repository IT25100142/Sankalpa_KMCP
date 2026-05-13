function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Tag({ as: As = 'span', className = '', children }) {
  return (
    <As
      className={cx(
        'rounded-full border border-semantic-borderSubtle bg-white/60 px-3 py-1 text-xs font-semibold text-semantic-body',
        className,
      )}
    >
      {children}
    </As>
  )
}

