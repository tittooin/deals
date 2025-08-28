import { useMemo, useState } from 'react'
import type { Deal } from '../types'

const MOCK: Deal[] = [
  { id: '1', source: 'amazon', title: 'Mechanical Keyboard', price: 69.99, discount_percent: 30, rating: 4.5, category: 'Electronics', image_url: null, affiliate_url: '#', created_at: new Date().toISOString() },
  { id: '2', source: 'flipkart', title: 'Wireless Earbuds', price: 29.99, discount_percent: 45, rating: 4.2, category: 'Audio', image_url: null, affiliate_url: '#', created_at: new Date().toISOString() },
]

export default function DealsPage() {
  const [query, setQuery] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const filtered = useMemo(() => {
    return MOCK.filter((d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) &&
      d.rating >= minRating &&
      (maxPrice ? d.price <= maxPrice : true)
    )
  }, [query, minRating, maxPrice])

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Affiliate Deals</h2>
      <div className="flex flex-wrap gap-2">
        <input
          className="h-9 w-64 rounded-md border bg-transparent px-3 text-sm"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="h-9 w-32 rounded-md border bg-transparent px-3 text-sm"
          placeholder="Max price"
          type="number"
          value={maxPrice ?? ''}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input
          className="h-9 w-32 rounded-md border bg-transparent px-3 text-sm"
          placeholder="Min rating"
          type="number" step="0.1" min={0} max={5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <a key={d.id} href={d.affiliate_url} className="group rounded-lg border p-4 hover:bg-foreground/5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wide opacity-70">{d.source}</div>
              <div className="text-xs">⭐ {d.rating}</div>
            </div>
            <h3 className="mt-2 line-clamp-2 text-lg font-medium">{d.title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-2xl font-semibold">${d.price.toFixed(2)}</div>
              <div className="text-xs text-green-600">-{d.discount_percent}%</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
