import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../config/brand'

/** Feedback al añadir + barra fija de carrito en móvil */
export function CartToast() {
  const { lastAdded, open, count, subtotal, isOpen, pulse } = useCart()
  return (
    <>
      <AnimatePresence>
        {lastAdded && !isOpen && (
          <motion.div
            key={pulse}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="fixed bottom-24 left-1/2 z-40 flex w-[min(92vw,420px)] -translate-x-1/2 items-center gap-3 rounded-full bg-forest py-2 pr-2 pl-2 text-cream shadow-[var(--shadow-lift)] md:bottom-8"
          >
            <span className="grid size-9 place-items-center rounded-full bg-olive">
              <Check className="size-4" strokeWidth={2.6} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px]">
              <strong className="font-semibold">{lastAdded.name}</strong> {lastAdded.size} g añadido
            </span>
            <button type="button" onClick={open} className="h-9 rounded-full bg-cream px-4 text-[11px] font-bold tracking-[0.12em] text-forest uppercase active:scale-95">
              Ver
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* barra móvil persistente */}
      <AnimatePresence>
        {count > 0 && !isOpen && (
          <motion.button
            type="button"
            onClick={open}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 flex h-14 items-center justify-between rounded-full bg-olive pr-2 pl-5 text-cream shadow-[var(--shadow-lift)] active:scale-[0.98] md:hidden"
            aria-label={`Ver carrito: ${count} productos, ${formatPrice(subtotal)}`}
          >
            <span className="flex items-center gap-3 text-[13px] font-semibold">
              <ShoppingBag className="size-5" strokeWidth={1.8} />
              {count} {count === 1 ? 'producto' : 'productos'}
            </span>
            <span className="flex h-10 items-center rounded-full bg-cream px-4 font-serif text-[17px] text-forest tabular-nums">{formatPrice(subtotal)}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
