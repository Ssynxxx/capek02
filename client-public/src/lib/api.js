import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://api.p2.gc01aio.foxhub.space',
})

// Ambil pesan error dari server, kalau tidak ada pakai pesan axios
export function errMsg(err) {
  const d = err?.response?.data
  const m = d?.message ?? d?.error ?? d?.errors
  if (Array.isArray(m)) return m.map((x) => x?.message ?? x).join(', ')
  if (typeof m === 'string') return m
  if (m && typeof m === 'object') return Object.values(m).join(', ')
  return err?.message || 'Something went wrong'
}

// Response server dibungkus { message, data }. List-nya bisa ada di beberapa level,
// jadi helper ini mencari array di tempat yang paling mungkin.
export function pickList(body) {
  const d = body?.data ?? body
  return [d, d?.data, d?.rows, d?.products, d?.items, d?.results].find(Array.isArray) ?? []
}

// Untuk response satu item (detail)
export function pickItem(body) {
  const d = body?.data ?? body
  const inner = d?.data
  return inner && typeof inner === 'object' && !Array.isArray(inner) ? inner : d
}

// Cari info jumlah halaman. Kalau server tidak menyediakan, ditebak dari jumlah data.
export function pickPagination(body, count, limit, page) {
  const d = body?.data ?? body
  const p = d?.pagination ?? body?.pagination ?? d?.meta ?? d ?? {}
  let totalPage = p.totalPage ?? p.totalPages ?? p.total_pages ?? p.lastPage
  const totalData = p.totalData ?? p.totalItems ?? p.total ?? p.count
  if (totalPage == null && totalData != null) totalPage = Math.ceil(totalData / limit)
  if (totalPage == null) totalPage = count >= limit ? page + 1 : page
  return Math.max(1, Number(totalPage) || 1)
}

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n) || 0)

export const categoryName = (p) => p?.Category?.name ?? p?.category?.name ?? ''

export const authorName = (p) => {
  const a = p?.User ?? p?.Author ?? p?.author ?? p?.user
  return a?.username ?? a?.email ?? ''
}