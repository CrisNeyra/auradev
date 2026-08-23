# Auditoría AuraDev

**Fecha:** 2026-08-23  
**Demo:** [auradevdev.vercel.app](https://auradevdev.vercel.app)

Perspectivas: engineering, testing/QA, reclutador fullstack, senior.

## Calificación

| Rol | Nota | Por qué |
|-----|------|---------|
| Engineering | 8/10 | Handler único Express/Vercel, Zod, Pino, CORS, Drizzle, `loadEnv` |
| Testing/QA | 8/10 | Vitest + Playwright en CI; no hay E2E de SMTP real |
| Reclutador fullstack | 8.5/10 | Estudio creíble (form, notifs, docs, deploy). No es un SaaS con auth |
| Senior | 8/10 | Mezcla jsx/tsx y handler de contacto largo; suficiente para mid |

## Tabla QA

| Área | Estado | Notas |
|------|--------|-------|
| Contacto | OK | Zod + honeypot + tests |
| Env runtime | OK | [`backend/src/env.ts`](../backend/src/env.ts): pares y placeholders |
| Rate limit | OK | Upstash o memoria |
| Backup | OK | Logs si no hay DB |
| A11y | OK | Skip link, contraste, modal |
| Modal vs navbar | OK | Padding 100px + 16px (1080p) |
| Cards modal | OK | Misma altura en el grid |
| Cerrar modal | OK | 52px (TV / 1080p) |
| E2E | OK | Playwright en CI |
| SMTP auto-reply | Manual | Vars en Vercel. [auto-respuesta.md](auto-respuesta.md) |
| WhatsApp plantilla | Manual | Meta Approved → equipo, no cliente |
| Teléfono en form | Descartado | No se pide WA al visitante desde el form |

## ¿Qué pasa si llega un dato inesperado?

Zod en cliente y servidor → **400**. Honeypot → **201** silencioso. DB caída → **201** + backup. Rate limit → **429**. Env inválido (par incompleto, placeholder, URL rara) → **no arranca** / cold start falla.

## ¿Hay algo que comprometa la seguridad?

Bien: Helmet, CORS allowlist, honeypot, rate limit, escape en mails, `loadEnv`. Riesgo residual: tokens en Vercel, spam del auto-reply (acotado por rate limit), `WEBHOOK_URL` mal puesto, backup local con PII.

## ¿Podría otra persona explicar este código?

Sí a nivel repo (README, ARCHITECTURE, JSDoc). Más denso: Meta/SMTP dentro de `handleContacto` y dual runtime.

## Backlog

**Hecho en código:** env Zod, cards iguales, botón cerrar, gap navbar.

**Pendiente de tu cuenta (no es código):** SMTP + `ENABLE_AUTO_REPLY` en Vercel; plantilla WhatsApp Meta Approved.

**Descartado:** teléfono en el formulario.

## Próximas mejoras (prioridad)

1. SMTP Gmail (App Password) + `ENABLE_AUTO_REPLY=true` en Vercel y redeploy.
2. Plantilla `auradev_nuevo_contacto` Approved en Meta.
3. Unificar el frontend a TypeScript (sacar jsx sueltos).
4. Extraer WhatsApp/Telegram del handler a módulos.
5. WhatsApp Business / ManyChat para mensajes **inbound** (el cliente escribe primero).
6. (Opcional) campo teléfono + plantilla al cliente, si el producto lo pide.
