# AuraDev 🚀

<p align="center">
  <img src="docs/preview.png" alt="AuraDev - preview del sitio" width="800" />
</p>

Sitio web oficial del estudio **AuraDev** — Especialistas en desarrollo digital a medida. Esta plataforma es un monorepo moderno que integra un frontend de alta performance con un backend robusto y escalable.

**Demo en vivo:** [auradev-eta.vercel.app](https://auradev-eta.vercel.app)

---

## 💎 Características Principales (UX/UI Wow)

- **Performance Extrema:** Optimización de assets con WebP/AVIF y control inteligente de carga de videos.
- **Interacciones Fluidas:** Micro-animaciones con `Framer Motion` para una sensación de software de alta gama.
- **Skeleton Screens:** Pantallas de carga elegantes que eliminan saltos visuales.
- **Contacto Infalible:** Sistema de tres capas (PostgreSQL + Notificaciones Slack + Backup en disco).
- **Diseño Inmersivo:** Hero con video dinámico y secciones con efectos de revelado progresivo.

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React 18, Vite 6, TypeScript, Framer Motion, Zod |
| **Backend** | Node.js (Express), TypeScript, Drizzle ORM, Zod |
| **Base de Datos** | PostgreSQL (Neon - Serverless) |
| **Seguridad** | Helmet, CORS dinámico, Rate Limiting, Honeypot Anti-spam |
| **Comunicaciones** | Nodemailer (SMTP), Slack Webhooks |
| **Deploy** | Vercel (Edge functions ready) |

---

## 📂 Estructura del Repositorio

```
AuraDev/
├── frontend/                 # React + Vite (TypeScript)
│   ├── src/
│   │   ├── components/       # Componentes interactivos y Skeletons
│   │   ├── config/           # Configuraciones de servicios y contacto
│   │   └── data/             # Proyectos y lógica de negocio
├── backend/                  # API Express (TypeScript)
│   ├── src/
│   │   ├── db/               # Esquema de Drizzle y cliente DB
│   │   ├── handlers/         # Lógica de endpoints (Zod validation)
│   │   └── utils/            # Logger y helpers de sistema
├── logs/                     # Respaldo automático de contactos (Git ignored)
└── vercel.json               # Configuración de deploy monorepo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 20+
- Cuenta en [Neon.tech](https://neon.tech)
- Slack Webhook (opcional para notificaciones)

### Pasos iniciales
1. Clonar y preparar:
   ```bash
   git clone https://github.com/CrisNeyra/auradev.git
   cd auradev
   npm run install:all
   ```

2. Configurar entorno:
   - Copiar `.env.example` a `.env` tanto en `frontend/` como en `backend/`.
   - Completar las variables necesarias (DATABASE_URL, WEBHOOK_URL).

### Desarrollo
Para levantar el entorno completo (Frontend + Backend) simultáneamente:
```bash
npm run dev
```

---

## ⚙️ Configuración Senior

### 1. Notificaciones Slack/Discord
Para recibir alertas en tiempo real, configura la variable `WEBHOOK_URL` en tu `.env`:
1. Crea una App en Slack (opción "Blank App").
2. Activa "Incoming Webhooks".
3. Genera una URL y pégala en el `.env`.

### 2. Auto-respuesta al Cliente
Para habilitar el envío automático de emails de agradecimiento a los clientes:
- Asegúrate de configurar las variables `SMTP_*` en el `.env`.
- Cambia `ENABLE_AUTO_REPLY=true`.

---

## 📈 Roadmap de Calidad Senior

- [x] Migración total a **TypeScript** para seguridad de tipos.
- [x] Implementación de **Zod** en ambos extremos para validación robusta.
- [x] Integración de **Drizzle ORM** para una gestión de datos profesional.
- [x] Sistema de **Backup en disco** para tolerancia a fallos.
- [x] Optimización automática de imágenes en el pipeline de build.
- [x] Notificaciones en tiempo real vía **Slack**.

---

## ✉️ Contacto
Estudio AuraDev — Transformamos ideas en código.
[Visita nuestra web](https://auradev-eta.vercel.app/#contacto)

---
© 2026 AuraDev — Innovación. Experiencia. Código.
