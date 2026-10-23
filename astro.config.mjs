import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// En GitHub Pages el workflow pasa SITE_URL y BASE_PATH (p. ej. /nombre-repo).
// Con dominio propio, BASE_PATH queda en "/".
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || "/",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
