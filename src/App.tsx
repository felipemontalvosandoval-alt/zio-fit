import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import type { NeedId } from './data/products'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CategorySelector } from './components/CategorySelector'
import { ProductShowcase } from './components/ProductShowcase'
import type { FilterId } from './components/ProductShowcase'
import { ProductDetail } from './components/ProductDetail'
import { CartDrawer } from './components/CartDrawer'
import { CartToast } from './components/CartToast'
import { RecipesSection } from './components/RecipesSection'
import { Community } from './components/Community'
import { BrandStory } from './components/BrandStory'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

export default function App() {
  const [need, setNeed] = useState<NeedId | null>(null)
  const [filter, setFilter] = useState<FilterId>('todos')
  const [detail, setDetail] = useState<string | null>(null)

  const selectNeed = useCallback((n: NeedId | null) => {
    setNeed(n)
    setFilter('todos')
    if (n) {
      window.setTimeout(() => {
        const el = document.getElementById('productos')
        if (!el) return
        const top = el.getBoundingClientRect().top
        if (top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }, [])
  const openDetail = useCallback((id: string) => setDetail(id), [])
  const closeDetail = useCallback(() => setDetail(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <a href="#productos" className="sr-only z-[70] rounded-full bg-forest px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Saltar al catálogo
        </a>
        <Navbar />
        <main>
          <Hero />
          <CategorySelector need={need} onSelect={selectNeed} />
          <ProductShowcase need={need} setNeed={selectNeed} filter={filter} setFilter={setFilter} onOpen={openDetail} />
          <RecipesSection onOpen={openDetail} />
          <Community />
          <BrandStory />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
        <ProductDetail id={detail} onClose={closeDetail} />
        <CartDrawer />
        <CartToast />
      </CartProvider>
    </MotionConfig>
  )
}
