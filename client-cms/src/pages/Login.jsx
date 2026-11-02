import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { http, errMsg } from '../lib/api'
import { getToken, saveSession } from '../lib/auth'
import FormField from '../components/FormField'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Sudah login -> tidak perlu melihat halaman login
  if (getToken()) return <Navigate to="/" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await http.post('/apis/auth/login', new URLSearchParams(form))
      const token = res.data?.data?.token
      if (!token) throw new Error('Token not found in server response')

      saveSession(token, form.email)
      await Swal.fire({ icon: 'success', title: 'Welcome back!', timer: 1000, showConfirmButton: false })
      navigate('/', { replace: true })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Login failed', text: errMsg(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center gap-3 px-4 py-2">
          <img src="/IDEA_logo.svg" alt="IDEA" className="h-9" />
          <span className="font-semibold text-gray-900">Admin Panel</span>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Login Options</h1>
          <p className="mt-3">Log in to manage products and categories. Only admin and staff can access this panel.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2">
          <div className="hidden items-center justify-center border-r border-gray-200 p-8 md:flex">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
              alt="sofa"
              className="max-w-full"
            />
          </div>

          <form className="p-8" onSubmit={onSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Log in to your account</h2>
            <FormField
              id="login-email" name="email" type="email" label="Email" required
              placeholder="Enter email address ..." value={form.email} onChange={onChange}
            />
            <FormField
              id="login-password" name="password" type="password" label="Password" required
              placeholder="Enter your password ..." value={form.password} onChange={onChange}
            />
            <Button type="submit" className="mt-2 w-full py-3 disabled:opacity-60" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}