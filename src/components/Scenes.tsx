/** Ilustraciones editoriales de momentos de consumo (reemplazables por fotografía). */
import type { ReactNode } from 'react'
import type { Moment } from '../data/content'

const C = { cream: '#F5EFE4', beige: '#E9DFCF', butter: '#C8955A', deep: '#9C6A38', choco: '#5E3A24', olive: '#78875C', soft: '#B9C49A', forest: '#283B2B' }

function Plate({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 400" className="size-full" aria-hidden>
      <circle cx="200" cy="214" r="150" fill={C.cream} />
      <circle cx="200" cy="214" r="150" fill="none" stroke="#000" strokeOpacity=".06" strokeWidth="2" />
      <circle cx="200" cy="214" r="118" fill="none" stroke="#000" strokeOpacity=".05" strokeWidth="1.5" />
      {children}
    </svg>
  )
}

function Toast() {
  return (
    <Plate>
      <g transform="rotate(-10 200 210)">
        <path d="M110 150c0-40 30-58 90-58s90 18 90 58v120c0 12-8 20-20 20H130c-12 0-20-8-20-20Z" fill="#D9A869" />
        <path d="M122 156c0-32 26-48 78-48s78 16 78 48v108c0 8-6 14-14 14H136c-8 0-14-6-14-14Z" fill="#F0D6A8" />
        <path d="M130 170c10-22 36-30 70-30s56 6 66 26c6 14-2 30-10 44-10 18 6 36-6 52-10 12-90 12-106 0-14-12 2-34-6-50-8-14-14-28-8-42Z" fill={C.butter} />
        <path d="M150 176c14-10 40-14 64-8M160 222c18 6 40 4 58-4" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" fill="none" />
        {[[160, 190], [205, 200], [244, 186], [176, 238], [228, 244]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="17" fill="#F4E6B8" />
            <circle cx={x} cy={y} r="17" fill="none" stroke="#E5CF8E" strokeWidth="3" />
            <circle cx={x} cy={y} r="4" fill="#D9BE7A" opacity=".6" />
          </g>
        ))}
      </g>
    </Plate>
  )
}

function Apple() {
  return (
    <Plate>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${-50 + i * 22} 200 214) translate(0 -70)`}>
          <path d="M200 120c26 0 44 24 44 54s-18 40-44 40-44-10-44-40 18-54 44-54Z" fill="#F6EBC8" />
          <path d="M200 120c26 0 44 24 44 54" stroke="#B8463A" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="200" cy="168" r="3" fill="#6E4428" />
        </g>
      ))}
      <ellipse cx="200" cy="232" rx="56" ry="40" fill={C.beige} />
      <ellipse cx="200" cy="228" rx="46" ry="30" fill={C.butter} />
      {[[186, 222], [210, 232], [200, 216], [218, 220], [190, 236]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill={C.deep} />
      ))}
    </Plate>
  )
}

function Shake() {
  return (
    <Plate>
      <ellipse cx="200" cy="340" rx="80" ry="10" fill="#000" opacity=".08" />
      <path d="M140 110h120l-14 222c-1 10-8 16-18 16h-56c-10 0-17-6-18-16Z" fill="#fff" fillOpacity=".55" stroke="#fff" strokeWidth="3" />
      <path d="M146 150h108l-11 176c-1 8-6 12-14 12h-58c-8 0-13-4-14-12Z" fill="#D9B48A" />
      <path d="M146 150q27 -12 54 0t54 0" fill="#E6C9A3" />
      <rect x="226" y="40" width="12" height="150" rx="6" fill={C.olive} transform="rotate(14 232 115)" />
      <path d="M150 112h100" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <g transform="translate(276 250) rotate(30)">
        <path d="M0 0c30-10 70 0 90 30-30 0-60-10-90-30Z" fill="#F2D27A" />
        <path d="M0 0c30-10 70 0 90 30" stroke="#C9A64A" strokeWidth="3" fill="none" />
      </g>
      <path d="M70 280c6-30 30-46 54-44-4 26-26 44-54 44Z" fill={C.butter} />
    </Plate>
  )
}

function Bowl() {
  return (
    <Plate>
      <ellipse cx="200" cy="230" rx="118" ry="56" fill={C.choco} />
      <ellipse cx="200" cy="222" rx="104" ry="44" fill="#F1E3C9" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2
        return <circle key={i} cx={200 + Math.cos(a) * 58} cy={222 + Math.sin(a) * 22} r="17" fill={i % 2 ? '#7A4E2E' : C.butter} />
      })}
      <circle cx="200" cy="222" r="18" fill={C.butter} />
      {[[150, 214], [186, 236], [228, 210], [250, 232], [170, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" opacity=".7" />
      ))}
      <path d="M120 150c8-24 30-36 52-32-6 22-28 34-52 32Z" fill={C.olive} />
      <path d="M290 148c-6-20-24-32-44-30 6 18 24 30 44 30Z" fill={C.soft} />
    </Plate>
  )
}

export function Scene({ scene }: { scene: Moment['scene'] }) {
  if (scene === 'toast') return <Toast />
  if (scene === 'apple') return <Apple />
  if (scene === 'shake') return <Shake />
  return <Bowl />
}
