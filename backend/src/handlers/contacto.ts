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

async function notifyWebhook(datos: { nombre: string; email: string; mensaje: string }) {
  const url = process.env.WEBHOOK_URL
  if (!url || url.includes('tu_webhook')) return

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚀 *Nuevo mensaje de contacto en AuraDev*\n\n*Nombre:* ${datos.nombre}\n*Email:* ${datos.email}\n*Mensaje:* ${datos.mensaje}`,
      }),
    })
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación al Webhook:', err)
  }
}

async function notifyWhatsApp(datos: { nombre: string; email: string; mensaje: string }) {
  const phone = process.env.WHATSAPP_PHONE
  const apiKey = process.env.WHATSAPP_API_KEY
  
  if (!phone || !apiKey || apiKey.includes('tu_api_key')) return

  const text = `*Nuevo contacto AuraDev*%0A%0A*Nombre:* ${encodeURIComponent(datos.nombre)}%0A*Email:* ${encodeURIComponent(datos.email)}%0A*Mensaje:* ${encodeURIComponent(datos.mensaje)}`
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error('[AuraDev] CallMeBot (WhatsApp) respondió con error:', res.status)
    }
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación a WhatsApp:', err)
  }
}

async function notifyTelegram(datos: { nombre: string; email: string; mensaje: string }) {
  const apiKey = process.env.TELEGRAM_API_KEY
  
  if (!apiKey || apiKey.includes('tu_api_key')) return

  const text = `🚀 *Nuevo contacto AuraDev*\n\n*Nombre:* ${datos.nombre}\n*Email:* ${datos.email}\n*Mensaje:* ${datos.mensaje}`
  const url = `https://api.callmebot.com/telegram.php?apikey=${apiKey}&text=${encodeURIComponent(text)}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error('[AuraDev] CallMeBot (Telegram) respondió con error:', res.status)
    }
  } catch (err) {
    console.error('[AuraDev] Error al enviar notificación a Telegram:', err)
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
