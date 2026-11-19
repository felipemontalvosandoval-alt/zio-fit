import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TESTIMONIALS, TESTIMONIALS_ARE_DEMO } from '../data/content'
import { IconButton, Reveal, SectionTag } from './ui'

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length
  const go = useCallback(
    (d: number) => {
      setDir(d)
      setI((x) => (x + d + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [paused, go])

  const t = TESTIMONIALS[i]

  if (TESTIMONIALS_ARE_DEMO) return null

  return (
    <section aria-labelledby="testi-title" className="relative py-24 sm:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-z">
        <div className="relative overflow-hidden rounded-[40px] bg-cacao px-6 py-14 text-cream sm:px-14 sm:py-20">
          <span aria-hidden className="pointer-events-none absolute -top-16 -left-4 font-serif text-[22rem] leading-none text-cream/[0.07]">
            “
          </span>
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <SectionTag n="06" tone="light">
                <span id="testi-title">Lo que dicen</span>
              </SectionTag>
            </Reveal>
            {TESTIMONIALS_ARE_DEMO && (
              <span className="rounded-full border border-cream/30 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase">
                Contenido de demostración
              </span>
            )}
          </div>

          <div className="relative mt-10 min-h-[240px] sm:min-h-[220px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                className="max-w-4xl cursor-grab active:cursor-grabbing"
              >
                <blockquote className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.12] tracking-tight">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-cream/15 font-serif text-[20px]">{t.name.replace(/[[\]]/g, '').charAt(0)}</span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-[13px] text-cream/70">{t.detail}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-10 flex items-center justify-between gap-6">
            <div className="flex gap-2" role="tablist" aria-label="Testimonios">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Testimonio ${k + 1}`}
                  onClick={() => {
                    setDir(k > i ? 1 : -1)
                    setI(k)
                  }}
                  className="relative h-1.5 w-10 overflow-hidden rounded-full bg-cream/25"
                >
                  {k === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-cream"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : 7, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <IconButton label="Anterior" onClick={() => go(-1)} className="!bg-cream/10 !text-cream !ring-cream/20 hover:!bg-cream hover:!text-forest">
                <ArrowLeft className="size-4" />
              </IconButton>
              <IconButton label="Siguiente" onClick={() => go(1)} className="!bg-cream !text-forest !ring-0 hover:!bg-forest hover:!text-cream">
                <ArrowRight className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
