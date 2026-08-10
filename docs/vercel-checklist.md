# Checklist manual — Vercel (AuraDev)

Proyecto: **auradev** · Demo: [auradevdev.vercel.app](https://auradevdev.vercel.app)

**Settings** → **Environment Variables**. Marcar Production / Preview / Development. Luego **Deployments** → **Redeploy**.

---

## 1. Upstash (rate limit)

| Variable | Descripción |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | URL REST Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST |

Probar: `npm run verify:rate-limit` o 6 envíos al form → 6º = **429**.

---

## 2. Redes (frontend build)

| Variable | Ejemplo |
|----------|---------|
| `VITE_LINKEDIN_URL` | `https://www.linkedin.com/in/tu-perfil` |
| `VITE_INSTAGRAM_URL` | `https://www.instagram.com/auradev` |

Redeploy obligatorio (vars `VITE_*` se embeben en build).

---

## 3. WhatsApp plantilla 24/7

| Variable | Valor |
|----------|--------|
| `WHATSAPP_TEMPLATE_NAME` | `auradev_nuevo_contacto` |
| `WHATSAPP_TEMPLATE_LANG` | `es` |

Ver [whatsapp-template.md](whatsapp-template.md).

---

## Variables backend frecuentes

`DATABASE_URL`, `SMTP_*`, `MAIL_*`, `TELEGRAM_*`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO`
