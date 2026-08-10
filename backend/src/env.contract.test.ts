import { describe, it, expect } from 'vitest'

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

  it('si WHATSAPP_TEMPLATE_NAME existe, no es placeholder', () => {
    const name = process.env.WHATSAPP_TEMPLATE_NAME
    if (!name) return
    expect(name).not.toMatch(/tu_template/i)
  })

  it('si Upstash URL existe, es https', () => {
    const url = process.env.UPSTASH_REDIS_REST_URL
    if (!url) return
    expect(url).toMatch(/^https:\/\//)
  })
})
