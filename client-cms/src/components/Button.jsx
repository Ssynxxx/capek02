export default function Button({ variant = 'primary', icon, type = 'button', className = '', children, ...rest }) {
  return (
    <button type={type} className={`btn btn-${variant} ${className}`} {...rest}>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </button>
  )
}