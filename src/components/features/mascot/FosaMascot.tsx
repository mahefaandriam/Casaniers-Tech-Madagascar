import { cn } from '@/lib/utils'

type FosaVariant = 'search' | 'account' | 'wishlist' | 'cart' | 'idle'

interface FosaMascotProps {
  variant: FosaVariant
  size?: number
  className?: string
  jumping?: boolean
}

export function FosaMascot({ variant, size = 40, className, jumping = false }: FosaMascotProps) {
  return (
    <div
      className={cn('relative inline-block', className)}
      style={{ width: size, height: size }}
    >
      {variant === 'search' && <FosaSearch size={size} />}
      {variant === 'account' && <FosaAccount size={size} />}
      {variant === 'wishlist' && <FosaWishlist size={size} />}
      {variant === 'cart' && <FosaCart size={size} jumping={jumping} />}
      {variant === 'idle' && <FosaIdle size={size} />}
    </div>
  )
}

// ─── Search: lying on bar ────────────────────────────────────────────────────
function FosaSearch({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 72 40" fill="none" className="overflow-visible">
      <g className="group-focus-within:animate-ear-twitch origin-[14px_14px]">
        <ellipse cx="14" cy="8" rx="5" ry="7" fill="#C8843A" transform="rotate(-15 14 8)" />
        <ellipse cx="14" cy="8" rx="2.5" ry="4" fill="#E8A87C" transform="rotate(-15 14 8)" />
      </g>
      <ellipse cx="32" cy="7" rx="5" ry="7" fill="#C8843A" transform="rotate(15 32 7)" />
      <ellipse cx="32" cy="7" rx="2.5" ry="4" fill="#E8A87C" transform="rotate(15 32 7)" />
      <ellipse cx="23" cy="22" rx="22" ry="12" fill="#C8843A" />
      <ellipse cx="22" cy="21" rx="19" ry="10" fill="#D4935A" />
      <ellipse cx="8" cy="28" rx="6" ry="4" fill="#C8843A" transform="rotate(10 8 28)" />
      <ellipse cx="38" cy="28" rx="6" ry="4" fill="#C8843A" transform="rotate(-10 38 28)" />
      <ellipse cx="8" cy="29" rx="4" ry="2.5" fill="#E8A87C" transform="rotate(10 8 29)" />
      <ellipse cx="38" cy="29" rx="4" ry="2.5" fill="#E8A87C" transform="rotate(-10 38 29)" />
      <circle cx="45" cy="20" rx="10" ry="9" fill="#C8843A" />
      <ellipse cx="45" cy="20" rx="8" ry="7.5" fill="#D4935A" />
      <ellipse cx="52" cy="25" rx="5" ry="3.5" fill="#C8843A" transform="rotate(-15 52 25)" />
      <ellipse cx="62" cy="28" rx="4" ry="3" fill="#C8843A" transform="rotate(-20 62 28)" />
      <ellipse cx="62" cy="29" rx="3" ry="2" fill="#E8A87C" transform="rotate(-20 62 29)" />
      <ellipse cx="23" cy="19" rx="9" ry="8" fill="#F0C090" />
      <circle cx="19" cy="17" r="4" fill="#F5DEB3" />
      <circle cx="27" cy="17" r="4" fill="#F5DEB3" />
      <ellipse cx="19" cy="17" rx="2.2" ry="1.8" fill="#3A2010" />
      <ellipse cx="27" cy="17" rx="2.2" ry="1.8" fill="#3A2010" />
      <circle cx="19.8" cy="16.3" r="0.7" fill="white" />
      <circle cx="27.8" cy="16.3" r="0.7" fill="white" />
      <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#E89070" />
      <path d="M21 21.5 Q23 23.5 25 21.5" stroke="#C07050" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

// ─── Account: waving paw ────────────────────────────────────────────────────
function FosaAccount({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10" r="7" fill="#C8843A" />
      <circle cx="16" cy="10" r="5.5" fill="#D4935A" />
      <circle cx="14" cy="9" r="2" fill="#F5DEB3" />
      <circle cx="18" cy="9" r="2" fill="#F5DEB3" />
      <ellipse cx="14" cy="9" rx="1.2" ry="1.1" fill="#3A2010" />
      <ellipse cx="18" cy="9" rx="1.2" ry="1.1" fill="#3A2010" />
      <circle cx="14.4" cy="8.6" r="0.4" fill="white" />
      <circle cx="18.4" cy="8.6" r="0.4" fill="white" />
      <ellipse cx="16" cy="12" rx="2.5" ry="1.5" fill="#E89070" />
      <path d="M6 22c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#C8843A" opacity="0.2" stroke="none" />
      <path d="M6 24c0-5.5 4.5-9 10-9s10 3.5 10 9" stroke="#C8843A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="animate-paw-wave origin-[24px_12px]">
        <ellipse cx="25" cy="8" rx="3.5" ry="2.5" fill="#D4935A" transform="rotate(-35 25 8)" />
        <ellipse cx="27" cy="5" rx="2.5" ry="2" fill="#C8843A" transform="rotate(-30 27 5)" />
        <circle cx="28.5" cy="3" r="1.5" fill="#D4935A" />
        <circle cx="27" cy="1.5" r="1" fill="#C8843A" />
      </g>
    </svg>
  )
}

// ─── Wishlist: cuddling heart ────────────────────────────────────────────────
function FosaWishlist({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 27C16 27 5 19.5 5 12A6 6 0 0 1 16 9.5 6 6 0 0 1 27 12C27 19.5 16 27 16 27Z" fill="#E05560" />
      <ellipse cx="16" cy="8" rx="6" ry="4" fill="#C8843A" transform="rotate(-10 16 8)" />
      <ellipse cx="15.5" cy="7.5" rx="5" ry="3" fill="#D4935A" transform="rotate(-10 15.5 7.5)" />
      <circle cx="13" cy="7" r="2.2" fill="#F5DEB3" transform="rotate(-10 13 7)" />
      <circle cx="19" cy="6.5" r="2.2" fill="#F5DEB3" transform="rotate(-10 19 6.5)" />
      <ellipse cx="13.2" cy="7" rx="1.3" ry="1.2" fill="#3A2010" transform="rotate(-10 13.2 7)" />
      <ellipse cx="19.2" cy="6.5" rx="1.3" ry="1.2" fill="#3A2010" transform="rotate(-10 19.2 6.5)" />
      <circle cx="13.6" cy="6.7" r="0.45" fill="white" />
      <circle cx="19.6" cy="6.2" r="0.45" fill="white" />
      <path d="M7 19 Q4 16 4 18 Q4 23 8 23" stroke="#C8843A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M25 19 Q28 16 28 18 Q28 23 24 23" stroke="#C8843A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="8.5" cy="23.5" rx="3.5" ry="2.5" fill="#C8843A" />
      <ellipse cx="23.5" cy="23.5" rx="3.5" ry="2.5" fill="#C8843A" />
    </svg>
  )
}

// ─── Cart: ready to pounce ───────────────────────────────────────────────────
function FosaCart({ size, jumping }: { size: number; jumping: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('origin-bottom', jumping && 'animate-cart-jump')}
    >
      <ellipse cx="11" cy="9" rx="5.5" ry="4.5" fill="#C8843A" />
      <ellipse cx="11" cy="8.5" rx="4.5" ry="3.5" fill="#D4935A" />
      <circle cx="9" cy="8" r="2" fill="#F5DEB3" />
      <circle cx="13.5" cy="7.5" r="2" fill="#F5DEB3" />
      <ellipse cx="9.2" cy="8" rx="1.2" ry="1.1" fill="#3A2010" />
      <ellipse cx="13.7" cy="7.5" rx="1.2" ry="1.1" fill="#3A2010" />
      <circle cx="9.6" cy="7.7" r="0.4" fill="white" />
      <circle cx="14.1" cy="7.2" r="0.4" fill="white" />
      <ellipse cx="6" cy="6" rx="2" ry="3" fill="#C8843A" transform="rotate(20 6 6)" />
      <ellipse cx="16" cy="5.5" rx="2" ry="3" fill="#C8843A" transform="rotate(-20 16 5.5)" />
      <path d="M6 13 Q11 16 16 13" stroke="#C8843A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M3 11 Q1 14 2 16 Q4 19 7 18" stroke="#C8843A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M19 11 Q21 14 20 16 Q18 19 15 18" stroke="#C8843A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="5" y="18" width="22" height="12" rx="3" fill="#7A4A1E" />
      <rect x="6" y="17" width="20" height="3" rx="1.5" fill="#6A3D17" />
      <path d="M11 17 Q11 14 16 14 Q21 14 21 17" stroke="#9B6A3B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ─── Idle / hero ─────────────────────────────────────────────────────────────
function FosaIdle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="24" cy="14" rx="7" ry="10" fill="#C8843A" transform="rotate(-15 24 14)" />
      <ellipse cx="24" cy="14" rx="3.5" ry="6" fill="#E8A87C" transform="rotate(-15 24 14)" />
      <ellipse cx="42" cy="13" rx="7" ry="10" fill="#C8843A" transform="rotate(15 42 13)" />
      <ellipse cx="42" cy="13" rx="3.5" ry="6" fill="#E8A87C" transform="rotate(15 42 13)" />
      <ellipse cx="33" cy="38" rx="28" ry="22" fill="#C8843A" />
      <ellipse cx="33" cy="36" rx="24" ry="19" fill="#D4935A" />
      <ellipse cx="33" cy="33" rx="14" ry="13" fill="#F0C090" />
      <circle cx="27" cy="30" r="6" fill="#F5DEB3" />
      <circle cx="39" cy="30" r="6" fill="#F5DEB3" />
      <ellipse cx="27" cy="30" rx="3.5" ry="3" fill="#3A2010" />
      <ellipse cx="39" cy="30" rx="3.5" ry="3" fill="#3A2010" />
      <circle cx="28.2" cy="28.5" r="1.2" fill="white" />
      <circle cx="40.2" cy="28.5" r="1.2" fill="white" />
      <ellipse cx="33" cy="36" rx="5" ry="3" fill="#E89070" />
      <path d="M30 37 Q33 40 36 37" stroke="#C07050" strokeWidth="1" fill="none" />
      <line x1="20" y1="33" x2="14" y2="31" stroke="#7A4A1E" strokeWidth="1" />
      <line x1="20" y1="36" x2="13" y2="36" stroke="#7A4A1E" strokeWidth="1" />
      <line x1="20" y1="39" x2="14" y2="41" stroke="#7A4A1E" strokeWidth="1" />
      <line x1="46" y1="33" x2="52" y2="31" stroke="#7A4A1E" strokeWidth="1" />
      <line x1="46" y1="36" x2="53" y2="36" stroke="#7A4A1E" strokeWidth="1" />
      <line x1="46" y1="39" x2="52" y2="41" stroke="#7A4A1E" strokeWidth="1" />
    </svg>
  )
}