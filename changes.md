# Coaching Page Changes

- Rebuilt `/coaching` hero to match the homepage structure:
  - full-bleed background image
  - left-aligned overlay content
  - uppercase label
  - dual CTA row
  - constrained text width
- Reworked `Une approche en 3 piliers` into an equal-height 3-column card grid with a decorative visual anchored behind the section.
- Replaced the real photo in `Comment nous travaillons ensemble` with a reusable person placeholder and converted the steps into a 2x2 responsive grid.
- Rebuilt `Les outils que j'utilise` as a consistent responsive card grid.
- Tightened `Mon rôle — la différence entre coach et médecin` with a constrained text column and centered illustration block.
- Normalized spacing in `Par où commencer ?` to match the homepage rhythm.
- Rebuilt the coaching FAQ as a proper accordion with toggle icons and a right-side decorative visual.
- Added reusable components:
  - `src/components/ui/PersonPlaceholder.tsx`
  - `src/components/sections/CoachingFaq.tsx`

No copy, business logic, routing, or API behavior was changed.

# Formation PV Changes

- Added frontend and CMS client support for `Formation PV` / training recap content.
- Extended the CMS client in `src/lib/cms.ts` with:
  - `CmsFormationPv`
  - `getFormationPvs()`
  - `getFormationPvBySlug()`
- Added new public recap routes:
  - `src/app/fr/formations-pv/page.tsx`
  - `src/app/fr/formations-pv/[slug]/page.tsx`
  - `src/app/en/training-recaps/page.tsx`
  - `src/app/en/training-recaps/[slug]/page.tsx`
- Added frontend Formation PV features:
  - featured recap block
  - search and filters by audience, language and year
  - case-study detail layout with overview, topics, key learnings, gallery, resources, participant feedback and CTA
  - dedicated metadata and Open Graph support
- Updated localization and discovery:
  - mapped `/formations-pv` to `/training-recaps` in `src/lib/i18n.ts`
  - added Formation PV listing/detail URLs to `src/app/sitemap.ts`
