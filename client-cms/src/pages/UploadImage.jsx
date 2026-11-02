import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg } from '../lib/api'
import useProduct from '../lib/useProduct'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

export default function UploadImage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading } = useProduct(id)

  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('file', file) // nama field harus "file"
      await http.patch(`/apis/products/products/${id}`, fd)
      await Swal.fire({ icon: 'success', title: 'Image updated', timer: 1200, showConfirmButton: false })
      navigate('/')
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed to upload image', text: errMsg(err) })
    } finally {
      setSaving(false)
    }
  }

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

  return (
    <>
      <PageHeader title="Update Image" />

      <div className="max-w-xl">
        <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>

        <div className="my-4 flex flex-wrap gap-6">
          <div>
            <p className="mb-2 text-gray-500">Current image</p>
            <img src={product.imgUrl} alt={product.name} className="h-48 w-48 rounded-lg bg-gray-100 object-cover" />
          </div>
          {preview && (
            <div>
              <p className="mb-2 text-gray-500">New image</p>
              <img src={preview} alt="preview" className="h-48 w-48 rounded-lg bg-gray-100 object-cover" />
            </div>
          )}
        </div>

        <form onSubmit={onSubmit}>
          <label htmlFor="p-file" className="label">
            Select new image <span className="text-red-600">*</span>
          </label>
          <input
            id="p-file"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full rounded-lg border border-gray-300 p-2 file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-1.5 file:font-semibold file:text-white hover:file:bg-brand-dark"
          />

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Button variant="light" className="py-3" onClick={() => navigate('/')}>Cancel</Button>
            <Button type="submit" className="py-3 disabled:opacity-60" disabled={saving || !file}>
              {saving ? 'Uploading...' : 'Update Image'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}