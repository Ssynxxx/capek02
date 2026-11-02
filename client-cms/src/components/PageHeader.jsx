export default function PageHeader({ title, children }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 pt-5">
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  )
}