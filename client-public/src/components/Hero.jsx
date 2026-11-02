import { useState } from 'react'
import Button from './Button'

export default function Hero({ initial = '', onSearch }) {
  const [text, setText] = useState(initial)

  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          Make your home<br />feel like home.
        </h1>
        <p className="mb-6 mt-4 text-lg font-semibold text-accent">Smart, affordable furniture for every room.</p>
        <form
          className="flex max-w-xl gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            onSearch(text.trim())
          }}
        >
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search products, e.g. desk, chair..."
            className="h-12 flex-1 rounded-full bg-white px-5 text-gray-900 outline-none focus:ring-4 focus:ring-accent/50"
          />
          <Button type="submit" variant="dark" className="px-6">Search</Button>
        </form>
      </div>
    </section>
  )
}