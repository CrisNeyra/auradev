# Auto-respuesta: mail, WhatsApp e Instagram

Hay **tres canales distintos**. No se resuelven con un solo bot.

El formulario ya puede auto-responder por **email** (`enviarConfirmacionCliente`). WhatsApp Cloud API avisa al **número del estudio** (`WHATSAPP_TO`), no al visitante. El form **no pide teléfono**: no se puede contestar por WhatsApp un lead que solo dejó mail.

```
Formulario web  →  mail al estudio + auto-reply al email del cliente
Mail directo    →  respuesta automática de Gmail (fuera del repo)
WhatsApp wa.me  →  el cliente escribe primero → saludo / bot
Instagram DM    →  el cliente escribe primero → saludo / bot
```

---

## 1. Formulario + Gmail

### A) Quien completa el form (código AuraDev)

Requiere SMTP y `ENABLE_AUTO_REPLY=true`. El visitante recibe “Recibimos tu mensaje - AuraDev”.

**Gmail como SMTP (paso a paso):**

1. Cuenta Google (ideal Workspace `hola@auradev.com`; Gmail personal funciona con más límites).
2. Activar **verificación en 2 pasos** → [Contraseñas de aplicación](https://myaccount.google.com/apppasswords) → generar una para “AuraDev”.
3. En `backend/.env` y **Vercel** (Production / Preview):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hola@auradev.com
SMTP_PASS=xxxx xxxx xxxx xxxx
MAIL_FROM="AuraDev <hola@auradev.com>"
MAIL_TO=hola@auradev.com
ENABLE_AUTO_REPLY=true
```

4. **Redeploy**. Enviar el form con un mail real. Debés recibir: (1) aviso interno a `MAIL_TO`, (2) confirmación en el mail del visitante.
5. Gmail no acepta la clave de la cuenta: tiene que ser **App Password**.

Código: [`backend/src/mailer.ts`](../backend/src/mailer.ts). El CTA del mail apunta a [auradevdev.vercel.app](https://auradevdev.vercel.app/).

### B) Quien escribe directo a Gmail (sin form)

El SMTP del form **no** lee la bandeja.

1. Gmail → Configuración → **Respuesta automática** (vacaciones) o un filtro con plantilla.
2. Google Workspace: **Routing** / plantilla de respuesta.

Eso es configuración de Google, no de este repo.

---

## 2. WhatsApp

El sitio abre `wa.me`: **el cliente inicia el chat**. Ahí sí un bot puede contestar (ventana 24 h de Meta).

| Opción | Qué es | Recomendación |
|--------|--------|----------------|
| Saludo + menú de **WhatsApp Business** (app) | Bienvenida / ausencia en el celular. Cero código. | Empezar acá hoy. |
| **ManyChat** / Respond.io | Flujos FAQ + Instagram en el mismo producto. | Mejor costo/beneficio para un estudio chico. |
| Cloud API en AuraDev (`api/whatsapp` webhook) | Webhook Meta → Vercel. Más control y más mantenimiento. | Cuando ManyChat se quede corto. |
| Bot no oficial (whatsapp-web.js, etc.) | Enlaza WhatsApp personal. | No: riesgo de baneo. |

Alertas del **formulario al equipo** (plantilla 24/7): [whatsapp-template.md](whatsapp-template.md). Eso no es auto-respuesta al cliente.

### App Business (mínimo)

1. WhatsApp Business en el número público (`+54 9 11 7821-1489`).
2. Herramientas de negocio → **Mensaje de bienvenida** y **mensaje de ausencia** (horario).
3. Respuestas rápidas: presupuesto, plazo, stack.
4. Seguir usando el puente `/whatsapp` del sitio.

### ManyChat (bot de verdad)

1. Meta Business + Instagram profesional + WhatsApp en el mismo Business.
2. ManyChat → conectar WhatsApp.
3. Flujo: bienvenida → botones (Software / Apps / Hablar con humano) → pedir nombre/mail → aviso a tu mail o Telegram.
4. Probar desde otro celular. No prometas plazos sin revisión humana.

### Cloud API en este repo (fase posterior)

No está implementado. Cuando haga falta:

1. App Meta, token permanente, `PHONE_NUMBER_ID`.
2. Webhook `GET` verify + `POST` (`api/whatsapp.ts`).
3. Validar `X-Hub-Signature-256`.
4. Texto libre solo si el usuario escribió en las últimas 24 h; si no, plantilla.
5. FAQ + “hablar con humano” (notificar Telegram/mail).
6. IA solo con límites y handoff; no es el primer paso.

Para WhatsApp **al cliente** desde el form haría falta campo teléfono + plantilla Meta Utility. Otro alcance.

---

## 3. Instagram

Hoy el sitio solo muestra `VITE_INSTAGRAM_URL`. Los DM no pasan por AuraDev.

1. Perfil **Profesional** (negocio).
2. Meta Business Suite → respuestas automáticas (bienvenida en DM).
3. ManyChat: mismo flujo que WhatsApp (recomendado si ya lo usás para WA).
4. Variable `VITE_INSTAGRAM_URL` en Vercel + **redeploy** (las `VITE_*` se embeben en el build).

Messaging API de Instagram (misma app Meta) es el equivalente al webhook de WhatsApp: más trabajo, mismas reglas de Meta.
