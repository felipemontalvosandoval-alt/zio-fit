import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS } from '../data/products'
import { BRAND, waLink } from '../config/brand'
import { Jar } from './Jar'
import { Almond, ButtonLink, CacaoBean, Peanut, SplitTitle, Sprig, WhatsAppIcon } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const P = (id: string) => PRODUCTS.find((p) => p.id === id)!

function Float({ children, d = 0, amp = 8, className = '' }: { children: ReactNode; d?: number; amp?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration: 6 + d, repeat: Infinity, ease: 'easeInOut', delay: d }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 90])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* textura botánica de fondo */}
      <Sprig className="pointer-events-none absolute -top-6 -left-10 h-[340px] w-[200px] -rotate-12 opacity-40" />

      <div className="container-z relative grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        {/* ---------- texto ---------- */}
        <motion.div style={{ y: yText }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow mb-6 flex items-center gap-3 text-forest/70"
          >
            <span className="inline-block size-1.5 rounded-full bg-olive" />
            Mantequillas de frutos secos · {BRAND.locations}
          </motion.p>

          <h1 className="display text-[clamp(3.1rem,9.6vw,7.6rem)] text-forest">
            <SplitTitle
              inView={false}
              delay={0.1}
              lines={[
                'Sabor de',
                <>
                  también <span className="text-cacao italic">puede</span>
                </>,
                <>
                  ser <span className="italic font-light">delicioso.</span>
                </>,
              ]}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="mt-8 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-[300px] text-[17px] leading-relaxed text-ink/75">
              <strong className="font-semibold text-forest">Sabor para todos los días.</strong>{' '}
              Mantequillas de maní y almendras en seis sabores.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#productos" size="lg">
              Descubrir productos
            </ButtonLink>
            <ButtonLink
              href={waLink(`¡Hola ${BRAND.name}! Quisiera hacer un pedido.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              icon={<WhatsAppIcon className="size-4" />}
            >
              Pedir por WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="mt-12 grid max-w-lg grid-cols-3 border-t border-forest/15 pt-5"
          >
            {[
              ['6', 'Sabores'],
              ['2', 'Tamaños'],
              ['Por', 'WhatsApp'],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-serif text-[30px] leading-none text-forest">{k}</dt>
                <dd className="mt-1.5 text-[12px] tracking-wide text-ink/60">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- composición de producto ---------- */}
        <motion.div style={{ y: yArt }} className="relative mx-auto aspect-[4/4.6] w-full max-w-[560px] lg:mr-0">
          {/* arco */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="absolute inset-x-[6%] top-[4%] bottom-[6%] overflow-hidden rounded-t-[999px] rounded-b-[40px] bg-forest"
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_30%,rgb(120_135_92/0.55),transparent_70%)]" />
            <Sprig className="absolute -right-6 bottom-10 h-[300px] w-[180px] rotate-12 opacity-50" color="#B9C49A" />
            <span className="absolute top-[16%] left-1/2 -translate-x-1/2 font-serif text-[clamp(6rem,22vw,11rem)] leading-none text-cream/[0.06] italic">
              zio
            </span>
            {/* superficie */}
            <div className="absolute inset-x-0 bottom-0 h-[24%] bg-cacao/90" />
            <div className="absolute inset-x-0 bottom-[24%] h-px bg-cream/20" />
          </motion.div>

          {/* frascos */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="absolute bottom-[14%] left-[5%] w-[34%]"
          >
            <Float d={0.6} amp={6}>
              <Jar product={P('chocomani')} view="open" />
            </Float>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
            className="absolute right-[4%] bottom-[14%] w-[33%]"
          >
            <Float d={1.2} amp={7}>
              <Jar product={P('almendras')} />
            </Float>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="absolute bottom-[9%] left-1/2 w-[44%] -translate-x-1/2 drop-shadow-[0_30px_30px_rgb(0_0_0/0.25)]"
          >
            <Float amp={9}>
              <Jar product={P('mani-tradicional')} size="500" view="spoon" />
            </Float>
          </motion.div>

          {/* frutos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="absolute top-[30%] left-0 w-[11%]"
          >
            <Float d={2} amp={12}>
              <Peanut className="rotate-[-30deg]" />
            </Float>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="absolute top-[22%] right-[2%] w-[9%]"
          >
            <Float d={1} amp={10}>
              <Almond className="rotate-[25deg]" />
            </Float>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="absolute bottom-[3%] left-[16%] w-[7%]"
          >
            <CacaoBean className="rotate-[60deg]" />
          </motion.div>

          {/* sello giratorio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="absolute top-[2%] left-[2%] grid size-[26%] max-w-[132px] place-items-center rounded-full bg-cream shadow-[var(--shadow-soft)]"
          >
            <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
              <defs>
                <path id="circ" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
              </defs>
              <text fontFamily="Manrope" fontSize="9.4" fontWeight="700" letterSpacing="3.1" fill="#283B2B">
                <textPath href="#circ">ENERGÍA NATURAL · EN CADA BOCADO ·</textPath>
              </text>
            </svg>
            <span className="font-serif text-[18px] text-cacao italic">ZIO FIT</span>
          </motion.div>
        </motion.div>
      </div>

      {/* banda marquee */}
      <div className="relative mt-14 overflow-hidden border-y border-forest/10 bg-beige/60 py-4 sm:mt-20" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              {['Maní tradicional', 'Crunchy', 'Chocomaní', 'Almendras', 'Chocoalmendras', 'Seis sabores', 'Pedidos por WhatsApp'].map(
                (w) => (
                  <span key={w} className="flex items-center gap-10 font-serif text-[22px] text-forest/80 italic">
                    {w}
                    <span className="size-1.5 rounded-full bg-olive" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
