import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { productById } from '../data/products'
import { BRAND, PAYMENT_METHODS, formatPrice } from '../config/brand'
import { useDialogFocus, useEscape, useLockBody } from '../hooks/useScroll'
import { Jar } from './Jar'
import { ButtonLink, WhatsAppIcon } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

function CopyValue({ label, value }: { label: string; value: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setOk(true)
          setTimeout(() => setOk(false), 1500)
        } catch {
          /* el portapapeles puede estar bloqueado: el número sigue visible */
        }
      }}
      className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-cream"
      aria-label={`Copiar ${label}: ${value}`}
    >
      <span>
        <span className="block text-[10px] font-bold tracking-[0.16em] text-ink/50 uppercase">{label}</span>
        <span className="font-mono text-[13px] text-forest">{value}</span>
      </span>
      <span className="text-ink/40 group-hover:text-forest">{ok ? <Check className="size-4 text-olive" /> : <Copy className="size-4" />}</span>
    </button>
  )
}

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count, whatsappUrl, clear } = useCart()
  const dialogRef = useRef<HTMLDivElement>(null)
  useLockBody(isOpen)
  useEscape(isOpen, close)
  useDialogFocus(dialogRef, isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={dialogRef} className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito de compras" tabIndex={-1}>
          <motion.div
            className="absolute inset-0 bg-forest-2/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-cream shadow-[var(--shadow-lift)] sm:rounded-l-[32px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease }}
          >
            <header className="flex items-center justify-between px-6 pt-6 pb-4 sm:px-8">
              <div>
                <p className="eyebrow text-olive">Tu pedido</p>
                <h2 className="mt-1 font-serif text-[34px] leading-none text-forest">
                  Carrito <span className="text-[20px] text-ink/40 italic">({count})</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full bg-beige text-forest transition-transform duration-300 hover:rotate-90 active:scale-90"
                aria-label="Cerrar carrito"
                autoFocus
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 pb-16 text-center">
                  <div className="grid size-24 place-items-center rounded-full bg-beige">
                    <ShoppingBag className="size-9 text-forest/50" strokeWidth={1.4} />
                  </div>
                  <p className="font-serif text-[26px] leading-tight text-forest">
                    Tu carrito está
                    <br />
                    <span className="italic">esperando un frasco.</span>
                  </p>
                  <ButtonLink href="#productos" onClick={close} variant="primary">
                    Ver productos
                  </ButtonLink>
                </div>
              ) : (
                <ul className="divide-y divide-forest/10">
                  <AnimatePresence initial={false}>
                    {items.map((i) => {
                      const p = productById(i.productId)!
                      const line = p.prices[i.size] * i.qty
                      return (
                        <motion.li
                          key={`${i.productId}-${i.size}`}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30, height: 0, paddingTop: 0, paddingBottom: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="flex gap-4 overflow-hidden py-4"
                        >
                          <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-beige">
                            <Jar product={p} size={i.size} className="h-16 w-auto" />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-serif text-[19px] leading-tight text-forest">{p.shortName}</p>
                                <p className="text-[12px] text-ink/55">
                                  {i.size} g · {formatPrice(p.prices[i.size])} c/u
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(i.productId, i.size)}
                                className="grid size-8 place-items-center rounded-full text-ink/40 transition hover:bg-beige hover:text-cacao-deep active:scale-90"
                                aria-label={`Eliminar ${p.shortName} ${i.size} g`}
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex h-9 items-center rounded-full bg-beige p-0.5">
                                <button
                                  type="button"
                                  onClick={() => setQty(i.productId, i.size, i.qty - 1)}
                                  className="grid size-8 place-items-center rounded-full text-forest transition hover:bg-cream active:scale-90"
                                  aria-label="Disminuir"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <motion.span key={i.qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-7 text-center text-[14px] font-semibold tabular-nums">
                                  {i.qty}
                                </motion.span>
                                <button
                                  type="button"
                                  onClick={() => setQty(i.productId, i.size, i.qty + 1)}
                                  className="grid size-8 place-items-center rounded-full text-forest transition hover:bg-cream active:scale-90"
                                  aria-label="Aumentar"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <span className="font-serif text-[18px] text-forest tabular-nums">{formatPrice(line)}</span>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
              )}

              {items.length > 0 && (
                <details className="group mt-2 mb-6 rounded-2xl bg-beige/70 p-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-[13px] font-semibold text-forest">
                    Medios de pago
                    <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <div className="pb-1">
                    {PAYMENT_METHODS.map((m) => (
                      <CopyValue key={m.id} label={m.label} value={m.value} />
                    ))}
                    <p className="px-3 pt-2 text-[11.5px] leading-relaxed text-ink/55">
                      Primero confirma tu pedido por WhatsApp; luego realiza el pago y envía el comprobante.
                    </p>
                  </div>
                </details>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-forest/10 bg-cream px-6 pt-5 pb-[max(24px,env(safe-area-inset-bottom))] sm:px-8">
                <dl className="space-y-1.5 text-[14px]">
                  <div className="flex justify-between text-ink/65">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink/65">
                    <dt>Envío</dt>
                    <dd>Se coordina por WhatsApp</dd>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <dt className="font-semibold text-forest">Total productos</dt>
                    <dd className="font-serif text-[30px] text-forest tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                </dl>
                <ButtonLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="mt-4 w-full justify-between"
                  icon={<WhatsAppIcon className="size-5" />}
                >
                  Continuar por WhatsApp
                </ButtonLink>
                <div className="mt-3 flex items-center justify-between text-[12px] text-ink/50">
                  <span>Se abrirá WhatsApp con tu pedido listo para enviar a {BRAND.name}.</span>
                  <button type="button" onClick={clear} className="shrink-0 pl-3 underline underline-offset-2 hover:text-cacao-deep">
                    Vaciar
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
