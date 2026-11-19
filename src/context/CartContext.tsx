import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { productById } from '../data/products'
import type { SizeId } from '../data/products'
import { BRAND, formatPrice, waLink } from '../config/brand'

export interface CartItem {
  productId: string
  size: SizeId
  qty: number
}

type Action =
  | { type: 'add'; productId: string; size: SizeId; qty: number }
  | { type: 'set'; productId: string; size: SizeId; qty: number }
  | { type: 'remove'; productId: string; size: SizeId }
  | { type: 'clear' }

const KEY = 'ziofit-cart-v1'
const MAX_QTY = 20

function reducer(state: CartItem[], a: Action): CartItem[] {
  switch (a.type) {
    case 'add': {
      const found = state.find((i) => i.productId === a.productId && i.size === a.size)
      if (found)
        return state.map((i) => (i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + a.qty) } : i))
      return [...state, { productId: a.productId, size: a.size, qty: Math.min(MAX_QTY, a.qty) }]
    }
    case 'set':
      if (a.qty <= 0) return state.filter((i) => !(i.productId === a.productId && i.size === a.size))
      return state.map((i) =>
        i.productId === a.productId && i.size === a.size ? { ...i, qty: Math.min(MAX_QTY, a.qty) } : i,
      )
    case 'remove':
      return state.filter((i) => !(i.productId === a.productId && i.size === a.size))
    case 'clear':
      return []
  }
}

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed.filter((i) => productById(i.productId) && i.qty > 0) : []
  } catch {
    return []
  }
}

interface CartCtx {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  /** Se incrementa en cada "añadir": dispara animaciones del icono del carrito. */
  pulse: number
  lastAdded: { name: string; size: SizeId; qty: number } | null
  open: () => void
  close: () => void
  add: (productId: string, size: SizeId, qty?: number) => void
  setQty: (productId: string, size: SizeId, qty: number) => void
  remove: (productId: string, size: SizeId) => void
  clear: () => void
  whatsappUrl: string
}

const Ctx = createContext<CartCtx | null>(null)

export function buildOrderMessage(items: CartItem[], subtotal: number) {
  const lines = items.map((i) => {
    const p = productById(i.productId)!
    const unit = p.prices[i.size]
    return `• ${i.qty} × ${p.shortName} (${i.size} g) — ${formatPrice(unit * i.qty)}`
  })
  return [
    `¡Hola ${BRAND.name}! Quiero hacer este pedido desde la web:`,
    '',
    ...lines,
    '',
    `*Subtotal de productos: ${formatPrice(subtotal)}*`,
    'Envío: por coordinar por WhatsApp.',
    '',
    'Nombre:',
    'Forma de entrega (delivery / recojo) y distrito:',
  ].join('\n')
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, load)
  const [isOpen, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0)
  const [lastAdded, setLastAdded] = useState<CartCtx['lastAdded']>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* almacenamiento no disponible: el carrito sigue funcionando en memoria */
    }
  }, [items])

  const add = useCallback((productId: string, size: SizeId, qty = 1) => {
    dispatch({ type: 'add', productId, size, qty })
    setPulse((n) => n + 1)
    const p = productById(productId)
    if (p) setLastAdded({ name: p.shortName, size, qty })
  }, [])
  const setQty = useCallback(
    (productId: string, size: SizeId, qty: number) => dispatch({ type: 'set', productId, size, qty }),
    [],
  )
  const remove = useCallback((productId: string, size: SizeId) => dispatch({ type: 'remove', productId, size }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(() => setLastAdded(null), 2600)
    return () => clearTimeout(t)
  }, [lastAdded, pulse])

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = items.reduce((s, i) => s + (productById(i.productId)?.prices[i.size] ?? 0) * i.qty, 0)
    return {
      items,
      count,
      subtotal,
      isOpen,
      pulse,
      lastAdded,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
      whatsappUrl: waLink(buildOrderMessage(items, subtotal)),
    }
  }, [items, isOpen, pulse, lastAdded, open, close, add, setQty, remove, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return c
}
