function normalizeOrigin(value) {
  if (!value) return null
  const trimmed = String(value).trim().replace(/\/$/, '')
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/**
 * Orígenes permitidos: CORS_ORIGIN (coma-separado) + URLs de Vercel si existen.
 * Sin config, solo localhost:5173 (nunca *).
 */
export function allowedOrigins() {
  const fromEnv = String(process.env.CORS_ORIGIN || '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean)

  const auto = []
  if (process.env.VERCEL_URL) {
    auto.push(normalizeOrigin(process.env.VERCEL_URL))
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    auto.push(normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL))
  }

  const list = [...new Set([...fromEnv, ...auto].filter(Boolean))]
  if (list.length) return list
  return ['http://localhost:5173']
}

export function isOriginAllowed(origin) {
  if (!origin) return true
  return allowedOrigins().includes(origin)
}

/** Aplica headers CORS reflectivos (sin *). */
export function applyCorsHeaders(req, res) {
  const origin = req.headers?.origin
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}
