import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import NewsletterBand from "@/components/sections/NewsletterBand";
import { getArticleBySlug, type CmsArticle } from "@/lib/cms";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function heroImageSrc(article: CmsArticle) {
  return (
    article.image?.large ??
    article.image?.full ??
    article.image?.medium ??
    article.image?.thumbnail
  );
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable | AWENE",
    };
  }

  const imageSrc = heroImageSrc(article);

  return {
    title: `${article.title} | AWENE`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | AWENE`,
      description: article.excerpt,
      images: imageSrc
        ? [
            {
              url: imageSrc,
              alt: article.image?.alt ?? article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const imageSrc = heroImageSrc(article);
  const categories =
    article.categories.length > 0
      ? article.categories
      : [{ name: article.category, slug: article.category }];

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "#FCFAF8" }}
      >
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <span
                  key={category.slug}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
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
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {article.title}
            </h1>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "#E8DFF0" }} />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </Container>
      </section>

      {imageSrc && (
        <div style={{ background: "#FCFAF8" }}>
          <Container className="pb-8">
            <div
              className="h-72 md:h-[460px] rounded-3xl overflow-hidden relative"
            >
              <Image
                src={imageSrc}
                alt={article.image?.alt ?? article.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1280px) 1120px, 100vw"
              />
            </div>
          </Container>
        </div>
      )}

      <Section background="white" size="md">
        <Container size="md">
          <article
            className="cms-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Container>
      </Section>

      <NewsletterBand
        headline="Ces articles vous parlent ?"
        body="Recevez chaque semaine des informations fiables sur la périménopause et la ménopause, directement dans votre boîte mail."
      />
    </>
  );
}
