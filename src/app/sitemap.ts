import type { MetadataRoute } from "next";
import { getArticles, getFormations } from "@/lib/cms";
import { localizedPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const staticCanonicalRoutes = [
  "/",
  "/coaching",
  "/a-propos",
  "/a-propos/pourquoi-awene",
  "/a-propos/mon-histoire",
  "/articles",
  "/formations",
  "/evenements",
  "/contact",
  "/merci",
  "/politique-de-confidentialite",
  "/chemine-avec-moi",
  "/chemine-avec-moi/role-du-coach",
] as const;

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, formations] = await Promise.all([
    getArticles(100).catch(() => []),
    getFormations(100).catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticCanonicalRoutes.flatMap((path) => [
    {
      url: absoluteUrl(localizedPath(path, "fr")),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/coaching" || path === "/a-propos" || path === "/formations" ? 0.9 : 0.7,
    },
    {
      url: absoluteUrl(localizedPath(path, "en")),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 0.9 : 0.6,
    },
  ]);

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) => [
    {
      url: absoluteUrl(localizedPath(`/articles/${article.slug}`, "fr")),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl(localizedPath(`/articles/${article.slug}`, "en")),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]);

  const formationEntries: MetadataRoute.Sitemap = formations.flatMap((formation) => [
    {
      url: absoluteUrl(localizedPath(`/formations/${formation.slug}`, "fr")),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(localizedPath(`/formations/${formation.slug}`, "en")),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]);

  return [...staticEntries, ...articleEntries, ...formationEntries];
}
