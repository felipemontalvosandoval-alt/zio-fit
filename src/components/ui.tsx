import { forwardRef, useId } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/* ============================================================
   SISTEMA DE BOTONES
   primary  — verde oliva, flecha que se desliza y se repite
   outline  — borde fino, relleno que sube desde abajo
   dark     — verde bosque (compras)
   ghost    — texto con subrayado animado (navegación)
   ============================================================ */
type Variant = 'primary' | 'outline' | 'dark' | 'cream'
type Size = 'md' | 'lg' | 'sm'

const base =
  'group relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-full font-semibold tracking-[0.08em] uppercase transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40'
const sizes: Record<Size, string> = {
  sm: 'h-10 pl-4 pr-1.5 text-[11px]',
  md: 'h-12 pl-6 pr-1.5 text-[12px]',
  lg: 'h-14 pl-7 pr-2 text-[12.5px]',
}
const variants: Record<Variant, string> = {
  primary: 'bg-olive text-cream hover:shadow-[0_14px_30px_-12px_rgb(120_135_92/0.9)]',
  dark: 'bg-forest text-cream hover:shadow-[0_14px_30px_-12px_rgb(40_59_43/0.9)]',
  outline: 'border border-forest/30 text-forest hover:border-forest hover:text-cream',
  cream: 'bg-cream text-forest hover:bg-white',
}
const fill: Record<Variant, string> = {
  primary: 'bg-forest',
  dark: 'bg-olive',
  outline: 'bg-forest',
  cream: 'bg-beige',
}
const knob: Record<Variant, string> = {
  primary: 'bg-cream text-forest',
  dark: 'bg-cream text-forest',
  outline: 'bg-forest text-cream group-hover:bg-cream group-hover:text-forest',
  cream: 'bg-forest text-cream',
}

function Inner({ children, variant, size, icon }: { children: ReactNode; variant: Variant; size: Size; icon?: ReactNode }) {
  const k = size === 'sm' ? 'size-7' : size === 'lg' ? 'size-10' : 'size-9'
  return (
    <>
      {/* relleno que sube */}
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0 ${fill[variant]}`}
      />
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={`relative z-10 grid ${k} shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${knob[variant]}`}
      >
        {icon ?? (
          <span className="relative block size-4">
            <ArrowRight className="absolute inset-0 size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-6" />
            <ArrowRight className="absolute inset-0 size-4 -translate-x-6 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0" />
          </span>
        )}
      </span>
    </>
  )
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; icon?: ReactNode }
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { variant = 'primary', size = 'md', icon, className = '', children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} size={size} icon={icon}>
        {children}
      </Inner>
    </button>
  )
})

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; icon?: ReactNode }
export function ButtonLink({ variant = 'primary', size = 'md', icon, className = '', children, ...rest }: LinkProps) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} size={size} icon={icon}>
        {children}
      </Inner>
    </a>
  )
}

/** Botón circular iconográfico */
export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: 'light' | 'dark' }>(
  function IconButton({ label, tone = 'light', className = '', children, ...rest }, ref) {
    const t =
      tone === 'dark'
        ? 'bg-forest text-cream hover:bg-olive'
        : 'bg-white/70 text-forest ring-1 ring-forest/10 hover:bg-forest hover:text-cream'
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={`inline-grid size-11 place-items-center rounded-full transition-all duration-300 ease-[var(--ease-out-soft)] active:scale-90 ${t} ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

/** Enlace de texto con subrayado que se dibuja */
export function TextLink({ children, className = '', ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`group relative inline-flex items-center gap-2 ${className}`} {...rest}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </a>
  )
}

/* ============================================================ ICONOS DE MARCA */
export function InstagramIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function WhatsAppIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

/* ============================================================ LOGO */
export function Leaf({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <path d="M20 46V22" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M20 26C20 14 26 6 37 3c-1 12-7 21-17 23Z" fill={color} />
      <path d="M20 32C19 22 13 16 4 15c1 9 7 15 16 17Z" fill={color} opacity=".75" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const ink = tone === 'dark' ? 'text-ink' : 'text-cream'
  return (
    <span className={`inline-flex items-end gap-2 ${ink} ${className}`} aria-label="ZIO FIT">
      <span className="flex items-end font-serif text-[30px] leading-none font-medium tracking-[-0.02em]" aria-hidden>
        Z
        <span className="relative mx-[1px] inline-block w-[13px]">
          <Leaf className="absolute -top-[30px] left-1/2 h-[22px] w-[18px] -translate-x-1/2" color="#78875C" />
          <span className="block h-[20px] w-[2.5px] translate-x-[5px] rounded-full bg-current" />
        </span>
        O
      </span>
      <span className="mb-[3px] text-[10px] font-bold tracking-[0.3em] opacity-70" aria-hidden>
        FIT
      </span>
    </span>
  )
}

/* ============================================================ REVEAL */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** Título por líneas con máscara (cada línea sube desde abajo). */
export function SplitTitle({
  lines,
  className = '',
  delay = 0,
  inView = true,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  inView?: boolean
}) {
  return (
    <span className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            {...(inView
              ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
              : { animate: { y: '0%' } })}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionTag({ n, children, tone = 'dark' }: { n: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${tone === 'dark' ? 'text-forest/70' : 'text-cream/70'}`}>
      <span className="font-serif text-[13px] tracking-normal normal-case italic">{n}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      {children}
    </span>
  )
}

/* ============================================================ ILUSTRACIONES BOTÁNICAS */
export function Peanut({ className = '', color = '#C8955A' }: { className?: string; color?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill="#000" opacity=".12" />
        </pattern>
      </defs>
      <path
        d="M30 4c14 0 22 10 21 22-1 8-6 12-6 20s6 12 6 22c0 16-10 28-21 28S9 84 9 68c0-10 6-14 6-22s-5-12-6-20C8 14 16 4 30 4Z"
        fill={color}
      />
      <path
        d="M30 4c14 0 22 10 21 22-1 8-6 12-6 20s6 12 6 22c0 16-10 28-21 28S9 84 9 68c0-10 6-14 6-22s-5-12-6-20C8 14 16 4 30 4Z"
        fill={`url(#${id})`}
      />
      <path d="M20 22c3-6 8-9 12-9" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
export function Almond({ className = '', color = '#B07A4C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <path d="M30 3C46 18 54 40 52 58c-2 18-12 29-22 29S10 76 8 58C6 40 14 18 30 3Z" fill={color} />
      <path d="M30 10c-3 22-3 50 0 72" stroke="#000" strokeOpacity=".12" strokeWidth="1.5" fill="none" />
      <path d="M20 40c0-8 3-16 7-22M38 50c1 8 0 16-3 24" stroke="#000" strokeOpacity=".1" strokeWidth="1.2" fill="none" />
      <path d="M18 34c2-8 6-14 10-18" stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
export function CacaoBean({ className = '', color = '#5E3A24' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden>
      <ellipse cx="30" cy="40" rx="22" ry="34" fill={color} />
      <path d="M30 8c-6 10-6 54 0 64" stroke="#000" strokeOpacity=".25" strokeWidth="2" fill="none" />
      <path d="M18 22c2-6 6-10 10-12" stroke="#fff" strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
export function Sprig({ className = '', color = '#78875C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
      <path d="M60 198C58 140 62 80 78 6" />
      {[30, 60, 90, 120, 150].map((y, i) => (
        <g key={y}>
          <path d={`M${64 - i * 0.6} ${y + 10}c-18-4-30-14-34-30 16 2 28 12 34 30Z`} fill={color} fillOpacity=".18" />
          <path d={`M${66 - i * 0.6} ${y}c16-6 26-18 28-34-14 4-24 16-28 34Z`} fill={color} fillOpacity=".18" />
        </g>
      ))}
    </svg>
  )
}
