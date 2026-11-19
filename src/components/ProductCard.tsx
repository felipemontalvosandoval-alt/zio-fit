import { memo, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import type { Product, SizeId } from '../data/products'
import { SIZES } from '../data/products'
import { formatPrice } from '../config/brand'
import { useCart } from '../context/CartContext'
import { Jar } from './Jar'

const ease = [0.22, 1, 0.36, 1] as const

/** Fondos de tarjeta derivados de la etiqueta de cada producto */
const tint = (p: Product) =>
  p.choco ? '#E7D6C3' : p.base === 'almendra' ? '#E3E2CF' : p.crunchy ? '#EADBC3' : '#EFE3CF'

export function SizeToggle({ value, onChange, dark = false }: { value: SizeId; onChange: (s: SizeId) => void; dark?: boolean }) {
  const lid = useId()
  return (
    <div
      role="radiogroup"
      aria-label="Presentación"
      className={`relative inline-flex rounded-full p-1 ${dark ? 'bg-cream/10' : 'bg-forest/[0.07]'}`}
    >
      {SIZES.map((s) => {
        const on = s.id === value
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={(e) => {
              e.stopPropagation()
              onChange(s.id)
            }}
            className={`relative z-10 h-8 rounded-full px-3.5 text-[12px] font-semibold transition-colors duration-300 ${
              on ? (dark ? 'text-forest' : 'text-cream') : dark ? 'text-cream/70' : 'text-forest/70 hover:text-forest'
            }`}
          >
            {on && (
              <motion.span
                layoutId={`size-${lid}`}
                className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-cream' : 'bg-forest'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

export function AddButton({ onAdd, label = 'Añadir', compact = false }: { onAdd: () => void; label?: string; compact?: boolean }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onAdd()
        setDone(true)
        window.setTimeout(() => setDone(false), 1400)
      }}
      aria-label={label}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[0.08em] uppercase transition-all duration-300 active:scale-90 ${
        done ? 'bg-olive text-cream' : 'bg-forest text-cream hover:bg-olive'
      } ${compact ? 'size-11' : 'h-11 pr-5 pl-4 text-[11.5px]'}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? 'ok' : 'add'}
          initial={{ y: 14, opacity: 0, rotate: done ? -90 : 0 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {done ? <Check className="size-4" strokeWidth={2.5} /> : <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.2} />}
        </motion.span>
      </AnimatePresence>
      {!compact && <span>{done ? 'Añadido' : label}</span>}
    </button>
  )
}

export const ProductCard = memo(function ProductCard({
  product,
  variant = 'default',
  onOpen,
  index,
}: {
  product: Product
  variant?: 'feature' | 'wide' | 'default'
  onOpen: (id: string) => void
  index: number
}) {
  const [size, setSize] = useState<SizeId>('250')
  const { add } = useCart()
  const feature = variant === 'feature'
  const wide = variant === 'wide'

  return (
    <article
      onClick={() => onOpen(product.id)}
      className={`group/card relative flex h-full cursor-pointer overflow-hidden rounded-[30px] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] ${
        feature ? 'flex-col p-6 sm:p-9' : wide ? 'flex-col p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7' : 'flex-row items-center gap-4 p-4 pr-5 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6'
      }`}
      style={{ backgroundColor: tint(product) }}
    >
      {/* número editorial */}
      <span className="pointer-events-none absolute top-5 right-6 font-serif text-[13px] text-forest/40 italic">
        N.º {String(index + 1).padStart(2, '0')}
      </span>
      {product.badge && (
        <span className="absolute top-5 left-5 z-10 rounded-full bg-cream/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-forest uppercase ring-1 ring-forest/10">
          {product.badge}
        </span>
      )}

      {/* imagen con cambio al hover */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpen(product.id)
        }}
        aria-label={`Ver detalle de ${product.name}`}
        className={`relative mx-auto block ${feature ? 'mt-6 mb-4 w-[62%] max-w-[300px]' : wide ? 'my-4 w-[48%] max-w-[180px] shrink-0 sm:my-0' : 'my-2 w-[34%] max-w-[190px] shrink-0 sm:mx-auto sm:mt-6 sm:mb-2 sm:w-[56%]'}`}
      >
        <div className="absolute inset-x-[8%] bottom-[2%] h-[12%] rounded-[50%] bg-forest/20 blur-lg transition-transform duration-700 group-hover/card:scale-x-110" />
        <div className="relative transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/card:-translate-y-2 group-hover/card:-rotate-3">
          <Jar product={product} size={size} className="transition-opacity duration-500 group-hover/card:opacity-0" />
          <Jar product={product} size={size} view="spoon" className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
        </div>
      </button>

      <div className={`relative mt-auto flex min-w-0 flex-col ${wide ? 'sm:flex-1' : variant === 'default' ? 'flex-1 sm:flex-none' : ''}`}>
        <p className="eyebrow text-forest/55">
          {product.base === 'mani' ? 'Maní' : 'Almendras'}
          {product.choco && ' · Cacao'}
          {product.crunchy && ' · Crunchy'}
        </p>
        <h3 className={`mt-2 font-serif leading-[0.95] tracking-tight text-forest ${feature ? 'text-[clamp(2.2rem,4vw,3.4rem)]' : 'text-[24px] sm:text-[28px]'}`}>
          {product.shortName}
        </h3>
        <p className={`mt-3 text-[14px] leading-relaxed text-ink/70 ${feature ? 'max-w-sm text-[15px]' : variant === 'default' ? 'hidden sm:block' : ''}`}>{product.short}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-4 sm:mt-5 sm:pt-5">
          <div className="flex items-center gap-3">
            <SizeToggle value={size} onChange={setSize} />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={size}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="font-serif text-[22px] text-forest tabular-nums"
              >
                {formatPrice(product.prices[size])}
              </motion.span>
            </AnimatePresence>
          </div>
          <AddButton onAdd={() => add(product.id, size)} label="Añadir" compact={!feature} />
        </div>
      </div>
    </article>
  )
})
