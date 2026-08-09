export const EMAIL =
  import.meta.env.VITE_EMAIL || 'hola@auradev.com'

export const WHATSAPP_NUMERO =
  import.meta.env.VITE_WHATSAPP_NUMERO || '5491178211489'

export const WHATSAPP_DISPLAY =
  import.meta.env.VITE_WHATSAPP_DISPLAY || '+54 9 11 7821-1489'

export const WHATSAPP_MENSAJE =
  import.meta.env.VITE_WHATSAPP_MENSAJE ||
  'Hola AuraDev, quiero consultar por un proyecto.'

const DEFAULT_REDES_URL = 'https://vercel.com/crisneyra13-projects'
const DEFAULT_REDES_HANDLE = 'Vercel Projects'

function isUrlValida(url: string): boolean {
  if (!url || url === '#') return false
  return /^https?:\/\//i.test(url)
}

function resolveRedesUrl(): string {
  const env = (import.meta.env.VITE_REDES_URL || '').trim()
  return isUrlValida(env) ? env : DEFAULT_REDES_URL
}

function resolveRedesHandle(): string {
  const env = (import.meta.env.VITE_REDES_HANDLE || '').trim()
  if (env && env !== '@auradev' && env !== '#') return env
  return DEFAULT_REDES_HANDLE
}

export const REDES_URL = resolveRedesUrl()
export const REDES_HANDLE = resolveRedesHandle()

/** Siempre hay URL válida tras normalización (legacy # o @auradev ignorados). */
export function hasRedesUrlValida(): boolean {
  return isUrlValida(REDES_URL)
}

export function urlWhatsApp(): string {
  const texto = encodeURIComponent(WHATSAPP_MENSAJE)
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}
