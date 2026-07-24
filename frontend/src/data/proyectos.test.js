import { describe, expect, it } from 'vitest'
import {
  getProyectoBySlug,
  getProyectoHref,
  hasUrlVivo,
  proyectos,
} from './proyectos.js'

describe('proyectos data helpers', () => {
  it('resuelve un proyecto por slug', () => {
    const p = getProyectoBySlug('aura-pro')
    expect(p).toBeDefined()
    expect(p.nombre).toBe('Aura PRO')
  })

  it('devuelve undefined si el slug no existe', () => {
    expect(getProyectoBySlug('no-existe')).toBeUndefined()
  })

  it('siempre usa href interno al detalle', () => {
    for (const p of proyectos) {
      expect(getProyectoHref(p)).toBe(`/proyectos/${p.slug}`)
      expect(p).not.toHaveProperty('tipoLink')
    }
  })

  it('detecta URL viva http(s)', () => {
    expect(hasUrlVivo({ url: 'https://ejemplo.com' })).toBe(true)
    expect(hasUrlVivo({ url: '/relativo' })).toBe(false)
    expect(hasUrlVivo({})).toBe(false)
  })
})
