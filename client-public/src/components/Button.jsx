const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  dark: 'bg-gray-900 text-white hover:bg-black',
  light: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
}

export default function Button({ variant = 'primary', className = '', type = 'button', children, ...rest }) {
  return (
    <button
      type={type}
      className={`rounded-full px-5 py-2 font-semibold transition ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}