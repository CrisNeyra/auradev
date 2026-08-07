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
- **Contacto Infalible:** Sistema de capas (PostgreSQL + Email + Slack + Telegram + Backup en disco).
- **Diseño Inmersivo:** Hero con video dinámico, logo interactivo y secciones con revelado progresivo.

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React 18, Vite 6, TypeScript, Framer Motion, Zod |
| **Backend** | Node.js (Express), TypeScript, Drizzle ORM, Zod |
| **Base de Datos** | PostgreSQL (Neon - Serverless) |
| **Seguridad** | Helmet, CORS dinámico, Rate Limiting, Honeypot Anti-spam |
| **Comunicaciones** | Nodemailer (SMTP), Slack Webhooks, Telegram Bot API, WhatsApp Cloud API (Meta) |
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
- Slack Webhook (opcional)
- Telegram Bot (recomendado para alertas móviles)

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
- Usa una **Contraseña de aplicación** de Google (no tu clave normal de Gmail).
- Cambia `ENABLE_AUTO_REPLY=true`.

### 3. Telegram (recomendado — gratis, sin Telegram Business)

**No necesitás Telegram Business** para recibir notificaciones del formulario. Es solo para atención al cliente con inbox comercial.

#### Opción A — Bot API oficial (recomendada)
Todo desde la PC con [web.telegram.org](https://web.telegram.org):

1. Iniciá sesión en Telegram Web (QR con el celular una sola vez).
2. Buscá **@BotFather** → enviá `/newbot`.
3. Nombre: `AuraDev Notificaciones` → username tipo `auradev_notify_bot`.
4. Copiá el **token** → `TELEGRAM_BOT_TOKEN` en `backend/.env` y en Vercel.
5. Abrí el chat con tu bot y enviá `/start`.
6. En el navegador abrí: `https://api.telegram.org/bot<TOKEN>/getUpdates`
7. Copiá el valor de `chat.id` → `TELEGRAM_CHAT_ID`.

#### Opción B — CallMeBot (fallback)
1. En Telegram Web buscá **@CallMeBot_txtbot** → `/start`.
2. Copiá la API key → `TELEGRAM_API_KEY`.
3. Si falla (como suele pasar con WhatsApp), usá la Opción A.

Otras alternativas gratuitas: Discord webhook, Slack (ya soportado), [ntfy.sh](https://ntfy.sh).

### 4. WhatsApp Cloud API (Meta) — notificaciones del formulario

**No uses CallMeBot en WhatsApp:** es no oficial y Meta puede restringir tu cuenta.

#### Notificaciones (formulario → tu celular)
1. Entrá a [developers.facebook.com](https://developers.facebook.com/) (PC).
2. **Create App** → tipo **Business**.
3. Agregá el producto **WhatsApp** → abrí **API Setup**.
4. Copiá:
   - **Temporary access token** → `WHATSAPP_TOKEN`
   - **Phone number ID** (número de prueba de Meta) → `WHATSAPP_PHONE_NUMBER_ID`
5. En destinatarios de prueba agregá: `5491178211489`.
6. Desde el panel de Meta enviá el template `hello_world` a tu número (abre ventana de 24h).
7. En `backend/.env` y en Vercel:

```env
WHATSAPP_TOKEN=EAAB...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_TO=5491178211489
```

8. Reiniciá backend / Redeploy en Vercel.
9. Probá el formulario de contacto.

Para producción 24/7 (fuera de la ventana de 24h), creá un template aprobado tipo `auradev_nuevo_contacto` en WhatsApp Manager.

#### Botón flotante (visitante → chat AuraDev)
En `frontend/.env` (y Vercel):

```env
VITE_WHATSAPP_NUMERO=5491178211489
VITE_WHATSAPP_DISPLAY=+54 9 11 7821-1489
```

#### Foto AuraDev en la pantalla de wa.me
WhatsApp muestra la **foto de perfil** de tu cuenta. Subí `frontend/src/img/AuraDev.jpg` desde el celular (WhatsApp / WhatsApp Business → Perfil).

---

## 📈 Roadmap de Calidad Senior

- [x] Migración total a **TypeScript** para seguridad de tipos.
- [x] Implementación de **Zod** en ambos extremos para validación robusta.
- [x] Integración de **Drizzle ORM** para una gestión de datos profesional.
- [x] Sistema de **Backup en disco** para tolerancia a fallos.
- [x] Optimización automática de imágenes en el pipeline de build.
- [x] Notificaciones en tiempo real vía **Slack**.
- [x] Notificaciones **Telegram Bot API** + fallback CallMeBot.
- [x] Pulido UI para monitores grandes / escala 150% (logo, hero, modal).
- [x] WhatsApp **Cloud API (Meta)** + botón de chat con número real.
---

## ✉️ Contacto
Estudio AuraDev — Transformamos ideas en código.
[Visita nuestra web](https://auradev-eta.vercel.app/#contacto)

---
© 2026 AuraDev — Innovación. Experiencia. Código.
