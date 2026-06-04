import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getArticleBySlug, getArticles, type CmsArticle } from "@/lib/cms";
import { articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";

type FrenchArticleRouteProps = {
  searchParams: Promise<{ slug?: string }>;
};

function heroImageSrc(article: CmsArticle) {
  return (
    article.image?.large ??
    article.image?.full ??
    article.image?.medium ??
    article.image?.thumbnail
  );
}

export async function generateMetadata({ searchParams }: FrenchArticleRouteProps): Promise<Metadata> {
  const { slug } = await searchParams;

  if (!slug) {
    return {
      title: "Article introuvable | AWENE",
    };
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article introuvable | AWENE" };
  }

  return {
    title: `${article.title} | AWENE`,
    description: article.excerpt,
  };
}

export default async function FrenchArticleRoute({
  searchParams,
}: FrenchArticleRouteProps) {
  const { slug } = await searchParams;

  if (!slug) {
    notFound();
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = (await getArticles(100))
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  const imageSrc = heroImageSrc(article);
  const categories =
    article.categories.length > 0
      ? article.categories
      : [{ name: article.category, slug: article.category }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "Articles", path: "/fr/articles" },
            { name: article.title, path: `/fr/articles/${article.slug}` },
          ]),
          webPageSchema({
            path: `/fr/articles/${article.slug}`,
            title: `${article.title} | AWENE`,
            description: article.excerpt,
          }),
          articleSchema(article, `/fr/articles/${article.slug}`),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category.slug}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "#F3ECFB",
                    color: "#6F3FD6",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h1
              className="mb-8 text-5xl font-bold leading-tight md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              <span>{article.date}</span>
              <span className="h-1 w-1 rounded-full" style={{ background: "#E8DFF0" }} />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </Container>
      </section>

      {imageSrc ? (
        <div style={{ background: "#FCFAF8" }}>
          <Container className="pb-8">
            <div className="relative h-72 overflow-hidden rounded-3xl md:h-[460px]">
              <Image
                src={imageSrc}
                alt={article.image?.alt ?? article.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 1120px, 100vw"
              />
            </div>
          </Container>
        </div>
      ) : null}

      <Section background="white" size="md">
        <Container size="md">
          <article className="cms-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </Container>
      </Section>

      {relatedArticles.length > 0 ? (
        <Section background="offwhite" size="md">
          <Container size="md">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                  À lire aussi
                </p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Articles liés
                </h2>
              </div>
              <Link href="/fr/articles" className="text-sm font-semibold" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                Voir tous les articles
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/fr/articles/${related.slug}`}
                  className="rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(75,31,122,0.08)]"
                  style={{ borderColor: "#E8DFF0" }}
                >
                  <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                    {related.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <section
        className="relative overflow-hidden py-20 md:py-24"
        style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
              Ces articles vous parlent ?
            </h2>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Recevez chaque semaine des informations fiables sur la périménopause et la ménopause, directement dans votre boîte mail.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
