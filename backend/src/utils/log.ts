import pino from 'pino'

const isVercel = Boolean(process.env.VERCEL)
const isTest = process.env.VITEST === 'true' || process.env.NODE_ENV === 'test'
const isPretty =
  !isVercel && !isTest && process.env.NODE_ENV !== 'production'

/**
 * Logger Pino (JSON en Vercel/prod; pretty en local).
 * Nivel: `LOG_LEVEL` o `info` en prod / `debug` en desarrollo. Silencioso en tests.
 */
const levelFromEnv = process.env.LOG_LEVEL?.trim()

export const logger = pino({
  name: 'auradev-api',
  level: levelFromEnv
    || (isTest
      ? 'silent'
      : isVercel || process.env.NODE_ENV === 'production'
        ? 'info'
        : 'debug'),
  base: { service: 'auradev-api' },
  ...(isPretty
    ? {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:standard' },
        },
      }
    : {}),
})
