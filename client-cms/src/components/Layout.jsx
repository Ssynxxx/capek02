import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getToken, getUser, clearSession } from '../lib/auth'

const MENU = [
  { to: '/', label: 'Products', icon: 'shopping_bag', match: (p) => p === '/' || p.startsWith('/products') },
  { to: '/categories', label: 'Categories', icon: 'category', match: (p) => p.startsWith('/categories') },
  { to: '/add-user', label: 'Add User', icon: 'account_circle', match: (p) => p.startsWith('/add-user'), adminOnly: true },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Penjaga: belum login -> ke halaman login
  if (!getToken()) return <Navigate to="/login" replace />

  const user = getUser()
  const menu = MENU.filter((m) => !(m.adminOnly && user.role === 'Staff'))

  const logout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const itemClass = (isActive) =>
    `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-medium ${
      isActive ? 'bg-white font-bold text-brand shadow-sm' : 'text-gray-700 hover:bg-white/70'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <img src="/IDEA_logo.svg" alt="IDEA" className="h-9" />
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>
          <button
            className="rounded-lg border border-gray-300 p-1 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <div className="md:flex">
        <aside className={`${open ? 'block' : 'hidden'} bg-gray-100 p-3 md:block md:min-h-[calc(100vh-3.5rem)] md:w-60 md:shrink-0`}>
          <nav className="space-y-1">
            {menu.map((m) => (
              <Link key={m.to} to={m.to} className={itemClass(m.match(pathname))} onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">{m.icon}</span>
                {m.label}
              </Link>
            ))}
          </nav>

          <p className="mb-1 mt-6 px-3 text-xs font-semibold uppercase text-gray-500">Account</p>
          <div className="flex items-center gap-2 px-3 py-2 text-gray-700">
            <span className="material-symbols-outlined">person</span>
            <span className="break-all">
              Hej, {user.username || user.email || 'there'}
              {user.role && <span className="ml-2 rounded bg-gray-300 px-1.5 py-0.5 text-xs">{user.role}</span>}
            </span>
          </div>
          <button className={itemClass(false)} onClick={logout}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-10 md:px-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}