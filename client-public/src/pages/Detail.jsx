import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg, pickItem, rupiah, categoryName, authorName } from '../lib/api'

export default function Detail() {
  const { id } = useParams()
  const [result, setResult] = useState({ id: null, product: null })
  const loading = result.id !== id
  const product = result.product

  useEffect(() => {
    let ignore = false

    http
      .get(`/apis/pub/products/products/${id}`)
      .then((res) => {
        if (!ignore) setResult({ id, product: pickItem(res.data) })
      })
      .catch((err) => {
        if (ignore) return
        setResult({ id, product: null })
        Swal.fire({ icon: 'error', title: 'Failed to load product', text: errMsg(err) })
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="mb-4 text-lg">Product not found.</p>
        <Link to="/" className="font-semibold text-brand hover:underline">← Back to products</Link>
      </div>
    )
  }

  const cat = categoryName(product)
  const author = authorName(product)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/" className="font-semibold text-brand hover:underline">← Back to products</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <img src={product.imgUrl} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          {cat && (
            <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-gray-900">
              {cat}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900">{product.name}</h1>
          <div className="my-4 text-3xl font-extrabold text-gray-900">{rupiah(product.price)}</div>
          <p className="whitespace-pre-line text-lg leading-relaxed">{product.description}</p>
          <ul className="mt-6 space-y-1">
            <li><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</li>
            {author && <li><strong>Listed by:</strong> {author}</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}