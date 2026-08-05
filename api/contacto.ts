import { applyCorsHeaders } from '../backend/src/cors.js'

export default async function handler(req: any, res: any) {
  applyCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  // En Vercel req.body ya viene parseado usualmente, pero por las dudas
  // si el handler de backend espera un req.body listo, lo usamos.
  
  const { handleContacto } = await import('../backend/src/handlers/contacto.js')
  return handleContacto(req, res)
}
