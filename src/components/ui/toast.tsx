import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '@/store'
import { cn } from '@/lib/utils'

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#2D9E75" />
      <path d="M4.5 8.5L7 11L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#D84F28" />
      <path d="M5 5L11 11M11 5L5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#C8843A" />
      <path d="M8 7V11M8 5V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export function ToastContainer() {
  const { toasts, remove } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl shadow-modal border',
              'bg-white border-fosa-100',
            )}
          >
            <span className="shrink-0">{ICONS[toast.type]}</span>
            <p className="text-sm text-fosa-800 font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => remove(toast.id)}
              className="shrink-0 text-fosa-400 hover:text-fosa-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}