import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { formatDate } from '@/lib/utils'
import { FosaMascot } from '@/components/features/mascot/FosaMascot'

export function AccountPage() {
  const { user, logout } = useAuthStore()

  if (!user) {
    return (
      <div className="page-container py-20 text-center">
        <p className="font-display text-xl text-fosa-800 mb-4">Vous devez être connecté</p>
        <Link to="/auth" className="btn-primary">Se connecter</Link>
      </div>
    )
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="page-container py-10 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="font-display text-3xl font-semibold text-fosa-900">Mon Compte</h1>

        {/* Profile card */}
        <div className="card p-6 flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-fosa-800 flex items-center justify-center text-white font-display text-xl font-semibold">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <FosaMascot variant="account" size={24} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-fosa-900 text-lg">{user.name}</p>
            <p className="text-fosa-500 text-sm">{user.email}</p>
            <p className="text-fosa-400 text-xs mt-1">
              Membre depuis {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { to: '/favoris', label: 'Mes Favoris', icon: '♡', desc: 'Produits sauvegardés' },
            { to: '/catalogue', label: 'Catalogue', icon: '🛒', desc: 'Explorer les produits' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="card p-5 hover:shadow-card-hover transition-shadow"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="font-medium text-fosa-900 mt-2">{item.label}</p>
              <p className="text-xs text-fosa-500">{item.desc}</p>
            </Link>
          ))}
        </div>

        <button
          onClick={logout}
          className="btn-secondary text-accent-600 border-accent-200 hover:bg-accent-50"
        >
          Se déconnecter
        </button>
      </motion.div>
    </div>
  )
}