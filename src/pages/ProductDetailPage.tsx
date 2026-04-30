import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { useCartStore, useWishlistStore, useToastStore } from '@/store'
import { formatPrice, cn } from '@/lib/utils'

const BADGE_LABELS = { new: 'Nouveau', sale: 'Promotion', bestseller: 'Best-seller', local: '🌿 Local' }

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = MOCK_PRODUCTS.find(p => p.id === id)

  const { addItem, lastAdded } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const { add: toast } = useToastStore()

  if (!product) {
    return (
      <div className="page-container py-20 text-center">
        <p className="font-display text-2xl text-fosa-900 mb-4">Produit introuvable</p>
        <Link to="/catalogue" className="btn-primary">Retour au catalogue</Link>
      </div>
    )
  }

  const isWished = has(product.id)
  const isJumping = lastAdded === product.id
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="page-container py-10">
      <Link to="/catalogue" className="text-sm text-fosa-500 hover:text-fosa-800 transition-colors mb-6 inline-flex items-center gap-1">
        ← Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square rounded-2xl overflow-hidden bg-fosa-100 shadow-card"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {product.badge && (
              <span className="badge bg-fosa-100 text-fosa-700 border border-fosa-200 text-xs">
                {BADGE_LABELS[product.badge]}
              </span>
            )}
            {discount && (
              <span className="badge bg-accent-500 text-white text-xs">
                -{discount}%
              </span>
            )}
          </div>

          <div>
            <p className="text-xs text-fosa-400 uppercase tracking-wider mb-1">{product.origin}</p>
            <h1 className="font-display text-3xl font-semibold text-fosa-900 leading-tight mb-3">
              {product.name}
            </h1>
            <p className="text-fosa-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L9.8 5.8L14 6.4L11 9.2L11.6 13.6L8 11.6L4.4 13.6L5 9.2L2 6.4L6.2 5.8L8 2Z"
                    fill={i < Math.floor(product.rating) ? '#C8843A' : '#E8DFD0'}
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-fosa-600">
              {product.rating} ({product.reviewCount} avis)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-fosa-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-fosa-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className={cn(
            'text-sm font-medium',
            product.stock > 10 ? 'text-jade-500' : product.stock > 0 ? 'text-accent-500' : 'text-accent-600'
          )}>
            {product.stock > 10
              ? `✓ En stock (${product.stock} disponibles)`
              : product.stock > 0
              ? `⚠ Plus que ${product.stock} en stock !`
              : '✗ Rupture de stock'}
          </p>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={() => { addItem(product); toast('success', `${product.name} ajouté !`) }}
              disabled={product.stock === 0}
              className={cn(
                'btn-primary flex-1 py-3',
                isJumping && 'animate-bounce-in',
                product.stock === 0 && 'opacity-40 cursor-not-allowed'
              )}
            >
              Ajouter au panier
            </button>
            <button
              onClick={() => { toggle(product.id); toast('info', isWished ? 'Retiré des favoris' : 'Ajouté aux favoris !') }}
              className={cn(
                'btn-secondary w-12 h-12 p-0 flex items-center justify-center',
                isWished && 'text-accent-500 border-accent-300 bg-accent-50'
              )}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill={isWished ? 'currentColor' : 'none'}>
                <path d="M10 17S3 12 3 7a5 5 0 0 1 7-4.58A5 5 0 0 1 17 7c0 5-7 10-7 10Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-fosa-100">
            {product.tags.map(tag => (
              <span key={tag} className="badge bg-fosa-100 text-fosa-600 text-xs">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}