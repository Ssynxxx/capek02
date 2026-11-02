import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { http, errMsg, pickList } from '../lib/api'
import PageHeader from '../components/PageHeader'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    http
      .get('/apis/products/categories')
      .then((res) => {
        if (!ignore) setCategories(pickList(res.data))
      })
      .catch((err) => {
        if (!ignore) Swal.fire({ icon: 'error', title: 'Failed to load categories', text: errMsg(err) })
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <PageHeader title="Categories" />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300 text-gray-900">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan="2" className="p-6 text-center text-gray-500">No categories.</td></tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="border-b border-gray-200">
                    <td className="p-3">#{c.id}</td>
                    <td className="p-3 font-bold text-gray-900">{c.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}