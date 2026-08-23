import { z } from 'zod'
import { db } from '../db/index.js'
import { mensajes } from '../db/schema.js'
import { runContactoNotifications } from '../notifications/index.js'
import { checkRateLimit, clientIp } from '../rateLimit.js'
import type { HttpRequestLike, HttpResponseLike } from '../types/http.js'
import { logContactoBackup, logError } from '../utils/logger.js'

/** Validación Zod del body de contacto (`website` es honeypot opcional). */
export const contactoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio.').max(200),
  email: z.string().email('El email no es válido.').max(200),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.').max(5000),
  website: z.string().optional(),
})

/** Body válido de POST /api/contacto. */
export type ContactoPayload = z.infer<typeof contactoSchema>
/** Respuesta 201 tras aceptar el mensaje. */
export type ContactoSuccess = { ok: true; id?: number; creado_en?: Date | string }
/** Respuesta de error de validación, método o rate limit. */
export type ContactoError = { error: string }
export type ContactoResponse = ContactoSuccess | ContactoError

const PLACEHOLDER_REGEX = /^(pending|change_me|todo)$/i

function missing(value: string | undefined): boolean {
  return !value || PLACEHOLDER_REGEX.test(String(value).trim())
}

export { runContactoNotifications }

/**
 * Procesa POST de contacto: rate limit, validación Zod, honeypot,
 * persistencia (o backup) y notificaciones asíncronas.
 *
 * Responde 429 (límite), 400 (validación) o 201 (`{ ok: true, ... }`).
 * No lanza por datos inválidos.
 *
 * @param req - Request HTTP (body sin validar hasta Zod)
 * @param res - Response tipada como ContactoResponse
 * @param options.scheduleNotifications - En Vercel, pasar `waitUntil`
 * @example
 * // POST /api/contacto
 * // { "nombre": "Juan", "email": "juan@example.com", "mensaje": "..." }
 */
export async function handleContacto(
  req: HttpRequestLike,
  res: HttpResponseLike<ContactoResponse>,
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

  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(201).json({ ok: true })
  }

  const datos = {
    nombre: nombre.trim(),
    email: email.trim(),
    mensaje: mensaje.trim(),
  }

  let responseData: ContactoSuccess = { ok: true }

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
      logContactoBackup(datos)
    }
  } else {
    logContactoBackup(datos)
  }

  const notifPromise = runContactoNotifications(datos).catch((err) =>
    logError('NOTIFICATIONS_PROMISE', err)
  )

  if (options?.scheduleNotifications) {
    options.scheduleNotifications(notifPromise)
  } else {
    void notifPromise
  }

  return res.status(201).json(responseData)
}
