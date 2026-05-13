function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Container({ className = '', fluid = false, ref, children }) {
  return (
    <div ref={ref} className={cx(fluid ? 'container-fluid' : 'container-app', className)}>
      {children}
    </div>
  )
}
