# Hidden For Now

This file tracks the items intentionally hidden from the public site for now.

## Arabic language switcher

Status: hidden from the visible UI

Scope:
- desktop header locale switcher
- mobile header locale switcher

Notes:
- the Arabic locale still exists in the i18n layer
- this keeps the change reversible without removing translation data

## `/chemine-avec-moi/accompagnements`

Status: hidden and direct route disabled

Scope:
- removed from footer navigation
- removed from `/chemine-avec-moi` path cards
- removed from the `AccompagnementsPreview` CTA
- removed from the `role-du-coach` CTA
- French direct route now returns `notFound()`
- localized route access now returns `notFound()`

Notes:
- this page is intentionally unavailable for now
- content remains in the repo and can be restored later

## `/chemine-avec-moi/formulaire-selection`

Status: hidden and direct route disabled

Scope:
- removed from footer navigation
- removed from `/chemine-avec-moi` path cards
- removed from the `/chemine-avec-moi` lower CTA
- removed from the `role-du-coach` CTA
- removed from the contact page support card link
- direct route now returns `notFound()`
- localized route access now returns `notFound()`

Notes:
- this page is intentionally unavailable for now
- visible conversion points now fall back to `/contact`
