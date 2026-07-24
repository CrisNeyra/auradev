export const EMAIL =
  import.meta.env.VITE_EMAIL || 'hola@auradev.com'

export const WHATSAPP_NUMERO =
  import.meta.env.VITE_WHATSAPP_NUMERO || '000000000000'

export const WHATSAPP_DISPLAY =
  import.meta.env.VITE_WHATSAPP_DISPLAY || '+00 000 000 000'

export const WHATSAPP_MENSAJE =
  import.meta.env.VITE_WHATSAPP_MENSAJE ||
  'Hola AuraDev, quiero consultar por un proyecto.'

export const REDES_HANDLE =
  import.meta.env.VITE_REDES_HANDLE || '@auradev'

export const REDES_URL = import.meta.env.VITE_REDES_URL || '#'

export function urlWhatsApp() {
  const texto = encodeURIComponent(WHATSAPP_MENSAJE)
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}
