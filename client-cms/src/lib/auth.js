import { TOKEN_KEY } from './api'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

// Baca isi (payload) JWT hanya untuk menampilkan nama dan role di UI
function decode(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(atob(payload))))
  } catch {
    return {}
  }
}

export function saveSession(token, email) {
  const p = decode(token)
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem('user', JSON.stringify({ email: p.email ?? email, username: p.username, role: p.role }))
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user')) || {}
  } catch {
    return {}
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('user')
}