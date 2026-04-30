# TanaMarket — Architecture Document

E-commerce production-ready pour produits authentiques de Madagascar.

## Stack

| Technologie       | Rôle                                      |
|-------------------|-------------------------------------------|
| React 18          | UI library (hooks, concurrent features)   |
| TypeScript 5      | Type safety, IntelliSense, refactoring    |
| Vite 5            | Build tool ultra-rapide, HMR              |
| Tailwind CSS 3    | Utility-first styling + design tokens     |
| React Router 6    | Routing, data loaders, nested layouts     |
| Zustand 4         | State management global léger             |
| Framer Motion 11  | Animations & micro-interactions           |

## Structure

```
src/
├── components/
│   ├── layout/           # Navbar, RootLayout
│   ├── ui/               # Toast, Button, Input (design system)
│   └── features/
│       ├── auth/         # AuthForm
│       ├── cart/         # CartDrawer
│       ├── mascot/       # FosaMascot (5 variantes animées)
│       └── product/      # ProductCard
├── pages/
│   ├── HomePage.tsx
│   ├── CataloguePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── WishlistPage.tsx
│   └── AccountPage.tsx
├── store/
│   ├── auth.store.ts     # User session (persist)
│   ├── cart.store.ts     # Panier (persist)
│   ├── wishlist.store.ts # Favoris (persist)
│   └── toast.store.ts    # Notifications
├── types/index.ts        # Tous les types TypeScript
├── lib/
│   ├── utils.ts          # cn(), formatPrice(), storage…
│   └── mock-data.ts      # Données produits
├── styles/globals.css    # Tailwind + composants CSS
└── router.tsx            # React Router config
```

## Pages

| Route              | Page              | Auth requise |
|--------------------|-------------------|--------------|
| `/`                | Home              | Non          |
| `/catalogue`       | Catalogue + filtres | Non        |
| `/produit/:id`     | Détail produit    | Non          |
| `/favoris`         | Wishlist          | Non          |
| `/compte`          | Mon compte        | Oui          |
| `/auth`            | Login / Register  | Non          |

## Design System (Tailwind tokens)

- **Police display** : Playfair Display (titres)
- **Police body** : DM Sans (contenu)
- **Couleur primaire** : `fosa-*` (amber-brun chaud)
- **Couleur accent** : `accent-*` (orange-rouge)
- **Couleur success** : `jade-*` (vert)

## Scalabilité

Pour étendre l'application :

1. **Nouvelle page** : Créer dans `src/pages/`, ajouter route dans `src/router.tsx`
2. **Nouveau store** : Créer dans `src/store/`, exporter depuis `src/store/index.ts`
3. **Nouveau composant** : Placer dans `components/features/{feature}/` ou `components/ui/`
4. **API réelle** : Remplacer les mocks dans `src/lib/mock-data.ts` et les `simulateDelay` dans les stores

## Installation

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev         # Dev server
npm run build       # Build production
npm run type-check  # Vérification TypeScript
npm run lint        # ESLint
```