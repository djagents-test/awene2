import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PageHero from "@/components/layout/PageHero";
import NewsletterBand from "@/components/sections/NewsletterBand";
import { getArticles } from "@/lib/cms";
import ArticlesList from "./ArticlesList";

export const metadata: Metadata = {
  title: "Articles | AWENE, Comprendre la ménopause et la périménopause",
  description:
    "Des articles scientifiques, clairs et accessibles sur la ménopause, la périménopause, les hormones et la santé féminine. Pour comprendre ce qui se passe dans votre corps, et agir.",
  keywords: [
    "articles ménopause",
    "comprendre périménopause",
    "santé féminine ménopause",
    "bouffées de chaleur explication",
    "fatigue hormonale",
    "brouillard mental ménopause",
    "système nerveux",
    "œstrogène",
  ],
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Articles"
        subtitle="Des articles scientifiques, clairs et accessibles, pour comprendre ce qui se passe dans votre corps et agir."
        visual
        visualVariant="card"
        visualTone="violet"
        blobs
      />

      {/* ── ARTICLES LIST (client, filter interaction) ── */}
      <ArticlesList articles={articles} />

      {/* ── NEWSLETTER ── */}
      <NewsletterBand
        headline="Ces articles vous parlent ?"
        body="Recevez chaque semaine des informations fiables sur la périménopause et la ménopause, directement dans votre boîte mail."
      />
    </>
  );
}
