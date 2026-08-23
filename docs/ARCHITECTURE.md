# Arquitectura AuraDev

Monorepo: sitio estático + API de contacto. Un deploy en Vercel; en local, Vite (5173) y Express (4000).

## Vista general

```mermaid
flowchart LR
  browser[Browser]
  vite[Vite_SPA]
  express[Express_local]
  vercelApi[Vercel_api_ts]
  handler[handleContacto]
  neon[PostgreSQL_Neon]
  notifs[SMTP_WhatsApp_Telegram_Webhook]

  browser --> vite
  vite -->|"POST /api/contacto"| express
  vite -->|"mismo origin prod"| vercelApi
  express --> handler
  vercelApi --> handler
  handler --> neon
  handler --> notifs
```

## Layout del repo

| Path | Rol |
|------|-----|
| `frontend/` | React + Vite |
| `backend/` | Express, Drizzle, handler compartido |
| `backend/src/notifications/` | Email, WhatsApp, Telegram y webhook (fuera del handler) |
| `api/` | Entrypoints serverless (`contacto`, `health`) |
| `docs/` | Arquitectura, DB, Vercel, WhatsApp |
| `scripts/` | Puertos, verify rate-limit |

## Decisiones

| Decisión | Por qué |
|----------|---------|
| Handler único `handleContacto` | Misma lógica en Express y Vercel; tests contra un solo módulo |
| Tipos `HttpRequestLike` / `HttpResponseLike` | Express y Node serverless no comparten `Request` de Express |
| Drizzle + Neon | Postgres serverless, migraciones en `backend/drizzle/` |
| Zod en cliente y servidor | UX inmediata + no confiar en el browser |
| `waitUntil` en Vercel | No cortar SMTP/WhatsApp al devolver 201 |
| Upstash + fallback memoria | Rate limit real en prod; local sin Redis |
| WhatsApp Cloud API + plantilla | Texto libre solo en ventana 24 h de Meta |
| CORS reflectivo, nunca `*` | Orígenes de env + `VERCEL_URL` |

## Request de contacto (producción)

```mermaid
sequenceDiagram
  participant UI as Contacto_SPA
  participant Fn as api_contacto
  participant H as handleContacto
  participant RL as Upstash_or_memory
  participant DB as Neon
  participant N as Notificaciones

  UI->>Fn: POST JSON
  Fn->>Fn: CORS y metodo
  Fn->>H: handleContacto plus waitUntil
  H->>RL: checkRateLimit
  alt limitado
    H-->>UI: 429
  else ok
    H->>H: Zod y honeypot
    H->>DB: insert mensajes
    H-->>UI: 201
    H->>N: runContactoNotifications
  end
```

## Observabilidad

- Logs JSON en Vercel (`logError`, `logNotifResult`, `logContactoBackup`).
- Contadores en memoria por instancia (`getMetricsSnapshot` en health local).
- Backup de contacto si no hay DB o el insert falla.

## Relacionado

- [DATABASE.md](DATABASE.md)
- [vercel-checklist.md](vercel-checklist.md)
- [whatsapp-template.md](whatsapp-template.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
