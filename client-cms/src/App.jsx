import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminOnly from './components/AdminOnly'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import EditProduct from './pages/EditProduct'
import UploadImage from './pages/UploadImage'
import Categories from './pages/Categories'
import AddUser from './pages/AddUser'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Semua route di dalam Layout butuh login */}
      <Route element={<Layout />}>
        <Route path="/" element={<Products />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/products/:id/image" element={<UploadImage />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/add-user"
          element={
            <AdminOnly>
              <AddUser />
            </AdminOnly>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}