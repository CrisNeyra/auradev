# Backend (AuraDev API)

API TypeScript: **Express** en local y **handlers Vercel** (`api/*.ts`) en producción. El flujo de contacto es compartido: [`src/handlers/contacto.ts`](src/handlers/contacto.ts).

## Scripts

```bash
npm --prefix backend run dev          # tsx watch, puerto 4000
npm --prefix backend run start
npm --prefix backend run typecheck
npm --prefix backend run test
npm --prefix backend run db:migrate   # drizzle-kit migrate
npm --prefix backend run db:push      # schema push (dev)
npm --prefix backend run db:generate
```

Variables: copiar [`.env.example`](.env.example) → `.env`. Detalle de PostgreSQL: [docs/DATABASE.md](../docs/DATABASE.md).

## Endpoints (Express local)

Base: `http://localhost:4000`

| Método | Ruta | Respuesta |
|--------|------|-----------|
| `GET` | `/api/health` | `{ status, servicio, metrics, rateLimit }` (`upstash` o `memory`) |
| `POST` | `/api/contacto` | Ver abajo |
| `OPTIONS` | (CORS) | En Vercel lo cubre `api/contacto.ts` |

Cualquier otra ruta: `404` `{ error: "Ruta no encontrada." }`.

### `POST /api/contacto`

Body JSON (Zod): `nombre` (1–200), `email` válido, `mensaje` (10–5000), `website` opcional (honeypot).

| Status | Cuerpo | Cuándo |
|--------|--------|--------|
| `201` | `{ ok: true, id?, creado_en? }` | Aceptado (honeypot también 201 silencioso, sin persistir) |
| `400` | `{ error }` | Validación |
| `429` | `{ error }` | Rate limit (~5 / 10 min por IP) |
| `405` | `{ error }` | Método distinto de POST (solo serverless) |

Headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Flujo de un contacto

1. Rate limit (Upstash si hay credenciales; si no, memoria).
2. Validación Zod.
3. Honeypot `website` no vacío → 201 sin DB ni notifs.
4. Insert en `mensajes` si hay `DATABASE_URL`; si falla o no hay DB, backup en logs.
5. `runContactoNotifications` (`src/notifications/`): SMTP, auto-reply, webhook, WhatsApp, Telegram. En Vercel se extienden con `waitUntil`.

## Schema (resumen)

Tabla `mensajes`: `id`, `nombre`, `email`, `mensaje`, `creado_en`. Ver [docs/DATABASE.md](../docs/DATABASE.md).

## Seguridad

Helmet (Express), CORS por allowlist (`CORS_ORIGIN` + URLs de Vercel + localhost en dev), honeypot, rate limit, Zod en servidor.
