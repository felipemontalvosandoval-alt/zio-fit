import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, X } from 'lucide-react'
import { POLICIES } from '../data/content'
import { BRAND, waLink } from '../config/brand'
import { useDialogFocus, useEscape, useLockBody } from '../hooks/useScroll'
import { ButtonLink, InstagramIcon, Logo, SplitTitle, Sprig, TextLink, WhatsAppIcon } from './ui'

export function Footer() {
  const [policy, setPolicy] = useState<string | null>(null)
  const p = POLICIES.find((x) => x.id === policy)
  const dialogRef = useRef<HTMLDivElement>(null)
  useLockBody(!!p)
  useEscape(!!p, () => setPolicy(null))
  useDialogFocus(dialogRef, !!p)

  return (
    <footer className="relative overflow-hidden bg-forest-2 text-cream">
      {/* CTA final */}
      <div className="container-z relative border-b border-cream/10 pt-24 pb-20 sm:pt-32">
        <Sprig className="absolute top-10 -right-6 h-[320px] w-[190px] rotate-12 opacity-30" color="#B9C49A" />
        <p className="eyebrow text-olive-soft">Tu próximo frasco te espera</p>
        <h2 className="display mt-6 max-w-5xl text-[clamp(2.8rem,9vw,8rem)]">
          <SplitTitle lines={['Un sabor para', <span className="italic text-olive-soft">cada momento.</span>]} />
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#productos" variant="cream" size="lg">
            Arma tu pedido
          </ButtonLink>
          <ButtonLink
            href={waLink(`¡Hola ${BRAND.name}! Quisiera hacer un pedido.`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            icon={<WhatsAppIcon className="size-4" />}
          >
            Escribir por WhatsApp
          </ButtonLink>
        </div>
      </div>

      <div className="container-z grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="block pt-3">
            <Logo tone="light" />
          </span>
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-cream/60">
            Mantequillas de maní y almendras. {BRAND.locations}. Coordina tu entrega por WhatsApp.
          </p>
          <div className="mt-6 flex gap-2">
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram de ZIO FIT" className="grid size-11 place-items-center rounded-full bg-cream/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-forest">
              <InstagramIcon />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de ZIO FIT" className="grid size-11 place-items-center rounded-full bg-cream/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive">
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Pie de página" className="lg:col-span-2">
          <p className="eyebrow text-cream/40">Explora</p>
          <ul className="mt-5 space-y-3 text-[14px]">
            {[
              ['#inicio', 'Inicio'],
              ['#productos', 'Productos'],
              ['#recetas', 'Recetas'],
              ['#comunidad', 'Comunidad'],
              ['#historia', 'Nuestra historia'],
              ['#faq', 'Preguntas'],
            ].map(([h, l]) => (
              <li key={h}>
                <TextLink href={h} className="text-cream/80 hover:text-cream">
                  {l}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow text-cream/40">Contacto</p>
          <ul className="mt-5 space-y-3 text-[14px] text-cream/80">
            <li>
              <TextLink href={waLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp · {BRAND.phoneDisplay}
              </TextLink>
            </li>
            <li>
              <TextLink href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram · {BRAND.instagramHandle}
              </TextLink>
            </li>
            {BRAND.email && <li className="text-cream/50">{BRAND.email}</li>}
            <li className="text-cream/50">{BRAND.locations}</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-cream/40">Políticas</p>
          <ul className="mt-5 space-y-3 text-[14px]">
            {POLICIES.map((x) => (
              <li key={x.id}>
                <button type="button" onClick={() => setPolicy(x.id)} className="group relative text-left text-cream/80 hover:text-cream">
                  {x.title}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-z flex flex-col items-start justify-between gap-4 border-t border-cream/10 py-6 pb-24 text-[12px] text-cream/45 sm:flex-row sm:items-center md:pb-6">
        <p>© {new Date().getFullYear()} ZIO FIT · {BRAND.tagline}</p>
        <a href="#inicio" className="group inline-flex items-center gap-2 hover:text-cream">
          Volver arriba
          <span className="grid size-8 place-items-center rounded-full bg-cream/10 transition-transform duration-500 group-hover:-translate-y-1">
            <ArrowUp className="size-3.5" />
          </span>
        </a>
      </div>

      <span aria-hidden className="pointer-events-none block h-[16vw] overflow-hidden text-center font-serif text-[26vw] leading-[0.8] text-cream/[0.04] select-none">
        zio
      </span>

      <AnimatePresence>
        {p && (
          <motion.div ref={dialogRef} className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="policy-title" tabIndex={-1}>
            <div className="absolute inset-0 bg-forest-2/70 backdrop-blur-sm" onClick={() => setPolicy(null)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-t-[28px] bg-cream p-8 text-ink sm:rounded-[28px]"
            >
              <button type="button" onClick={() => setPolicy(null)} aria-label="Cerrar" autoFocus className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-beige text-forest transition-transform hover:rotate-90">
                <X className="size-4" />
              </button>
              <h2 id="policy-title" className="pr-10 font-serif text-[30px] leading-tight text-forest">
                {p.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{p.body}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
