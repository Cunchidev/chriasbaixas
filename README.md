# Club Halterofilia Rías Baixas — web

Landing + herramientas (puntos élite RFEH, Sinclair, discos, porcentajes, calendario). Astro + React + Tailwind, 100 % estática, sin base de datos.

```bash
npm install
npm run dev      # http://localhost:4321
npm run test     # tests de la lógica (src/lib)
npm run build    # genera dist/
```

## Qué editar

| Qué | Dónde |
|---|---|
| Nombre, Instagram, nave (dirección y horario), federaciones | `src/config/club.ts` (campos `PENDIENTE`) |
| Logo | `src/components/Logo.astro` y `public/favicon.svg` |
| Próximos eventos (los pasados se ocultan solos en cada build) | `src/data/events.json` |
| Tabla de puntos élite (referencia de 100 puntos por categoría) | `src/data/elite-points.json` |
| Coeficientes Sinclair | `src/lib/sinclair-coefficients.ts` |

Puntos élite = total / total de 100 puntos de la categoría × 100, igual que las tablas oficiales de la RFEH (12-01-2026, vigentes desde el 1-8-2026).

## Despliegue (GitHub Pages)

1. Crea un repo en GitHub y sube el proyecto a la rama `main`.
2. En el repo: **Settings → Pages → Source: GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml`: pasa los tests, compila y publica.

La web queda en `https://<usuario>.github.io/<repo>/`. El workflow ajusta solo la ruta base. Para usar un dominio propio, configúralo en Settings → Pages: la ruta pasa a ser `/` sin tocar código.
