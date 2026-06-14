import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  if (!process.env.SMTP_HOST) {
    return null
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  })

  return transporter
}

export async function enviarNotificacion({ nombre, email, mensaje }) {
  const t = getTransporter()

  if (!t) {
    console.warn(
      '[AuraDev] SMTP no configurado: se omite el envío de email de notificación.'
    )
    return false
  }

  const destino = process.env.MAIL_TO || process.env.SMTP_USER
  const remitente = process.env.MAIL_FROM || process.env.SMTP_USER

  await t.sendMail({
    from: remitente,
    to: destino,
    replyTo: email,
    subject: `Nuevo contacto de ${nombre} - AuraDev`,
    text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapar(nombre)}</p>
      <p><strong>Email:</strong> ${escapar(email)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapar(mensaje).replace(/\n/g, '<br>')}</p>
    `,
  })

  return true
}

function escapar(texto = '') {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
