# Checklist manual — Vercel (AuraDev)

Pasos en el dashboard de [Vercel](https://vercel.com) → proyecto **auradev** / **auradev-eta** → **Settings** → **Environment Variables**.

Marcar **Production**, **Preview** y **Development** en cada variable. Después de cada bloque: **Deployments** → último deploy → **Redeploy**.

---

## 1. Upstash (rate limit distribuido)

1. Crear Redis en [console.upstash.com](https://console.upstash.com/) (plan gratis).
2. Copiar de la pestaña **REST API**:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Pegar en Vercel:

| Variable | Descripción |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | URL REST del Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST |

4. Redeploy.
5. **Probar:** enviar 6 formularios de contacto en 10 min desde la misma red → el 6º debe responder **429**.

Sin estas variables, el API usa rate limit en memoria (débil en serverless).

---

## 2. Redes — perfil Vercel (frontend)

| Variable | Valor |
|----------|--------|
| `VITE_REDES_URL` | `https://vercel.com/crisneyra13-projects` |
| `VITE_REDES_HANDLE` | `Vercel Projects` |

Redeploy (las `VITE_*` se embeben en el build).

**Verificar:** sección Contacto → link "Vercel Projects" abre el perfil.

---

## 3. WhatsApp plantilla 24/7 (cuando Meta apruebe)

Ver [whatsapp-template.md](whatsapp-template.md).

| Variable | Valor |
|----------|--------|
| `WHATSAPP_TEMPLATE_NAME` | `auradev_nuevo_contacto` |
| `WHATSAPP_TEMPLATE_LANG` | `es` |

Asegurarse de tener también: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO`.

Redeploy y probar formulario en producción. En logs: `template: auradev_nuevo_contacto`.

---

## Variables ya existentes (revisar)

Backend / API (serverless):

- `DATABASE_URL`
- `SMTP_*`, `MAIL_FROM`, `MAIL_TO`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- `WEBHOOK_URL` (opcional)
- `WHATSAPP_*`

Frontend (build time):

- `VITE_WHATSAPP_NUMERO`, `VITE_WHATSAPP_DISPLAY`
- `VITE_EMAIL`
