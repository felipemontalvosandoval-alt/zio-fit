import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MOMENTS } from '../data/content'
import type { MomentId } from '../data/content'
import { productById } from '../data/products'
import { Jar } from './Jar'
import { Scene } from './Scenes'
import { Reveal, SectionTag, SplitTitle } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

export function RecipesSection({ onOpen }: { onOpen: (id: string) => void }) {
  const [active, setActive] = useState<MomentId>('desayunos')
  const m = MOMENTS.find((x) => x.id === active)!
  const idx = MOMENTS.indexOf(m)

  return (
    <section id="recetas" aria-labelledby="day-title" className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      {/* grano tipográfico de fondo */}
      <span aria-hidden className="pointer-events-none absolute -right-10 -bottom-24 font-serif text-[clamp(10rem,30vw,26rem)] leading-none text-cream/[0.03] italic">
        día
      </span>

      <div className="container-z relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTag n="03" tone="light">
                Formas de disfrutar
              </SectionTag>
            </Reveal>
            <h2 id="day-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.6rem)]">
              <SplitTitle lines={[<>ZIO en</>, <span className="italic text-olive-soft">tu día.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-md text-[15px] leading-relaxed text-cream/70 lg:col-span-5">
            Ideas sencillas para disfrutar tus sabores favoritos en distintos momentos del día.
          </Reveal>
        </div>

        {/* selector tipo línea de tiempo */}
        <div role="tablist" aria-label="Momentos del día" className="no-scrollbar relative mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-0 sm:px-0">
          <div className="absolute inset-x-0 bottom-0 hidden h-px bg-cream/15 sm:block" />
          {MOMENTS.map((x, i) => {
            const on = x.id === active
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="day-panel"
                onClick={() => setActive(x.id)}
                className={`group relative shrink-0 rounded-full px-5 py-3 text-left transition-colors sm:rounded-none sm:px-0 sm:pt-0 sm:pb-5 ${
                  on ? 'bg-cream text-forest sm:bg-transparent sm:text-cream' : 'bg-cream/[0.06] text-cream/55 hover:text-cream sm:bg-transparent'
                }`}
              >
                <span className="hidden text-[11px] tracking-[0.2em] uppercase sm:block">{x.time}</span>
                <span className="block font-serif text-[18px] sm:mt-1 sm:text-[30px] sm:leading-none">
                  <span className="mr-2 hidden text-[14px] italic opacity-50 sm:inline">0{i + 1}</span>
                  {x.label}
                </span>
                {on && (
                  <motion.span layoutId="day-line" className="absolute inset-x-0 -bottom-px hidden h-[3px] rounded-full bg-olive-soft sm:block" transition={{ duration: 0.5, ease }} />
                )}
              </button>
            )
          })}
        </div>

        {/* panel */}
        <div id="day-panel" role="tabpanel" className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* imagen */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-square overflow-hidden rounded-[36px] bg-cacao">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 1.08, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: 4 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0 p-6"
                >
                  <Scene scene={m.scene} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-5 left-5 rounded-full bg-forest/80 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-cream uppercase backdrop-blur">
                {m.time}
              </div>
              <div className="absolute right-5 bottom-5 font-serif text-[64px] leading-none text-cream/30 italic">0{idx + 1}</div>
            </div>
          </div>

          {/* contenido */}
          <div className="lg:col-span-6 lg:pt-6">
            <AnimatePresence mode="wait">
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease }}>
                <h3 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1] tracking-tight">{m.title}</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/70">{m.intro}</p>
                <ul className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
                  {m.ideas.map((idea, i) => {
                    const p = productById(idea.product)!
                    return (
                      <motion.li
                        key={idea.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
                      >
                        <button
                          type="button"
                          onClick={() => onOpen(p.id)}
                          className="group flex w-full items-center gap-4 py-5 text-left"
                          aria-label={`${idea.title}: ver ${p.shortName}`}
                        >
                          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cream/[0.07] transition-colors group-hover:bg-cream/15">
                            <Jar product={p} className="h-11 w-auto transition-transform duration-500 group-hover:-rotate-6" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-serif text-[21px] leading-tight">{idea.title}</span>
                            <span className="mt-1 block text-[13.5px] leading-relaxed text-cream/60">{idea.text}</span>
                            <span className="mt-1.5 block text-[11px] font-semibold tracking-[0.16em] text-olive-soft uppercase">Con {p.shortName}</span>
                          </span>
                          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-cream group-hover:bg-cream group-hover:text-forest">
                            <ArrowUpRight className="size-4" />
                          </span>
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
