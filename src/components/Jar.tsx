import { memo, useId } from 'react'
import type { Product } from '../data/products'

/**
 * Frasco ilustrado (SVG) — imagen de producto temporal.
 * Cuando existan fotos reales, se puede reemplazar por <img> manteniendo el mismo contenedor.
 * view: "front" (cerrado) | "open" (destapado, vista superior) | "spoon" (con cuchara)
 */
type View = 'front' | 'open' | 'spoon'

function seeded(n: number) {
  let s = n
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export const Jar = memo(function Jar({
  product,
  view = 'front',
  size = '250',
  className = '',
}: {
  product: Product
  view?: View
  size?: '250' | '500'
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const { look } = product
  const tall = size === '500'
  const bodyTop = tall ? 50 : 74
  const bodyH = 246 - bodyTop
  const labelY = bodyTop + bodyH * 0.3
  const labelH = Math.min(84, bodyH * 0.48)
  const rand = seeded(product.id.length * 97 + (tall ? 3 : 0))
  const specks = look.crunchy
    ? Array.from({ length: 34 }, () => ({
        x: 40 + rand() * 120,
        y: bodyTop + 14 + rand() * (bodyH - 26),
        r: 1.6 + rand() * 2.6,
      })).filter((s) => s.y < labelY - 4 || s.y > labelY + labelH + 4)
    : []

  return (
    <svg viewBox="0 0 200 270" className={className} role="img" aria-label={`${product.name} ${size} g`}>
      <defs>
        <linearGradient id={`b${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={look.butterDeep} />
          <stop offset=".35" stopColor={look.butter} />
          <stop offset=".7" stopColor={look.butter} />
          <stop offset="1" stopColor={look.butterDeep} />
        </linearGradient>
        <linearGradient id={`l${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#7A5634" />
          <stop offset=".45" stopColor="#B88A5A" />
          <stop offset="1" stopColor="#6E4C2D" />
        </linearGradient>
        <radialGradient id={`t${uid}`} cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor={look.butter} />
          <stop offset="1" stopColor={look.butterDeep} />
        </radialGradient>
        <clipPath id={`c${uid}`}>
          <rect x="30" y={bodyTop} width="140" height={bodyH} rx="24" />
        </clipPath>
      </defs>

      {/* sombra de apoyo */}
      <ellipse cx="100" cy="252" rx="78" ry="9" fill="#283B2B" opacity=".16" />

      {/* cuerpo de vidrio + contenido */}
      <g clipPath={`url(#c${uid})`}>
        <rect x="30" y={bodyTop} width="140" height={bodyH} fill={`url(#b${uid})`} />
        {look.choco && (
          <g fill="none" stroke={look.butterDeep} strokeOpacity=".55" strokeWidth="3" strokeLinecap="round">
            <path d={`M30 ${bodyTop + 30} q35 -14 70 0 t70 0`} />
            <path d={`M30 ${246 - 22} q35 12 70 0 t70 0`} />
          </g>
        )}
        {specks.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={i % 3 ? '#E8C08A' : look.butterDeep} opacity=".85" />
        ))}
        {/* reflejos del vidrio */}
        <rect x="44" y={bodyTop + 8} width="9" height={bodyH - 22} rx="4.5" fill="#fff" opacity=".28" />
        <rect x="58" y={bodyTop + 14} width="3" height={bodyH - 40} rx="1.5" fill="#fff" opacity=".2" />
        <rect x="150" y={bodyTop + 10} width="6" height={bodyH - 30} rx="3" fill="#000" opacity=".08" />
      </g>
      <rect x="30" y={bodyTop} width="140" height={bodyH} rx="24" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />

      {/* etiqueta */}
      <g>
        <rect x="30" y={labelY} width="140" height={labelH} fill={look.label} />
        <rect x="30" y={labelY} width="140" height={labelH} fill="#000" opacity=".04" />
        <text
          x="100"
          y={labelY + labelH * 0.5}
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="30"
          fontWeight="500"
          fill={look.labelInk}
          letterSpacing="-0.5"
        >
          Z O
        </text>
        {/* hoja como "i" */}
        <g transform={`translate(93 ${labelY + labelH * 0.5 - 26}) scale(.36)`} fill="#78875C">
          <path d="M20 46V22" stroke="#78875C" strokeWidth="5" />
          <path d="M20 26C20 14 26 6 37 3c-1 12-7 21-17 23Z" />
          <path d="M20 32C19 22 13 16 4 15c1 9 7 15 16 17Z" opacity=".75" />
        </g>
        <text
          x="100"
          y={labelY + labelH * 0.72}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="1.6"
          fill={look.labelInk}
          opacity=".85"
        >
          {product.shortName.toUpperCase()}
        </text>
        <text
          x="100"
          y={labelY + labelH * 0.88}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="6"
          letterSpacing="1.4"
          fill={look.labelInk}
          opacity=".6"
        >
          {size} G · ZIO FIT
        </text>
      </g>

      {view === 'front' && (
        <g>
          <rect x="34" y={bodyTop - 36} width="132" height="40" rx="9" fill={`url(#l${uid})`} />
          {Array.from({ length: 15 }, (_, i) => (
            <rect key={i} x={40 + i * 8.6} y={bodyTop - 32} width="2" height="32" rx="1" fill="#000" opacity=".1" />
          ))}
          <rect x="34" y={bodyTop - 36} width="132" height="6" rx="3" fill="#fff" opacity=".18" />
          <rect x="38" y={bodyTop + 2} width="124" height="5" rx="2.5" fill="#000" opacity=".12" />
        </g>
      )}

      {view !== 'front' && (
        <g>
          {/* boca del frasco con superficie cremosa */}
          <ellipse cx="100" cy={bodyTop + 2} rx="66" ry="15" fill={look.butterDeep} />
          <ellipse cx="100" cy={bodyTop + 1} rx="62" ry="12.5" fill={`url(#t${uid})`} />
          <path
            d={`M62 ${bodyTop + 2} q14 -12 34 -4 q18 8 38 -3 M78 ${bodyTop + 6} q20 -8 40 1`}
            stroke="#fff"
            strokeOpacity=".35"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path d={`M88 ${bodyTop - 2} q8 -14 18 -6 q6 6 -4 9`} fill={look.butter} stroke={look.butterDeep} strokeOpacity=".4" />
        </g>
      )}

      {view === 'spoon' && (
        <g transform={`rotate(-28 120 ${bodyTop - 20})`}>
          <rect x="114" y={bodyTop - 120} width="9" height="110" rx="4.5" fill="#D7C2A0" />
          <rect x="116" y={bodyTop - 116} width="2.5" height="100" rx="1.2" fill="#fff" opacity=".4" />
          <ellipse cx="118.5" cy={bodyTop - 4} rx="15" ry="11" fill="#D7C2A0" />
          <ellipse cx="118.5" cy={bodyTop - 6} rx="12" ry="8" fill={look.butter} />
        </g>
      )}
    </svg>
  )
})
