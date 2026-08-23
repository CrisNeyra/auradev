import type { HttpRequestLike, HttpResponseLike } from './types/http.js'

function normalizeOrigin(value: unknown): string | null {
  if (!value) return null
  const trimmed = String(value).trim().replace(/\/$/, '')
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/**
 * Lista de orígenes CORS: `CORS_ORIGIN` (coma-separado) más URLs de Vercel si existen.
 * Sin config, solo `http://localhost:5173` (nunca `*`).
 *
 * @returns Orígenes normalizados sin barra final
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

/**
 * Indica si el `Origin` del browser puede reflejarse en CORS.
 * Sin header se considera permitido (clientes no-browser).
 * En local acepta cualquier puerto de localhost / 127.0.0.1.
 *
 * @param origin - Header Origin o `undefined`
 */
export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true
  if (allowedOrigins().includes(origin)) return true
  // En desarrollo Vite puede usar 5173, 5174, etc. si el puerto está ocupado
  if (/^http:\/\/localhost:\d+$/i.test(origin)) return true
  if (/^http:\/\/127\.0\.0\.1:\d+$/i.test(origin)) return true
  return false
}

/**
 * Aplica CORS reflectivo (Allow-Origin del request si está permitido) y métodos POST/OPTIONS.
 *
 * @param req - Request con `headers.origin`
 * @param res - Response con `setHeader`
 */
export function applyCorsHeaders(
  req: HttpRequestLike,
  res: Pick<HttpResponseLike, 'setHeader'>
): void {
  const originHeader = req.headers?.origin
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}
