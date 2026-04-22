/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_KEY?: string;
  readonly BREVO_API_KEY?: string;
  readonly BREVO_LIST_ID?: string;
  readonly BREVO_SENDER_EMAIL?: string;
  readonly BREVO_SENDER_NAME?: string;
  readonly AWENE_GUIDE_PDF_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
