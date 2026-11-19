import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, Check } from 'lucide-react'
import { NEEDS, PRODUCTS, productById } from '../data/products'
import type { NeedId } from '../data/products'
import { Jar } from './Jar'
import { Almond, CacaoBean, Peanut, Reveal, SectionTag, SplitTitle } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

function Decor({ id }: { id: NeedId }) {
  // elementos visuales propios de cada categoría
  if (id === 'energia')
    return (
      <svg viewBox="0 0 100 100" className="absolute -top-6 -right-6 size-40 opacity-25" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="50" x2={50 + 46 * Math.cos((i * Math.PI) / 6)} y2={50 + 46 * Math.sin((i * Math.PI) / 6)} stroke="currentColor" strokeWidth="1.2" />
        ))}
        <circle cx="50" cy="50" r="16" fill="currentColor" />
      </svg>
    )
  if (id === 'nutricion')
    return (
      <svg viewBox="0 0 100 100" className="absolute -top-4 -right-4 size-40 opacity-25" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
        {[14, 24, 34, 44].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} />
        ))}
      </svg>
    )
  if (id === 'proteina')
    return (
      <svg viewBox="0 0 100 100" className="absolute -top-4 -right-4 size-40 opacity-25" aria-hidden fill="currentColor">
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={10 + (i % 6) * 16} cy={10 + Math.floor(i / 6) * 16} r="2.4" />
        ))}
      </svg>
    )
  return (
    <svg viewBox="0 0 100 100" className="absolute -top-4 -right-4 size-40 opacity-25" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M0 ${20 + i * 18} q25 -14 50 0 t50 0`} />
      ))}
    </svg>
  )
}

const Nut = ({ id }: { id: NeedId }) =>
  id === 'antojo' ? (
    <CacaoBean className="w-8 rotate-[30deg]" color="#C9A27A" />
  ) : id === 'nutricion' ? (
    <Almond className="w-7 rotate-[20deg]" color="#D8B48A" />
  ) : (
    <Peanut className="w-7 -rotate-12" color="#E2B985" />
  )

export function CategorySelector({ need, onSelect }: { need: NeedId | null; onSelect: (n: NeedId | null) => void }) {
  return (
    <section aria-labelledby="need-title" className="relative py-24 sm:py-32">
      <div className="container-z">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
            <SectionTag n="01">Explora los sabores</SectionTag>
            </Reveal>
            <h2 id="need-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.6rem)] text-forest">
            <SplitTitle lines={[<>Encuentra tu</>, <span className="italic text-olive">favorito.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-sm text-[15px] leading-relaxed text-ink/70">
            Elige una categoría para filtrar el catálogo. Puedes cambiarla en cualquier momento.
          </Reveal>
        </div>

        {/* desktop: paneles que se expanden · móvil: carrusel con snap */}
        <div
          role="tablist"
          aria-label="Categorías de productos"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:h-[440px] lg:overflow-visible"
        >
          {NEEDS.map((n, i) => {
            const selected = need === n.id
            const featured = productById(n.featured)!
            const count = PRODUCTS.filter((p) => p.needs.includes(n.id)).length
            return (
              <motion.button
                key={n.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="catalogo"
                onClick={() => onSelect(selected ? null : n.id)}
                layout
                transition={{ layout: { duration: 0.7, ease } }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ backgroundColor: n.accent }}
                className={`group relative flex min-h-[380px] w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] p-6 text-left text-cream transition-[filter] duration-500 sm:w-[46%] lg:min-h-0 lg:w-auto lg:p-8 ${
                  selected ? 'lg:flex-[2.4]' : need ? 'lg:flex-[0.8] lg:brightness-90 hover:brightness-100' : 'lg:flex-1'
                }`}
              >
                <Decor id={n.id} />
                <div className="relative flex items-center justify-between">
                  <span className="font-serif text-[15px] italic opacity-70">0{i + 1}</span>
                  <span
                    className={`grid size-9 place-items-center rounded-full transition-all duration-500 ${
                      selected ? 'bg-cream text-forest' : 'bg-cream/15 group-hover:bg-cream/25'
                    }`}
                  >
                    {selected ? <Check className="size-4" /> : <ArrowDownRight className="size-4 transition-transform duration-500 group-hover:rotate-[-45deg]" />}
                  </span>
                </div>

                {/* producto */}
                <motion.div layout="position" className="relative my-auto flex items-end justify-center py-6">
                  <div className="absolute bottom-6 h-6 w-1/2 rounded-[50%] bg-black/20 blur-md" />
                  <motion.div
                    className="relative w-[46%] max-w-[150px]"
                    animate={{ rotate: selected ? -4 : 0, scale: selected ? 1.08 : 1 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <Jar product={featured} view={selected ? 'open' : 'front'} />
                  </motion.div>
                  <div className="absolute bottom-8 left-[12%]">
                    <Nut id={n.id} />
                  </div>
                </motion.div>

                <motion.div layout="position" className="relative">
                  <h3 className="font-serif text-[34px] leading-none tracking-tight">{n.label}</h3>
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.p
                      key={selected ? 'a' : 'b'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-cream/80"
                    >
                      {selected ? (
                        <>
                          <span className="font-semibold text-cream">{n.title}.</span> {n.description}
                        </>
                      ) : (
                        n.description
                      )}
                    </motion.p>
                  </AnimatePresence>
                  <span className="mt-4 inline-block text-[11px] font-semibold tracking-[0.18em] uppercase opacity-70">
                    {count} productos
                  </span>
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
