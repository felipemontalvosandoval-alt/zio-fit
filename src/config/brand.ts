/**
 * CONFIGURACIÓN DE MARCA — edita aquí los datos del negocio.
 * Todo lo que aparece entre [corchetes] es un placeholder pendiente de completar.
 */

/**
 * Número de WhatsApp en formato internacional, sin "+" ni espacios.
 * Tomado de la carta oficial ("telf. 920409522"). Confírmalo antes de publicar.
 */
export const WHATSAPP_NUMBER = '51920409522'

export const BRAND = {
  name: 'ZIO FIT',
  tagline: 'Energía natural en cada bocado',
  instagramHandle: '@ziofit.pe',
  instagramUrl: 'https://www.instagram.com/ziofit.pe/',
  phoneDisplay: '920 409 522',
  locations: 'Chiclayo · Lima',
  shipping: 'Entrega a coordinar por WhatsApp',
  email: '', // Placeholder: escribe aquí el correo real (vacío = no se muestra)
  currency: 'S/',
}

/** Medios de pago publicados por la marca en sus historias destacadas. */
export const PAYMENT_METHODS = [
  { id: 'yape', label: 'Yape', value: '920409522' },
  { id: 'bcp', label: 'BCP · Cuenta', value: '30595177014084' },
  { id: 'cci', label: 'CCI', value: '00230519517701408419' },
] as const

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const formatPrice = (n: number) => `${BRAND.currency} ${n.toFixed(2)}`

/** Rutas de imágenes (carpeta /public/img). Reemplaza los archivos manteniendo el nombre. */
const base = import.meta.env.BASE_URL
export const img = (file: string) => `${base}img/${file}`
