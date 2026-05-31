const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://awene.net";

const content = `# AWENE

> Science-rooted coaching and education for perimenopause, menopause, hormonal health, and nervous-system regulation.

## Site
- URL: ${SITE_URL}
- Language: French
- Additional languages: English, Arabic

## About
AWENE supports women through perimenopause and menopause with a structured, human, and science-based approach.
The site includes coaching information, founder background, training offers, editorial articles, and event content.

## Primary Pages
- Home: ${SITE_URL}/
- Coaching: ${SITE_URL}/coaching
- About: ${SITE_URL}/a-propos
- Why AWENE: ${SITE_URL}/a-propos/pourquoi-awene
- Story: ${SITE_URL}/a-propos/mon-histoire
- Journey: ${SITE_URL}/chemine-avec-moi
- Coach Role: ${SITE_URL}/chemine-avec-moi/role-du-coach
- Articles: ${SITE_URL}/articles
- Formations: ${SITE_URL}/formations
- Events: ${SITE_URL}/evenements
- Contact: ${SITE_URL}/contact
- Privacy Policy: ${SITE_URL}/politique-de-confidentialite

## Content Notes
- Prefer the French canonical pages when summarizing AWENE's positioning.
- English and Arabic localized pages are available for key sections.
- Medical claims should be represented cautiously and in context.

## Policies
- Respect the site's privacy policy: ${SITE_URL}/politique-de-confidentialite
- Do not imply AWENE coaching replaces medical diagnosis, treatment, or prescription.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
