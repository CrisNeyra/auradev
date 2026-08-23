import type { IncomingHttpHeaders } from 'http'

/**
 * Contrato mínimo de request para Express y Vercel Node.
 * El body llega sin validar (`unknown`) hasta Zod.
 */
export interface HttpRequestLike {
  method?: string
  body?: unknown
  headers?: IncomingHttpHeaders
  socket?: { remoteAddress?: string | null }
}

/**
 * Contrato mínimo de response (status/json/headers) compartido por ambos runtimes.
 *
 * @typeParam T - Cuerpo de `json()`
 */
export interface HttpResponseLike<T = unknown> {
  setHeader(name: string, value: string | number | readonly string[]): this | void
  status(code: number): this
  json(body: T): this | void
  end(): this | void
}
