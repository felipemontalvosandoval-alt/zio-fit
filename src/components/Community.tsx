import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { COMMUNITY } from '../data/content'
import { BRAND, img } from '../config/brand'
import { useEscape, useLockBody } from '../hooks/useScroll'
import { ButtonLink, InstagramIcon, Leaf, Reveal, SectionTag, SplitTitle } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** Posiciones del collage (desktop). Rotaciones mínimas, tamaños distintos. */
const SLOTS = [
  'lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-6 lg:-rotate-[1.5deg]',
  'lg:col-start-5 lg:col-span-4 lg:row-start-2 lg:row-span-6 lg:rotate-[1deg]',
  'lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-5 lg:-rotate-[0.5deg]',
]

export function Community() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  useLockBody(open !== null)
  useEscape(open !== null, close)

  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + COMMUNITY.length) % COMMUNITY.length)), [])
  useEffect(() => {
    if (open === null) return
    const on = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [open, go])

  return (
    <section id="comunidad" aria-labelledby="community-title" className="relative overflow-hidden bg-beige/60 py-24 sm:py-32">
      <div className="container-z">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTag n="04">Comunidad</SectionTag>
            </Reveal>
            <h2 id="community-title" className="display mt-5 text-[clamp(2.6rem,7.4vw,6rem)] text-forest">
              <SplitTitle lines={['ZIO en la', <span className="italic text-olive">vida real.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-5">
            <p className="font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug text-forest">
              No te lo contamos nosotros. Mira cómo ZIO forma parte de sus días.
            </p>
            <p className="mt-3 text-[13px] text-ink/55">Fotos reales de clientes, compartidas en nuestras historias de Instagram.</p>
          </Reveal>
        </div>

        {/* collage: carrusel en móvil, collage asimétrico en desktop */}
        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-12 lg:grid-rows-[repeat(7,70px)] lg:gap-6">
          {COMMUNITY.map((c, i) => (
            <Reveal as="li" key={c.file} delay={i * 0.12} className={`w-[72%] shrink-0 snap-center sm:w-auto ${SLOTS[i]}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-[26px] lg:h-full bg-cream p-2 text-left shadow-[var(--shadow-soft)] ring-1 ring-forest/10 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
                aria-label={`Ampliar foto: ${c.caption}`}
              >
                <span className="relative block w-full overflow-hidden rounded-[20px] lg:h-full">
                  <img
                    src={img(c.file)}
                    alt={`Cliente de ZIO FIT — ${c.caption}`}
                    width={c.w}
                    height={c.h}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover lg:aspect-auto lg:h-full transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06] lg:aspect-auto"
                  />
                  {/* overlay */}
                  <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest/85 via-forest/10 to-transparent p-5 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                    <span className="translate-y-0 font-serif text-[22px] leading-tight text-cream transition-transform duration-500 lg:translate-y-3 lg:group-hover:translate-y-0">
                      {c.caption}
                    </span>
                    <span className="mt-1 text-[12.5px] text-cream/75">{c.note}</span>
                  </span>
                  <span className="absolute top-3 right-3 grid size-9 scale-90 place-items-center rounded-full bg-cream/90 text-forest opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 className="size-4" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}

          {/* tarjeta CTA integrada al collage */}
          <Reveal as="li" delay={0.3} className="w-[72%] shrink-0 snap-center sm:col-span-3 sm:w-auto lg:col-start-9 lg:col-span-4 lg:row-start-6 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-5 rounded-[26px] bg-forest p-6 text-cream sm:flex-row sm:items-center lg:flex-col lg:items-start">
              <div>
                <p className="font-serif text-[24px] leading-tight">¿Ya disfrutas de ZIO?</p>
                <p className="mt-1 text-[13px] text-cream/70">Comparte tu momento con nosotros.</p>
              </div>
              <ButtonLink href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" variant="cream" size="sm" icon={<InstagramIcon className="size-4" />}>
                Visítanos en Instagram
              </ButtonLink>
            </div>
          </Reveal>
        </ul>

        <div className="mt-8 hidden items-center gap-3 text-[13px] text-ink/50 lg:flex">
          <Leaf className="h-5 w-4 text-olive" />
          Etiqueta a {BRAND.instagramHandle} en tus historias para aparecer aquí.
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-2/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
          >
            <button type="button" onClick={close} className="absolute top-4 right-4 z-10 grid size-12 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream hover:text-forest" aria-label="Cerrar" autoFocus>
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              className="absolute left-3 z-10 grid size-12 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream hover:text-forest sm:left-8"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              className="absolute right-3 z-10 grid size-12 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream hover:text-forest sm:right-8"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="size-5" />
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease }}
                className="relative max-h-[86vh] max-w-[min(88vw,520px)]"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={img(COMMUNITY[open].file)} alt={`Cliente de ZIO FIT — ${COMMUNITY[open].caption}`} className="max-h-[74vh] w-auto rounded-[24px] object-contain" />
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-cream">
                  <span className="font-serif text-[22px]">{COMMUNITY[open].caption}</span>
                  <span className="text-[12px] tracking-[0.16em] text-cream/60">
                    {open + 1} / {COMMUNITY.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
