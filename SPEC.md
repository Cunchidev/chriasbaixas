# Landing + herramientas para club de halterofilia

## Contexto
Un club de halterofilia quiere una landing moderna y "disruptiva". Además de presentar al club, la web debe ser útil para los halterófilos: consultar la **tabla de puntos élite de la FEDEHALTER**, calcular Sinclair y ver el **calendario de próximos eventos**. La carpeta del proyecto (`chriasbaixas`) está vacía; se empieza desde cero. Sin base de datos: todo son JSON ligeros versionados en el repo.

## Enfoque
Dos capas:
1. **Landing** (impacto visual, captar socios/patrocinadores).
2. **Calculadoras** (lo diferencial): tabla de puntos élite, Sinclair, discos, porcentajes y calendario.

## Decisiones por defecto (cambiables)
- **Stack:** Astro + islas React + Tailwind. Web estática; interactividad solo en las herramientas.
- **Hosting:** Cloudflare Pages (gratis, dominio propio). Alternativas equivalentes: Vercel/Netlify/GitHub Pages.
- **Datos:** solo JSON en `src/data/`, sin BBDD. Actualizar = editar el JSON y volver a desplegar.
- **Marca:** propuesta propia con placeholders (nombre, logo, fotos) en `src/config/club.ts`.

## Dirección visual "disruptiva"
- Estética brutalista-deportiva: fondo negro tiza, tipografía condensada enorme ("Anton"/"Bebas Neue" + "Inter"), acento rojo de disco IWF, textura de magnesio.
- Hero con barra olímpica que "carga discos" al hacer scroll (SVG + GSAP ScrollTrigger) y cifras grandes animadas.
- Cuenta atrás al próximo evento en el hero (sale de `events.json`).
- Secciones con cortes diagonales, hover reactivos, oscuro por defecto; respeta `prefers-reduced-motion`.

## Páginas
- `/` Landing: Hero · Quiénes somos · Entrenadores · Horarios/instalaciones · Próximos eventos · Patrocinadores · Contacto (mailto o Formspree).
- `/puntos` **Tabla de puntos élite FEDEHALTER**: tabla filtrable por sexo, categoría de peso y edad; buscador "mete tu total y peso → qué puntos/nivel alcanzas y cuántos kg te faltan para el siguiente".
- `/calendario` Próximos eventos (lista + destacado del siguiente), los pasados se ocultan automáticamente por fecha.
- `/lab` Herramientas: Calculadora Sinclair (+ Meltzer-Faber máster), calculadora de discos con colores IWF, tabla de porcentajes de 1RM.

## Datos (JSON ligeros)
- `src/data/elite-points.json`: transcripción de la tabla oficial de FEDEHALTER (fedehalter.es). Al implementar, localizar el documento vigente (probablemente PDF), pasarlo a JSON con su temporada y URL de origen, y **confirmar contigo que es la tabla correcta** antes de publicar. Se muestra la fuente y la fecha en la página.
- `src/data/events.json`: `[{ "date": "2026-11-15", "name": "...", "place": "...", "level": "nacional|autonómico|internacional", "url": "..." }]`.

## Lógica (`src/lib/weightlifting.ts`, funciones puras con tests)
- `sinclairCoef(bw, sex)`: si `bw < b` → `10^(A·(log10(bw/b))²)`, si no → 1. Coeficientes por ciclo en `src/lib/sinclair-coefficients.ts`; **verificar los del ciclo 2025–2028 en la IWF** (ref. 2021–2024: H A=0.722762521 b=193.609; M A=0.787004341 b=153.757).
- `weightCategory(bw, sex)` con categorías IWF vigentes (verificar las de 2025).
- `elitePointsFor(total, bw, sex, age)` contra `elite-points.json` + kg que faltan al siguiente nivel.
- `plateLoad(target, barKg)` voraz con discos 25/20/15/10/5/2.5/2/1.5/1/0.5 y collarines 2,5 kg.
- `upcomingEvents(events, today)`.

## Ficheros principales
- `astro.config.mjs`, `package.json`, `src/config/club.ts`
- `src/data/elite-points.json`, `src/data/events.json`
- `src/lib/weightlifting.ts`, `src/lib/sinclair-coefficients.ts`, `src/lib/weightlifting.test.ts` (Vitest)
- `src/pages/index.astro`, `puntos.astro`, `calendario.astro`, `lab.astro`
- `src/components/`: Hero, Countdown.tsx, ElitePointsTable.tsx, SinclairCalc.tsx, PlateCalc.tsx, PercentTable.tsx

## Fases
1. Scaffold Astro + Tailwind + identidad placeholder.
2. Librería `weightlifting.ts` + tests.
3. Buscar y transcribir la tabla FEDEHALTER a JSON (confirmar contigo) + `events.json` de ejemplo.
4. Páginas `/puntos`, `/calendario`, `/lab`.
5. Landing con animaciones.
6. Despliegue en Cloudflare Pages (requiere autorizar el conector Cloudflare vía `/mcp` o login con `wrangler`).

## Verificación
- `npm run test`: Sinclair con resultados IWF publicados, discos, categorías, búsqueda en la tabla élite.
- `npm run dev` y revisar en el navegador del panel en escritorio y móvil (375 px): filtros de la tabla, calculadoras, cuenta atrás.
- `npm run build` sin errores; Lighthouse ≥ 90.
