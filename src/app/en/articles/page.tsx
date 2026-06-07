import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import ArticlesGrid from "@/components/ui/ArticlesGrid";
import NewsletterSignupForm from "@/components/ui/NewsletterSignupForm";
import { getArticles } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Articles | AWENE — Understanding Menopause and Perimenopause",
  description:
    "Honest, science-based articles on menopause, perimenopause, hormones and women's health. Written to help you understand what is happening in your body — and actually do something about it.",
  keywords: [
    "menopause articles",
    "understanding perimenopause",
    "women's health menopause",
    "hot flashes explained",
    "hormonal fatigue",
    "menopause brain fog",
    "nervous system",
    "estrogen",
  ],
};

export default async function ArticlesPage() {
  const articles = await getArticles(100, "en");
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.id !== featured?.id);
  const featuredImageSrc = featured?.image
    ? featured.image.large ??
      featured.image.medium ??
      featured.image.full ??
      featured.image.thumbnail
    : undefined;

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
            title: "Articles | AWENE — Understanding Menopause and Perimenopause",
            description:
              "Honest, science-based articles on menopause, perimenopause, hormones and women's health. Written to help you understand what is happening in your body — and actually do something about it.",
            type: "CollectionPage",
            inLanguage: "en",
          }),
          itemListSchema(
            "/en/articles",
            articles.map((article) => ({
              name: article.title,
              url: absoluteUrl(`/en/articles/${article.slug}`),
            })),
          ),
        ]}
      />
      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src="/images/awene-femme-professionnelle-accompagnement.jpg"
          alt=""
          title="Professional Guidance and Confidence"
          fill
          priority
          aria-hidden="true"
          className="object-cover object-[50%_6%] md:object-[50%_10%] xl:object-[50%_14%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,250,248,0.95)_0%,rgba(252,250,248,0.82)_48%,rgba(252,250,248,0.26)_100%)]" />
        <Container className="relative z-10 flex min-h-[72vh] items-end pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Articles
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Articles
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Honest, science-based articles on menopause, perimenopause, hormones and women&apos;s health. Written to help you understand what is happening in your body — and actually do something about it.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16" style={{ background: "#F3ECFB" }}>
        <Container>
          {featured ? (
            <>
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                Featured
              </p>
              <Link href={`/en/articles/${featured.slug}`} className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-[#F3ECFB] md:h-80">
                  <Image
                    src={featured.image && featuredImageSrc ? featuredImageSrc : "/images/awene-femme-professionnelle-accompagnement.jpg"}
                    alt={featured.image?.alt ?? "Portrait of a professional woman in a professional environment"}
                    title={featured.image?.alt ?? "Professional Guidance and Confidence"}
                    fill
                    className={`object-cover ${featured.image && featuredImageSrc ? "" : "object-[50%_6%] md:object-[50%_10%] xl:object-[50%_14%]"}`}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[#2E2438]/15" aria-hidden="true" />
                </div>
                <div>
                  {featured.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {featured.categories.map((cat) => (
                        <span key={cat.slug} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#6F3FD6", color: "#fff", fontFamily: "var(--font-inter)" }}>
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="mb-4 text-3xl font-bold leading-tight transition-colors group-hover:text-[#6F3FD6] md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                    {featured.title}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {featured.excerpt}
                  </p>
                  {featured.date && (
                    <p className="text-xs" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>
                      {featured.date}{featured.readTime ? ` · ${featured.readTime}` : ""}
                    </p>
                  )}
                </div>
              </Link>
            </>
          ) : null}
        </Container>
      </section>

      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          <ArticlesGrid articles={rest} locale="en" />
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-24" style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}>
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <h2
              className="mb-4 text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "rgb(243, 236, 251)",
                fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                lineHeight: 1.1,
                maxWidth: "min(100%, 48rem)",
                marginInline: "auto",
                overflowWrap: "normal",
                wordBreak: "normal",
              }}
            >
              Do these articles speak to you?
            </h2>
            <p className="mb-8 text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Get reliable, science-based writing on perimenopause and menopause — once a week, straight to your inbox.
            </p>
            <div className="w-full max-w-sm">
              <NewsletterSignupForm locale="en" variant="dark" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
