import { Outlet } from 'react-router-dom'
import { Navbar } from './NavBar'
import { CartDrawer } from '@/components/features/cart/CartDrawer'
import { ToastContainer } from '@/components/ui/toast'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-fosa-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <CartDrawer />
      <ToastContainer />
    </div>
  )
}