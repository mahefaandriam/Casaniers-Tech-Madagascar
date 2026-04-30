import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore, useCartStore, useWishlistStore } from '@/store'
import { FosaMascot } from '@/components/features/mascot/FosaMascot'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { user, logout } = useAuthStore()
  const { itemCount, lastAdded, toggleCart } = useCartStore()
  const wishlistCount = useWishlistStore(s => s.count())

  const count = itemCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-fosa-50/95 backdrop-blur-sm shadow-nav border-b border-fosa-200">
      <div className="page-container">
        <div className="flex h-20 items-center gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="font-display text-2xl font-semibold text-fosa-900 tracking-tight">
              Tana<span className="text-accent-500">Market</span>
            </span>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className={cn(
              'relative flex-1 max-w-xl mx-auto group',
              'transition-all duration-300'
            )}
          >
            <div className={cn(
              'flex items-center rounded-2xl border bg-white transition-all duration-200',
              searchFocused
                ? 'border-fosa-400 ring-2 ring-fosa-400/20'
                : 'border-fosa-200 hover:border-fosa-300'
            )}>
              <svg className="ml-3 shrink-0 text-fosa-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Rechercher vanille, raphia, huiles…"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-fosa-900 placeholder:text-fosa-400 outline-none"
              />
            </div>

            {/* Fosa on search bar */}
            <div className="absolute -right-4 -top-5 pointer-events-none">
              <div className={cn(
                'transition-transform duration-300',
                searchFocused && '[&_ellipse.eye]:scale-y-150'
              )}>
                <FosaMascot variant="search" size={64} />
              </div>
            </div>
          </form>

          {/* Nav icons */}
          <nav className="flex items-center gap-1 shrink-0">

            {/* Account */}
            <Link
              to={user ? '/compte' : '/auth'}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-fosa-100 transition-colors group"
            >
              <div className="relative">
                <FosaMascot variant="account" size={28} />
              </div>
              <span className="text-[10px] font-medium text-fosa-600 group-hover:text-fosa-800 transition-colors">
                {user ? user.name.split(' ')[0] : 'Coucou !'}
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/favoris"
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-fosa-100 transition-colors group"
            >
              <div className="relative">
                <FosaMascot variant="wishlist" size={28} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      key="wcount"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center px-1"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[10px] font-medium text-fosa-600 group-hover:text-fosa-800 transition-colors">
                Favoris
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-fosa-100 transition-colors group"
            >
              <div className="relative">
                <FosaMascot variant="cart" size={28} jumping={!!lastAdded} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="ccount"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center px-1"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[10px] font-medium text-fosa-600 group-hover:text-fosa-800 transition-colors">
                Panier
              </span>
            </button>

            {/* Logout if logged in */}
            {user && (
              <button
                onClick={logout}
                className="ml-1 px-3 py-1.5 rounded-xl text-xs text-fosa-500 hover:bg-fosa-100 hover:text-accent-600 transition-colors"
              >
                Déconnexion
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}