# Auditoría AuraDev

**Fecha:** 2026-08-10  
**Demo:** [auradevdev.vercel.app](https://auradevdev.vercel.app)

## Nota orientativa

| Perspectiva | Nota |
|-------------|------|
| Portfolio fullstack | ~9/10 |
| Producto clientes exigentes | ~8.5/10 (plantilla WA Meta pendiente de aprobación) |

## Tabla QA

| Área | Estado | Notas |
|------|--------|-------|
| Contacto | OK | Zod + honeypot + tests |
| Rate limit | OK código + Upstash en Vercel | Verificar con `npm run verify:rate-limit` |
| Backup | OK serverless | JSON en Runtime Logs (no disco en Vercel) |
| A11y servicios/modal | OK | Tab + Escape + tests E2E |
| Modal móvil ~375 | OK | Banda imagen + scroll |
| Hero video | OK | Sin autoPlay residual; poster en móvil/reduced-motion |
| Observabilidad | Mejor | Logs JSON notif.ok/fail + `/api/health` metrics |
| Drizzle | Mejor | `drizzle.config.ts` + `drizzle/0000_init.sql` |
| E2E | OK | Playwright smoke en CI |
| Redes | LinkedIn + Instagram | Vars `VITE_LINKEDIN_URL` / `VITE_INSTAGRAM_URL` |
| WhatsApp 24/7 | Pendiente Meta | Plantilla en revisión / Approved |
