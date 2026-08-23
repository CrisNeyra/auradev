import type { HttpRequestLike } from './types/http.js'

const WINDOW_MS = 10 * 60 * 1000
const MAX = 5

interface Hit {
  count: number;
  resetAt: number;
}

const hits = new Map<string, Hit>()

/**
 * Rate limit en memoria (por instancia).
 * En Vercel es best-effort entre cold starts; en Express local es efectivo.
 *
 * @param key - Clave (p. ej. `contacto:${ip}`)
 * @returns `limited`, `remaining` y `resetAt` (epoch ms)
 */
export function checkRateLimit(
  key: string,
  { windowMs = WINDOW_MS, max = MAX } = {}
) {
  const now = Date.now()

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now > v.resetAt) hits.delete(k)
    }
  }

  let entry = hits.get(key)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs }
    hits.set(key, entry)
  }

  entry.count += 1

  return {
    limited: entry.count > max,
    remaining: Math.max(0, max - entry.count),
    resetAt: entry.resetAt,
  }
}

/**
 * IP del cliente: `X-Forwarded-For`, luego `X-Real-Ip`, luego `socket.remoteAddress`.
 *
 * @param req - Request HTTP
 */
export function clientIp(req: HttpRequestLike): string {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = req.headers?.['x-real-ip']
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}
