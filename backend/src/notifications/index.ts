import { enviarNotificacion, enviarConfirmacionCliente } from '../mailer.js'
import type { ContactoDatos } from './http.js'
import { notifyTelegram } from './telegram.js'
import { notifyWebhook } from './webhook.js'
import { notifyWhatsApp } from './whatsapp.js'

/**
 * Email, webhook, WhatsApp y Telegram en paralelo.
 * Los fallos se registran; no se relanzan al cliente HTTP.
 */
export async function runContactoNotifications(datos: ContactoDatos) {
  await Promise.all([
    enviarNotificacion(datos),
    enviarConfirmacionCliente(datos),
    notifyWebhook(datos),
    notifyWhatsApp(datos),
    notifyTelegram(datos),
  ])
}
