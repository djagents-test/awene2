import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import { getArticles } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";

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
            { name: "Accueil", path: "/fr" },
            { name: "Articles", path: "/fr/articles" },
          ]),
          webPageSchema({
            path: "/fr/articles",
            title: "Articles | AWENE, Comprendre la ménopause et la périménopause",
            description:
              "Des articles scientifiques, clairs et accessibles sur la ménopause, la périménopause, les hormones et la santé féminine. Pour comprendre ce qui se passe dans votre corps, et agir.",
            type: "CollectionPage",
          }),
          itemListSchema(
            "/fr/articles",
            articles.map((article) => ({
              name: article.title,
              url: absoluteUrl(`/fr/articles/${article.slug}`),
            })),
          ),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Ressources
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Articles
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Des articles scientifiques, clairs et accessibles, pour comprendre ce qui se passe dans votre corps et agir.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16" style={{ background: "#F3ECFB" }}>
        <Container>
          {featured ? (
            <>
              <p
                className="mb-8 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
              >
                À la une
              </p>
              <Link
                href={`/fr/articles/${featured.slug}`}
                className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-[#F3ECFB] md:h-80">
                  {featured.image && featuredImageSrc ? (
                    <>
                      <Image
                        src={featuredImageSrc}
                        alt={featured.image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-[#2E2438]/15" aria-hidden="true" />
                    </>
                  ) : null}
                </div>
                <div>
                  <h2
                    className="mb-4 text-3xl font-bold leading-tight transition-colors group-hover:text-[#6F3FD6] md:text-4xl"
                    style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  >
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
              {rest.map((article) => (
                (() => {
                  const imageSrc = article.image
                    ? article.image.thumbnail ??
                      article.image.medium ??
                      article.image.large ??
                      article.image.full
                    : undefined;

                  return (
                    <Link
                      key={article.slug}
                      href={`/fr/articles/${article.slug}`}
                      className="group block overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(110,63,214,0.1)]"
                      style={{ borderColor: "#E8DFF0" }}
                    >
                      {article.image && imageSrc ? (
                        <div className="relative h-40">
                          <Image
                            src={imageSrc}
                            alt={article.image.alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <h3
                          className="mb-3 text-xl font-bold leading-snug transition-colors group-hover:text-[#6F3FD6]"
                          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                        >
                          {article.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                        >
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  );
                })()
              ))}
            </div>
          ) : (
            <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Les articles seront publiés prochainement.
            </p>
          )}
        </Container>
      </section>

      {/* ── NEWSLETTER ── */}
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
