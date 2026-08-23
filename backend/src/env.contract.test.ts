import { describe, it, expect } from 'vitest'
import { parseEnv } from './env.js'

const documented = [
  'DATABASE_URL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'WHATSAPP_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
  'WHATSAPP_TO',
  'WHATSAPP_TEMPLATE_NAME',
  'WHATSAPP_TEMPLATE_LANG',
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_TO',
] as const

describe('contrato env backend (documentado)', () => {
  it('lista de vars críticas está definida (catálogo)', () => {
    expect(documented.length).toBeGreaterThan(5)
    expect(documented).toContain('DATABASE_URL')
    expect(documented).toContain('UPSTASH_REDIS_REST_URL')
  })

  it('arranca sin DATABASE_URL', () => {
    expect(() => parseEnv({})).not.toThrow()
  })

  it('rechaza DATABASE_URL que no es postgres', () => {
    expect(() => parseEnv({ DATABASE_URL: 'https://example.com' })).toThrow(
      /postgres/i
    )
  })

  it('acepta postgres URL', () => {
    const env = parseEnv({
      DATABASE_URL: 'postgresql://u:p@localhost/db',
    })
    expect(env.DATABASE_URL).toMatch(/^postgresql:/)
  })

  it('rechaza par Upstash incompleto', () => {
    expect(() =>
      parseEnv({ UPSTASH_REDIS_REST_URL: 'https://example.upstash.io' })
    ).toThrow(/Upstash/i)
  })

  it('rechaza placeholder WhatsApp', () => {
    expect(() =>
      parseEnv({
        WHATSAPP_TOKEN: 'tu_token_de_meta',
        WHATSAPP_PHONE_NUMBER_ID: '123',
      })
    ).toThrow(/placeholder/i)
  })

  it('si WHATSAPP_TEMPLATE_NAME existe en process, no es placeholder', () => {
    const name = process.env.WHATSAPP_TEMPLATE_NAME
    if (!name) return
    expect(name).not.toMatch(/tu_template/i)
  })

  it('si Upstash URL existe en process, es https', () => {
    const url = process.env.UPSTASH_REDIS_REST_URL
    if (!url) return
    expect(url).toMatch(/^https:\/\//)
  })
})
