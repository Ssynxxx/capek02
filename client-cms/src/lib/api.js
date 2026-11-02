import axios from 'axios'

export const TOKEN_KEY = 'access_token'

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://api.p2.gc01aio.foxhub.space',
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('user')
      window.location.assign('/login')
    }
    return Promise.reject(err)
  }
)

export function errMsg(err) {
  const d = err?.response?.data
  const m = d?.message ?? d?.error ?? d?.errors
  if (Array.isArray(m)) return m.map((x) => x?.message ?? x).join(', ')
  if (typeof m === 'string') return m
  if (m && typeof m === 'object') return Object.values(m).join(', ')
  return err?.message || 'Something went wrong'
}

export function pickList(body) {
  const d = body?.data ?? body
  return [d, d?.data, d?.rows, d?.products, d?.items, d?.results].find(Array.isArray) ?? []
}

export function pickItem(body) {
  const d = body?.data ?? body
  const inner = d?.data
  return inner && typeof inner === 'object' && !Array.isArray(inner) ? inner : d
}

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n) || 0)

export const categoryName = (p) => p?.Category?.name ?? p?.category?.name ?? ''

export const categoryIdOf = (p) => p?.categoryId ?? p?.Category?.id ?? p?.category?.id ?? ''

export const authorName = (p) => {
  const a = p?.User ?? p?.Author ?? p?.author ?? p?.user
  return a?.username ?? a?.email ?? ''
}