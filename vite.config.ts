import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Static site for GitHub Pages. Served from https://<user>.github.io/la-senda-web-site/
const base = process.env.GITHUB_PAGES ? "/la-senda-web-site/" : "/";

export default defineConfig({
  base,
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Prerender every route to static HTML + SPA fallback so the output
      // is fully static for GitHub Pages — no server needed. Filtered views
      // (?cat=...) are resolved client-side by the SPA, so skip them here.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: false,
        filter: ({ path }) => !path.includes("?"),
      },
      spa: { enabled: true },
    }),
    viteReact(),
  ],
});
