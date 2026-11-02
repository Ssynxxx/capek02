import { Link } from 'react-router-dom'
import { rupiah, categoryName } from '../lib/api'

export default function ProductCard({ product }) {
  const cat = categoryName(product)
  const to = `/products/${product.id}`

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={to} className="block aspect-square w-full bg-gray-100">
        <img src={product.imgUrl} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {cat && (
          <span className="mb-2 w-fit rounded-full bg-accent px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-gray-900">
            {cat}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>
        <div className="mt-auto pt-4">
          <div className="mb-2 text-xl font-extrabold text-gray-900">{rupiah(product.price)}</div>
          <Link
            to={to}
            className="block w-full rounded-full bg-brand py-2 text-center font-semibold text-white hover:bg-brand-dark"
          >
            View detail
          </Link>
        </div>
      </div>
    </div>
  )
}