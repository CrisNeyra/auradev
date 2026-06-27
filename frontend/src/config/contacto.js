export const EMAIL = 'cristian.neyra.dev@gmail.com'
export const WHATSAPP_NUMERO = '5411782111489'
export const WHATSAPP_DISPLAY = '+54 011 782111489'
export const WHATSAPP_MENSAJE =
  'Hola AuraDev, quiero consultar por un proyecto.'
export const REDES_HANDLE = '@auradev'
export const REDES_URL = '#'

export function urlWhatsApp() {
  const texto = encodeURIComponent(WHATSAPP_MENSAJE)
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}
