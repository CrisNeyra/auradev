/**
 * Verificación manual/automatizable del rate limit en producción.
 * Uso: node scripts/verify-rate-limit.mjs [baseUrl]
 * Default: https://auradevdev.vercel.app
 */
const base = (process.argv[2] || 'https://auradevdev.vercel.app').replace(/\/$/, '')
const body = JSON.stringify({
  nombre: 'RateLimitTest',
  email: 'ratelimit@example.com',
  mensaje: 'Mensaje de prueba rate limit con longitud suficiente.',
})

async function post() {
  const res = await fetch(`${base}/api/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  return res.status
}

const statuses = []
for (let i = 1; i <= 6; i++) {
  const status = await post()
  statuses.push(status)
  console.log(`Request ${i}: ${status}`)
}

const limited = statuses.includes(429)
if (!limited) {
  console.error(
    'FAIL: no se recibió 429. ¿Upstash configurado y redeploy hecho?'
  )
  process.exit(1)
}
console.log('OK: rate limit respondió 429 al menos una vez.')
