import { z } from 'zod'
import { db } from '../db/index.js'
import { mensajes } from '../db/schema.js'
import { enviarNotificacion, enviarConfirmacionCliente } from '../mailer.js'
import { checkRateLimit, clientIp } from '../rateLimit.js'
import { logContactoBackup, logError, logNotifResult } from '../utils/logger.js'

const contactoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio.').max(200),
  email: z.string().email('El email no es válido.').max(200),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.').max(5000),
  website: z.string().optional(),
})

const PLACEHOLDER_REGEX = /^(pending|change_me|todo)$/i

function missing(value: string | undefined): boolean {
  return !value || PLACEHOLDER_REGEX.test(String(value).trim())
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, ms = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

/** WhatsApp Cloud API (Meta) — oficial. No usar CallMeBot: puede restringir la cuenta. */
async function notifyWhatsApp(datos: { nombre: string; email: string; mensaje: string }) {
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

  // Meta: texto libre solo dentro de ventana 24h (el usuario debe escribir primero).
  // Fuera de esa ventana hace falta una plantilla aprobada (como hello_world).
  const safe = (value: string, max = 200) =>
    String(value || '')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max) || '-'

  try {
    let res: Response

    if (templateName && !templateName.includes('tu_template')) {
      // Plantilla con variables {{1}} nombre {{2}} email {{3}} mensaje
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
        console.error(
          '[AuraDev] Tip WhatsApp: el usuario debe responder al número de prueba (+1 555...) o usá una plantilla (WHATSAPP_TEMPLATE_NAME).'
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

/** Canal primario: Bot API oficial de Telegram (recomendado). */
async function notifyTelegramBot(datos: { nombre: string; email: string; mensaje: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || token.includes('tu_token') || !chatId || chatId.includes('tu_chat')) {
    return false
  }

  // Sin Markdown: caracteres como _ * ` en nombre/email/mensaje rompen parse_mode
  const text = [
    'Nuevo contacto AuraDev',
    '',
    `Nombre: ${datos.nombre}`,
    `Email: ${datos.email}`,
    '',
    `Mensaje: ${datos.mensaje}`,
  ].join('\n')

  try {
    const res = await fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      logNotifResult('telegram', false, `bot ${res.status} ${body}`)
      return false
    }

    logNotifResult('telegram', true, 'bot_api')
    return true
  } catch (err) {
    logNotifResult(
      'telegram',
      false,
      err instanceof Error ? err.message : String(err)
    )
    return false
  }
}

/** Fallback: CallMeBot Telegram. */
async function notifyTelegramCallMeBot(datos: { nombre: string; email: string; mensaje: string }) {
  const apiKey = process.env.TELEGRAM_API_KEY
  
  if (!apiKey || apiKey.includes('tu_api_key')) return false

  const text = `🚀 *Nuevo contacto AuraDev*\n\n*Nombre:* ${datos.nombre}\n*Email:* ${datos.email}\n*Mensaje:* ${datos.mensaje}`
  const url = `https://api.callmebot.com/telegram.php?apikey=${apiKey}&text=${encodeURIComponent(text)}`

  try {
    const res = await fetchWithTimeout(url)
    if (!res.ok) {
      logNotifResult('telegram', false, `callmebot ${res.status}`)
      return false
    }
    logNotifResult('telegram', true, 'callmebot')
    return true
  } catch (err) {
    logNotifResult(
      'telegram',
      false,
      err instanceof Error ? err.message : String(err)
    )
    return false
  }
}

async function notifyTelegram(datos: { nombre: string; email: string; mensaje: string }) {
  const sent = await notifyTelegramBot(datos)
  if (!sent) {
    const fallback = await notifyTelegramCallMeBot(datos)
    if (!fallback) {
      // Ambos fallaron o no configurados: ya logueado por canal si hubo intento
    }
  }
}

async function notifyWebhook(datos: { nombre: string; email: string; mensaje: string }) {
  const url = process.env.WEBHOOK_URL
  if (!url || url.includes('tu_webhook')) return

  try {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Nuevo mensaje de contacto en AuraDev\n\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nMensaje: ${datos.mensaje}`,
      }),
    })
    if (!res.ok) {
      logNotifResult('webhook', false, String(res.status))
    } else {
      logNotifResult('webhook', true)
    }
  } catch (err) {
    logNotifResult(
      'webhook',
      false,
      err instanceof Error ? err.message : String(err)
    )
  }
}

export async function runContactoNotifications(datos: {
  nombre: string
  email: string
  mensaje: string
}) {
  await Promise.all([
    enviarNotificacion(datos),
    enviarConfirmacionCliente(datos),
    notifyWebhook(datos),
    notifyWhatsApp(datos),
    notifyTelegram(datos),
  ])
}

export async function handleContacto(
  req: any,
  res: any,
  options?: { scheduleNotifications?: (promise: Promise<void>) => void }
) {
  const ip = clientIp(req)
  const { limited, remaining, resetAt } = await checkRateLimit(`contacto:${ip}`)
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)))
  
  if (limited) {
    return res.status(429).json({
      error: 'Demasiados envíos. Intentá nuevamente en unos minutos.',
    })
  }

  const validation = contactoSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message })
  }

  const { nombre, email, mensaje, website } = validation.data

  // Honeypot check
  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(201).json({ ok: true })
  }

  const datos = {
    nombre: nombre.trim(),
    email: email.trim(),
    mensaje: mensaje.trim(),
  }

  let responseData: any = { ok: true }

  // 1. Intentar Guardar en DB
  const isDbConfigured = !missing(process.env.DATABASE_URL)

  if (isDbConfigured) {
    try {
      const [result] = await db.insert(mensajes).values(datos).returning({
        id: mensajes.id,
        creado_en: mensajes.creado_en,
      })
      responseData = { ...responseData, id: result.id, creado_en: result.creado_en }
    } catch (err) {
      logError('DB_INSERT_FALLBACK', err)
      logContactoBackup(datos) // Respaldo en disco si falla la DB
    }
  } else {
    logContactoBackup(datos) // Respaldo si no hay DB configurada
  }

  const notifPromise = runContactoNotifications(datos).catch((err) =>
    logError('NOTIFICATIONS_PROMISE', err)
  )

  if (options?.scheduleNotifications) {
    options.scheduleNotifications(notifPromise)
  } else {
    void notifPromise
  }

  // 3. Responder al cliente siempre con éxito (ya que respaldamos el dato)
  return res.status(201).json(responseData)
}
