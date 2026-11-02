import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg, pickList, categoryIdOf } from '../lib/api'
import PageHeader from '../components/PageHeader'
import FormField from '../components/FormField'
import Button from '../components/Button'

export default function ProductForm({ product }) {
  const navigate = useNavigate()
  const isEdit = Boolean(product)

  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: product?.name ?? '',
    categoryId: product ? categoryIdOf(product) : '',
    description: product?.description ?? '',
    stock: product?.stock ?? '',
    price: product?.price ?? '',
    imgUrl: product?.imgUrl ?? '',
  })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  useEffect(() => {
    http
      .get('/apis/products/categories')
      .then((res) => setCategories(pickList(res.data)))
      .catch((err) => Swal.fire({ icon: 'error', title: 'Failed to load categories', text: errMsg(err) }))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
      }
      if (form.imgUrl.trim()) body.imgUrl = form.imgUrl.trim()

      if (isEdit) await http.put(`/apis/products/products/${product.id}`, body)
      else await http.post('/apis/products/products', body)

      await Swal.fire({
        icon: 'success',
        title: isEdit ? 'Product updated' : 'Product created',
        timer: 1200,
        showConfirmButton: false,
      })
      navigate('/')
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed to save product', text: errMsg(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader title={isEdit ? 'Update Product' : 'New Product'} />

      <form className="max-w-xl" onSubmit={onSubmit}>
        <FormField
          id="p-name" name="name" label="Name" required
          placeholder="Enter product name" value={form.name} onChange={onChange}
        />

        <FormField as="select" id="p-category" name="categoryId" label="Category" required value={form.categoryId} onChange={onChange}>
          <option value="" disabled>-- Select Category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </FormField>

        <FormField
          as="textarea" rows="3" id="p-desc" name="description" label="Description" required
          placeholder="Enter product description" value={form.description} onChange={onChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="p-stock" name="stock" type="number" min="0" label="Stock" required
            placeholder="Enter stock" value={form.stock} onChange={onChange}
          />
          <FormField
            id="p-price" name="price" type="number" min="0" label="Price" required
            placeholder="Enter price" value={form.price} onChange={onChange}
          />
        </div>

        <FormField
          id="p-img" name="imgUrl" type="text" label="Image URL"
          placeholder="Enter product image url" value={form.imgUrl} onChange={onChange}
        />

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button variant="light" className="py-3" onClick={() => navigate('/')}>Cancel</Button>
          <Button type="submit" className="py-3 disabled:opacity-60" disabled={saving}>
            {saving ? 'Saving...' : 'Submit'}
          </Button>
        </div>
      </form>
    </>
  )
}