import { waitUntil } from '@vercel/functions'
import { applyCorsHeaders } from '../backend/src/cors.js'
import { loadEnv } from '../backend/src/env.js'
import type { HttpRequestLike, HttpResponseLike } from '../backend/src/types/http.js'

/**
 * Endpoint serverless `POST /api/contacto`.
 * Aplica CORS, responde OPTIONS, rechaza otros métodos (405) y delega en `handleContacto`.
 * Las notificaciones se extienden con `waitUntil` para no cortar el isolate.
 *
 * @example
 * // POST /api/contacto
 * // { "nombre": "Juan", "email": "juan@example.com", "mensaje": "..." }
 */
export default async function handler(
  req: HttpRequestLike,
  res: HttpResponseLike
) {
  loadEnv()
  applyCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const { handleContacto } = await import('../backend/src/handlers/contacto.js')
  return handleContacto(req, res, {
    scheduleNotifications: (promise) => waitUntil(promise),
  })
}
