import { waitUntil } from '@vercel/functions'
import { applyCorsHeaders } from '../backend/src/cors.js'

export default async function handler(req: any, res: any) {
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
