## UnReactPJS Documentation

### Create a new app

```bash
npx create-unreactpjs-app my-app
cd my-app
npm install
npm run dev
```

The generated app uses a dark aesthetic (black/purple), a Vanta.js background, and ships with default components: `Navbar`, `Hero`, `Features`, and `Footer`.

### .pjs files (TypeScript syntax)

- The template uses `.pjs` files instead of `.ts`/`.tsx` for cosmetic reasons only.
- `.pjs` is treated as TypeScript via esbuild: `--loader:.pjs=ts` with `--resolve-extensions=.pjs,.ts,.js`.
- This is scoped to the generated app only; the library continues to use `.ts`.

Entry files:
- `app/index.pjs`
- `app/layout.pjs`
- `app/page.pjs`
- `app/components/` (e.g., `Navbar.pjs`, `Footer.pjs`, `Button.pjs`)

### Branding, favicon, and assets

- The generator copies `assets/logo-transparent.png` (preferred) or falls back to `assets/logo.png`.
- Files placed in the new app:
  - `public/logo-transparent.png`
  - `public/favicon.png`
- `public/index.html` includes: `<link rel="icon" type="image/png" href="favicon.png">`

### Vanta.js background

- Included via CDN in `public/index.html` and `public/404.html` with purple waves.
- Uses Three.js CDN and `VANTA.WAVES` targeting `document.body`.

### Default components in the generated app

- `Navbar.pjs` uses `logo-transparent.png` in the brand area with fallback to `logo.png`.
- `Footer.pjs` includes links: Website `https://arnavjoshi.vercel.app/` and Docs `https://github.com/arnvjshi/unreactpjs`.
- `Hero` and `Features` are included in `page.pjs` with dark styling.

### Using Navbar and Footer from the library

After installing `unreactpjs`, you can import default components directly:

```ts
import { Navbar, Footer, createComponent } from 'unreactpjs';
// or subpath imports:
// import { Navbar } from 'unreactpjs/components/Navbar';
// import { Footer } from 'unreactpjs/components/Footer';
```

Library re-exports:
- Root: `Navbar`, `Footer`, `createComponent`
- Subpaths: `unreactpjs/components/Navbar`, `unreactpjs/components/Footer`

### GitHub Actions and publishing

- CI: `.github/workflows/ci.yml` builds and tests on push/PR (Node 20).
- Publish: `.github/workflows/publish.yml` publishes on GitHub release creation.
- Set `NPM_TOKEN` in repository secrets for publishing.

### Repository and docs

- Repo: `https://github.com/arnvjshi/unreactpjs`
- Website: `https://arnavjoshi.vercel.app/`


