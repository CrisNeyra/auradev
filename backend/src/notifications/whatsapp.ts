import { logger } from '../utils/log.js'
import { logNotifResult } from '../utils/logger.js'
import { fetchWithTimeout, type ContactoDatos } from './http.js'

/** WhatsApp Cloud API (Meta) — oficial. No usar CallMeBot. */
export async function notifyWhatsApp(datos: ContactoDatos) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const to = (process.env.WHATSAPP_TO || '541178211489').replace(/\D/g, '')
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME?.trim()
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || 'en_US'

  if (
    !token ||
    token.includes('tu_token') ||
    !phoneNumberId ||
    phoneNumberId.includes('tu_phone')
  ) {
    return
  }

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const safe = (value: string, max = 200) =>
    String(value || '')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max) || '-'

  try {
    let res: Response

    if (templateName && !templateName.includes('tu_template')) {
      res = await fetchWithTimeout(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: templateLang },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: safe(datos.nombre, 60) },
                  { type: 'text', text: safe(datos.email, 80) },
                  { type: 'text', text: safe(datos.mensaje, 500) },
                ],
              },
            ],
          },
        }),
      })
    } else {
      const body = [
        'Nuevo contacto AuraDev',
        '',
        `Nombre: ${datos.nombre}`,
        `Email: ${datos.email}`,
        '',
        `Mensaje: ${datos.mensaje}`,
      ].join('\n')

      res = await fetchWithTimeout(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: { body: body.slice(0, 4000), preview_url: false },
        }),
      })
    }

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      logNotifResult('whatsapp', false, `${res.status} ${errBody}`)
      if (errBody.includes('131047') || errBody.includes('130472')) {
        logger.warn(
          { channel: 'whatsapp', code: 'outside_window' },
          'El usuario debe responder al número de prueba o usá WHATSAPP_TEMPLATE_NAME'
        )
      }
      return
    }
    logNotifResult(
      'whatsapp',
      true,
      templateName && !templateName.includes('tu_template')
        ? `template:${templateName}`
        : 'texto_libre'
    )
  } catch (err) {
    logNotifResult(
      'whatsapp',
      false,
      err instanceof Error ? err.message : String(err)
    )
  }
}
