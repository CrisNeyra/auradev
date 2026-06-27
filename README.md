# AuraDev

Sitio web del estudio **AuraDev** — desarrollo digital a medida. Incluye landing page con portafolio, formulario de contacto y backend con base de datos Firebird.

**Demo en vivo:** [auradev-eta.vercel.app](https://auradev-eta.vercel.app)

## Secciones

| Sección | Contenido |
|---------|-----------|
| **Inicio** | Hero con video de fondo, estadísticas y CTAs |
| **Servicios** | 6 servicios con iconos SVG y fondo multimedia |
| **Portafolio** | 6 proyectos con imagen, descripción y enlace a detalle o sitio en vivo |
| **Quiénes Somos** | Historia, valores y perfiles de socios |
| **Contacto** | Formulario conectado al backend + datos de contacto |

Paleta: blanco, negro, amarillo y rojo.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, Vite 6, React Router |
| Backend | Node.js, Express |
| Base de datos | Firebird 3 (local) |
| Email | Nodemailer (SMTP opcional) |
| Deploy | Vercel (frontend estático + funciones serverless) |

## Estructura del repositorio

```
AuraDev/
├── frontend/                 # React + Vite
│   └── src/
│       ├── components/       # Secciones del sitio
│       ├── pages/            # Home y detalle de proyecto
│       ├── data/             # Proyectos del portafolio
│       ├── config/           # Email, WhatsApp, redes
│       └── img/              # Assets multimedia
├── backend/                  # API Express + Firebird
│   ├── src/
│   └── scripts/migrate.js
├── api/                      # Funciones serverless (Vercel)
└── vercel.json
```

## Requisitos

- Node.js 18+
- Firebird 3.0+ (solo para desarrollo local con formulario)

## Instalación

```bash
git clone https://github.com/CrisNeyra/auradev.git
cd auradev
npm run install:all
```

### Backend (local)

```bash
cd backend
Copy-Item .env.example .env   # Windows PowerShell
npm run db:migrate
```

Variables en `backend/.env`:

- `FB_HOST`, `FB_PORT`, `FB_DATABASE`, `FB_USER`, `FB_PASSWORD`
- `SMTP_*`, `MAIL_FROM`, `MAIL_TO` (opcional)
- `CORS_ORIGIN` (por defecto `http://localhost:5173`)

### Frontend

```bash
cd frontend
Copy-Item .env.example .env
```

Variable `VITE_API_URL` → URL del backend (`http://localhost:4000` en local).

### Levantar todo

Desde la raíz del proyecto:

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:4000](http://localhost:4000)

Build de producción:

```bash
npm run build
```

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servicio |
| POST | `/api/contacto` | Recibe `{ nombre, email, mensaje }` |

El formulario valida campos, guarda en Firebird y envía email si SMTP está configurado. Responde `201` en éxito.

## Personalización

| Qué cambiar | Archivo |
|-------------|---------|
| Email, WhatsApp, redes | [`frontend/src/config/contacto.js`](frontend/src/config/contacto.js) |
| Proyectos del portafolio | [`frontend/src/data/proyectos.js`](frontend/src/data/proyectos.js) |
| Imágenes de proyectos | `frontend/src/img/portafolio/` |
| Fotos de socios | `frontend/src/img/socios/` (`ezequiel.jpg`, `cristian.jpg`) |
| Servicios | [`frontend/src/components/Servicios.jsx`](frontend/src/components/Servicios.jsx) |
| Colores globales | [`frontend/src/styles/index.css`](frontend/src/styles/index.css) |

### Imágenes del portafolio

Colocar en `frontend/src/img/portafolio/`:

| Archivo | Proyecto |
|---------|----------|
| `portfolio-cristian.jpg` | Portfolio Cristian |
| `aura-pro.jpg` | Aura PRO |
| `mobile-suite.jpg` | Mobile Suite |
| `modo-zen.jpg` | Modo Zen |
| `crowforza.jpg` | Crowforza |
| `laxmar.jpg` | Laxmar |

Para links externos, editar `tipoLink: 'externo'` y `url` en `proyectos.js`.

## Producción (Vercel)

| Entorno | Frontend | Formulario |
|---------|----------|------------|
| **Local** | OK | OK (con Firebird configurado) |
| **Vercel** | OK | Responde **503** hasta conectar Firebird remoto o habilitar solo email |

### Opción A — Firebird en VPS

1. Instalar Firebird 3 en un servidor accesible desde Vercel.
2. Correr `npm run db:migrate` en el servidor.
3. Configurar variables `FB_*` y `SMTP_*` en Vercel → Settings → Environment Variables.
4. Redeploy.

### Opción B — Solo email en producción

1. Configurar SMTP (Resend, SendGrid, Gmail, etc.) en Vercel.
2. Adaptar `api/contacto.js` para enviar email sin Firebird cuando no haya base remota.
3. Mantener Firebird solo en local.

## Contacto AuraDev

- **Email:** cristian.neyra.dev@gmail.com
- **WhatsApp:** +54 011 782111489

---

© AuraDev — Estudio de Desarrollo Digital
