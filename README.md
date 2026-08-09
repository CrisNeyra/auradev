# AuraDev

<p align="center">
  <img src="docs/screenshots/preview.png" alt="AuraDev - sitio corporativo" width="800" />
</p>

Sitio web del estudio **AuraDev**: presencia corporativa, portafolio de 6 proyectos y formulario de contacto con persistencia en PostgreSQL y alertas al equipo (email, Slack, Telegram, WhatsApp).

**Demo en vivo:** [auradev-eta.vercel.app](https://auradev-eta.vercel.app)

---

## Problema que resuelve

AuraDev necesita un sitio que presente servicios y proyectos reales, y un canal de contacto que no dependa solo del email manual: cada mensaje se valida, guarda en base de datos y notifica al equipo por varios canales.

## Por qué este stack

| Decisión | Razón |
|----------|--------|
| **React + Vite** | Build rápido, SPA con rutas para detalle de proyectos y bridge WhatsApp |
| **Express + TypeScript (API)** | Handler de contacto tipado, fácil de testear y desplegar en Vercel |
| **Drizzle + Neon** | PostgreSQL serverless, esquema versionado sin SQL manual disperso |
| **Zod (front y back)** | Misma validación en cliente y servidor, mensajes de error coherentes |
| **Vercel monorepo** | Frontend estático + `api/*.ts` en un solo deploy |

## Desafíos técnicos

- **Notificaciones en serverless:** las alertas no pueden perderse al cerrar la función; se usa `waitUntil` en Vercel.
- **Rate limit distribuido:** límite en memoria no alcanza en serverless; Upstash Redis cuando está configurado.
- **WhatsApp Cloud API:** texto libre solo dentro de ventana 24h; producción requiere plantilla Meta aprobada (`auradev_nuevo_contacto`).
- **Accesibilidad:** cards de servicios operables por teclado, modal con focus trap y soporte de `prefers-reduced-motion`.

---

## Capturas

| Hero / preview | Servicios |
|:---:|:---:|
| ![Preview](docs/screenshots/preview.png) | ![Servicios](docs/screenshots/servicios.png) |

| Portafolio | Contacto |
|:---:|:---:|
| ![Portafolio](docs/screenshots/portafolio.png) | ![Contacto](docs/screenshots/contacto.png) |

Más detalle en [docs/screenshots/README.md](docs/screenshots/README.md).

---

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, Vite 6, TypeScript en componentes críticos |
| API | Node.js, Express, TypeScript, Zod |
| Base de datos | PostgreSQL (Neon) con Drizzle ORM |
| Seguridad | Helmet, CORS, honeypot, rate limit (Upstash o memoria en local) |
| Comunicaciones | SMTP, Slack webhook, Telegram Bot API, WhatsApp Cloud API |
| Deploy | Vercel |

---

## Estructura

```
AuraDev/
├── frontend/          # React + Vite
├── backend/           # Express + handlers TypeScript
├── api/               # Entradas serverless Vercel
├── docs/              # Preview, screenshots y guías
└── vercel.json
```

---

## Instalación local

### Requisitos

- Node.js 20+
- PostgreSQL (recomendado: [Neon](https://neon.tech))

### Pasos

```bash
git clone https://github.com/CrisNeyra/auradev.git
cd auradev
npm run install:all
```

Copiar variables de entorno:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Completar al menos `DATABASE_URL` en `backend/.env` para guardar contactos.

### Desarrollo

```bash
npm run dev
```

- Frontend: `http://localhost:5173` (o 5174 si 5173 está ocupado)
- Backend: `http://localhost:4000`

El script `dev` libera puertos 4000/5173/5174 antes de arrancar. Si ves `EADDRINUSE`, ejecutá:

```bash
npm run dev:clean
npm run dev
```

### Base de datos

Con `DATABASE_URL` configurado:

```bash
npm run db:migrate
```

Equivale a `drizzle-kit push` contra el esquema en `backend/src/db/schema.ts`.

### Tests y typecheck

```bash
npm test
npm run typecheck
```

---

## Deploy en Vercel

Checklist de variables de entorno: [docs/vercel-checklist.md](docs/vercel-checklist.md)

- Upstash (`UPSTASH_REDIS_REST_*`) para rate limit en producción
- `VITE_REDES_URL` / `VITE_REDES_HANDLE` para link a [perfil Vercel](https://vercel.com/crisneyra13-projects)
- WhatsApp plantilla: [docs/whatsapp-template.md](docs/whatsapp-template.md)

---

## Configuración de notificaciones

Detalle en `backend/.env.example`:

- **SMTP** — email al equipo y auto-respuesta al cliente (`ENABLE_AUTO_REPLY`)
- **WEBHOOK_URL** — Slack o Discord
- **TELEGRAM_BOT_TOKEN** + **TELEGRAM_CHAT_ID** — Bot API (recomendado)
- **WHATSAPP_*** — Cloud API Meta; plantilla `auradev_nuevo_contacto` para 24/7

Variables del frontend (`VITE_*`) en `frontend/.env.example`.

---

## Portafolio

6 proyectos con demo o repositorio enlazado. Cada detalle incluye problema, stack elegido y desafío técnico.

---

## Contacto

[Formulario en la web](https://auradev-eta.vercel.app/#contacto) · hola@auradev.com · [Vercel Projects](https://vercel.com/crisneyra13-projects)

---

© AuraDev
