import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ContactoResponse } from './contacto.js'
import { handleContacto } from './contacto.js'
import type { HttpRequestLike, HttpResponseLike } from '../types/http.js'

const mockInsert = vi.fn()
const mockCheckRateLimit = vi.fn()

vi.mock('../db/index.js', () => ({
  db: {
    insert: (...args: unknown[]) => mockInsert(...args),
  },
}))

vi.mock('../db/schema.js', () => ({
  mensajes: {
    id: 'id',
    creado_en: 'creado_en',
  },
}))

vi.mock('../mailer.js', () => ({
  enviarNotificacion: vi.fn(),
  enviarConfirmacionCliente: vi.fn(),
}))

vi.mock('../rateLimit.js', () => ({
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
  clientIp: () => '127.0.0.1',
}))

vi.mock('../utils/logger.js', () => ({
  logContactoBackup: vi.fn(),
  logError: vi.fn(),
}))

function createMocks(body: Record<string, unknown> = {}) {
  const req: HttpRequestLike = {
    body,
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
  }

  const res: HttpResponseLike<ContactoResponse> & {
    statusCode: number
    headers: Record<string, string>
    body: unknown
  } = {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(key: string, value: string | number | readonly string[]) {
      this.headers[key] = String(value)
    },
    status(code: number) {
      this.statusCode = code
      return this
    },
    json(data: ContactoResponse) {
      this.body = data
      return this
    },
    end() {
      return this
    },
  }

  return { req, res }
}

beforeEach(() => {
  vi.clearAllMocks()
  process.env.DATABASE_URL = 'postgresql://test:test@localhost/test'

  mockCheckRateLimit.mockResolvedValue({
    limited: false,
    remaining: 4,
    resetAt: Date.now() + 60000,
  })

  mockInsert.mockReturnValue({
    values: vi.fn().mockReturnValue({
      returning: vi.fn().mockResolvedValue([{ id: 42, creado_en: '2026-01-01' }]),
    }),
  })
})

describe('handleContacto', () => {
  it('responde 201 en happy path', async () => {
    const { req, res } = createMocks({
      nombre: 'Cristian',
      email: 'test@example.com',
      mensaje: 'Mensaje de prueba con suficiente longitud.',
    })

    await handleContacto(req, res)

    expect(res.statusCode).toBe(201)
    expect(res.body).toMatchObject({ ok: true, id: 42 })
  })

  it('responde 400 si falta email válido', async () => {
    const { req, res } = createMocks({
      nombre: 'Cristian',
      email: 'no-es-email',
      mensaje: 'Mensaje de prueba con suficiente longitud.',
    })

    await handleContacto(req, res)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('responde 429 si rate limit activo', async () => {
    mockCheckRateLimit.mockResolvedValueOnce({
      limited: true,
      remaining: 0,
      resetAt: Date.now() + 60000,
    })

    const { req, res } = createMocks({
      nombre: 'Cristian',
      email: 'test@example.com',
      mensaje: 'Mensaje de prueba con suficiente longitud.',
    })

    await handleContacto(req, res)

    expect(res.statusCode).toBe(429)
  })

  it('honeypot: responde 201 silencioso sin guardar', async () => {
    const { req, res } = createMocks({
      nombre: 'Bot',
      email: 'bot@spam.com',
      mensaje: 'Mensaje de prueba con suficiente longitud.',
      website: 'http://spam.test',
    })

    await handleContacto(req, res)

    expect(res.statusCode).toBe(201)
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('usa scheduleNotifications cuando se provee', async () => {
    const schedule = vi.fn()
    const { req, res } = createMocks({
      nombre: 'Cristian',
      email: 'test@example.com',
      mensaje: 'Mensaje de prueba con suficiente longitud.',
    })

    await handleContacto(req, res, { scheduleNotifications: schedule })

    expect(schedule).toHaveBeenCalledOnce()
    expect(res.statusCode).toBe(201)
  })
})
