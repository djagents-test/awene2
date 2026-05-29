# Visual Updates

## Shared components

- Updated `src/components/ui/Container.tsx` to unify the main site width with the navigation container.
- Expanded `src/components/layout/Header.tsx` and `src/components/layout/Footer.tsx` to use the shared container system consistently.
- Rebuilt `src/components/layout/PageHero.tsx` to support a consistent two-column hero structure with optional editorial visuals.
- Added `src/components/ui/PlaceholderVisual.tsx` for reusable abstract placeholder imagery across heroes, cards, FAQ, newsletter, and empty states.
- Updated `src/components/sections/NewsletterBand.tsx` and `src/components/sections/FAQ.tsx` so their outer alignment matches the site container instead of using a narrower wrapper.

## Updated pages and sections

- Homepage:
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/Manifesto.tsx`
  - `src/components/sections/CTABand.tsx`
- Coaching:
  - `src/app/coaching/page.tsx`
- À propos:
  - `src/app/a-propos/page.tsx`
- Formations:
  - `src/app/formations/page.tsx`
  - `src/app/formations/FormationsClient.tsx`
- Articles:
  - `src/app/articles/page.tsx`
  - `src/app/articles/ArticlesList.tsx`
- Événements:
  - `src/app/evenements/page.tsx`

## Intent

- Align major page sections, hero blocks, CTA areas, newsletter areas, FAQ blocks, and footer layout to the same horizontal system as the navigation container.
- Add abstract editorial placeholders where pages previously felt visually empty, without changing copy.
- Keep the existing brand palette, typography direction, and button language while making the site feel more consistent and more complete.
