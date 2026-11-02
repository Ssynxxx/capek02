export default function FormField({ label, id, required = false, as: Tag = 'input', children, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Tag id={id} className="input" required={required} {...props}>
        {children}
      </Tag>
    </div>
  )
}