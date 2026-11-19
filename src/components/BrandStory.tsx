import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { STORY } from '../data/content'
import { BRAND, img } from '../config/brand'
import { PRODUCTS } from '../data/products'
import { Jar } from './Jar'
import { Almond, CacaoBean, Leaf, Peanut, Reveal, SectionTag, SplitTitle } from './ui'

export function BrandStory() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 50])

  return (
    <section id="historia" ref={ref} aria-labelledby="story-title" className="relative overflow-hidden py-24 sm:py-36">
      <div className="container-z">
        <Reveal>
          <SectionTag n="05">Nuestra historia</SectionTag>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* título + manifiesto */}
          <div className="lg:col-span-7">
            <h2 id="story-title" className="display text-[clamp(2.6rem,7.4vw,6.2rem)] text-forest">
              <SplitTitle lines={['Más que', <>un producto,</>, <span className="italic text-cacao">un estilo de vida.</span>]} />
            </h2>

            <Reveal delay={0.1} className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr]">
              <span className="font-serif text-[80px] leading-[0.7] text-olive">“</span>
              <div>
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug text-forest">
                  Explora los sabores de ZIO FIT y encuentra una opción para disfrutar en casa, en el desayuno o en tus recetas.
                </p>
                <p className="mt-6 max-w-lg rounded-2xl border border-dashed border-forest/25 bg-beige/40 p-5 text-[14.5px] leading-relaxed text-ink/65">
                  Para conocer ingredientes, alérgenos e información nutricional, solicita la etiqueta vigente de cada sabor.
                </p>
              </div>
            </Reveal>
          </div>

          {/* composición visual */}
          <div className="relative min-h-[460px] lg:col-span-5">
            <motion.figure style={{ y: y1 }} className="absolute top-0 right-0 grid aspect-[3/5] w-[64%] place-items-center overflow-hidden rounded-[28px] bg-beige shadow-[var(--shadow-soft)]">
              <img src={img('frasco-zio.png')} alt="Frasco de ZIO FIT sostenido en una mano" loading="lazy" className="h-full w-full object-contain" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-forest uppercase">
                Nuestro frasco
              </figcaption>
            </motion.figure>
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 grid w-[58%] place-items-center rounded-[28px] bg-forest p-6 pt-8 shadow-[var(--shadow-lift)]">
              <Jar product={PRODUCTS[4]} view="open" className="w-[62%]" />
              <p className="mt-4 text-center font-serif text-[20px] leading-tight text-cream italic">{BRAND.tagline}</p>
            </motion.div>
            <Leaf className="absolute top-[42%] left-[6%] h-16 w-14 -rotate-12 text-olive" />
          </div>
        </div>

        {/* pilares */}
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {STORY.pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1}>
              <article className={`group h-full rounded-[28px] p-7 transition-colors duration-500 ${i === 1 ? 'bg-cacao text-cream md:translate-y-8' : 'bg-beige text-forest'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[15px] italic opacity-60">{p.k}</span>
                  <span className="transition-transform duration-700 group-hover:rotate-[20deg]">
                    {i === 0 ? <Peanut className="w-6" /> : i === 1 ? <Almond className="w-6" color="#F5EFE4" /> : <CacaoBean className="w-6" />}
                  </span>
                </div>
                <h3 className="mt-10 font-serif text-[30px] leading-none tracking-tight">{p.title}</h3>
                <p className={`mt-4 text-[14.5px] leading-relaxed ${i === 1 ? 'text-cream/80' : 'text-ink/65'}`}>{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
