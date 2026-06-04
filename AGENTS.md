# Project Rules

## Next.js

This project may use a Next.js version with breaking changes.
Before changing framework-specific behavior, read the relevant guide in `node_modules/next/dist/docs/`.

## Website Structure

When creating or restructuring a website in this repo, always use this architecture unless the user explicitly asks for something else.

### App Router

- Keep `src/app/fr` and `src/app/en` as the only public page route trees.
- Do not create public page folders directly under `src/app` outside `fr` and `en`.
- Keep only global framework files at `src/app` root, such as:
  - `layout.tsx`
  - `globals.css`
  - `robots.ts`
  - `sitemap.ts`
  - `icon.png`
  - `favicon.ico`
  - `llms.txt`
  - `api`

### Page Ownership

- Every localized route must have its own real `page.tsx`.
- Each `page.tsx` must own its content directly.
- Do not re-export one page from another.
- Do not use patterns like:
  - `export { default } from "../../..."`
  - importing French pages into English pages
  - importing English pages into French pages

### Components

- `/components` is only for truly global reusable UI.
- Allowed examples:
  - `layout/Header.tsx`
  - `layout/Footer.tsx`
  - `layout/FooterEmailForm.tsx`
  - `seo/JsonLd.tsx`
  - small global UI primitives in `ui`
- Do not keep page-content components in `/components`.
- If a component contains page-specific copy, FAQ content, hero content, cards, previews, CTAs, or section layout, move it inline into the route page and delete the component.

### Imports

- Prefer minimal imports in each `page.tsx`.
- Good imports:
  - `next/image`
  - `next/link`
  - `next` metadata types
  - `@/components/seo/JsonLd`
  - small global UI primitives when genuinely reusable
- Avoid imports from page-content folders such as:
  - `@/components/sections`
  - `@/components/pages`
  - `@/components/articles`
  - `@/components/contact`
  - `@/components/formations`

### Routing Policy

- Public website pages must live under `/fr/*` and `/en/*`.
- Do not restore legacy non-localized public routes unless the user explicitly asks for them.

