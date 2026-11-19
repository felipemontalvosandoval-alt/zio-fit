/**
 * CATÁLOGO — precios tomados de la carta oficial "Mantequillas Clásicas".
 * Los campos marcados con TODO deben confirmarse con la marca.
 */

export type NeedId = 'energia' | 'nutricion' | 'proteina' | 'antojo'
export type Base = 'mani' | 'almendra'
export type SizeId = '250' | '500'

export interface JarLook {
  /** Color principal de la mantequilla */
  butter: string
  /** Color de sombra / profundidad */
  butterDeep: string
  /** Color de la etiqueta */
  label: string
  /** Texto de color sobre la etiqueta */
  labelInk: string
  crunchy?: boolean
  choco?: boolean
}

export interface Product {
  id: string
  name: string
  shortName: string
  base: Base
  choco: boolean
  crunchy: boolean
  needs: NeedId[]
  prices: Record<SizeId, number>
  /** Etiqueta visible. "Más vendido" / "Nuevo" / "Favorito" se asignan aquí cuando la marca los confirme. */
  badge?: string
  short: string
  description: string
  /** Se mantiene vacío hasta verificar la etiqueta exacta con la marca. */
  ingredients: string[]
  howTo: string[]
  look: JarLook
}

export const SIZES: { id: SizeId; label: string }[] = [
  { id: '250', label: '250 g' },
  { id: '500', label: '500 g' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'mani-tradicional',
    name: 'Mantequilla de Maní Tradicional',
    shortName: 'Maní tradicional',
    base: 'mani',
    choco: false,
    crunchy: false,
    needs: ['energia', 'proteina', 'nutricion'],
    prices: { '250': 14, '500': 27 },
    badge: 'Clásica',
    short: 'Textura suave y sabor intenso a maní. La base de todo.',
    description:
      'Nuestra mantequilla de maní más clásica: cremosa, untable y con todo el sabor del maní. Ideal para el día a día, en tostadas, avena o batidos.',
    ingredients: [],
    howTo: ['Sobre pan tostado con plátano', 'En la avena de la mañana', 'En batidos post-entrenamiento'],
    look: { butter: '#C8955A', butterDeep: '#9C6A38', label: '#F5EFE4', labelInk: '#283B2B' },
  },
  {
    id: 'mani-crunchy',
    name: 'Mantequilla de Maní Crunchy',
    shortName: 'Maní crunchy',
    base: 'mani',
    choco: false,
    crunchy: true,
    needs: ['energia', 'proteina'],
    prices: { '250': 14, '500': 27 },
    short: 'Con trocitos de maní para quienes aman sentir la textura.',
    description:
      'La misma mantequilla de maní, con trocitos que crujen en cada bocado. Perfecta para quienes disfrutan una textura más rústica.',
    ingredients: [],
    howTo: ['Con manzana en rodajas', 'Sobre galletas de arroz', 'En bowls con granola'],
    look: { butter: '#C08A4E', butterDeep: '#8E5F31', label: '#E9DFCF', labelInk: '#283B2B', crunchy: true },
  },
  {
    id: 'chocomani',
    name: 'Chocomaní',
    shortName: 'Chocomaní',
    base: 'mani',
    choco: true,
    crunchy: false,
    needs: ['antojo', 'energia'],
    prices: { '250': 15, '500': 28 },
    short: 'Maní y chocolate: el antojo que sí te puedes dar.',
    description:
      'Mantequilla de maní con chocolate, suave y cremosa. Para cuando el antojo llega y quieres algo rico con ingredientes simples.',
    ingredients: [],
    howTo: ['Con fresas o plátano', 'Sobre panqueques', 'Directo de la cuchara'],
    look: { butter: '#6E4428', butterDeep: '#4A2B17', label: '#A8794C', labelInk: '#F5EFE4', choco: true },
  },
  {
    id: 'chocomani-crunchy',
    name: 'Chocomaní Crunchy',
    shortName: 'Chocomaní crunchy',
    base: 'mani',
    choco: true,
    crunchy: true,
    needs: ['antojo'],
    prices: { '250': 15, '500': 28 },
    short: 'Chocolate, maní y trocitos crujientes en un solo frasco.',
    description:
      'Nuestra versión de chocomaní con trocitos de maní. Cremosa y crocante a la vez: un snack completo en una cucharada.',
    ingredients: [],
    howTo: ['Sobre yogurt natural', 'En tostadas con plátano', 'Como dip de frutas'],
    look: { butter: '#6A4026', butterDeep: '#432714', label: '#283B2B', labelInk: '#F5EFE4', choco: true, crunchy: true },
  },
  {
    id: 'almendras',
    name: 'Mantequilla de Almendras',
    shortName: 'Almendras',
    base: 'almendra',
    choco: false,
    crunchy: false,
    needs: ['nutricion', 'energia', 'proteina'],
    prices: { '250': 27, '500': 48 },
    badge: 'Premium',
    short: 'Sabor delicado y tostado. Elegante, suave, diferente.',
    description:
      'Mantequilla elaborada con almendras: un sabor más delicado y tostado, con una textura sedosa. Para quienes buscan variar su rutina.',
    ingredients: [],
    howTo: ['En smoothies', 'Sobre pan integral con miel', 'En recetas de repostería saludable'],
    look: { butter: '#B98A5E', butterDeep: '#8A6240', label: '#78875C', labelInk: '#F5EFE4' },
  },
  {
    id: 'chocoalmendras',
    name: 'Chocoalmendras',
    shortName: 'Chocoalmendras',
    base: 'almendra',
    choco: true,
    crunchy: false,
    needs: ['antojo', 'nutricion'],
    prices: { '250': 28, '500': 50 },
    badge: 'Con cacao',
    short: 'Almendras y chocolate. Nuestro capricho más sofisticado.',
    description:
      'La suavidad de la almendra con un perfil de sabor a chocolate. Consulta la etiqueta para conocer sus ingredientes exactos.',
    ingredients: [],
    howTo: ['Con frutos rojos', 'Sobre crepes o waffles', 'En un café con un toque dulce'],
    look: { butter: '#5E3A24', butterDeep: '#3D2414', label: '#E9DFCF', labelInk: '#5E3A24', choco: true },
  },
]

export const NEEDS: {
  id: NeedId
  label: string
  title: string
  description: string
  accent: string
  featured: string
}[] = [
  {
    id: 'energia',
    label: 'Para el día',
    title: 'Sabores para tu rutina',
    description: 'Ideas para disfrutar tus sabores favoritos durante el día.',
    accent: '#A8794C',
    featured: 'mani-tradicional',
  },
  {
    id: 'nutricion',
    label: 'Frutos secos',
    title: 'Maní y almendras',
    description: 'Explora las variedades de maní y almendras disponibles en el catálogo.',
    accent: '#78875C',
    featured: 'almendras',
  },
  {
    id: 'proteina',
    label: 'Crunchy',
    title: 'Ideas para después de entrenar',
    description: 'Prueba combinaciones para batidos y bowls; consulta la etiqueta para revisar la información nutricional.',
    accent: '#283B2B',
    featured: 'mani-crunchy',
  },
  {
    id: 'antojo',
    label: 'Con cacao',
    title: 'Opciones con cacao',
    description: 'Descubre las opciones con cacao disponibles en el catálogo.',
    accent: '#5E3A24',
    featured: 'chocomani',
  },
]

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)
