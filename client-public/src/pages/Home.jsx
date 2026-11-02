import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg, pickList, pickPagination } from '../lib/api'
import Hero from '../components/Hero'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const LIMIT = 8

export default function Home() {
  const [params, setParams] = useSearchParams()

  const search = params.get('q') || ''
  const category = params.get('i') || 'All'
  const sort = params.get('sort') || 'DESC'
  const page = Number(params.get('page')) || 1

  const [categories, setCategories] = useState([])
  const [result, setResult] = useState({ key: '', products: [], totalPage: 1 })

  const key = [search, category, sort, page].join('|')
  const loading = result.key !== key

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries({ page: 1, ...patch }).forEach(([k, v]) => {
      if (v === '' || v == null) next.delete(k)
      else next.set(k, v)
    })
    setParams(next)
  }

  useEffect(() => {
    http
      .get('/apis/pub/products/categories')
      .then((res) => setCategories(pickList(res.data)))
      .catch((err) => Swal.fire({ icon: 'error', title: 'Failed to load categories', text: errMsg(err) }))
  }, [])

  useEffect(() => {
    let ignore = false

    http
      .get('/apis/pub/products/products', {
        params: {
          q: search || undefined,
          i: category === 'All' ? undefined : category,
          limit: LIMIT,
          page,
          sort,
        },
      })
      .then((res) => {
        if (ignore) return
        const list = pickList(res.data)
        setResult({ key, products: list, totalPage: pickPagination(res.data, list.length, LIMIT, page) })
      })
      .catch((err) => {
        if (ignore) return
        setResult({ key, products: [], totalPage: 1 })
        Swal.fire({ icon: 'error', title: 'Failed to load products', text: errMsg(err) })
      })

    return () => {
      ignore = true
    }
  }, [search, category, sort, page, key])

  return (
    <>
      {/* key=search: kolom search ikut ter-reset kalau URL berubah dari luar (mis. klik logo) */}
      <Hero key={search} initial={search} onSearch={(v) => update({ q: v })} />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <FilterBar
          categories={categories}
          category={category}
          onCategory={(c) => update({ i: c === 'All' ? '' : c })}
          sort={sort}
          onSort={(s) => update({ sort: s })}
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
          </div>
        ) : result.products.length === 0 ? (
          <p className="py-16 text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {result.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPage={result.totalPage} onChange={(p) => update({ page: p })} />
      </section>
    </>
  )
}