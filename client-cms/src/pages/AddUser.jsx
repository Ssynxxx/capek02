import { useState } from 'react'
import Swal from 'sweetalert2'
import { http, errMsg } from '../lib/api'
import PageHeader from '../components/PageHeader'
import FormField from '../components/FormField'
import Button from '../components/Button'

const EMPTY = { username: '', email: '', password: '', role: 'Staff', phoneNumber: '', address: '' }

export default function AddUser() {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = new URLSearchParams()
      Object.entries(form).forEach(([k, v]) => {
        if (v.trim() !== '') body.append(k, v)
      })

      await http.post('/apis/auth/add-user', body)
      await Swal.fire({ icon: 'success', title: 'User registered', text: `${form.email} has been added.` })
      setForm(EMPTY)
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed to register user', text: errMsg(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader title="Register User" />

      <form className="max-w-xl" onSubmit={onSubmit}>
        <FormField id="r-username" name="username" label="Username" required placeholder="Enter username ..." value={form.username} onChange={onChange} />
        <FormField id="r-email" name="email" type="email" label="Email" required placeholder="Enter email address ..." value={form.email} onChange={onChange} />
        <FormField id="r-password" name="password" type="password" label="Password" required placeholder="Enter password ..." value={form.password} onChange={onChange} />

        <FormField as="select" id="r-role" name="role" label="Role" value={form.role} onChange={onChange}>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </FormField>

        <FormField id="r-phone" name="phoneNumber" label="Phone Number" placeholder="Enter phone number (optional) ..." value={form.phoneNumber} onChange={onChange} />
        <FormField as="textarea" rows="3" id="r-address" name="address" label="Address" placeholder="Enter address (optional) ..." value={form.address} onChange={onChange} />

        <Button type="submit" className="mt-4 w-full py-3 disabled:opacity-60" disabled={saving}>
          {saving ? 'Saving...' : 'Sign Up'}
        </Button>
      </form>
    </>
  )
}