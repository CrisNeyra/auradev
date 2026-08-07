import { z } from 'zod'
import { db } from '../db/index.js'
import { mensajes } from '../db/schema.js'
import { enviarNotificacion, enviarConfirmacionCliente } from '../mailer.js'
import { checkRateLimit, clientIp } from '../rateLimitMemory.js'
import { logContactoBackup, logError } from '../utils/logger.js'

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
  const to = process.env.WHATSAPP_TO || '5491178211489'

  if (
    !token ||
    token.includes('tu_token') ||
    !phoneNumberId ||
    phoneNumberId.includes('tu_phone')
  ) {
    return
  }

  const body = [
    'Nuevo contacto AuraDev',
    '',
    `Nombre: ${datos.nombre}`,
    `Email: ${datos.email}`,
    '',
    `Mensaje: ${datos.mensaje}`,
  ].join('\n')

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`

  try {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: body.slice(0, 4000) },
      }),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('[AuraDev] WhatsApp Cloud API error:', res.status, errBody)
    } else {
      console.log('[AuraDev] Notificación WhatsApp (Cloud API) enviada')
    }
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación a WhatsApp:', err)
  }
}

/** Canal primario: Bot API oficial de Telegram (recomendado). */
async function notifyTelegramBot(datos: { nombre: string; email: string; mensaje: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || token.includes('tu_token') || !chatId || chatId.includes('tu_chat')) {
    return false
  }

  const text = `🚀 *Nuevo contacto AuraDev*\n\n*Nombre:* ${datos.nombre}\n*Email:* ${datos.email}\n*Mensaje:* ${datos.mensaje}`

  try {
    const res = await fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[AuraDev] Telegram Bot API error:', res.status, body)
      return false
    }

    console.log('[AuraDev] Notificación Telegram (Bot API) enviada')
    return true
  } catch (err) {
    console.error('[AuraDev] Error Telegram Bot API:', err)
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
      console.error('[AuraDev] CallMeBot (Telegram) respondió con error:', res.status)
      return false
    }
    console.log('[AuraDev] Notificación Telegram (CallMeBot) enviada')
    return true
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación a Telegram (CallMeBot):', err)
    return false
  }
}

async function notifyTelegram(datos: { nombre: string; email: string; mensaje: string }) {
  const sent = await notifyTelegramBot(datos)
  if (!sent) {
    await notifyTelegramCallMeBot(datos)
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
        text: `🚀 *Nuevo mensaje de contacto en AuraDev*\n\n*Nombre:* ${datos.nombre}\n*Email:* ${datos.email}\n*Mensaje:* ${datos.mensaje}`,
      }),
    })
    if (!res.ok) {
      console.error('[AuraDev] Webhook respondió con error:', res.status)
    } else {
      console.log('[AuraDev] Notificación Webhook enviada')
    }
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación al Webhook:', err)
  }
}

export async function handleContacto(req: any, res: any) {
  const ip = clientIp(req)
  const { limited, remaining, resetAt } = checkRateLimit(`contacto:${ip}`)
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

  // 2. Notificaciones (Asíncronas, no bloquean la respuesta al cliente)
  Promise.all([
    enviarNotificacion(datos),
    enviarConfirmacionCliente(datos),
    notifyWebhook(datos),
    notifyWhatsApp(datos),
    notifyTelegram(datos)
  ]).catch(err => logError('NOTIFICATIONS_PROMISE', err))

  // 3. Responder al cliente siempre con éxito (ya que respaldamos el dato)
  return res.status(201).json(responseData)
}
