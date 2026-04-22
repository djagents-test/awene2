# Awene-survey

## Hostinger deployment

This is an Astro server app because it uses API routes under `src/pages/api`.
Deploy it on Hostinger as a Node.js Web App, not as a static `public_html`
upload.

Recommended Hostinger settings:

- Framework: Astro
- Node.js version: 22.x
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Entry file, if requested: `dist/server/entry.mjs`
- Build output directory, if requested: `dist`

Required environment variables in Hostinger:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `BREVO_API_KEY`
- `BREVO_LIST_ID`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`
- `SITE_URL`
- `AWENE_GUIDE_PDF_URL` if the guide PDF should use an absolute custom URL

Local build with the same Node major version:

```bash
nvm use
npm install
npm run build
```
