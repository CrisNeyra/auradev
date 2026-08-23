import fs from 'node:fs'
import path from 'node:path'
import { logger } from './log.js'
import { trackNotif, trackContactoBackup } from './metrics.js'

const isVercel = Boolean(process.env.VERCEL)
const LOGS_DIR = path.join(process.cwd(), 'logs')

/**
 * Respaldo de contacto cuando falla o no hay DB.
 * En Vercel el filesystem es efímero: JSON estructurado en Runtime Logs.
 * En local también escribe a `logs/backup_contactos.log`.
 *
 * @param datos - Contacto ya validado
 */
export function logContactoBackup(datos: {
  nombre: string
  email: string
  mensaje: string
}) {
  const payload = {
    event: 'contacto.backup' as const,
    at: new Date().toISOString(),
    nombre: datos.nombre,
    email: datos.email,
    mensajeLength: datos.mensaje.length,
    runtime: isVercel ? 'vercel' : 'local',
  }

  logger.warn(payload, 'Contacto backup')
  trackContactoBackup()

  if (isVercel) return

  try {
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true })
    fs.appendFileSync(
      path.join(LOGS_DIR, 'backup_contactos.log'),
      `[${payload.at}] BACKUP_CONTACTO:\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nMensaje: ${datos.mensaje}\n--------------------------------------------------\n`,
      'utf8'
    )
  } catch (err) {
    logger.error({ err }, 'Backup local falló (dato ya en logs)')
  }
}

/**
 * Error estructurado; en local también `logs/error.log`.
 *
 * @param context - Etiqueta del fallo (p. ej. `DB_INSERT_FALLBACK`)
 * @param error - Error o valor desconocido
 */
export function logError(context: string, error: unknown) {
  const err = error instanceof Error ? error : new Error(String(error ?? 'unknown'))
  logger.error({ err, context, event: 'error' }, err.message)

  if (isVercel) return

  try {
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true })
    fs.appendFileSync(
      path.join(LOGS_DIR, 'error.log'),
      `[${new Date().toISOString()}] ERROR [${context}]: ${err.message}\n`,
      'utf8'
    )
  } catch {
    // ya en logger
  }
}

/**
 * Resultado de un canal de notificación; incrementa métricas en memoria.
 *
 * @param channel - smtp, webhook, whatsapp o telegram
 * @param ok - Si el envío se consideró exitoso
 * @param detail - Mensaje recortado (fallos)
 */
export function logNotifResult(
  channel: 'smtp' | 'smtp_reply' | 'webhook' | 'whatsapp' | 'telegram',
  ok: boolean,
  detail?: string
) {
  trackNotif(channel, ok)
  const payload = {
    event: ok ? ('notif.ok' as const) : ('notif.fail' as const),
    channel,
    ok,
    detail: detail?.slice(0, 300),
  }
  if (ok) logger.info(payload, 'Notificación OK')
  else logger.error(payload, 'Notificación fallida')
}
