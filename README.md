# Librería La Senda

Sitio web de la Librería La Senda de Luque — librería cristiana con 22 años guiando los pasos hacia la verdad de Cristo. Catálogo de biblias, devocionales, teología, libros infantiles y música.

## Stack

- **[TanStack Start](https://tanstack.com/start)** (React 19) — enrutado y prerendering estático
- **Vite 7** + **Tailwind CSS v4**
- **shadcn/ui** (Radix UI)
- **Bun** como gestor de paquetes

## Desarrollo

```bash
bun install
bun run dev      # servidor de desarrollo
```

Scripts disponibles:

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `bun run dev`     | Servidor de desarrollo               |
| `bun run build`   | Build estático (genera `dist/client`)|
| `bun run preview` | Previsualiza el build                |
| `bun run lint`    | ESLint                               |
| `bun run format`  | Prettier                             |

## Estructura

```
src/
  routes/        Páginas (inicio, catálogo, libro/$id, carrito, contacto, nosotros)
  components/    Navbar, Footer, BookCard y componentes shadcn/ui
  lib/           books (catálogo), cart (estado del carrito), utils
public/          logo.png, sitemap.xml, robots.txt
```

## Despliegue (GitHub Pages)

El sitio se publica automáticamente en GitHub Pages mediante GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) en cada push a `main`.

Configuración inicial (una sola vez):

1. **Settings → Pages → Source = "GitHub Actions"**.
2. Push a `main`.

El build prerenderiza cada ruta a HTML estático con fallback SPA. La variable
`GITHUB_PAGES=true` activa el `base` path `/la-senda-web-site/`.

URL: <https://josegalvez1985.github.io/la-senda-web-site/>

## Contador de visitas

El footer muestra un contador global de visitas vía
[counterapi.dev](https://counterapi.dev) — compartido entre todos los
dispositivos y ubicaciones, sin backend propio. Incrementa una vez por sesión
de navegador.
