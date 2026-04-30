import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: Set<string>

  toggle: (id: string) => void
  has: (id: string) => boolean
  count: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: new Set<string>(),

      toggle: (id) => {
        set(state => {
          const next = new Set(state.ids)
          next.has(id) ? next.delete(id) : next.add(id)
          return { ids: next }
        })
      },

      has: (id) => get().ids.has(id),
      count: () => get().ids.size,
    }),
    {
      name: 'tana_wishlist',
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name)
          if (!raw) return null
          const parsed = JSON.parse(raw)
          return { ...parsed, state: { ...parsed.state, ids: new Set(parsed.state.ids) } }
        },
        setItem: (name, value) => {
          const serialized = { ...value, state: { ...value.state, ids: [...value.state.ids] } }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)