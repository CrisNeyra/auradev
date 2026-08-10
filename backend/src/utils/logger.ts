import fs from 'node:fs'
import path from 'node:path'
import { trackNotif, trackContactoBackup } from './metrics.js'

const isVercel = Boolean(process.env.VERCEL)
const LOGS_DIR = path.join(process.cwd(), 'logs')

/**
 * Respaldo de contacto cuando falla/ausenta la DB.
 * En Vercel el filesystem es efímero: JSON estructurado en Runtime Logs.
 * En local también escribe a logs/backup_contactos.log.
 */
export function logContactoBackup(datos: {
  nombre: string
  email: string
  mensaje: string
}) {
  const payload = {
    event: 'contacto.backup',
    at: new Date().toISOString(),
    ...datos,
    runtime: isVercel ? 'vercel' : 'local',
  }

  console.warn('[AuraDev] CONTACTO_BACKUP', JSON.stringify(payload))
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
    console.error('[AuraDev] Backup local falló (dato ya en logs):', err)
  }
}

export function logError(context: string, error: unknown) {
  const message =
    error instanceof Error ? error.message : String(error ?? 'unknown')
  const payload = {
    event: 'error',
    context,
    message,
    at: new Date().toISOString(),
  }
  console.error('[AuraDev] ERROR', JSON.stringify(payload))

  if (isVercel) return

  try {
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true })
    fs.appendFileSync(
      path.join(LOGS_DIR, 'error.log'),
      `[${payload.at}] ERROR [${context}]: ${message}\n`,
      'utf8'
    )
  } catch {
    // ya en console
  }
}

export function logNotifResult(
  channel: 'smtp' | 'smtp_reply' | 'webhook' | 'whatsapp' | 'telegram',
  ok: boolean,
  detail?: string
) {
  trackNotif(channel, ok)
  const payload = {
    event: ok ? 'notif.ok' : 'notif.fail',
    channel,
    ok,
    detail: detail?.slice(0, 300),
    at: new Date().toISOString(),
  }
  if (ok) console.log('[AuraDev] NOTIF', JSON.stringify(payload))
  else console.error('[AuraDev] NOTIF', JSON.stringify(payload))
}
