/**
 * Contadores en memoria para observabilidad ligera (health / logs).
 * En serverless cada instancia tiene su propio mapa; el valor real está en logs JSON.
 */

type Channel = 'smtp' | 'smtp_reply' | 'webhook' | 'whatsapp' | 'telegram'

const counters = {
  notifOk: {} as Record<string, number>,
  notifFail: {} as Record<string, number>,
  contactoBackup: 0,
}

export function trackNotif(channel: Channel, ok: boolean) {
  const bag = ok ? counters.notifOk : counters.notifFail
  bag[channel] = (bag[channel] || 0) + 1
}

export function trackContactoBackup() {
  counters.contactoBackup += 1
}

export function getMetricsSnapshot() {
  return {
    notifOk: { ...counters.notifOk },
    notifFail: { ...counters.notifFail },
    contactoBackup: counters.contactoBackup,
    uptimeSec: Math.round(process.uptime()),
  }
}
