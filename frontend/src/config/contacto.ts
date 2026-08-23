/** Email público de contacto (`VITE_EMAIL` o fallback). */
export const EMAIL =
  import.meta.env.VITE_EMAIL || 'hola@auradev.com'

/** Número WhatsApp en formato wa.me (`VITE_WHATSAPP_NUMERO`). */
export const WHATSAPP_NUMERO =
  import.meta.env.VITE_WHATSAPP_NUMERO || '5491178211489'

/** Número mostrado en UI. */
export const WHATSAPP_DISPLAY =
  import.meta.env.VITE_WHATSAPP_DISPLAY || '+54 9 11 7821-1489'

/** Texto precargado del chat de WhatsApp. */
export const WHATSAPP_MENSAJE =
  import.meta.env.VITE_WHATSAPP_MENSAJE ||
  'Hola AuraDev, quiero consultar por un proyecto.'

function isUrlValida(url: string): boolean {
  if (!url || url === '#') return false
  return /^https?:\/\//i.test(url)
}

function envUrl(key: string): string {
  const raw = (import.meta.env[key] as string | undefined)?.trim() || ''
  return isUrlValida(raw) ? raw : ''
}

/** URL de LinkedIn si `VITE_LINKEDIN_URL` es http(s) válido. */
export const LINKEDIN_URL = envUrl('VITE_LINKEDIN_URL')
/** URL de Instagram si `VITE_INSTAGRAM_URL` es http(s) válido. */
export const INSTAGRAM_URL = envUrl('VITE_INSTAGRAM_URL')

/** Enlace de red social mostrado en el sitio. */
export type RedSocial = {
  id: 'linkedin' | 'instagram'
  label: string
  url: string
}

/** Redes públicas (sin Vercel Projects). Solo incluye URLs http(s) válidas. */
export const redesSociales: RedSocial[] = (
  [
    { id: 'linkedin' as const, label: 'LinkedIn', url: LINKEDIN_URL },
    { id: 'instagram' as const, label: 'Instagram', url: INSTAGRAM_URL },
  ] satisfies RedSocial[]
).filter((r) => isUrlValida(r.url))

/** `true` si hay al menos una red con URL válida. */
export function hasRedesSociales(): boolean {
  return redesSociales.length > 0
}

/** Deep link `wa.me` con mensaje precargado. */
export function urlWhatsApp(): string {
  const texto = encodeURIComponent(WHATSAPP_MENSAJE)
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}
