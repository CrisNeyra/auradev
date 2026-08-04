import nodemailer from 'nodemailer'

let transporter: any = null

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

interface NotificacionParams {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function enviarNotificacion({ nombre, email, mensaje }: NotificacionParams): Promise<boolean> {
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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #d32f2f;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapar(nombre)}</p>
        <p><strong>Email:</strong> ${escapar(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${escapar(mensaje).replace(/\n/g, '<br>')}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">Este es un mensaje automático de AuraDev API.</p>
      </div>
    `,
  })

  return true
}

export async function enviarConfirmacionCliente({ nombre, email }: Pick<NotificacionParams, 'nombre' | 'email'>): Promise<boolean> {
  const t = getTransporter()

  if (!t || process.env.ENABLE_AUTO_REPLY !== 'true') {
    return false
  }

  const remitente = process.env.MAIL_FROM || process.env.SMTP_USER

  try {
    await t.sendMail({
      from: remitente,
      to: email,
      subject: `Recibimos tu mensaje - AuraDev`,
      text: `Hola ${nombre},\n\nGracias por contactarte con AuraDev. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.\n\nSaludos,\nEl equipo de AuraDev.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #333;">¡Hola ${escapar(nombre)}!</h1>
          <p style="font-size: 18px; color: #666;">Gracias por contactarte con <strong>AuraDev</strong>.</p>
          <p style="color: #888; line-height: 1.6;">Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y nos pondremos en contacto contigo a la brevedad para conversar sobre tu proyecto.</p>
          <div style="margin: 30px 0;">
            <a href="https://auradev.com" style="background: #d32f2f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visitar nuestro sitio</a>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa;">AuraDev — Estudio de Desarrollo Digital</p>
        </div>
      `,
    })
    return true
  } catch (err) {
    console.error('[AuraDev] Error al enviar auto-respuesta al cliente:', err)
    return false
  }
}

function escapar(texto: string = ''): string {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
