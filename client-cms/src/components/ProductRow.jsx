import { rupiah, categoryName, authorName } from '../lib/api'

export default function ProductRow({ product, onEdit, onUpload, onDelete }) {
  return (
    <tr className="border-b border-gray-200 align-middle">
      <td className="p-3">#{product.id}</td>
      <td className="p-3 font-bold text-gray-900">{product.name}</td>
      <td className="p-3">
        <img src={product.imgUrl} alt={product.name} className="h-20 w-20 rounded-lg bg-gray-100 object-cover" />
      </td>
      <td className="max-w-60 p-3"><div className="line-clamp-2">{product.description}</div></td>
      <td className="p-3">{categoryName(product)}</td>
      <td className="p-3">{product.stock}</td>
      <td className="p-3 font-bold text-gray-900">{rupiah(product.price)}</td>
      <td className="p-3">{authorName(product)}</td>
      <td className="p-3">
        <div className="flex gap-3">
          <button title="Delete" className="text-red-600" onClick={() => onDelete(product)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button title="Edit" className="text-brand" onClick={() => onEdit(product)}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button title="Update image" className="text-brand" onClick={() => onUpload(product)}>
            <span className="material-symbols-outlined">image</span>
          </button>
        </div>
      </td>
    </tr>
  )
}