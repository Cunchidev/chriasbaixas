// Rutas internas respetando el `base` (GitHub Pages sirve el sitio en /<repo>/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const href = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
