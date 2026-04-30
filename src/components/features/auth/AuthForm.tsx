import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { FosaMascot } from '@/components/features/mascot/FosaMascot'
import { cn } from '@/lib/utils'
import type { AuthView } from '@/types'

export function AuthForm() {
  const [view, setView] = useState<AuthView>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const { login, register, isLoading, error, clearError } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError()
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (view === 'login') {
      await login({ email: form.email, password: form.password })
    } else {
      await register({ name: form.name, email: form.email, password: form.password })
    }
    const { user } = useAuthStore.getState()
    if (user) navigate('/')
  }

  const switchView = (next: AuthView) => {
    clearError()
    setForm({ name: '', email: '', password: '' })
    setView(next)
  }

  return (
    <div className="min-h-screen bg-fosa-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12 }}
          >
            <FosaMascot variant="idle" size={80} />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-card border border-fosa-100 p-8"
        >
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-semibold text-fosa-900 mb-1">
              {view === 'login' ? 'Content de vous revoir !' : 'Rejoindre TanaMarket'}
            </h1>
            <p className="text-sm text-fosa-500">
              {view === 'login'
                ? 'Connectez-vous pour continuer vos achats'
                : 'Découvrez les trésors de Madagascar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence initial={false}>
              {view === 'register' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-medium text-fosa-700 mb-1.5">
                    Nom complet
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre prénom et nom"
                    className="input-field"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-medium text-fosa-700 mb-1.5">
                Adresse email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vous@exemple.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-fosa-700 mb-1.5">
                Mot de passe
                {view === 'register' && (
                  <span className="ml-1 text-fosa-400 font-normal">(8 caractères min.)</span>
                )}
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={view === 'register' ? 'Créer un mot de passe' : 'Votre mot de passe'}
                className="input-field"
                required
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-accent-600 bg-accent-50 border border-accent-200 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className={cn('btn-primary w-full mt-2', isLoading && 'opacity-70')}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="5" />
                  </svg>
                  {view === 'login' ? 'Connexion…' : 'Inscription…'}
                </span>
              ) : (
                view === 'login' ? 'Se connecter' : 'Créer mon compte'
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <span className="text-sm text-fosa-500">
              {view === 'login' ? 'Pas encore de compte ?' : 'Déjà inscrit ?'}
            </span>{' '}
            <button
              onClick={() => switchView(view === 'login' ? 'register' : 'login')}
              className="text-sm font-medium text-fosa-800 hover:text-accent-500 transition-colors underline"
            >
              {view === 'login' ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}