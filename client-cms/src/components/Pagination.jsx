export default function Pagination({ page, totalPage, onChange }) {
  if (totalPage <= 1) return null

  const start = Math.max(1, Math.min(page - 2, totalPage - 4))
  const end = Math.min(totalPage, start + 4)
  const pages = []
  for (let p = start; p <= end; p++) pages.push(p)

  const base = 'min-w-10 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium'

  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Pagination">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${base} text-brand disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`${base} ${p === page ? 'border-brand bg-brand text-white' : 'text-brand hover:bg-gray-100'}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page >= totalPage}
        onClick={() => onChange(page + 1)}
        className={`${base} text-brand disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Next
      </button>
    </nav>
  )
}