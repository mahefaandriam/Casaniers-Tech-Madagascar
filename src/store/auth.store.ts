import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import type { User, AuthCredentials, RegisterData } from '@/types'
import { generateId, storage } from '@/lib/utils'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null

  login: (credentials: AuthCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
}

// Simulated async auth (replace with real API calls)
async function simulateDelay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null })
        await simulateDelay()

        // Demo: any valid email/pass works
        if (!email.includes('@') || password.length < 6) {
          set({ isLoading: false, error: 'Email ou mot de passe incorrect.' })
          return
        }

        const storedUsers = storage.get<User[]>('tana_users') ?? []
        const found = storedUsers.find(u => u.email === email)

        if (!found) {
          set({ isLoading: false, error: 'Aucun compte trouvé avec cet email.' })
          return
        }

        set({ user: found, isLoading: false, error: null })
      },

      register: async ({ email, password, name }) => {
        set({ isLoading: true, error: null })
        await simulateDelay()

        if (!email.includes('@') || password.length < 8) {
          set({ isLoading: false, error: 'Données invalides. Le mot de passe doit faire au moins 8 caractères.' })
          return
        }

        const storedUsers = storage.get<User[]>('tana_users') ?? []
        if (storedUsers.some(u => u.email === email)) {
          set({ isLoading: false, error: 'Un compte avec cet email existe déjà.' })
          return
        }

        const newUser: User = {
          id: generateId(),
          email,
          name,
          createdAt: new Date().toISOString(),
        }

        storage.set('tana_users', [...storedUsers, newUser])
        set({ user: newUser, isLoading: false, error: null })
      },

      logout: () => {
        set({ user: null, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'tana_auth',
      partialize: state => ({ user: state.user }),
    }
  )
)