import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { useCartStore, useWishlistStore, useToastStore } from '@/store'
import { formatPrice, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

const BADGE_CONFIG = {
  new:        { label: 'Nouveau',      class: 'bg-jade-400 text-white' },
  sale:       { label: 'Promo',        class: 'bg-accent-500 text-white' },
  bestseller: { label: 'Best-seller',  class: 'bg-fosa-800 text-fosa-100' },
  local:      { label: '🌿 Local',     class: 'bg-fosa-100 text-fosa-700 border border-fosa-300' },
} as const

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, lastAdded } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const { add: addToast } = useToastStore()
  const isWished = has(product.id)
  const isJumping = lastAdded === product.id

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    addToast('success', `${product.name} ajouté au panier !`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    addToast('info', isWished ? 'Retiré des favoris' : 'Ajouté aux favoris !')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link to={`/produit/${product.id}`} className="block card group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-fosa-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <span className={cn(
              'absolute top-2 left-2 badge text-[10px] font-medium',
              BADGE_CONFIG[product.badge].class
            )}>
              {BADGE_CONFIG[product.badge].label}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
              isWished
                ? 'bg-white text-accent-500 scale-110'
                : 'bg-white/80 text-fosa-400 opacity-0 group-hover:opacity-100 hover:text-accent-500'
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill={isWished ? 'currentColor' : 'none'}>
              <path d="M8 14S2 9.5 2 5.5A4 4 0 0 1 8 3.5 4 4 0 0 1 14 5.5C14 9.5 8 14 8 14Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="badge bg-fosa-200 text-fosa-600 text-xs">Rupture de stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-1">
            <p className="text-[10px] text-fosa-400 uppercase tracking-wider mb-0.5">{product.origin}</p>
            <h3 className="text-sm font-medium text-fosa-900 line-clamp-2 group-hover:text-fosa-700 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 1L6.18 3.64L9 4.05L7 6L7.45 9L5 7.64L2.55 9L3 6L1 4.05L3.82 3.64L5 1Z"
                    fill={i < Math.floor(product.rating) ? '#C8843A' : '#E8DFD0'}
                  />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-fosa-400">({product.reviewCount})</span>
          </div>

          {/* Price & Add */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-semibold text-fosa-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="ml-1.5 text-xs text-fosa-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200',
                'bg-fosa-900 text-white hover:bg-fosa-700 active:scale-95',
                isJumping && 'animate-bounce-in',
                product.stock === 0 && 'opacity-40 cursor-not-allowed'
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}