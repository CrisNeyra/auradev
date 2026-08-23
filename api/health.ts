import { loadEnv } from '../backend/src/env.js'
import type { HttpRequestLike, HttpResponseLike } from '../backend/src/types/http.js'

/** Health check serverless: `{ status, servicio }`. */
export default function handler(
  _req: HttpRequestLike,
  res: HttpResponseLike<{ status: string; servicio: string }>
) {
  loadEnv()
  res.json({ status: 'ok', servicio: 'AuraDev API (Serverless)' })
}
