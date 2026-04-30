import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { useWishlistStore } from '@/store'
import { ProductCard } from '@/components/features/product/ProductCard'
import { FosaMascot } from '@/components/features/mascot/FosaMascot'

export function WishlistPage() {
  const { ids } = useWishlistStore()
  const items = MOCK_PRODUCTS.filter(p => ids.has(p.id))

  return (
    <div className="page-container py-10">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl font-semibold text-fosa-900 mb-8"
      >
        Mes Favoris
      </motion.h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <FosaMascot variant="wishlist" size={80} />
          <div className="text-center">
            <p className="font-display text-xl text-fosa-800 mb-2">Votre liste est vide</p>
            <p className="text-fosa-500 text-sm mb-6">Ajoutez des produits à vos favoris depuis le catalogue</p>
            <Link to="/catalogue" className="btn-primary">Explorer le catalogue</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}