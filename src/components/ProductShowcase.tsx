import { useMemo } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { NEEDS, PRODUCTS } from '../data/products'
import type { NeedId, Product } from '../data/products'
import { ProductCard } from './ProductCard'
import { Reveal, SectionTag, SplitTitle } from './ui'

export type FilterId = 'todos' | 'mani' | 'almendra' | 'cacao' | 'crunchy'
const FILTERS: { id: FilterId; label: string; test: (p: Product) => boolean }[] = [
  { id: 'todos', label: 'Todos', test: () => true },
  { id: 'mani', label: 'Maní', test: (p) => p.base === 'mani' },
  { id: 'almendra', label: 'Almendras', test: (p) => p.base === 'almendra' },
  { id: 'cacao', label: 'Con cacao', test: (p) => p.choco },
  { id: 'crunchy', label: 'Crunchy', test: (p) => p.crunchy },
]

/** Patrón editorial asimétrico según posición y cantidad */
function layoutFor(i: number, total: number): { cls: string; variant: 'feature' | 'wide' | 'default' } {
  if (total === 1) return { cls: 'lg:col-span-12', variant: 'wide' }
  if (total === 2) return { cls: i === 0 ? 'lg:col-span-7' : 'lg:col-span-5', variant: i === 0 ? 'feature' : 'default' }
  if (i === 0) return { cls: 'lg:col-span-6 lg:row-span-2', variant: 'feature' }
  if (i < 3) return { cls: 'lg:col-span-6', variant: 'wide' }
  const rest = total - 3
  return { cls: rest % 3 === 0 ? 'lg:col-span-4' : rest === 1 ? 'lg:col-span-12' : 'lg:col-span-6', variant: rest === 1 ? 'wide' : 'default' }
}

export function ProductShowcase({
  need,
  setNeed,
  filter,
  setFilter,
  onOpen,
}: {
  need: NeedId | null
  setNeed: (n: NeedId | null) => void
  filter: FilterId
  setFilter: (f: FilterId) => void
  onOpen: (id: string) => void
}) {
  const list = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter)!
    const base = PRODUCTS.filter((p) => f.test(p) && (!need || p.needs.includes(need)))
    // el producto destacado de la necesidad va primero
    const featured = need ? NEEDS.find((n) => n.id === need)?.featured : undefined
    return featured ? [...base].sort((a, b) => Number(b.id === featured) - Number(a.id === featured)) : base
  }, [need, filter])

  const needLabel = need ? NEEDS.find((n) => n.id === need)?.label : null

  return (
    <section id="productos" aria-labelledby="catalog-title" className="relative bg-beige/50 py-24 sm:py-32">
      <div className="container-z">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionTag n="02">Catálogo</SectionTag>
            </Reveal>
            <h2 id="catalog-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.6rem)] text-forest">
              <SplitTitle lines={['Calidad y sabor', <span className="italic text-cacao">en cada frasco.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="text-[15px] leading-relaxed text-ink/70 lg:col-span-4">
            Seis sabores, dos presentaciones: <strong className="font-semibold text-forest">250 g y 500 g</strong>. Toca un frasco para ver su ficha completa.
          </Reveal>
        </div>

        {/* filtros */}
        <div id="catalogo" className="sticky top-[68px] z-20 -mx-5 mt-12 mb-8 px-5 py-3 sm:mx-0 sm:px-0">
          <div className="flex flex-wrap items-center gap-3">
            <LayoutGroup id="filters">
              <div role="toolbar" aria-label="Filtrar productos" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-cream/90 p-1.5 shadow-[var(--shadow-soft)] ring-1 ring-forest/10 backdrop-blur">
                {FILTERS.map((f) => {
                  const on = f.id === filter
                  const n = PRODUCTS.filter((p) => f.test(p) && (!need || p.needs.includes(need))).length
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilter(f.id)}
                      disabled={n === 0}
                      className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 disabled:opacity-35 ${
                        on ? 'text-cream' : 'text-forest/75 hover:text-forest'
                      }`}
                    >
                      {on && (
                        <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-forest" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                      )}
                      <span className="relative">
                        {f.label} <sup className="ml-0.5 text-[9px] opacity-60">{n}</sup>
                      </span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
            <AnimatePresence>
              {needLabel && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setNeed(null)}
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-cacao pr-2 pl-4 text-[12px] font-semibold tracking-wide text-cream shadow-[var(--shadow-soft)]"
                  aria-label={`Quitar filtro ${needLabel}`}
                >
                  Para: {needLabel}
                  <span className="grid size-7 place-items-center rounded-full bg-cream/20 transition-transform duration-300 group-hover:rotate-90">
                    <X className="size-3.5" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length} productos mostrados
        </p>

        <motion.ul layout className="grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const { cls, variant } = layoutFor(i, list.length)
              return (
                <motion.li
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                  className={`${cls} ${variant === 'feature' ? 'sm:col-span-2 lg:col-span-6' : ''}`}
                >
                  <ProductCard product={p} variant={variant} onOpen={onOpen} index={PRODUCTS.indexOf(p)} />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-forest/25 p-10 text-center">
            <p className="font-serif text-2xl text-forest">No hay productos con esa combinación.</p>
            <button
              type="button"
              className="mt-4 text-[13px] font-semibold text-olive underline underline-offset-4"
              onClick={() => {
                setFilter('todos')
                setNeed(null)
              }}
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
