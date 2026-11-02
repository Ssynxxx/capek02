import ProductRow from './ProductRow'

const HEADERS = ['#', 'Name', 'Image', 'Description', 'Category', 'Stock', 'Price', 'Author', 'Actions']

export default function ProductTable({ products, onEdit, onUpload, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-gray-300 text-gray-900">
            {HEADERS.map((h) => (
              <th key={h} className="p-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onEdit={onEdit} onUpload={onUpload} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}