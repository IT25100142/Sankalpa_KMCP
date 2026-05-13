function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Tag({ as: As = 'span', className = '', children }) {
  return (
    <As
      className={cx(
        'rounded-full border border-semantic-borderSubtle bg-white/[0.72] px-3 py-1 text-xs font-semibold text-semantic-body shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </As>
  )
}

