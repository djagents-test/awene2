import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getRecentArticles, type CmsArticle } from "@/lib/cms";

function thumbnailSrc(article: CmsArticle) {
  return (
    article.image?.thumbnail ??
    article.image?.medium ??
    article.image?.large ??
    article.image?.full
  );
}

export default async function ArticlesPreview() {
  const articles = await getRecentArticles(3);

  return (
    <Section background="lavender" size="lg">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Articles"
            title="Comprendre pour transformer"
            subtitle="Des ressources sérieuses, accessibles, écrites avec intention."
            align="left"
            className="mb-0"
          />
          <Button href="/articles" variant="outline">
            Tous les articles
          </Button>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => {
              const imageSrc = thumbnailSrc(article);

              return (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden border border-[#E8DFF0] hover:shadow-[0_8px_40px_rgba(110,63,214,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="h-44 relative overflow-hidden"
                    style={{
                      background: imageSrc
                        ? "#F3ECFB"
                        : "linear-gradient(135deg, #F3ECFB 0%, #F8EEF5 100%)",
                    }}
                  >
                    {imageSrc ? (
                      <>
                        <Image
                          src={imageSrc}
                          alt={article.image?.alt ?? article.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-[#2E2438]/10" aria-hidden="true" />
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-30"
                        aria-hidden="true"
                      >
                        <div
                          className="w-20 h-20 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, #6F3FD6 0%, transparent 70%)",
                          }}
                        />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {(article.categories.length > 0
                        ? article.categories
                        : [{ name: article.category, slug: article.category }]
                      ).map((category) => (
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
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3 leading-snug group-hover:text-[#6F3FD6] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {article.excerpt}
                    </p>
                    <div
                      className="flex items-center gap-3 text-xs"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      <span>{article.date}</span>
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: "#E8DFF0" }}
                      />
                      <span>{article.readTime} de lecture</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p
            className="text-base"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            Les articles seront publiés prochainement.
          </p>
        )}
      </Container>
    </Section>
  );
}
