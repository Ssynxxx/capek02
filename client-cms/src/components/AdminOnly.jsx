import { Navigate } from 'react-router-dom'
import { getUser } from '../lib/auth'

export default function AdminOnly({ children }) {
  return getUser().role === 'Staff' ? <Navigate to="/" replace /> : children
}