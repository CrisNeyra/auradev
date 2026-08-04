function normalizeOrigin(value: any): string | null {
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
export function allowedOrigins(): string[] {
  const fromEnv = String(process.env.CORS_ORIGIN || '')
    .split(',')
    .map(normalizeOrigin)
    .filter((v): v is string => Boolean(v))

  const auto: string[] = []
  if (process.env.VERCEL_URL) {
    const url = normalizeOrigin(process.env.VERCEL_URL)
    if (url) auto.push(url)
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const url = normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    if (url) auto.push(url)
  }

  const list = [...new Set([...fromEnv, ...auto])]
  if (list.length) return list
  return ['http://localhost:5173']
}

export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true
  return allowedOrigins().includes(origin)
}

/** Aplica headers CORS reflectivos (sin *). */
export function applyCorsHeaders(req: any, res: any): void {
  const origin = req.headers?.origin
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}
