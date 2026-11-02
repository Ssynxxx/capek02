export default function FilterBar({ categories, category, onCategory, sort, onSort }) {
  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm ${
      active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900 hover:border-brand'
    }`

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <button className={chip(category === 'All')} onClick={() => onCategory('All')}>All</button>
        {categories.map((c) => (
          <button key={c.id} className={chip(category === c.name)} onClick={() => onCategory(c.name)}>
            {c.name}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <option value="DESC">Newest first</option>
        <option value="ASC">Oldest first</option>
      </select>
    </div>
  )
}