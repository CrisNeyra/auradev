# Fases 1 y 2 (cuenta) — AuraDev

El código ya está listo. Estas fases **no se pueden completar desde el repo**: hay que cargar variables en Vercel y (fase 2) una plantilla en Meta.

**Antes:** en Vercel, las vars que no uses deben estar vacías. No dejes `tu_token` (el API no arranca).

## Fase 1 — SMTP + auto-reply (~20 min)

1. Gmail → verificación en 2 pasos → [Contraseña de aplicación](https://myaccount.google.com/apppasswords).
2. Vercel → Settings → Environment Variables (Production y Preview): `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`, `ENABLE_AUTO_REPLY=true`.
3. Redeploy. Enviar el form con un mail real.
4. Debés ver aviso en `MAIL_TO` y “Recibimos tu mensaje” en el visitante.

Tabla: [vercel-checklist.md](vercel-checklist.md) §4. Detalle: [auto-respuesta.md](auto-respuesta.md).

## Fase 2 — Plantilla WhatsApp al equipo (1–48 h)

1. Meta Developers → WhatsApp → plantilla `auradev_nuevo_contacto`, Utility, `es`, body `{{1}}` `{{2}}` `{{3}}`.
2. Esperar **Approved**.
3. Vercel: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO`, `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANG=es` (token y phone juntos).
4. Redeploy y un envío de prueba.

Guía: [whatsapp-template.md](whatsapp-template.md).
