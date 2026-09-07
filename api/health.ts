import type { HttpRequestLike, HttpResponseLike } from '../backend/src/types/http.js'

/** Health check serverless: `{ status, servicio }`. */
export default async function handler(
  _req: HttpRequestLike,
  res: HttpResponseLike<{ status: string; servicio: string }>
) {
  const { loadEnv } = await import('../backend/src/env.js')
  loadEnv()
  res.json({ status: 'ok', servicio: 'AuraDev API (Serverless)' })
}
