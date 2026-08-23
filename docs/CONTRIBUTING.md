# Contribuir

Repo de portafolio del estudio AuraDev. Cambios pequeños y revisables; el README y los docs de `docs/` deben seguir al código si cambia el flujo de contacto o el deploy.

## Setup

Requisitos: Node 20+ (CI usa 20), npm.

```bash
git clone https://github.com/CrisNeyra/auradev.git
cd auradev
npm run install:all
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Completar `DATABASE_URL` (Neon u otro Postgres) si querés persistir mensajes. SMTP, Telegram y WhatsApp son opcionales en local.

```bash
npm run db:migrate   # si hay DATABASE_URL
npm run dev
```

Frontend: `http://localhost:5173`. API: `http://localhost:4000/api/health`.

## Flujo de trabajo

1. Rama desde `main` con un nombre descriptivo.
2. Un tema por PR (tipado, docs, feature).
3. No commitear `.env`, tokens ni dumps.
4. Español en UI y en comentarios de producto; código en inglés donde ya está (nombres de funciones).

## Checks locales (mismo criterio que CI)

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) en `push`/`PR` a `main`:

```bash
npm --prefix frontend run lint
npm test
npm run typecheck
npm run test:e2e
```

Rate limit en producción (opcional): `npm run verify:rate-limit`.

## Dónde tocar qué

| Área | Empieza en |
|------|------------|
| Formulario / copy del sitio | `frontend/src/` |
| Validación y notificaciones | `backend/src/handlers/contacto.ts` |
| Schema SQL | `backend/src/db/schema.ts` + `db:generate` |
| Serverless | `api/contacto.ts`, `api/health.ts` |
| CORS / rate limit | `backend/src/cors.ts`, `backend/src/rateLimit.ts` |

Arquitectura: [ARCHITECTURE.md](ARCHITECTURE.md). Deploy: [vercel-checklist.md](vercel-checklist.md).

## PRs

Describir el *por qué*, cómo probarlo, y capturas si cambia UI. No hace falta force-push a `main`.
