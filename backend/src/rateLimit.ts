import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import {
  checkRateLimit as checkMemory,
  clientIp,
} from './rateLimitMemory.js'

const WINDOW_MS = 10 * 60 * 1000
const MAX = 5

let upstashLimiter: Ratelimit | null = null

function getUpstashLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (!url || !token) return null

  if (!upstashLimiter) {
    const redis = new Redis({ url, token })
    upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX, '10 m'),
      prefix: 'auradev:rl',
    })
  }

  return upstashLimiter
}

/**
 * Rate limit distribuido (Upstash sliding window) con fallback en memoria.
 *
 * @param key - Clave (p. ej. `contacto:${ip}`)
 * @returns `limited`, `remaining` y `resetAt`
 */
export async function checkRateLimit(
  key: string,
  { windowMs = WINDOW_MS, max = MAX } = {}
) {
  const limiter = getUpstashLimiter()

  if (limiter) {
    const result = await limiter.limit(key)
    return {
      limited: !result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    }
  }

  return checkMemory(key, { windowMs, max })
}

/** Reexporta `clientIp` desde el módulo en memoria. */
export { clientIp }
