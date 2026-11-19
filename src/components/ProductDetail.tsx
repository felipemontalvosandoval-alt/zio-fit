import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { productById } from '../data/products'
import type { Product, SizeId } from '../data/products'
import { BRAND, formatPrice, waLink } from '../config/brand'
import { useCart } from '../context/CartContext'
import { useDialogFocus, useEscape, useLockBody } from '../hooks/useScroll'
import { Jar } from './Jar'
import { Almond, Button, CacaoBean, Peanut, WhatsAppIcon } from './ui'
import { SizeToggle } from './ProductCard'

const ease = [0.22, 1, 0.36, 1] as const
type Tab = 'descripcion' | 'ingredientes' | 'disfrutar'
const TABS: { id: Tab; label: string }[] = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'ingredientes', label: 'Ingredientes' },
  { id: 'disfrutar', label: 'Cómo disfrutarla' },
]

function IngredientsArt({ product }: { product: Product }) {
  return (
    <div className="relative flex size-full items-center justify-center gap-4">
      {product.base === 'mani' ? (
        <>
          <Peanut className="w-[18%] -rotate-12" />
          <Peanut className="w-[22%] rotate-[20deg]" color="#BE8A52" />
        </>
      ) : (
        <>
          <Almond className="w-[18%] -rotate-12" />
          <Almond className="w-[20%] rotate-[24deg]" color="#9E6A3E" />
        </>
      )}
      {product.choco && <CacaoBean className="w-[16%] rotate-[40deg]" />}
    </div>
  )
}

export function ProductDetail({ id, onClose }: { id: string | null; onClose: () => void }) {
  const product = id ? productById(id) : undefined
  const dialogRef = useRef<HTMLDivElement>(null)
  useLockBody(!!product)
  useEscape(!!product, onClose)
  useDialogFocus(dialogRef, !!product)

  return (
    <AnimatePresence>
      {product && (
        <motion.div ref={dialogRef} key="pd" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="pd-title">
          <motion.div
            className="absolute inset-0 bg-forest-2/60 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Panel product={product} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Panel({ product, onClose }: { product: Product; onClose: () => void }) {
  const [view, setView] = useState(0)
  const [tab, setTab] = useState<Tab>('descripcion')
  const [size, setSize] = useState<SizeId>('250')
  const [qty, setQty] = useState(1)
  const { add, open } = useCart()
  const views = ['front', 'spoon', 'open', 'ingredients'] as const

  useEffect(() => {
    setView(0)
    setQty(1)
    setTab('descripcion')
  }, [product.id])

  const handleAdd = useCallback(() => {
    add(product.id, size, qty)
    onClose()
    window.setTimeout(open, 250)
  }, [add, product.id, size, qty, onClose, open])

  const quickMsg = `¡Hola ${BRAND.name}! Quiero pedir: ${qty} × ${product.shortName} (${size} g) — ${formatPrice(product.prices[size] * qty)}`

  return (
    <motion.div
      className="relative flex max-h-[94dvh] w-full max-w-[1080px] flex-col overflow-hidden rounded-t-[32px] bg-cream shadow-[var(--shadow-lift)] sm:rounded-[32px] md:grid md:max-h-[88vh] md:grid-cols-[1.05fr_1fr]"
      initial={{ y: '100%', opacity: 0.6 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar ficha"
        className="absolute top-4 right-4 z-20 grid size-11 place-items-center rounded-full bg-cream/90 text-forest ring-1 ring-forest/10 transition-transform duration-300 hover:rotate-90 active:scale-90"
        autoFocus
      >
        <X className="size-5" />
      </button>
      {/* asa móvil */}
      <span className="absolute top-2.5 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-forest/20 sm:hidden" />

      {/* galería */}
      <div className="relative flex shrink-0 flex-col bg-beige p-5 sm:p-8">
        <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[24px] bg-[radial-gradient(60%_60%_at_50%_45%,#F7F1E6,transparent_75%)] md:aspect-auto md:flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.45, ease }}
              className="flex size-full items-center justify-center"
            >
              {views[view] === 'ingredients' ? (
                <IngredientsArt product={product} />
              ) : (
                <Jar product={product} size={size} view={views[view]} className="h-[80%] max-h-[380px] w-auto" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-2" role="tablist" aria-label="Galería">
          {views.map((v, i) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === i}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => setView(i)}
              className={`grid h-16 flex-1 place-items-center overflow-hidden rounded-2xl bg-cream/70 transition-all duration-300 ${
                view === i ? 'ring-2 ring-forest' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {v === 'ingredients' ? (
                <div className="h-10 w-16">
                  <IngredientsArt product={product} />
                </div>
              ) : (
                <Jar product={product} size={size} view={v} className="h-12 w-auto" />
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-ink/45">Ilustraciones referenciales · reemplazables por fotografía de producto</p>
      </div>

      {/* info */}
      <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-9">
        <p className="eyebrow text-olive">
          {product.base === 'mani' ? 'Mantequilla de maní' : 'Mantequilla de almendras'}
          {product.badge ? ` · ${product.badge}` : ''}
        </p>
        <h2 id="pd-title" className="display mt-3 pr-10 text-[clamp(2.2rem,5vw,3.6rem)] text-forest">
          {product.shortName}
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <SizeToggle value={size} onChange={setSize} />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={size}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              className="font-serif text-[30px] text-forest tabular-nums"
            >
              {formatPrice(product.prices[size])}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* tabs */}
        <div role="tablist" aria-label="Información del producto" className="mt-8 flex gap-6 border-b border-forest/15">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`relative pb-3 text-[13px] font-semibold transition-colors ${tab === t.id ? 'text-forest' : 'text-ink/50 hover:text-ink/80'}`}
            >
              {t.label}
              {tab === t.id && <motion.span layoutId="pd-tab" className="absolute inset-x-0 -bottom-px h-[2px] bg-cacao" />}
            </button>
          ))}
        </div>
        <div className="relative min-h-[150px] pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="text-[15px] leading-relaxed text-ink/75"
            >
              {tab === 'descripcion' && (
                <>
                  <p>{product.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {[`${size} g`, 'Consulta ingredientes y alérgenos por WhatsApp'].map((t) => (
                      <li key={t} className="rounded-full bg-beige px-3 py-1.5 text-[12px] font-medium text-forest">
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {tab === 'ingredientes' && (
                <>
                  <div className="mt-5 rounded-2xl border border-dashed border-forest/25 p-4 text-[13px] text-ink/60">
                    <strong className="font-semibold text-forest">Ingredientes e información nutricional:</strong> solicita la etiqueta vigente de este sabor antes de comprar. La lista de ingredientes, alérgenos y tabla nutricional aún deben confirmarse con la marca.
                  </div>
                </>
              )}
              {tab === 'disfrutar' && (
                <ol className="space-y-3">
                  {product.howTo.map((h, i) => (
                    <li key={h} className="flex items-baseline gap-4">
                      <span className="font-serif text-[18px] text-cacao italic">0{i + 1}</span>
                      {h}
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* compra */}
        <div className="sticky bottom-0 mt-auto -mx-6 border-t border-forest/10 bg-cream px-6 pt-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:-mx-9 sm:px-9">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full bg-beige p-1" aria-label="Cantidad">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-10 place-items-center rounded-full text-forest transition hover:bg-cream active:scale-90 disabled:opacity-30"
                disabled={qty <= 1}
                aria-label="Disminuir cantidad"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="grid size-10 place-items-center rounded-full text-forest transition hover:bg-cream active:scale-90"
                aria-label="Aumentar cantidad"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button onClick={handleAdd} className="flex-1" size="md" variant="dark">
              Agregar · {formatPrice(product.prices[size] * qty)}
            </Button>
          </div>
          <a
            href={waLink(quickMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-olive hover:text-forest"
          >
            <WhatsAppIcon className="size-4" /> Pedir solo este producto por WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}
