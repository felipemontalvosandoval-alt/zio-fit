import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useActiveSection, useEscape, useLockBody, useScrolled } from '../hooks/useScroll'
import { BRAND, waLink } from '../config/brand'
import { InstagramIcon, Logo, WhatsAppIcon } from './ui'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'recetas', label: 'Recetas' },
  { id: 'historia', label: 'Nuestra historia' },
]
const IDS = LINKS.map((l) => l.id)

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(IDS)
  const { count, open, pulse } = useCart()
  const [menu, setMenu] = useState(false)
  useLockBody(menu)
  useEscape(menu, () => setMenu(false))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter,padding] duration-500 ${
          scrolled ? 'bg-cream/85 py-2.5 shadow-[0_1px_0_rgb(40_59_43/0.08)] backdrop-blur-md' : 'py-4 sm:py-5'
        }`}
      >
        <nav className="container-z flex items-center justify-between gap-4" aria-label="Principal">
          <a href="#inicio" className="relative z-10 shrink-0 pt-3" aria-label="ZIO FIT — inicio">
            <Logo />
          </a>

          {/* links desktop con indicador */}
          <ul className="hidden items-center gap-1 rounded-full bg-white/50 p-1 ring-1 ring-forest/10 backdrop-blur lg:flex">
            {LINKS.map((l) => (
              <li key={l.id} className="relative">
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    active === l.id ? 'text-cream' : 'text-forest/80 hover:text-forest'
                  }`}
                  aria-current={active === l.id ? 'true' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={waLink(`¡Hola ${BRAND.name}! Quisiera hacer un pedido.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-11 items-center gap-2 rounded-full bg-olive pr-5 pl-1.5 text-[12px] font-semibold tracking-[0.08em] text-cream uppercase transition-all duration-300 hover:bg-forest active:scale-95 md:inline-flex"
            >
              <span className="grid size-8 place-items-center rounded-full bg-cream text-olive transition-transform duration-500 group-hover:rotate-[360deg]">
                <WhatsAppIcon className="size-4" />
              </span>
              Comprar
            </a>
            <motion.button
              key={pulse}
              type="button"
              onClick={open}
              aria-label={`Abrir carrito, ${count} productos`}
              className="relative inline-grid size-11 place-items-center rounded-full bg-forest text-cream transition-colors duration-300 hover:bg-olive active:scale-90"
              animate={pulse ? { scale: [1, 1.18, 0.95, 1], rotate: [0, -8, 6, 0] } : undefined}
              transition={{ duration: 0.55 }}
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.8} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, y: 4 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-cacao px-1 text-[10px] font-bold text-cream ring-2 ring-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              className="inline-grid size-11 place-items-center rounded-full bg-white/70 text-forest ring-1 ring-forest/10 active:scale-90 lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={menu}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* menú móvil: pantalla completa editorial */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-forest text-cream lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <div className="container-z flex items-center justify-between py-4">
              <span className="pt-3">
                <Logo tone="light" />
              </span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="inline-grid size-11 place-items-center rounded-full bg-cream/10 active:scale-90"
                aria-label="Cerrar menú"
                autoFocus
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="container-z mt-8 flex flex-1 flex-col gap-1">
              {[...LINKS, { id: 'comunidad', label: 'Comunidad' }, { id: 'faq', label: 'Preguntas' }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setMenu(false)}
                    className="flex items-baseline gap-4 border-b border-cream/10 py-4 font-serif text-[40px] leading-none tracking-tight"
                  >
                    <span className="font-sans text-[11px] tracking-[0.2em] text-olive-soft">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-z grid grid-cols-2 gap-3 pt-6 pb-[max(24px,env(safe-area-inset-bottom))]">
              <a
                href={waLink(`¡Hola ${BRAND.name}! Quisiera hacer un pedido.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-olive text-[12px] font-semibold tracking-[0.1em] uppercase"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-cream/25 text-[12px] font-semibold tracking-[0.1em] uppercase"
              >
                <InstagramIcon /> Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
