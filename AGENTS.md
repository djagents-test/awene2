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

## Latest Changes

### 2026-06-07

- Kept the website architecture strict:
  - public pages only under `src/app/fr` and `src/app/en`
  - localized pages own their content directly in `page.tsx`
  - no legacy non-localized public routes restored
- Continued the FR/EN parity work so English pages follow the same visual structure as their French equivalents where requested.
- Reworked multiple hero sections to use full background images instead of side image cards, with text layered above the image and inline per-page object positioning.
- Added and wired new editorial images and responsive cropping directly in the relevant page files for:
  - About / A propos
  - Articles
  - Training / Formations
  - Events / Evenements
- Updated image handling and related config:
  - added image quality support in `next.config.ts`
  - added explicit event detail rewrites for `/fr/evenements/:slug` and `/en/events/:slug`
- Improved the Events frontend experience:
  - real events hub with client-side filters
  - separate upcoming and past event sections
  - no fake placeholder events kept in production state
  - past events never show registration CTA
  - past events route to recap/detail pages instead
  - upcoming events keep registration flow
- Added public event detail pages for FR and EN with recap and satisfaction support:
  - `/fr/evenement`
  - `/en/event`
- Added newsletter and registration flow improvements around events pages, including direct inline email input where needed.
- Reworked the `Events PV` architecture in `wordpress-plugins/awene-events/awene-events.php` so PVs are derived from AWENE Events instead of being manually linked by Event ID.
- Added a real `Events PV` admin dashboard with:
  - `Pending Past Event PV`
  - `Existing Event PVs`
  - `Upcoming Events`
  - top statistics cards
  - filters and search
- Added automatic `Create PV` flow from a past event:
  - creates a linked PV record
  - prefills available event information
  - opens the PV editor directly
- Enforced data integrity so every past event appears either as:
  - `Pending PV`
  - `PV Created`
- Added satisfaction and recap support tied to events and PVs so post-event content is connected to the event lifecycle.
- Added or extended Brevo notification support in the CMS plugins for manual list notifications tied to events, PVs, and formations.
- Fixed the event editor save bug caused by a nested Brevo `<form>` inside the WordPress post edit form.
- Replaced the nested Brevo form with a safe submit button using `formaction`, plus a dedicated Brevo nonce field, so event date and other edits save correctly again.
