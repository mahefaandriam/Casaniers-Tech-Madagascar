import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store'
import { formatPrice, cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, clearCart } = useCartStore()
  const totalAmount = total()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-fosa-900/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-modal flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-fosa-100">
              <h2 className="font-display text-xl font-semibold text-fosa-900">
                Mon Panier
                {items.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-fosa-500">
                    ({items.length} article{items.length > 1 ? 's' : ''})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-fosa-100 transition-colors text-fosa-600"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="text-fosa-400 text-sm">Votre panier est vide.</p>
                  <button onClick={closeCart} className="btn-secondary text-xs">
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-fosa-100 shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-fosa-900 truncate">{product.name}</p>
                        <p className="text-xs text-fosa-500 mb-2">{product.origin}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-fosa-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQty(product.id, quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-fosa-600 hover:bg-fosa-100 transition-colors text-lg leading-none"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                            <button
                              onClick={() => updateQty(product.id, quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-fosa-600 hover:bg-fosa-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-fosa-800">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="self-start p-1 rounded-lg hover:bg-accent-50 text-fosa-400 hover:text-accent-500 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-fosa-100 space-y-3">
                <div className="flex justify-between text-sm text-fosa-600">
                  <span>Sous-total</span>
                  <span className="font-semibold text-fosa-900">{formatPrice(totalAmount)}</span>
                </div>
                <button className="btn-primary w-full">
                  Passer la commande
                </button>
                <button onClick={clearCart} className="w-full text-xs text-fosa-400 hover:text-accent-500 transition-colors">
                  Vider le panier
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}