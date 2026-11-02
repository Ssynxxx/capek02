import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { http, errMsg, pickItem } from './api'

export default function useProduct(id) {
  const [result, setResult] = useState({ id: null, product: null })

  useEffect(() => {
    let ignore = false

    http
      .get(`/apis/products/products/${id}`)
      .then((res) => {
        if (!ignore) setResult({ id, product: pickItem(res.data) })
      })
      .catch((err) => {
        if (ignore) return
        setResult({ id, product: null })
        Swal.fire({ icon: 'error', title: 'Failed to load product', text: errMsg(err) })
      })

    return () => {
      ignore = true
    }
  }, [id])

  return { loading: result.id !== id, product: result.id === id ? result.product : null }
}