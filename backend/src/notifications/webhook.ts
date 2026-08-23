import { logNotifResult } from '../utils/logger.js'
import { fetchWithTimeout, type ContactoDatos } from './http.js'

export async function notifyWebhook(datos: ContactoDatos) {
  const url = process.env.WEBHOOK_URL
  if (!url || url.includes('tu_webhook')) return

  try {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Nuevo mensaje de contacto en AuraDev\n\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nMensaje: ${datos.mensaje}`,
      }),
    })
    if (!res.ok) {
      logNotifResult('webhook', false, String(res.status))
    } else {
      logNotifResult('webhook', true)
    }
  } catch (err) {
    logNotifResult(
      'webhook',
      false,
      err instanceof Error ? err.message : String(err)
    )
  }
}
