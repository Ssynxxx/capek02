import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="/IDEA_logo.svg" alt="IDEA" className="h-9" />
        </Link>
        <Link to="/" className="rounded-full px-4 py-1.5 font-semibold text-gray-900 hover:bg-gray-100">
          Products
        </Link>
      </div>
    </header>
  )
}