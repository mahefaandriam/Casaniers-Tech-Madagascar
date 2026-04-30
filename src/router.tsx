import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { CataloguePage } from '@/pages/CataloguePage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { AccountPage } from '@/pages/AccountPage'
import { AuthForm } from '@/components/features/auth/AuthForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,         element: <HomePage /> },
      { path: 'catalogue',   element: <CataloguePage /> },
      { path: 'produit/:id', element: <ProductDetailPage /> },
      { path: 'favoris',     element: <WishlistPage /> },
      { path: 'compte',      element: <AccountPage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthForm />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}