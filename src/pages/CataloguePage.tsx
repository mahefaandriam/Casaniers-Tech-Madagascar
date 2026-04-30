import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data'
import { ProductCard } from '@/components/features/product/ProductCard'
import { cn } from '@/lib/utils'
import type { ProductCategory } from '@/types'

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance',  label: 'Pertinence' },
  { value: 'price-asc',  label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating',     label: 'Mieux notés' },
]

export function CataloguePage() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    (searchParams.get('category') as ProductCategory) ?? 'all'
  )
  const [sort, setSort] = useState<SortOption>('relevance')
  const [search] = useState(searchParams.get('search') ?? '')

  const filtered = useMemo(() => {
    let products = [...MOCK_PRODUCTS]

    if (search) {
      const q = search.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }

    if (activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory)
    }

    switch (sort) {
      case 'price-asc':  products.sort((a, b) => a.price - b.price); break
      case 'price-desc': products.sort((a, b) => b.price - a.price); break
      case 'rating':     products.sort((a, b) => b.rating - a.rating); break
    }

    return products
  }, [activeCategory, sort, search])

  return (
    <div className="page-container py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-semibold text-fosa-900 mb-1">
          {search ? `Résultats pour "${search}"` : 'Catalogue'}
        </h1>
        <p className="text-fosa-500 text-sm">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
      </motion.div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap flex-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as ProductCategory | 'all')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-fosa-900 text-white shadow-sm'
                  : 'bg-white border border-fosa-200 text-fosa-700 hover:border-fosa-400'
              )}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          className="input-field w-auto text-sm shrink-0"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-fosa-400">
          <p className="text-lg font-display mb-2">Aucun produit trouvé</p>
          <p className="text-sm">Essayez une autre catégorie ou recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}