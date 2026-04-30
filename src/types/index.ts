// ─── Domain Types ───────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number          // in Ariary
  originalPrice?: number
  currency: 'Ar'
  category: ProductCategory
  images: string[]
  rating: number
  reviewCount: number
  stock: number
  badge?: 'new' | 'sale' | 'bestseller' | 'local'
  origin?: string
  tags: string[]
}

export type ProductCategory =
  | 'epices'
  | 'huiles'
  | 'artisanat'
  | 'textile'
  | 'bijoux'
  | 'alimentaire'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface WishlistItem {
  productId: string
  addedAt: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData extends AuthCredentials {
  name: string
}

// ─── UI / State Types ────────────────────────────────────────────────────────

export type AuthView = 'login' | 'register'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export interface FilterState {
  category: ProductCategory | 'all'
  priceRange: [number, number]
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating'
  search: string
}

// ─── API Types ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}