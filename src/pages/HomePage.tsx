import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data'
import { ProductCard } from '@/components/features/product/ProductCard'
import { FosaMascot } from '@/components/features/mascot/FosaMascot'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const featured = MOCK_PRODUCTS.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4)

export function HomePage() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('visited')) {
            sessionStorage.setItem('visited', '1')
            navigate('/catalogue', { replace: true })
        }
    }, [])
    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-fosa-900 via-fosa-800 to-fosa-700 text-white">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #C8843A 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, #E89070 0%, transparent 40%)`
                    }}
                />
                <div className="page-container relative">
                    <div className="flex items-center justify-between min-h-[480px] py-16 gap-8">
                        <div className="max-w-xl">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-fosa-300 text-sm font-medium uppercase tracking-widest mb-4"
                            >
                                Produits authentiques de Madagascar
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="font-display text-5xl font-semibold leading-tight text-balance mb-6"
                            >
                                Les trésors de la{' '}
                                <span className="text-fosa-400">Grande Île</span>,{' '}
                                livrés chez vous
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-fosa-300 text-lg mb-8 leading-relaxed"
                            >
                                Vanille, épices rares, artisanat, bijoux… Directement des producteurs malgaches.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex gap-3"
                            >
                                <Link to="/catalogue" className="btn-accent px-6 py-3 text-base">
                                    Explorer le catalogue
                                </Link>
                                <Link to="/auth" className="btn-secondary px-6 py-3 text-base bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    Mon compte
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: 'spring', damping: 15 }}
                            className="hidden lg:block"
                        >
                            <FosaMascot variant="idle" size={200} />
                        </motion.div>
                    </div>
                </div>

                {/* Wave */}
                <svg
                    className="absolute bottom-0 left-0 w-full text-fosa-50"
                    viewBox="0 0 1440 60"
                    fill="currentColor"
                    preserveAspectRatio="none"
                >
                    <path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H0Z" />
                </svg>
            </section>

            {/* Categories */}
            <section className="page-container py-12">
                <h2 className="font-display text-2xl font-semibold text-fosa-900 mb-6">
                    Parcourir par catégorie
                </h2>
                <div className="flex gap-3 flex-wrap">
                    {CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;

                        return (
                            <motion.div key={cat.id}>
                                <Link
                                    to={`/catalogue${cat.id !== 'all' ? `?category=${cat.id}` : ''}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-fosa-200 text-sm font-medium text-fosa-700"
                                >
                                    <Icon size={16} />
                                    {cat.label}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Featured products */}
            <section className="page-container pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-semibold text-fosa-900">
                        Coups de cœur
                    </h2>
                    <Link to="/catalogue" className="text-sm font-medium text-fosa-500 hover:text-fosa-800 transition-colors">
                        Voir tout →
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featured.map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </section>

            {/* Banner */}
            <section className="bg-fosa-100 border-y border-fosa-200">
                <div className="page-container py-12 text-center">
                    <p className="font-display text-3xl font-semibold text-fosa-900 mb-3">
                        100% Produits authentiques
                    </p>
                    <p className="text-fosa-600 max-w-lg mx-auto">
                        Chaque produit est sourcé directement auprès des producteurs et artisans de Madagascar.
                        Traçabilité garantie, qualité vérifiée.
                    </p>
                </div>
            </section>
        </div>
    )
}