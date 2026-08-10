import { describe, it, expect } from 'vitest'

/**
 * Contrato de variables de entorno documentadas (frontend).
 * No exige valores en CI; valida forma cuando están definidas.
 */
describe('contrato env frontend (VITE_*)', () => {
  it('VITE_API_URL sin barra final problemática si existe', () => {
    const url = import.meta.env.VITE_API_URL
    if (!url) return
    expect(url).not.toMatch(/\/$/)
  })

  it('URLs de redes son https si existen', () => {
    for (const key of ['VITE_LINKEDIN_URL', 'VITE_INSTAGRAM_URL'] as const) {
      const v = import.meta.env[key]
      if (!v) continue
      expect(v).toMatch(/^https:\/\//)
    }
  })

  it('WhatsApp número solo dígitos si existe', () => {
    const n = import.meta.env.VITE_WHATSAPP_NUMERO
    if (!n) return
    expect(n).toMatch(/^\d{10,15}$/)
  })
})
