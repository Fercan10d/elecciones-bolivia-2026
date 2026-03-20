# Elecciones Subnacionales Bolivia 2026 — e/POST

## Qué es
App web de resultados electorales subnacionales de Bolivia (22 de marzo de 2026) para el medio digital e/POST. Muestra resultados de 9 gobernadores y 10 alcaldes (9 capitales + El Alto) con un tablero único SIREPRE (resultados preliminares con conteo rápido).

## Stack
- **Next.js 16** (App Router, Server Components, Server Actions)
- **Supabase** (Postgres, Auth, Realtime) — proyecto: ncyvakdsmpuhphzipwsw
- **Tailwind CSS v4** con variables CSS custom en `app/globals.css`
- **TypeScript**
- Deploy en **Vercel** con auto-deploy desde GitHub (rama master)
- Dominio: elecciones.elpost.com.bo

## Decisiones técnicas importantes
- Las fuentes (Montserrat) se cargan con `<link>` en layout.tsx, NO con `next/font/google` (falla con error http2 en este entorno)
- Gráficos de barras son CSS puro (no se usa librería de charts)
- Realtime funciona con suscripción a Supabase + `router.refresh()` (no state management)
- Las páginas públicas son `force-dynamic` para tener datos frescos
- Los porcentajes de candidatos se calculan sobre votos válidos (sin blancos ni nulos)
- Las imágenes remotas (fotos de candidatos) están permitidas desde cualquier host HTTPS

## Branding e/POST
- Primary: #3B6BE3
- Secondary: #1C3B7A
- Logo: texto "e/POST" en Montserrat semibold, blanco
- UI en español (Bolivia)

## Base de datos
- Tablas: departments, races, candidates, settings
- RLS: lectura pública, escritura solo autenticados
- Realtime habilitado en races y candidates
- Las migraciones están en `supabase/` (seed.sql + migration-v2, v3, v4)

## Rutas
- `/` — página pública con todos los resultados
- `/gobernadores/[id]` y `/alcaldes/[id]` — detalle de carrera
- `/login` — login para periodistas
- `/admin` — panel de administración (protegido por auth)
- `/admin/candidates/[raceId]` — gestión de candidatos
- `/admin/race/[id]` — carga de votos
