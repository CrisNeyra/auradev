import { logNotifResult } from '../utils/logger.js'
import { fetchWithTimeout, type ContactoDatos } from './http.js'

async function notifyTelegramBot(datos: ContactoDatos) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || token.includes('tu_token') || !chatId || chatId.includes('tu_chat')) {
    return false
  }

  const text = [
    'Nuevo contacto AuraDev',
    '',
    `Nombre: ${datos.nombre}`,
    `Email: ${datos.email}`,
    '',
    `Mensaje: ${datos.mensaje}`,
  ].join('\n')

  try {
    const res = await fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      logNotifResult('telegram', false, `bot ${res.status} ${body}`)
      return false
    }

    logNotifResult('telegram', true, 'bot_api')
    return true
  } catch (err) {
    logNotifResult(
      'telegram',
      false,
      err instanceof Error ? err.message : String(err)
    )
    return false
  }
}

async function notifyTelegramCallMeBot(datos: ContactoDatos) {
  const apiKey = process.env.TELEGRAM_API_KEY

  if (!apiKey || apiKey.includes('tu_api_key')) return false

  const text = `Nuevo contacto AuraDev\n\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nMensaje: ${datos.mensaje}`
  const url = `https://api.callmebot.com/telegram.php?apikey=${apiKey}&text=${encodeURIComponent(text)}`

  try {
    const res = await fetchWithTimeout(url)
    if (!res.ok) {
      logNotifResult('telegram', false, `callmebot ${res.status}`)
      return false
    }
    logNotifResult('telegram', true, 'callmebot')
    return true
  } catch (err) {
    logNotifResult(
      'telegram',
      false,
      err instanceof Error ? err.message : String(err)
    )
    return false
  }
}

export async function notifyTelegram(datos: ContactoDatos) {
  const sent = await notifyTelegramBot(datos)
  if (!sent) {
    await notifyTelegramCallMeBot(datos)
  }
}
