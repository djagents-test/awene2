import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getArticleBySlug, getArticles, type CmsArticle } from "@/lib/cms";
import { articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";

function heroImageSrc(article: CmsArticle) {
  return article.image?.large ?? article.image?.full ?? article.image?.medium ?? article.image?.thumbnail;
}

type Props = {
  searchParams: Promise<{ slug?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { slug } = await searchParams;
  if (!slug) {
    return { title: "Article not found | AWENE" };
  }
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article not found | AWENE" };
  }
  return {
    title: `${article.title} | AWENE`,
    description: article.excerpt,
  };
}

export default async function EnglishArticlePage({ searchParams }: Props) {
  const { slug } = await searchParams;
  if (!slug) {
    notFound();
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const related = (await getArticles(100, "en")).filter((item) => item.slug !== article.slug).slice(0, 3);
  const imageSrc = heroImageSrc(article);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Articles", path: "/en/articles" },
            { name: article.title, path: `/en/articles/${article.slug}` },
          ]),
          webPageSchema({
            path: `/en/articles/${article.slug}`,
            title: `${article.title} | AWENE`,
            description: article.excerpt,
            inLanguage: "en",
          }),
          articleSchema(article, `/en/articles/${article.slug}`),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-6xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
              {article.title}
            </h1>
            <div className="text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              {article.date} · {article.readTime} read
            </div>
          </div>
        </Container>
      </section>
      {imageSrc ? (
        <div style={{ background: "#FCFAF8" }}>
          <Container className="pb-8">
            <div className="relative h-72 overflow-hidden rounded-3xl md:h-[460px]">
              <Image src={imageSrc} alt={article.image?.alt ?? article.title} fill className="object-cover" sizes="(min-width: 1280px) 1120px, 100vw" />
            </div>
          </Container>
        </div>
      ) : null}
      <Section background="white" size="md">
        <Container size="md">
          <article className="cms-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </Container>
      </Section>
      {related.length ? (
        <Section background="offwhite" size="md">
          <Container size="md">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
                Related articles
              </h2>
              <Link href="/en/articles" className="text-sm font-semibold" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                View all articles
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/en/articles/${item.slug}`} className="rounded-3xl border bg-white p-6" style={{ borderColor: "#E8DFF0" }}>
                  <h3 className="mb-3 text-xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
