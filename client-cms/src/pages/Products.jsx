import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg, pickList, categoryIdOf } from '../lib/api'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import ProductTable from '../components/ProductTable'
import Pagination from '../components/Pagination'

const PER_PAGE = 8

const SORTERS = {
  newest: (a, b) => b.id - a.id,
  oldest: (a, b) => a.id - b.id,
  name: (a, b) => String(a.name).localeCompare(String(b.name)),
  priceAsc: (a, b) => Number(a.price) - Number(b.price),
  priceDesc: (a, b) => Number(b.price) - Number(a.price),
}

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const reload = () => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  useEffect(() => {
    let ignore = false

    Promise.all([http.get('/apis/products/products'), http.get('/apis/products/categories')])
      .then(([p, c]) => {
        if (ignore) return
        setProducts(pickList(p.data))
        setCategories(pickList(c.data))
      })
      .catch((err) => {
        if (!ignore) Swal.fire({ icon: 'error', title: 'Failed to load products', text: errMsg(err) })
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [reloadKey])

  const changeSearch = (v) => { setSearch(v); setPage(1) }
  const changeCategory = (v) => { setCatFilter(v); setPage(1) }
  const changeSort = (v) => { setSort(v); setPage(1) }

  const term = search.trim().toLowerCase()
  const filtered = products
    .filter((p) => !term || String(p.name).toLowerCase().includes(term))
    .filter((p) => !catFilter || String(categoryIdOf(p)) === catFilter)
    .sort(SORTERS[sort])

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPage)
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const onDelete = async (p) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `Delete "${p.name}"?`,
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#dc2626',
    })
    if (!result.isConfirmed) return

    try {
      await http.delete(`/apis/products/products/${p.id}`)
      await Swal.fire({ icon: 'success', title: 'Deleted', timer: 1000, showConfirmButton: false })
      reload()
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed to delete product', text: errMsg(err) })
    }
  }

  return (
    <>
      <PageHeader title="Products">
        <Button icon="add" onClick={() => navigate('/products/new')}>New Product</Button>
      </PageHeader>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <input
          type="search"
          className="input"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
        />
        <select className="input" value={catFilter} onChange={(e) => changeCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="input" value={sort} onChange={(e) => changeSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name">Name (A-Z)</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
        </div>
      ) : rows.length === 0 ? (
        <p className="py-16 text-center text-gray-500">No products found.</p>
      ) : (
        <ProductTable
          products={rows}
          onEdit={(p) => navigate(`/products/${p.id}/edit`)}
          onUpload={(p) => navigate(`/products/${p.id}/image`)}
          onDelete={onDelete}
        />
      )}

      <Pagination page={current} totalPage={totalPage} onChange={setPage} />
    </>
  )
}