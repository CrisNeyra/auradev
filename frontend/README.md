# Frontend (AuraDev)

SPA del estudio: React 18 + Vite 6. En producción se sirve como estático desde Vercel; el formulario llama a `/api/contacto` en el mismo origen.

Demo: [auradevdev.vercel.app](https://auradevdev.vercel.app)

## Scripts

```bash
npm --prefix frontend run dev        # Vite, puerto 5173
npm --prefix frontend run build
npm --prefix frontend run preview
npm --prefix frontend run lint
npm --prefix frontend run typecheck
npm --prefix frontend run test
```

Desde la raíz del monorepo: `npm run dev` (frontend + backend) o `npm run dev:frontend`.

## Variables

Copiar [`.env.example`](.env.example) → `.env`.

| Variable | Uso |
|----------|-----|
| `VITE_API_URL` | Solo local: `http://localhost:4000`. En el build de producción se ignora (mismo origin `/api/contacto`). |
| `VITE_EMAIL` | Email mostrado en contacto/footer |
| `VITE_WHATSAPP_*` | Número, display y mensaje precargado |
| `VITE_LINKEDIN_URL` / `VITE_INSTAGRAM_URL` | Solo se muestran si son `http(s)` |

Las `VITE_*` se embeben en el build: hay que redeployar si cambian.

## Rutas

Definidas en [`src/App.tsx`](src/App.tsx). En Vercel, `/proyectos/*` y `/whatsapp` reescriben a `index.html`.

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `pages/Home.tsx` | Landing: navbar + secciones + footer |
| `/whatsapp` | `pages/WhatsAppBridge.tsx` | Intersticial antes de `wa.me` |
| `/proyectos/:slug` | `pages/ProyectoDetalle.tsx` | Caso del portafolio |

Hashes en home (`/#contacto`, etc.) los resuelve `ScrollToHash`.

## Páginas y secciones (Home)

| Componente | Rol |
|------------|-----|
| `Navbar` | Anclas y menú móvil |
| `Hero` | Video (desktop); respeta reduced-motion y no reproduce video en móvil |
| `Servicios` | Cards + `ServicioModal` + Lottie |
| `Portafolio` | Grilla de 6 proyectos |
| `QuienesSomos` / `TrabajaConNosotros` | Copy institucional |
| `Contacto` | Zod + honeypot + POST `/api/contacto` |
| `Footer` / `WhatsAppFloat` | Contacto y CTA flotante |

Datos: [`src/data/proyectos.ts`](src/data/proyectos.ts), [`src/config/servicios.js`](src/config/servicios.js), [`src/config/contacto.ts`](src/config/contacto.ts).

## Tests

Vitest + Testing Library (`src/components/*.test.tsx`, `App.test.tsx`). E2E Playwright desde la raíz (`npm run test:e2e`).
