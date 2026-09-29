# Film Photography Portfolio

Personal film photography portfolio built with Astro and deployed to GitHub Pages.

Live site: <https://richardsgz.github.io/film-photography-portfolio/>

## Development

This project uses Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open <http://localhost:4321/film-photography-portfolio/> while the development server is running.

## Production checks

Build and preview the production output locally:

```sh
npm run build
npm run preview
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` publishes successful pushes to `main` through GitHub Pages.

## Project structure

```text
/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── data/
│   │   └── series.ts
│   └── pages/
│       ├── index.astro
│       └── work/
│           └── [slug].astro
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml
```

Series images currently live under `public/images/`. Local image dimensions are read during the build so gallery layouts can preserve each photograph's aspect ratio.

## Adding a series

Add the images to a new folder under `public/images/`, then add the series metadata and image entries in `src/data/series.ts`. The matching page is generated automatically at `/work/<slug>/`.
