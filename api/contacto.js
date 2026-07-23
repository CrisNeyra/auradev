async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  req.body = await parseBody(req)

  const databaseUrl = process.env.DATABASE_URL
  const missing =
    !databaseUrl ||
    !String(databaseUrl).trim() ||
    /^(pending|change_me|todo)$/i.test(String(databaseUrl).trim())

  if (missing) {
    return res.status(503).json({
      error: 'Servicio temporalmente no disponible. Contacto en mantenimiento.',
    })
  }

  const { handleContacto } = await import('../backend/src/handlers/contacto.js')
  return handleContacto(req, res)
}
