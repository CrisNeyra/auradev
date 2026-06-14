# AuraDev

Sitio web minimalista para **AuraDev**, un estudio de desarrollo digital. Incluye un frontend en **React + Vite** y un backend en **Node.js + Express** con **Firebird** que recibe los mensajes del formulario de contacto (los guarda en la base de datos y envía una notificación por email con Nodemailer).

## Secciones del sitio

- **Inicio** (Hero Section)
- **Nuestros Servicios** (software a medida, apps, automatizaciones, CRM, integraciones, soporte)
- **Portafolio** (proyectos)
- **Quiénes Somos**
- **Contacto** (formulario conectado al backend)

Paleta de colores: blanco, negro, amarillo y rojo.

## Estructura

```
AuraDev/
├── frontend/        # React + Vite (interfaz del sitio)
│   └── src/
│       ├── components/   # Una sección por componente
│       └── styles/
└── backend/         # API Express + Firebird + Nodemailer
    ├── src/
    └── schema.sql
```

## Requisitos

- Node.js 18 o superior
- Firebird 3.0 o superior

## Puesta en marcha

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # En Windows (PowerShell): Copy-Item .env.example .env
```

Editá `backend/.env` con tus datos:

- `FB_HOST`, `FB_PORT`, `FB_DATABASE`, `FB_USER`, `FB_PASSWORD`: credenciales de conexión a tu base Firebird.
- `SMTP_*`, `MAIL_FROM`, `MAIL_TO`: credenciales SMTP para enviar las notificaciones.
- `CORS_ORIGIN`: URL del frontend (por defecto `http://localhost:5173`).

Creá la tabla en tu base de datos (puedes usar el script de migración si la base ya existe):

```bash
npm run db:migrate
```

Levantá el servidor:

```bash
npm run dev      # con recarga automática (nodemon)
# o
npm start        # producción
```

La API queda disponible en `http://localhost:4000`.

> Nota: si no configurás SMTP, el mensaje igual se guarda en la base de datos y simplemente se omite el envío de email (queda registrado en consola).

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # En Windows (PowerShell): Copy-Item .env.example .env
npm run dev
```

El sitio queda disponible en `http://localhost:5173`. La variable `VITE_API_URL` debe apuntar a la URL del backend.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## API

| Método | Ruta            | Descripción                                  |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/api/health`   | Estado del servicio.                         |
| POST   | `/api/contacto` | Recibe `{ nombre, email, mensaje }`.         |

`POST /api/contacto` valida los campos, guarda el mensaje en la tabla `mensajes` y envía una notificación por email. Responde `201` en caso de éxito.

## Personalización

- **Servicios:** editá el arreglo `servicios` en `frontend/src/components/Servicios.jsx`.
- **Proyectos:** editá el arreglo `proyectos` en `frontend/src/components/Portafolio.jsx`.
- **Equipo / socios:** editá `frontend/src/components/QuienesSomos.jsx`.
- **Datos de contacto (email, WhatsApp, redes):** editá `Contacto.jsx` y `Footer.jsx`.
- **Colores:** variables CSS en `frontend/src/styles/index.css` (`--blanco`, `--negro`, `--amarillo`, `--rojo`).
