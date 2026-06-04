import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
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
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
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

      <section className="py-16 md:py-20" style={{ background: "#F3ECFB" }}>
        <Container>
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
              Three Themes
            </p>
            <h2 className="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Articles are organised around the three AWENE pillars.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}>
                  Understand
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  The biology, the hormones, the mechanisms — explained clearly. Examples: &quot;What Is Perimenopause, Really?&quot;, &quot;Why Hot Flashes Happen at Night&quot;, &quot;Oestrogen and Progesterone: What Actually Changes After 40&quot;.
                </p>
              </article>
              <article className="rounded-3xl border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                  Regulate
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  The nervous system, sleep, metabolism — and why they matter. Examples: &quot;Your Nervous System and Menopause: The Connection Nobody Talks About&quot;, &quot;Why You Wake Up at 3am During Perimenopause&quot;, &quot;Chronic Stress and Hot Flashes: What the Science Says&quot;.
                </p>
              </article>
              <article className="rounded-3xl border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#F68B2C" }}>
                  Embody
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Habits, daily life, changes that actually stick. Examples: &quot;Menopause Weight Gain: What Actually Works&quot;, &quot;Brain Fog: 5 Strategies That Are Actually Validated&quot;, &quot;How to Move Your Body When You Have No Energy&quot;.
                </p>
              </article>
            </div>
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
                  {featured.image && featuredImageSrc ? (
                    <>
                      <Image src={featuredImageSrc} alt={featured.image.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                      <div className="absolute inset-0 bg-[#2E2438]/15" aria-hidden="true" />
                    </>
                  ) : null}
                </div>
                <div>
                  <h2 className="mb-4 text-3xl font-bold leading-tight transition-colors group-hover:text-[#6F3FD6] md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                    {featured.title}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {featured.excerpt}
                  </p>
                </div>
              </Link>
            </>
          ) : null}
        </Container>
      </section>

      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => {
                const imageSrc = article.image
                  ? article.image.thumbnail ??
                    article.image.medium ??
                    article.image.large ??
                    article.image.full
                  : undefined;

                return (
                  <Link
                    key={article.slug}
                    href={`/en/articles/${article.slug}`}
                    className="group block overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(110,63,214,0.1)]"
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    {article.image && imageSrc ? (
                      <div className="relative h-40">
                        <Image src={imageSrc} alt={article.image.alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <h3 className="mb-3 text-xl font-bold leading-snug transition-colors group-hover:text-[#6F3FD6]" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                        {article.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Articles will be published soon.
            </p>
          )}
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-24" style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}>
        <Container className="relative z-10">
          <div className="max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
              Do these articles speak to you?
            </h2>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Get reliable, science-based writing on perimenopause and menopause — once a week, straight to your inbox.
            </p>
            <div className="mt-8">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#4B1F7A] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Sign me up for the newsletter
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
