import type { Locale } from "@/lib/i18n";

const CMS_API_BASE =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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
  date: string;
  time?: string;
  type: string;
  types: CmsCategory[];
  color: string;
  format?: string;
  status?: string;
  location?: string;
  price?: string;
  image?: CmsImage;
  url?: string;
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
  excerpt?: string;
  content?: string;
  date_label?: string;
  time_label?: string;
  format?: string;
  status?: string;
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
    throw new Error("WORDPRESS_API_URL is required to fetch CMS content.");
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
    throw new Error("WORDPRESS_API_URL is required to fetch CMS content.");
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
) {
  const response = await fetch(cmsRestUrl(path, params), {
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

function toAweneEvent(event: AweneEventApi): CmsEvent {
  const type = eventTypeLabel(event.types);

  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.excerpt ?? "",
    date: event.date_label ?? "À venir",
    time: event.time_label,
    type,
    types: event.types ?? [],
    color: eventColor(type),
    format: event.format,
    status: event.status,
    location: eventLocationLabel(event.location),
    price: event.price,
    image: event.image ?? undefined,
    url: event.registration_url,
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

  return {
    id: post.id,
    slug: post.slug,
    title,
    description:
      renderedText(acfString(post, ["summary", "resume", "description"])) ||
      renderedText(post.excerpt?.rendered),
    date: eventDate(post),
    type,
    types: [{ name: type, slug: type }],
    color: eventColor(type),
    url: acfString(post, ["registration_url", "url_inscription", "link", "lien"]),
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

  const filteredPosts = locale ? posts.filter((post) => tagSlugs(post).includes(locale)) : posts;

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

export async function getEvents(limit = 20) {
  try {
    const events = await fetchCmsRest<AweneEventApi[]>("awene/v1/events", {
      per_page: limit,
    });

    return events.map(toAweneEvent);
  } catch {
    // The plugin may not be installed yet. Fall back to common CPT REST bases.
  }

  const endpointCandidates = ["events", "event", "evenements", "evenement"];

  for (const endpoint of endpointCandidates) {
    const posts = await fetchCmsList(endpoint, {
      per_page: limit,
      _embed: 1,
      status: "publish",
    });

    if (posts.length > 0) {
      return posts.map(toEvent);
    }
  }

  return [];
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
