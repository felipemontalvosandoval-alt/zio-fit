import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/content'
import { BRAND, waLink } from '../config/brand'
import { Reveal, SectionTag, SplitTitle, TextLink } from './ui'

/** Resalta los [placeholders] para que sea evidente qué falta completar */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') ? (
          <mark key={i} className="rounded bg-cacao/15 px-1 text-cacao-deep">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative pb-24 sm:pb-32">
      <div className="container-z grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionTag n="06">Preguntas frecuentes</SectionTag>
            </Reveal>
            <h2 id="faq-title" className="display mt-5 text-[clamp(2.4rem,5.4vw,4.2rem)] text-forest">
              <SplitTitle lines={['Todo lo que', <span className="italic text-olive">quieres saber.</span>]} />
            </h2>
            <Reveal delay={0.1} className="mt-6 text-[15px] text-ink/65">
              ¿Otra duda?{' '}
              <TextLink href={waLink(`¡Hola ${BRAND.name}! Tengo una consulta.`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest">
                Escríbenos por WhatsApp
              </TextLink>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-forest/15 lg:col-span-8">
          {FAQS.map((f, i) => {
            const on = open === i
            return (
              <li key={f.q} className="border-b border-forest/15">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="w-8 shrink-0 font-serif text-[15px] text-cacao italic">0{i + 1}</span>
                    <span className={`flex-1 font-serif text-[clamp(1.25rem,2.2vw,1.7rem)] leading-tight transition-colors ${on ? 'text-forest' : 'text-forest/80 group-hover:text-forest'}`}>
                      {f.q}
                    </span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                        on ? 'rotate-45 bg-forest text-cream' : 'bg-beige text-forest group-hover:bg-forest group-hover:text-cream'
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-[52px] text-[15px] leading-relaxed text-ink/70">
                        <Rich text={f.a} />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
