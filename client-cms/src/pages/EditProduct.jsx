import { Link, useParams } from 'react-router-dom'
import useProduct from '../lib/useProduct'
import ProductForm from './ProductForm'

export default function EditProduct() {
  const { id } = useParams()
  const { product, loading } = useProduct(id)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4">Product not found.</p>
        <Link to="/" className="font-semibold text-brand hover:underline">← Back to products</Link>
      </div>
    )
  }

  return <ProductForm product={product} />
}