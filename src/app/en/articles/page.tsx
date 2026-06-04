import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getArticles } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Articles | AWENE" },
  description:
    "Science-based articles on menopause, perimenopause, hormones and women's health.",
};

export default async function ArticlesPage() {
  const articles = await getArticles(100, "en");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Articles", path: "/en/articles" },
          ]),
          webPageSchema({
            path: "/en/articles",
            title: "Articles | AWENE",
            description:
              "Science-based articles on menopause, perimenopause, hormones and women's health.",
            type: "CollectionPage",
            inLanguage: "en",
          }),
          itemListSchema(
            "/en/articles",
            articles.map((article) => ({ name: article.title, url: absoluteUrl(`/en/articles/${article.slug}`) })),
          ),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Resources
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Articles
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Clear writing to help you understand what is happening in your body and what you can do next.
            </p>
          </div>
        </Container>
      </section>
      <Section background="white" size="lg">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/articles/${article.slug}`} className="rounded-3xl border bg-[#FCFAF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(75,31,122,0.08)]" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-3 text-2xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{article.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
