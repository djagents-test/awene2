import type { Locale } from "@/lib/i18n";

const CMS_SITE_BASE =
  process.env.NEXT_PUBLIC_AWENE_CMS_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, "") ??
  "https://cms.awene.net";

const CMS_API_BASE =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  `${CMS_SITE_BASE}/wp-json/wp/v2`;

const CMS_REVALIDATE_SECONDS = 300;

type WpRendered = {
  rendered?: string;
};

type WpTerm = {
  name?: string;
  slug?: string;
  taxonomy?: string;
};

export type CmsCategory = {
  id?: number;
  name: string;
  slug: string;
};

export type CmsImage = {
  alt: string;
  thumbnail?: string;
  medium?: string;
  large?: string;
  full?: string;
};

type WpMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WpPost = {
  id: number;
  slug: string;
  date?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  acf?: Record<string, unknown>;
  _embedded?: {
    "wp:term"?: WpTerm[][];
    "wp:featuredmedia"?: WpMedia[];
  };
};

export type CmsArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isoDate: string;
  readTime: string;
  category: string;
  categories: CmsCategory[];
  pillar: "Comprendre" | "Réguler" | "Incarner";
  featured: boolean;
  image?: CmsImage;
  imageUrl?: string;
  imageAlt?: string;
};

export type CmsEvent = {
  id: number;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  date: string;
  startsAt?: string;
  endDate?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  type: string;
  types: CmsCategory[];
  color: string;
  format?: "online" | "in_person" | "hybrid";
  status?: string;
  registrationStatus?: "open" | "full" | "closed";
  eventStatus?: "upcoming" | "past" | "draft";
  location?: string;
  locationType?: "online" | "in_person" | "hybrid";
  locationName?: string;
  locationAddress?: string;
  onlineUrl?: string;
  language?: "fr" | "en" | "ar";
  capacity?: number;
  availableSeats?: number;
  price?: string;
  image?: CmsImage;
  url?: string;
  ctaLabel?: string;
  seoTitle?: string;
  metaDescription?: string;
  recapPublished?: boolean;
};

export type CmsEventPv = {
  eventId: number;
  eventSlug: string;
  pvTitle?: string;
  shortDescription?: string;
  fullDescription?: string;
  keyTakeaways?: string;
  speakerNotes?: string;
  attendanceNotes?: string;
  internalNotes?: string;
  publicRecapStatus: "draft" | "published" | "hidden";
  pdfUrl?: string;
  pdfIsPublic?: boolean;
  videoUrl?: string;
  gallery: string[];
  externalGalleryUrl?: string;
  satisfactionFormId?: number;
  completionStatus?: string;
};

export type CmsSatisfactionQuestion = {
  id: string;
  label: string;
  type:
    | "short_text"
    | "long_text"
    | "rating_1_5"
    | "rating_1_10"
    | "multiple_choice"
    | "checkbox"
    | "yes_no"
    | "email";
  required?: boolean;
  options?: string[];
};

export type CmsSatisfactionForm = {
  id: number;
  eventId: number;
  title: string;
  introText?: string;
  thankYouMessage?: string;
  active: boolean;
  anonymousAllowed: boolean;
  requireEmail?: boolean;
  language?: string;
  pdfAfterSubmissionUrl?: string;
  questions: CmsSatisfactionQuestion[];
};

export type CmsFormationStatus = "upcoming" | "sold_out" | "past" | "cancelled";

export type CmsFormation = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  format: "online" | "in_person" | "hybrid";
  formatLabel: string;
  language: "fr" | "ar" | "en";
  languageLabel: string;
  audience: "particuliers" | "entreprises" | "professionnels";
  audienceLabel: string;
  status: CmsFormationStatus;
  statusLabel: string;
  location: string;
  remainingSeats?: number;
  capacityTotal?: number;
  price?: string;
  url?: string;
};

type AweneEventApi = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  date_label?: string;
  start_date?: string;
  end_date?: string;
  time_label?: string;
  start_time?: string;
  end_time?: string;
  format?: string;
  status?: string;
  registrationStatus?: string;
  registration_status?: string;
  eventStatus?: string;
  event_status?: string;
  locationType?: string;
  location_type?: string;
  locationName?: string;
  location_name?: string;
  locationAddress?: string;
  location_address?: string;
  onlineUrl?: string;
  online_url?: string;
  language?: string;
  capacity?: number | string | null;
  availableSeats?: number | string | null;
  available_seats?: number | string | null;
  ctaLabel?: string;
  cta_label?: string;
  seoTitle?: string;
  seo_title?: string;
  metaDescription?: string;
  meta_description?: string;
  featuredImage?: CmsImage | null;
  featured_image?: CmsImage | null;
  recapPublished?: boolean;
  recap_published?: boolean;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  registration_url?: string;
  price?: string;
  types?: CmsCategory[];
  image?: CmsImage | null;
};

type AweneEventPvApi = {
  eventId: number;
  eventSlug?: string;
  pvTitle?: string;
  shortDescription?: string;
  fullDescription?: string;
  keyTakeaways?: string;
  speakerNotes?: string;
  attendanceNotes?: string;
  internalNotes?: string;
  publicRecapStatus?: "draft" | "published" | "hidden";
  pdfUrl?: string;
  pdfIsPublic?: boolean;
  videoUrl?: string;
  gallery?: string[];
  externalGalleryUrl?: string;
  satisfactionFormId?: number;
  completionStatus?: string;
};

type RawSatisfactionQuestion = {
  type?: string;
  question?: string;
  label?: string;
  required?: boolean;
  options?: unknown;
  choices?: unknown;
};

type AweneSatisfactionFormApi = {
  id: number;
  eventId: number;
  title: string;
  introText?: string;
  thankYouMessage?: string;
  active?: boolean;
  anonymousAllowed?: boolean;
  requireEmail?: boolean;
  language?: string;
  pdfAfterSubmissionUrl?: string;
  questions?: RawSatisfactionQuestion[];
};

function normalizeSatisfactionType(raw: string | undefined): CmsSatisfactionQuestion["type"] {
  switch ((raw ?? "").toLowerCase().replace(/[\s\-]/g, "_")) {
    case "short_text":
    case "text":
    case "short":
      return "short_text";
    case "long_text":
    case "textarea":
    case "paragraph":
      return "long_text";
    case "rating_5":
    case "rating_1_5":
    case "rating1_5":
      return "rating_1_5";
    case "rating_10":
    case "rating_1_10":
    case "rating1_10":
    case "nps":
      return "rating_1_10";
    case "yes_no":
    case "yes/no":
    case "boolean":
      return "yes_no";
    case "multiple_choice":
    case "radio":
    case "single_choice":
      return "multiple_choice";
    case "checkbox":
    case "checkboxes":
    case "multi_select":
      return "checkbox";
    case "email":
      return "email";
    default:
      return "short_text";
  }
}

function normalizeOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((o) => typeof o === "string" && o.trim() !== "") as string[];
  if (typeof raw === "string" && raw.trim() !== "") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((o) => typeof o === "string") as string[];
    } catch {
      return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

function normalizeQuestion(raw: RawSatisfactionQuestion, index: number): CmsSatisfactionQuestion {
  return {
    id: String(index),
    label: String(raw.label ?? raw.question ?? ""),
    type: normalizeSatisfactionType(raw.type),
    required: Boolean(raw.required),
    options: normalizeOptions(raw.options ?? raw.choices ?? []),
  };
}

type AweneFormationApi = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date_label?: string;
  start_date?: string;
  end_date?: string;
  time_label?: string;
  start_time?: string;
  end_time?: string;
  format?: string;
  format_label?: string;
  language?: string;
  language_label?: string;
  audience?: string | string[];
  audience_labels?: string[];
  status?: string;
  status_label?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
  } | string;
  remaining_seats?: number | string | null;
  capacity_remaining?: number | string | null;
  capacity_total?: number | string | null;
  places_restantes?: number | string | null;
  price?: string;
  registration_url?: string;
  registration_link?: string;
};

function cmsUrl(path: string, params: Record<string, string | number> = {}) {
  if (!CMS_API_BASE) {
    throw new Error("A WordPress CMS URL is required to fetch CMS content.");
  }

  const base = CMS_API_BASE.replace(/\/$/, "");
  const url = new URL(`${base}/${path.replace(/^\//, "")}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

function cmsRestUrl(path: string, params: Record<string, string | number> = {}) {
  if (!CMS_API_BASE) {
    throw new Error("A WordPress CMS URL is required to fetch CMS content.");
  }

  const api = new URL(CMS_API_BASE);
  const wpJsonIndex = api.pathname.indexOf("/wp-json/");
  const restPath =
    wpJsonIndex >= 0 ? api.pathname.slice(0, wpJsonIndex + "/wp-json/".length) : "/wp-json/";
  const url = new URL(api.origin);
  url.pathname = `${restPath}${path.replace(/^\//, "")}`;

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

async function fetchCms<T>(
  path: string,
  params: Record<string, string | number> = {},
) {
  const response = await fetch(cmsUrl(path, params), {
    next: {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: ["wordpress-cms"],
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchCmsRest<T>(
  path: string,
  params: Record<string, string | number> = {},
  revalidate: number = CMS_REVALIDATE_SECONDS,
) {
  const response = await fetch(cmsRestUrl(path, params), {
    next: {
      revalidate,
      tags: ["wordpress-cms"],
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchCmsList(path: string, params: Record<string, string | number>) {
  try {
    return await fetchCms<WpPost[]>(path, params);
  } catch {
    return [];
  }
}

function renderedText(value?: string) {
  return decodeHtml(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function acfString(post: WpPost, keys: string[]) {
  for (const key of keys) {
    const value = post.acf?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function terms(post: WpPost) {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}

function categoryTerms(post: WpPost): CmsCategory[] {
  return terms(post)
    .filter((item) => item.taxonomy === "category" && item.name && item.slug)
    .map((item) => ({
      name: item.name!,
      slug: item.slug!,
    }));
}

function tagSlugs(post: WpPost) {
  return terms(post)
    .filter((item) => item.taxonomy === "post_tag" && item.slug)
    .map((item) => item.slug!);
}

function localeMarkers(post: WpPost): Locale[] {
  const markers = new Set<Locale>();
  const acfLocale = acfString(post, ["lang", "locale", "language"]).toLowerCase();

  if (acfLocale === "fr" || acfLocale === "en" || acfLocale === "ar") {
    markers.add(acfLocale);
  }

  for (const term of terms(post)) {
    const slug = term.slug?.toLowerCase() ?? "";

    if (
      slug === "fr" ||
      slug.startsWith("fr-") ||
      slug.endsWith("-fr") ||
      slug.includes("-fr-")
    ) {
      markers.add("fr");
    }

    if (
      slug === "en" ||
      slug.startsWith("en-") ||
      slug.endsWith("-en") ||
      slug.includes("-en-") ||
      slug.includes("english")
    ) {
      markers.add("en");
    }

    if (
      slug === "ar" ||
      slug.startsWith("ar-") ||
      slug.endsWith("-ar") ||
      slug.includes("-ar-") ||
      slug.includes("arab")
    ) {
      markers.add("ar");
    }
  }

  return [...markers];
}

function matchesLocale(post: WpPost, locale: Locale) {
  const markers = localeMarkers(post);

  if (markers.length === 0) {
    return locale === "fr";
  }

  return markers.includes(locale);
}

function firstTermName(post: WpPost, taxonomies: string[]) {
  const term = terms(post).find((item) =>
    item.taxonomy ? taxonomies.includes(item.taxonomy) : true,
  );

  return term?.name?.trim() ?? "";
}

function articlePillar(post: WpPost): CmsArticle["pillar"] {
  const raw =
    acfString(post, ["pillar", "pilier", "category", "categorie"]) ||
    firstTermName(post, ["category", "post_tag"]);
  const normalized = raw.toLowerCase();

  if (
    normalized.includes("réguler") ||
    normalized.includes("reguler") ||
    normalized.includes("regulate") ||
    normalized.includes("تنظيم")
  ) {
    return "Réguler";
  }

  if (
    normalized.includes("incarner") ||
    normalized.includes("embody") ||
    normalized.includes("embodiment") ||
    normalized.includes("تجسيد")
  ) {
    return "Incarner";
  }

  return "Comprendre";
}

function formattedDate(post: WpPost) {
  const customDate = acfString(post, ["display_date", "date_label"]);

  if (customDate) {
    return customDate;
  }

  if (!post.date) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));
}

function readTime(post: WpPost) {
  const customReadTime = acfString(post, [
    "read_time",
    "reading_time",
    "temps_de_lecture",
  ]);

  if (customReadTime) {
    return customReadTime.replace(/\s*de lecture$/i, "");
  }

  const words = renderedText(post.content?.rendered).split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.ceil(words.length / 220));

  return `${minutes} min`;
}

function featuredImage(post: WpPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  const thumbnail = sizes?.thumbnail?.source_url;
  const medium = sizes?.medium?.source_url ?? sizes?.medium_large?.source_url;
  const large = sizes?.large?.source_url;
  const full = media?.source_url;
  const image: CmsImage | undefined = media && (thumbnail || medium || large || full)
    ? {
        alt: media.alt_text || renderedText(post.title?.rendered) || "Image article",
        thumbnail,
        medium,
        large,
        full,
      }
    : undefined;

  return {
    image,
    imageUrl: image?.large ?? image?.medium ?? image?.full ?? image?.thumbnail,
    imageAlt: image?.alt,
  };
}

function toArticle(post: WpPost, index: number): CmsArticle {
  const title = renderedText(post.title?.rendered) || "Article AWENE";
  const excerpt =
    renderedText(acfString(post, ["summary", "resume", "excerpt"])) ||
    renderedText(post.excerpt?.rendered);
  const pillar = articlePillar(post);
  const categories = categoryTerms(post);
  const { image, imageUrl, imageAlt } = featuredImage(post);

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    content: post.content?.rendered ?? "",
    date: formattedDate(post),
    isoDate: post.date ?? "",
    readTime: readTime(post),
    category: categories[0]?.name ?? pillar,
    categories,
    pillar,
    featured:
      post.acf?.featured === true ||
      post.acf?.a_la_une === true ||
      post.acf?.featured === "1" ||
      index === 0,
    image,
    imageUrl,
    imageAlt: imageAlt || title,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function eventColor(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("webinaire")) {
    return "#4B1F7A";
  }

  if (normalized.includes("atelier")) {
    return "#6F3FD6";
  }

  return "#F68B2C";
}

function eventLocationLabel(location?: AweneEventApi["location"]) {
  if (!location) {
    return "";
  }

  return [location.name, location.city, location.country]
    .filter((item) => typeof item === "string" && item.trim())
    .join(", ");
}

function eventTypeLabel(types?: CmsCategory[]) {
  return types?.[0]?.name ?? "Événement";
}

function normalizeEventFormat(value?: string): CmsEvent["format"] {
  const normalized = (value ?? "").toLowerCase();

  if (normalized.includes("hybrid") || normalized.includes("hybride")) {
    return "hybrid";
  }

  if (
    normalized.includes("person") ||
    normalized.includes("présentiel") ||
    normalized.includes("presentiel")
  ) {
    return "in_person";
  }

  return "online";
}

function normalizeEventLanguage(value?: string): CmsEvent["language"] {
  const normalized = (value ?? "").toLowerCase();

  if (normalized.includes("ar")) return "ar";
  if (normalized.includes("en")) return "en";
  return "fr";
}

function normalizeRegistrationStatus(
  value?: string,
): CmsEvent["registrationStatus"] {
  const normalized = (value ?? "").toLowerCase();

  if (
    normalized.includes("full") ||
    normalized.includes("complet") ||
    normalized.includes("sold")
  ) {
    return "full";
  }

  if (normalized.includes("closed") || normalized.includes("fermé")) {
    return "closed";
  }

  return "open";
}

function normalizeEventStatus(value?: string): CmsEvent["eventStatus"] {
  const normalized = (value ?? "").toLowerCase();

  if (normalized.includes("draft") || normalized.includes("brouillon")) {
    return "draft";
  }

  if (normalized.includes("past") || normalized.includes("termin") || normalized.includes("ended")) {
    return "past";
  }

  return "upcoming";
}

function toAweneEvent(event: AweneEventApi): CmsEvent {
  const type = eventTypeLabel(event.types);
  const startsAt = event.start_date ?? event.date;
  const format = normalizeEventFormat(
    event.locationType ?? event.location_type ?? event.format,
  );
  const registrationStatus = normalizeRegistrationStatus(
    event.registrationStatus ?? event.registration_status ?? event.status,
  );
  const eventStatus = normalizeEventStatus(
    event.eventStatus ?? event.event_status ?? event.status,
  );
  const capacity = numberOrUndefined(event.capacity);
  const availableSeats = numberOrUndefined(
    event.availableSeats ?? event.available_seats,
  );
  const locationName =
    event.locationName ?? event.location_name ?? event.location?.name;
  const locationAddress =
    event.locationAddress ??
    event.location_address ??
    [event.location?.address, event.location?.city, event.location?.country]
      .filter(Boolean)
      .join(", ");
  const locationLabel =
    locationName ||
    [event.location?.city, event.location?.country].filter(Boolean).join(", ") ||
    (format === "online" ? "En ligne" : "");
  const image =
    event.featuredImage ?? event.featured_image ?? event.image ?? undefined;
  const slug = event.slug || slugify(event.title);

  const result: CmsEvent = {
    id: event.id,
    slug,
    title: event.title,
    description: event.description ?? event.content ?? event.excerpt ?? "",
    shortDescription: renderedText(event.shortDescription ?? event.excerpt ?? ""),
    date: event.date_label ?? "À venir",
    startsAt,
    endDate: event.end_date,
    time: event.time_label,
    startTime: event.start_time,
    endTime: event.end_time,
    type,
    types: event.types ?? [],
    color: eventColor(type),
    format,
    status: registrationStatus,
    registrationStatus,
    eventStatus,
    location: locationLabel,
    locationType: format,
    locationName,
    locationAddress,
    onlineUrl: event.onlineUrl ?? event.online_url,
    language: normalizeEventLanguage(event.language),
    capacity,
    availableSeats,
    price: event.price,
    image,
    url: event.registration_url,
    ctaLabel: event.ctaLabel ?? event.cta_label,
    seoTitle: event.seoTitle ?? event.seo_title,
    metaDescription: event.metaDescription ?? event.meta_description,
    recapPublished: event.recapPublished ?? event.recap_published,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("AWENE normalized event", result);
  }

  return result;
}

function toEventPv(pv: AweneEventPvApi): CmsEventPv {
  return {
    eventId: pv.eventId,
    eventSlug: pv.eventSlug ?? "",
    pvTitle: pv.pvTitle,
    shortDescription: pv.shortDescription,
    fullDescription: pv.fullDescription,
    keyTakeaways: pv.keyTakeaways,
    speakerNotes: pv.speakerNotes,
    attendanceNotes: pv.attendanceNotes,
    internalNotes: pv.internalNotes,
    publicRecapStatus: pv.publicRecapStatus ?? "draft",
    pdfUrl: pv.pdfUrl,
    pdfIsPublic: pv.pdfIsPublic ?? false,
    videoUrl: pv.videoUrl,
    gallery: pv.gallery ?? [],
    externalGalleryUrl: pv.externalGalleryUrl,
    satisfactionFormId: pv.satisfactionFormId,
    completionStatus: pv.completionStatus,
  };
}

function toSatisfactionForm(form: AweneSatisfactionFormApi): CmsSatisfactionForm {
  return {
    id: form.id,
    eventId: form.eventId,
    title: form.title,
    introText: form.introText,
    thankYouMessage: form.thankYouMessage,
    active: form.active !== false,
    anonymousAllowed: form.anonymousAllowed !== false,
    requireEmail: Boolean(form.requireEmail),
    language: form.language,
    pdfAfterSubmissionUrl: form.pdfAfterSubmissionUrl,
    questions: (form.questions ?? []).map(normalizeQuestion),
  };
}

function eventDate(post: WpPost) {
  const raw = acfString(post, [
    "event_date",
    "date_evenement",
    "start_date",
    "date_debut",
  ]);

  if (!raw) {
    return "À venir";
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function toEvent(post: WpPost): CmsEvent {
  const title = renderedText(post.title?.rendered) || "Événement AWENE";
  const type =
    acfString(post, ["event_type", "type_evenement", "type"]) ||
    firstTermName(post, ["event_type", "type-evenement", "category"]) ||
    "Événement";
  const startsAt = acfString(post, ["event_date", "date_evenement", "start_date", "date_debut"]);
  const format = normalizeEventFormat(
    acfString(post, ["format", "location_type", "format_evenement"]),
  );
  const registrationStatus = normalizeRegistrationStatus(
    acfString(post, ["registration_status", "status_inscription", "status"]),
  );
  const eventStatus = normalizeEventStatus(
    acfString(post, ["event_status", "statut_evenement"]),
  );
  const capacity = numberOrUndefined(acfString(post, ["capacity", "capacite"]));
  const locationName = acfString(post, ["location_name", "lieu", "location"]);
  const locationAddress = acfString(post, ["location_address", "adresse"]);

  return {
    id: post.id,
    slug: post.slug,
    title,
    description:
      post.content?.rendered ||
      renderedText(acfString(post, ["description"])) ||
      "",
    shortDescription:
      renderedText(acfString(post, ["summary", "resume", "description"])) ||
      renderedText(post.excerpt?.rendered),
    date: eventDate(post),
    startsAt,
    type,
    types: [{ name: type, slug: type }],
    color: eventColor(type),
    format,
    status: registrationStatus,
    registrationStatus,
    eventStatus,
    location:
      locationName ||
      (format === "online" ? "En ligne" : "Lieu à confirmer"),
    locationType: format,
    locationName,
    locationAddress,
    language: normalizeEventLanguage(acfString(post, ["language", "langue"])),
    capacity,
    availableSeats:
      typeof capacity === "number"
        ? numberOrUndefined(acfString(post, ["available_seats", "places_disponibles"]))
        : undefined,
    url: acfString(post, ["registration_url", "url_inscription", "link", "lien"]),
    ctaLabel: acfString(post, ["cta_label", "label_cta"]),
    seoTitle: acfString(post, ["seo_title", "meta_title"]),
    metaDescription: acfString(post, ["meta_description", "seo_description"]),
  };
}

function normalizeFormationFormat(value?: string): CmsFormation["format"] {
  const normalized = (value ?? "").toLowerCase();

  if (normalized.includes("présentiel") || normalized.includes("presentiel") || normalized.includes("person")) {
    return "in_person";
  }

  if (normalized.includes("hybride") || normalized.includes("hybrid")) {
    return "hybrid";
  }

  return "online";
}

function formationFormatLabel(format: CmsFormation["format"]) {
  return {
    online: "En ligne",
    in_person: "Présentiel",
    hybrid: "Hybride",
  }[format];
}

function normalizeFormationLanguage(value?: string): CmsFormation["language"] {
  const normalized = (value ?? "").toLowerCase();

  if (normalized.includes("ar") || normalized.includes("arabe") || normalized.includes("عربي")) {
    return "ar";
  }

  if (normalized.includes("en") || normalized.includes("anglais") || normalized.includes("english")) {
    return "en";
  }

  return "fr";
}

function formationLanguageLabel(language: CmsFormation["language"]) {
  return {
    fr: "Français",
    ar: "Arabe",
    en: "Anglais",
  }[language];
}

function normalizeFormationAudience(value?: string | string[]): CmsFormation["audience"] {
  const normalized = Array.isArray(value)
    ? value.join(" ").toLowerCase()
    : (value ?? "").toLowerCase();

  if (normalized.includes("entreprise") || normalized.includes("rh") || normalized.includes("company")) {
    return "entreprises";
  }

  if (
    normalized.includes("professionnel") ||
    normalized.includes("santé") ||
    normalized.includes("sante") ||
    normalized.includes("bien-être") ||
    normalized.includes("bien etre") ||
    normalized.includes("health")
  ) {
    return "professionnels";
  }

  return "particuliers";
}

function formationAudienceLabel(audience: CmsFormation["audience"]) {
  return {
    particuliers: "Particuliers",
    entreprises: "Entreprises",
    professionnels: "Professionnels de santé et bien-être",
  }[audience];
}

function normalizeFormationStatus(value?: string): CmsFormationStatus {
  const normalized = (value ?? "").toLowerCase();

  if (
    normalized.includes("complet") ||
    normalized.includes("sold") ||
    normalized.includes("full")
  ) {
    return "sold_out";
  }

  if (
    normalized.includes("termin") ||
    normalized.includes("past") ||
    normalized.includes("done") ||
    normalized.includes("closed") ||
    normalized.includes("completed")
  ) {
    return "past";
  }

  if (normalized.includes("annul") || normalized.includes("cancel")) {
    return "cancelled";
  }

  return "upcoming";
}

function formationStatusLabel(status: CmsFormationStatus) {
  return {
    upcoming: "À venir",
    sold_out: "Complet",
    past: "Terminé",
    cancelled: "Annulé",
  }[status];
}

function formationLocationLabel(location?: AweneFormationApi["location"], format?: CmsFormation["format"]) {
  if (typeof location === "string" && location.trim()) {
    return location.trim();
  }

  if (location && typeof location === "object") {
    const label = [location.name, location.city, location.country]
      .filter((item) => typeof item === "string" && item.trim())
      .join(", ");

    if (label) {
      return label;
    }
  }

  return format === "online" ? "En ligne" : "Lieu à confirmer";
}

function numberOrUndefined(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  }

  return undefined;
}

function toAweneFormation(formation: AweneFormationApi): CmsFormation {
  const format = normalizeFormationFormat(formation.format);
  const language = normalizeFormationLanguage(formation.language);
  const audience = normalizeFormationAudience(formation.audience);
  const status = normalizeFormationStatus(formation.status);

  return {
    id: formation.id,
    slug: formation.slug,
    title: formation.title,
    description: formation.excerpt ?? "",
    content: formation.content ?? "",
    date: formation.date_label ?? "Date à venir",
    startDate: formation.start_date,
    endDate: formation.end_date,
    time: formation.time_label,
    startTime: formation.start_time,
    endTime: formation.end_time,
    format,
    formatLabel: formationFormatLabel(format),
    language,
    languageLabel: formationLanguageLabel(language),
    audience,
    audienceLabel: formationAudienceLabel(audience),
    status,
    statusLabel: formationStatusLabel(status),
    location: formationLocationLabel(formation.location, format),
    remainingSeats: numberOrUndefined(
      formation.remaining_seats ??
        formation.capacity_remaining ??
        formation.places_restantes,
    ),
    capacityTotal: numberOrUndefined(formation.capacity_total),
    price: formation.price,
    url: formation.registration_url ?? formation.registration_link,
  };
}

function formationDate(post: WpPost) {
  const raw = acfString(post, [
    "formation_date",
    "date_formation",
    "start_date",
    "date_debut",
  ]);

  if (!raw) {
    return "Date à venir";
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function toFormation(post: WpPost): CmsFormation {
  const title = renderedText(post.title?.rendered) || "Formation AWENE";
  const format = normalizeFormationFormat(
    acfString(post, ["format", "formation_format"]),
  );
  const language = normalizeFormationLanguage(
    acfString(post, ["language", "langue"]),
  );
  const audience = normalizeFormationAudience(
    acfString(post, ["audience", "public", "public_cible"]),
  );
  const status = normalizeFormationStatus(
    acfString(post, ["status", "statut"]),
  );

  return {
    id: post.id,
    slug: post.slug,
    title,
    description:
      renderedText(acfString(post, ["summary", "resume", "description"])) ||
      renderedText(post.excerpt?.rendered),
    content: post.content?.rendered ?? "",
    date: formationDate(post),
    startDate: acfString(post, ["formation_date", "date_formation", "start_date"]),
    endDate: acfString(post, ["end_date", "date_fin"]),
    time: acfString(post, ["time_label", "heure", "start_time", "horaire"]),
    startTime: acfString(post, ["start_time", "heure_debut"]),
    endTime: acfString(post, ["end_time", "heure_fin"]),
    format,
    formatLabel: formationFormatLabel(format),
    language,
    languageLabel: formationLanguageLabel(language),
    audience,
    audienceLabel: formationAudienceLabel(audience),
    status,
    statusLabel: formationStatusLabel(status),
    location:
      acfString(post, ["location", "lieu", "location_name"]) ||
      (format === "online" ? "En ligne" : "Lieu à confirmer"),
    remainingSeats: numberOrUndefined(
      post.acf?.remaining_seats ?? post.acf?.places_restantes,
    ),
    capacityTotal: numberOrUndefined(post.acf?.capacity_total ?? post.acf?.nombre_total_places),
    price: acfString(post, ["price", "prix"]),
    url: acfString(post, ["registration_url", "url_inscription", "link", "lien"]),
  };
}

export async function getArticles(limit = 100, locale?: Locale) {
  const posts = await fetchCmsList("posts", {
    per_page: limit,
    _embed: 1,
    status: "publish",
  });

  const filteredPosts = locale ? posts.filter((post) => matchesLocale(post, locale)) : posts;

  return filteredPosts.map(toArticle);
}

export async function getRecentArticles(limit = 3, locale?: Locale) {
  return (await getArticles(limit, locale)).slice(0, limit);
}

export async function getArticleBySlug(slug: string) {
  const posts = await fetchCmsList("posts", {
    slug,
    per_page: 1,
    _embed: 1,
    status: "publish",
  });

  return posts[0] ? toArticle(posts[0], 0) : null;
}

export async function getEvents(
  options:
    | number
    | {
        perPage?: number;
        status?: "upcoming" | "past";
        type?: string;
        language?: "fr" | "en" | "ar";
      } = 20,
) {
  const resolved =
    typeof options === "number"
      ? { perPage: options }
      : { perPage: 20, ...options };

  try {
    const events = await fetchCmsRest<AweneEventApi[]>(
      "awene/v1/events",
      {
        per_page: resolved.perPage ?? 20,
        ...(resolved.status ? { status: resolved.status } : {}),
        ...(resolved.type ? { type: resolved.type } : {}),
        ...(resolved.language ? { language: resolved.language } : {}),
      },
      60,
    );

    return events.map(toAweneEvent);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[cms] Failed to fetch AWENE events API", {
        error,
        cmsBase: CMS_SITE_BASE,
        options: resolved,
      });
    }
  }

  const endpointCandidates = ["events", "event", "evenements", "evenement"];

  for (const endpoint of endpointCandidates) {
    const posts = await fetchCmsList(endpoint, {
      per_page: resolved.perPage ?? 20,
      _embed: 1,
      status: "publish",
    });

    if (posts.length > 0) {
      const mapped = posts.map(toEvent);
      return mapped.filter((event) => {
        const matchesLanguage = !resolved.language || event.language === resolved.language;
        const matchesStatus =
          !resolved.status || event.eventStatus === resolved.status;
        return matchesLanguage && matchesStatus;
      });
    }
  }

  return [];
}

export async function getEventBySlug(slug: string, locale?: "fr" | "en" | "ar") {
  const events = await getEvents({ perPage: 100, language: locale });
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getEventPvByEventId(eventId: number) {
  try {
    const pv = await fetchCmsRest<AweneEventPvApi>(`awene/v1/events-pv/${eventId}`);
    return toEventPv(pv);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[cms] Failed to fetch AWENE event PV", { eventId, error });
    }
    return null;
  }
}

export async function getSatisfactionFormByEventId(eventId: number) {
  try {
    const form = await fetchCmsRest<AweneSatisfactionFormApi>(`awene/v1/satisfaction/${eventId}`);
    return toSatisfactionForm(form);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[cms] Failed to fetch AWENE satisfaction form", { eventId, error });
    }
    return null;
  }
}

export async function getFormations(limit = 100) {
  try {
    const formations = await fetchCmsRest<AweneFormationApi[]>("awene/v1/formations", {
      limit,
    });

    return formations.map(toAweneFormation);
  } catch {
    // The AWENE Formations plugin may not be installed yet. Fall back to common CPT REST bases.
  }

  const endpointCandidates = [
    "formations",
    "formation",
    "awene_formations",
    "awene_formation",
  ];

  for (const endpoint of endpointCandidates) {
    const posts = await fetchCmsList(endpoint, {
      per_page: limit,
      _embed: 1,
      status: "publish",
    });

    if (posts.length > 0) {
      return posts.map(toFormation);
    }
  }

  return [];
}

export async function getFormationBySlug(slug: string) {
  try {
    const formation = await fetchCmsRest<AweneFormationApi>(
      `awene/v1/formations/slug/${encodeURIComponent(slug)}/`,
    );

    return toAweneFormation(formation);
  } catch {
    // Older plugin versions may not expose the slug endpoint yet.
  }

  const formations = await getFormations(100);
  return formations.find((formation) => formation.slug === slug) ?? null;
}
