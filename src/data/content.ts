/**
 * CONTENIDO EDITABLE DE LA WEB.
 * Textos entre [corchetes] = placeholders pendientes de completar por la marca.
 */
import { BRAND, PAYMENT_METHODS } from '../config/brand'

/* ---------- ZIO EN TU DÍA ---------- */
export type MomentId = 'desayunos' | 'snacks' | 'post' | 'recetas'
export interface Moment {
  id: MomentId
  label: string
  time: string
  title: string
  intro: string
  ideas: { title: string; text: string; product: string }[]
  scene: 'toast' | 'apple' | 'shake' | 'bowl'
}

export const MOMENTS: Moment[] = [
  {
    id: 'desayunos',
    label: 'Desayunos',
    time: '07:30',
    title: 'La primera cucharada del día.',
    intro: 'Ideas sencillas para disfrutar tus mantequillas en el desayuno.',
    scene: 'toast',
    ideas: [
      { title: 'Tostada con plátano', text: 'Pan integral, una capa generosa y rodajas de plátano.', product: 'mani-tradicional' },
      { title: 'Avena cremosa', text: 'Una cucharada encima de tu avena caliente justo antes de servir.', product: 'almendras' },
      { title: 'Panqueques de domingo', text: 'Chocomaní tibio por encima y frutas frescas.', product: 'chocomani' },
    ],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    time: '16:00',
    title: 'Una pausa a media tarde.',
    intro: 'Ideas para una pausa entre clases o reuniones.',
    scene: 'apple',
    ideas: [
      { title: 'Manzana + crunchy', text: 'Rodajas de manzana para mojar. Fácil, rápido y crocante.', product: 'mani-crunchy' },
      { title: 'Galletas de arroz', text: 'Una base ligera con una capa de tu sabor favorito.', product: 'mani-tradicional' },
      { title: 'Dip de frutas', text: 'Fresas y plátano con chocoalmendras para compartir.', product: 'chocoalmendras' },
    ],
  },
  {
    id: 'post',
    label: 'Post-entreno',
    time: '19:15',
    title: 'Después del esfuerzo, recarga.',
    intro: 'Una idea para combinar tu mantequilla favorita con lo que ya disfrutas después de entrenar.',
    scene: 'shake',
    ideas: [
      { title: 'Batido de plátano', text: 'Leche o bebida vegetal, plátano y una cucharada de maní.', product: 'mani-tradicional' },
      { title: 'Yogurt con granola', text: 'Yogurt natural, granola y un toque de chocomaní crunchy.', product: 'chocomani-crunchy' },
      { title: 'Smoothie verde', text: 'Espinaca, plátano y mantequilla de almendras.', product: 'almendras' },
    ],
  },
  {
    id: 'recetas',
    label: 'Recetas',
    time: 'Fin de semana',
    title: 'Para cocinar con calma.',
    intro: 'Ideas para llevar ZIO a la cocina. Las cantidades exactas las compartiremos pronto.',
    scene: 'bowl',
    ideas: [
      { title: 'Bolitas energéticas', text: 'Avena, mantequilla de maní y un toque de cacao. Sin horno.', product: 'mani-tradicional' },
      { title: 'Salsa de maní', text: 'Para fideos, ensaladas o pollo: mantequilla, limón y sillao.', product: 'mani-crunchy' },
      { title: 'Brownie en taza', text: 'Chocoalmendras como base de un postre rápido.', product: 'chocoalmendras' },
    ],
  },
]

/* ---------- COMUNIDAD: fotos reales de la historia destacada "Clientes" de Instagram ---------- */
export const COMMUNITY = [
  { file: 'cliente-01.webp', caption: 'Nuestra pequeña clienta', note: 'Su frasco de ZIO, listo después del partido.', w: 398, h: 528 },
  { file: 'cliente-02.webp', caption: 'Muchas gracias por su preferencia', note: 'Doble pedido para disfrutar en casa.', w: 398, h: 504 },
  { file: 'cliente-03.webp', caption: '¡Que la disfrutes!', note: 'Entrega en mano, directo a su día.', w: 390, h: 555 },
]

/* ---------- TESTIMONIOS (DEMO) ----------
 * No se muestran hasta que la marca aporte opiniones reales con permiso.
 */
export const TESTIMONIALS_ARE_DEMO = true
export const TESTIMONIALS = [
  { quote: '[Opinión real de un cliente sobre el sabor de la mantequilla de maní.]', name: '[Nombre del cliente]', detail: '[Producto que compró]' },
  { quote: '[Opinión real sobre la textura crunchy o el chocomaní.]', name: '[Nombre del cliente]', detail: '[Ciudad]' },
  { quote: '[Opinión real sobre la entrega, el empaque o la atención por WhatsApp.]', name: '[Nombre del cliente]', detail: '[Producto que compró]' },
]

/* ---------- FAQ ---------- */
const pay = PAYMENT_METHODS.map((p) => `${p.label}: ${p.value}`).join(' · ')
export const FAQS = [
  {
    q: '¿Qué ingredientes contienen?',
    a: 'La lista exacta de ingredientes y alérgenos por sabor está pendiente de confirmación. Escríbenos por WhatsApp y solicita una foto de la etiqueta vigente antes de comprar.',
  },
  {
    q: '¿Cómo puedo realizar un pedido?',
    a: 'Arma tu pedido en esta web y pulsa "Continuar por WhatsApp": el mensaje se genera solo. También puedes escribirnos por DM en Instagram. Luego completas tus datos, eliges la forma de entrega, realizas el pago y nos envías el comprobante.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: `Los medios publicados son Yape y transferencia BCP (${pay}). Confirma con nosotros que los datos sigan vigentes antes de realizar el pago.`,
  },
  {
    q: '¿Realizan delivery?',
    a: `Coordina cobertura, costo y tiempo de entrega con nosotros por WhatsApp. Atendemos desde ${BRAND.locations}.`,
  },
  {
    q: '¿Cómo debo conservar los productos?',
    a: 'Las indicaciones de conservación y duración deben confirmarse con la etiqueta vigente. Consúltanos por WhatsApp antes de comprar.',
  },
  {
    q: '¿Qué presentaciones tienen?',
    a: 'Todos nuestros sabores vienen en frascos de 250 g y 500 g.',
  },
]

/* ---------- NUESTRA HISTORIA ---------- */
export const STORY = {
  /** Placeholder: reemplazar por la historia real (cómo nació, quién está detrás). */
  origin: '',
  pillars: [
    { k: '01', title: 'Seis sabores', text: 'Explora las variedades de maní y almendras disponibles en el catálogo.' },
    { k: '02', title: 'Conoce la etiqueta', text: 'Solicita ingredientes, alérgenos e información nutricional del sabor que te interesa.' },
    { k: '03', title: 'Coordina tu pedido', text: `Escríbenos por WhatsApp para consultar cobertura y entrega desde ${BRAND.locations}.` },
  ],
}

/* ---------- POLÍTICAS (placeholders) ---------- */
export const POLICIES = [
  { id: 'envios', title: 'Entrega', body: 'La cobertura, el costo y el plazo de entrega se confirman por WhatsApp antes de cerrar cada pedido.' },
  { id: 'cambios', title: 'Cambios y devoluciones', body: 'Consulta por WhatsApp las condiciones aplicables antes de confirmar tu compra.' },
  { id: 'privacidad', title: 'Privacidad', body: 'El carrito se guarda en el almacenamiento local de este navegador. Al continuar por WhatsApp, el mensaje de pedido se comparte con la cuenta de ZIO FIT.' },
]
