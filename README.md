# Kong — Personal Research Workspace

A long-term personal website for projects, learning notes, research, trading reviews, and career field notes.

## Stack
- Astro 7
- TypeScript
- Markdown content collections
- GitHub Pages

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Add an article
Copy `content-templates/article.md` into `src/content/writing/`, rename it, and complete the frontmatter.

The old Jekyll/Chirpy site is preserved on `archive/legacy-site-2026-08-02`.

Deployment is handled by the Astro GitHub Pages workflow on every push to `main`.
