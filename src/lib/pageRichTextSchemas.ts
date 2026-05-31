type JsonSchema = Record<string, unknown>;

const nonEmptyString = {
  type: "string",
  minLength: 1,
} as const satisfies JsonSchema;

const slugSchema = {
  ...nonEmptyString,
  pattern: "^/(|[A-Za-z0-9\\-_/\\[\\]]+)$",
} as const satisfies JsonSchema;

const richTextMarkSchema = {
  type: "string",
  enum: ["bold", "italic", "underline", "link"],
} as const satisfies JsonSchema;

const richTextSpanSchema = {
  type: "object",
  additionalProperties: false,
  required: ["text"],
  properties: {
    text: nonEmptyString,
    marks: {
      type: "array",
      items: richTextMarkSchema,
      uniqueItems: true,
      default: [],
    },
    href: {
      type: "string",
      format: "uri-reference",
    },
  },
} as const satisfies JsonSchema;

const richTextBlockSchema = {
  oneOf: [
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "level", "content"],
      properties: {
        type: { const: "heading" },
        level: { type: "integer", enum: [1, 2, 3, 4] },
        content: {
          type: "array",
          minItems: 1,
          items: richTextSpanSchema,
        },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "content"],
      properties: {
        type: { const: "paragraph" },
        content: {
          type: "array",
          minItems: 1,
          items: richTextSpanSchema,
        },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "style", "items"],
      properties: {
        type: { const: "list" },
        style: { type: "string", enum: ["unordered", "ordered"] },
        items: {
          type: "array",
          minItems: 1,
          items: {
            type: "array",
            minItems: 1,
            items: richTextSpanSchema,
          },
        },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "content"],
      properties: {
        type: { const: "quote" },
        content: {
          type: "array",
          minItems: 1,
          items: richTextSpanSchema,
        },
        attribution: nonEmptyString,
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "tone", "content"],
      properties: {
        type: { const: "callout" },
        tone: { type: "string", enum: ["info", "success", "warning"] },
        title: nonEmptyString,
        content: {
          type: "array",
          minItems: 1,
          items: richTextSpanSchema,
        },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "label", "href"],
      properties: {
        type: { const: "cta" },
        label: nonEmptyString,
        href: {
          type: "string",
          format: "uri-reference",
        },
      },
    },
  ],
} as const satisfies JsonSchema;

const richTextDocumentSchema = {
  type: "object",
  additionalProperties: false,
  required: ["type", "blocks"],
  properties: {
    type: { const: "doc" },
    blocks: {
      type: "array",
      minItems: 1,
      items: richTextBlockSchema,
    },
  },
} as const satisfies JsonSchema;

const seoSchema = {
  type: "object",
  additionalProperties: false,
  required: ["metaTitle", "metaDescription"],
  properties: {
    metaTitle: {
      ...nonEmptyString,
      maxLength: 70,
    },
    metaDescription: {
      ...nonEmptyString,
      maxLength: 180,
    },
  },
} as const satisfies JsonSchema;

const sectionSchema = (sectionNames: readonly string[]) =>
  ({
    type: "object",
    additionalProperties: false,
    required: ["id", "label", "richText"],
    properties: {
      id: {
        type: "string",
        enum: [...sectionNames],
      },
      label: nonEmptyString,
      richText: richTextDocumentSchema,
    },
  }) as const satisfies JsonSchema;

function buildPageSchema(options: {
  pageType: string;
  routePattern: string;
  sectionNames: readonly string[];
  notes: readonly string[];
}) {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    type: "object",
    additionalProperties: false,
    required: ["pageType", "slug", "title", "summary", "seo", "sections"],
    properties: {
      pageType: {
        const: options.pageType,
      },
      slug: slugSchema,
      routePattern: {
        const: options.routePattern,
      },
      title: nonEmptyString,
      summary: nonEmptyString,
      seo: seoSchema,
      sections: {
        type: "array",
        minItems: options.sectionNames.length,
        items: sectionSchema(options.sectionNames),
      },
      notes: {
        type: "array",
        items: {
          type: "string",
          enum: [...options.notes],
        },
      },
    },
  } as const satisfies JsonSchema;
}

export const pageRichTextResultSchemas = {
  "/": buildPageSchema({
    pageType: "home",
    routePattern: "/",
    sectionNames: ["hero", "manifesto", "pillars", "accompagnements", "articles", "events", "newsletter", "cta"],
    notes: [
      "Keep the tone editorial, warm, and science-rooted.",
      "Anchor the page in perimenopause and menopause support.",
    ],
  }),
  "/coaching": buildPageSchema({
    pageType: "coaching",
    routePattern: "/coaching",
    sectionNames: ["hero", "pillars", "process", "tools", "faq", "cta"],
    notes: [
      "Explain symptoms and support in concrete language.",
      "Do not present coaching as medical diagnosis or prescription.",
    ],
  }),
  "/a-propos": buildPageSchema({
    pageType: "about",
    routePattern: "/a-propos",
    sectionNames: ["hero", "beliefs", "what-awene-is-not", "amira", "certifications", "cta"],
    notes: [
      "Emphasize scientific rigor and lived human support.",
      "Keep founder credentials factual.",
    ],
  }),
  "/a-propos/pourquoi-awene": buildPageSchema({
    pageType: "why-awene",
    routePattern: "/a-propos/pourquoi-awene",
    sectionNames: ["hero", "name", "mission", "values", "cta"],
    notes: [
      "Clarify the meaning of AWENE and the brand mission.",
      "Keep the movement framing grounded rather than vague.",
    ],
  }),
  "/a-propos/mon-histoire": buildPageSchema({
    pageType: "story",
    routePattern: "/a-propos/mon-histoire",
    sectionNames: ["hero", "starting-point", "training", "why-awene-was-born", "cta"],
    notes: [
      "Write in first person if the page is authored by Amira.",
      "Balance personal experience with professional grounding.",
    ],
  }),
  "/chemine-avec-moi": buildPageSchema({
    pageType: "journey-index",
    routePattern: "/chemine-avec-moi",
    sectionNames: ["hero", "paths", "intro-quote", "cta"],
    notes: [
      "Frame the page as the entry point into the support journey.",
    ],
  }),
  "/chemine-avec-moi/role-du-coach": buildPageSchema({
    pageType: "coach-role",
    routePattern: "/chemine-avec-moi/role-du-coach",
    sectionNames: ["hero", "posture", "qualifications", "faq", "cta"],
    notes: [
      "State clearly what the coach does and does not do.",
    ],
  }),
  "/chemine-avec-moi/accompagnements": buildPageSchema({
    pageType: "programs",
    routePattern: "/chemine-avec-moi/accompagnements",
    sectionNames: ["hero", "programs", "comparison", "cta"],
    notes: [
      "Each program should be scannable and concrete.",
    ],
  }),
  "/chemine-avec-moi/formulaire-selection": buildPageSchema({
    pageType: "selection-form",
    routePattern: "/chemine-avec-moi/formulaire-selection",
    sectionNames: ["hero", "what-the-form-covers", "expectations", "cta"],
    notes: [
      "Reduce friction and explain the purpose of the form.",
    ],
  }),
  "/contact": buildPageSchema({
    pageType: "contact",
    routePattern: "/contact",
    sectionNames: ["hero", "reasons-to-contact", "response-expectations", "cta"],
    notes: [
      "Keep the response path clear and reassuring.",
    ],
  }),
  "/formations": buildPageSchema({
    pageType: "formations-index",
    routePattern: "/formations",
    sectionNames: ["hero", "audiences", "offer", "formats", "cta"],
    notes: [
      "Position formations as educational sessions, not coaching packages.",
    ],
  }),
  "/formations/[slug]": buildPageSchema({
    pageType: "formation-detail",
    routePattern: "/formations/[slug]",
    sectionNames: ["hero", "overview", "outcomes", "agenda", "audience", "practical-info", "cta"],
    notes: [
      "This schema is for one formation detail page.",
      "Keep dates, format, and registration details explicit.",
    ],
  }),
  "/articles": buildPageSchema({
    pageType: "articles-index",
    routePattern: "/articles",
    sectionNames: ["hero", "editorial-positioning", "categories", "featured", "cta"],
    notes: [
      "Keep the page discoverable and editorial.",
    ],
  }),
  "/articles/[slug]": buildPageSchema({
    pageType: "article-detail",
    routePattern: "/articles/[slug]",
    sectionNames: ["hero", "article-body", "key-takeaways", "cta"],
    notes: [
      "This schema is for one article detail page.",
      "Use evidence-aware language and avoid unsupported medical claims.",
    ],
  }),
  "/evenements": buildPageSchema({
    pageType: "events-index",
    routePattern: "/evenements",
    sectionNames: ["hero", "upcoming-events", "formats", "cta"],
    notes: [
      "Help visitors understand what event formats exist and how to join.",
    ],
  }),
  "/merci": buildPageSchema({
    pageType: "thank-you",
    routePattern: "/merci",
    sectionNames: ["hero", "next-steps", "cta"],
    notes: [
      "Keep the copy short and action-oriented.",
    ],
  }),
  "/politique-de-confidentialite": buildPageSchema({
    pageType: "privacy-policy",
    routePattern: "/politique-de-confidentialite",
    sectionNames: ["hero", "data-use", "legal-rights", "contact"],
    notes: [
      "Use plain language, but keep legal statements precise.",
    ],
  }),
} as const;

export type PageRichTextSchemaPath = keyof typeof pageRichTextResultSchemas;

export function getPageRichTextResultSchema(path: string) {
  if (path.startsWith("/articles/")) {
    return pageRichTextResultSchemas["/articles/[slug]"];
  }

  if (path.startsWith("/formations/")) {
    return pageRichTextResultSchemas["/formations/[slug]"];
  }

  return pageRichTextResultSchemas[path as PageRichTextSchemaPath] ?? null;
}

export const richTextDocumentResultSchema = richTextDocumentSchema;
