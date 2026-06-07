import type { CmsArticle, CmsEvent, CmsFormation } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "AWENE",
    url: SITE_URL,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "AWENE",
    url: SITE_URL,
    publisher: organizationSchema(),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function webPageSchema(options: {
  path: string;
  title: string;
  description: string;
  type?: string;
  inLanguage?: string;
  about?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": options.type ?? "WebPage",
    "@id": `${absoluteUrl(options.path)}#webpage`,
    url: absoluteUrl(options.path),
    name: options.title,
    description: options.description,
    inLanguage: options.inLanguage ?? "fr",
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: options.about,
    publisher: organizationSchema(),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function articleImage(article: CmsArticle) {
  return (
    article.image?.large ??
    article.image?.full ??
    article.image?.medium ??
    article.image?.thumbnail
  );
}

export function articleSchema(article: CmsArticle, path: string, inLanguage = "fr") {
  const image = articleImage(article);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: article.title,
    description: article.excerpt,
    url: absoluteUrl(path),
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    keywords: article.categories.map((category) => category.name),
    inLanguage,
    image: image ? [image] : undefined,
    author: organizationSchema(),
    publisher: organizationSchema(),
    mainEntityOfPage: {
      "@id": `${absoluteUrl(path)}#webpage`,
    },
  };
}

export function itemListSchema(
  path: string,
  items: Array<{ name: string; url: string }>,
  inLanguage = "fr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    url: absoluteUrl(path),
    inLanguage,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function cmsEventSchema(event: CmsEvent, path = "/evenements") {
  const location =
    event.format === "online"
      ? {
          "@type": "VirtualLocation",
          name: "En ligne",
        }
      : event.location
        ? {
            "@type": "Place",
            name: event.location,
          }
        : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${absoluteUrl(path)}#event-${event.id}`,
    name: event.title,
    description: event.description,
    startDate: event.startsAt ?? event.date,
    eventAttendanceMode:
      event.format === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.format === "hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : undefined,
    location,
    image: event.image?.large ?? event.image?.full ?? event.image?.medium ?? event.image?.thumbnail,
    organizer: organizationSchema(),
    offers: event.url
      ? {
          "@type": "Offer",
          url: event.url,
          availability: "https://schema.org/InStock",
          price: event.price,
          priceCurrency: "TND",
        }
      : undefined,
  };
}

export function formationEventSchema(formation: CmsFormation) {
  const attendanceMode = {
    online: "https://schema.org/OnlineEventAttendanceMode",
    in_person: "https://schema.org/OfflineEventAttendanceMode",
    hybrid: "https://schema.org/MixedEventAttendanceMode",
  }[formation.format];

  const eventStatus = {
    upcoming: "https://schema.org/EventScheduled",
    sold_out: "https://schema.org/EventScheduled",
    past: "https://schema.org/EventCompleted",
    cancelled: "https://schema.org/EventCancelled",
  }[formation.status];

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${absoluteUrl(`/formations/${formation.slug}`)}#event`,
    name: formation.title,
    description: formation.description,
    url: absoluteUrl(`/formations/${formation.slug}`),
    startDate: formation.startDate,
    endDate: formation.endDate || undefined,
    eventAttendanceMode: attendanceMode,
    eventStatus,
    location:
      formation.format === "online"
        ? {
            "@type": "VirtualLocation",
            name: "En ligne",
          }
        : {
            "@type": "Place",
            name: formation.location,
          },
    organizer: organizationSchema(),
    offers: formation.url
      ? {
          "@type": "Offer",
          url: formation.url,
          price: formation.price,
          priceCurrency: "TND",
          availability:
            formation.status === "sold_out"
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
        }
      : undefined,
  };
}
