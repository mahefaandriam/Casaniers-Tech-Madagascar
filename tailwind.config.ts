/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fosa: {
          50:  '#FDF8F2',
          100: '#F5EFE6',
          200: '#EAD8C0',
          300: '#D4AD82',
          400: '#C8843A',
          500: '#B06828',
          600: '#8B5220',
          700: '#6A3D17',
          800: '#4A2A0F',
          900: '#2E1A09',
        },
        accent: {
          50:  '#FDF0EB',
          100: '#F9CABB',
          200: '#F3A080',
          300: '#E87048',
          400: '#D84F28',
          500: '#B83D1A',
          600: '#922F12',
          700: '#6E220C',
          800: '#4A1607',
          900: '#280C03',
        },
        jade: {
          400: '#2D9E75',
          500: '#1F7A58',
          600: '#145740',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-in':   'slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ear-twitch': 'earTwitch 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'paw-wave':   'pawWave 2.5s ease-in-out infinite',
        'cart-jump':  'cartJump 0.6s cubic-bezier(0.36,0.07,0.19,0.97) forwards',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shimmer':    'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideIn:   { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        earTwitch: { '0%,100%': { transform: 'rotate(0deg)' }, '40%': { transform: 'rotate(-18deg) translateY(-3px)' }, '70%': { transform: 'rotate(8deg)' } },
        pawWave:   { '0%,60%,100%': { transform: 'rotate(0deg)' }, '70%': { transform: 'rotate(-22deg) translateY(-2px)' }, '85%': { transform: 'rotate(-12deg) translateY(-1px)' } },
        cartJump:  { '0%': { transform: 'translateY(0)' }, '35%': { transform: 'translateY(-14px) scaleY(0.88)' }, '60%': { transform: 'translateY(3px) scaleY(1.05)' }, '80%': { transform: 'translateY(-5px)' }, '100%': { transform: 'translateY(0)' } },
        bounceIn:  { '0%': { opacity: '0', transform: 'scale(0.6)' }, '70%': { transform: 'scale(1.08)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(74,42,15,0.08), 0 4px 16px rgba(74,42,15,0.06)',
        'card-hover': '0 4px 24px rgba(74,42,15,0.14), 0 1px 4px rgba(74,42,15,0.08)',
        'nav':    '0 1px 0 rgba(74,42,15,0.08)',
        'modal':  '0 20px 60px rgba(74,42,15,0.2)',
      },
    },
  },
  plugins: [],
}