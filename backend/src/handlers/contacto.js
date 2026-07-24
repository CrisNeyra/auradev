import { query } from '../db.js'
import { enviarNotificacion } from '../mailer.js'
import { checkRateLimit, clientIp } from '../rateLimitMemory.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PLACEHOLDER_REGEX = /^(pending|change_me|todo)$/i

function missing(value) {
  return !value || PLACEHOLDER_REGEX.test(String(value).trim())
}

export async function handleContacto(req, res) {
  const ip = clientIp(req)
  const { limited, remaining, resetAt } = checkRateLimit(`contacto:${ip}`)
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)))
  if (limited) {
    return res.status(429).json({
      error: 'Demasiados envíos. Intentá nuevamente en unos minutos.',
    })
  }

  if (missing(process.env.DATABASE_URL)) {
    return res.status(503).json({
      error: 'Servicio temporalmente no disponible. Contacto en mantenimiento.',
    })
  }

  const { nombre, email, mensaje, website } = req.body || {}

  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(201).json({ ok: true })
  }

  if (typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio.' })
  }
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'El email no es válido.' })
  }
  if (typeof mensaje !== 'string' || mensaje.trim().length < 10) {
    return res
      .status(400)
      .json({ error: 'El mensaje debe tener al menos 10 caracteres.' })
  }

  const datos = {
    nombre: nombre.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    mensaje: mensaje.trim().slice(0, 5000),
  }

  try {
    const result = await query(
      'INSERT INTO mensajes (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING id, creado_en',
      [datos.nombre, datos.email, datos.mensaje]
    )

    try {
      await enviarNotificacion(datos)
    } catch (mailErr) {
      console.error('[AuraDev] Error al enviar la notificación por email:', mailErr)
    }

    const row = Array.isArray(result) ? result[0] : result

    return res.status(201).json({
      ok: true,
      id: row ? row.id : null,
      creado_en: row ? row.creado_en : null,
    })
  } catch (err) {
    console.error('[AuraDev] Error al guardar el mensaje:', err)
    return res
      .status(500)
      .json({ error: 'No se pudo procesar el mensaje. Intentá más tarde.' })
  }
}
