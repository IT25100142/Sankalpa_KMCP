function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Container({ className = '', fluid = false, children }) {
  return <div className={cx(fluid ? 'container-fluid' : 'container-app', className)}>{children}</div>
}
