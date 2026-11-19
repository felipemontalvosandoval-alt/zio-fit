import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useScrolled(threshold = 24) {
  const [scrolled, set] = useState(false)
  useEffect(() => {
    const on = () => set(window.scrollY > threshold)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return scrolled
}

/** Devuelve el id de la sección visible (para el indicador de navegación). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis) setActive(vis.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [ids])
  return active
}

/** Bloquea el scroll del body mientras hay un panel o modal abierto. */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    const sb = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${sb}px`
    return () => {
      document.body.style.overflow = prev
      document.body.style.paddingRight = ''
    }
  }, [locked])
}

/** Cierra con Escape */
export function useEscape(active: boolean, fn: () => void) {
  useEffect(() => {
    if (!active) return
    const on = (e: KeyboardEvent) => e.key === 'Escape' && fn()
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [active, fn])
}

/** Keeps keyboard focus inside an open dialog and restores it when the dialog closes. */
export function useDialogFocus(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const dialog = ref.current
    if (!active || !dialog) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>(selector)).filter((el) => !el.hasAttribute('hidden'))
    const first = focusables()[0]
    first?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const list = focusables()
      if (!list.length) {
        event.preventDefault()
        dialog.focus()
        return
      }
      const firstItem = list[0]
      const lastItem = list[list.length - 1]
      if (event.shiftKey && (document.activeElement === firstItem || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && (document.activeElement === lastItem || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        firstItem.focus()
      }
    }
    dialog.addEventListener('keydown', onKeyDown)
    return () => {
      dialog.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [active, ref])
}
