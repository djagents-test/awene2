"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import EditorialImageBlock from "@/components/ui/EditorialImageBlock";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";
import type { CmsArticle } from "@/lib/cms";

type Pillar = "Tous" | "Comprendre" | "Réguler" | "Incarner";

const pillarColors: Record<Pillar, { text: string; bg: string }> = {
  Tous: { text: "#6F3FD6", bg: "#F3ECFB" },
  Comprendre: { text: "#6F3FD6", bg: "#F3ECFB" },
  Réguler: { text: "#4B1F7A", bg: "#F8EEF5" },
  Incarner: { text: "#F68B2C", bg: "#FEF3E8" },
};

const PILLARS: Pillar[] = ["Tous", "Comprendre", "Réguler", "Incarner"];

type ArticlesListProps = {
  articles: CmsArticle[];
  labels?: {
    empty: string;
    featured: string;
    all: string;
  };
};

function CategoryChips({ article }: { article: CmsArticle }) {
  const categories =
    article.categories.length > 0
      ? article.categories
      : [{ name: article.category, slug: article.category }];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category.slug}
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
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
  );
}

function articleImageSrc(article: CmsArticle, preferred: "thumbnail" | "large") {
  if (!article.image) {
    return undefined;
  }

  if (preferred === "thumbnail") {
    return (
      article.image.thumbnail ??
      article.image.medium ??
      article.image.large ??
      article.image.full
    );
  }

  return (
    article.image.large ??
    article.image.medium ??
    article.image.full ??
    article.image.thumbnail
  );
}

export default function ArticlesList({
  articles,
  labels = {
    empty: "Les articles seront publiés prochainement.",
    featured: "À la une",
    all: "Tous",
  },
}: ArticlesListProps) {
  const [active, setActive] = useState<Pillar>("Tous");

  if (articles.length === 0) {
    return (
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          <div className="grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(260px,0.42fr)]">
            <div className="text-center lg:text-left">
              <p
                className="text-base"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {labels.empty}
              </p>
            </div>
            <PlaceholderVisual variant="card" tone="violet" className="aspect-[1.25/1] w-full" />
          </div>
        </Container>
      </section>
    );
  }

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const filtered =
    active === "Tous"
      ? articles.filter((a) => a.id !== featured.id)
      : articles.filter((a) => a.pillar === active && a.id !== featured.id);

  const featuredImageSrc = articleImageSrc(featured, "large");

  return (
    <>
      {/* Featured */}
      <section className="py-16" style={{ background: "#F3ECFB" }}>
        <Container>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
            style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
          >
            {labels.featured}
          </p>
          <Link
            href={`/articles/${featured.slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div
              className="h-64 md:h-80 rounded-3xl overflow-hidden relative flex items-center justify-center"
              style={{
                background: featured.image
                  ? "#F3ECFB"
                  : "linear-gradient(135deg, #6F3FD6 0%, #4B1F7A 100%)",
              }}
            >
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
              ) : (
                <EditorialImageBlock
                  placement="articlesFeaturedFallback"
                  variant="portrait"
                  tone="plum"
                  className="absolute inset-0"
                />
              )}
              <div className="absolute left-5 top-5 z-10">
                <CategoryChips article={featured} />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <CategoryChips article={featured} />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-[#6F3FD6] transition-colors"
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
        </Container>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {PILLARS.map((pillar) => {
              const isActive = pillar === active;
              const colors = pillarColors[pillar];
              const label = pillar === "Tous" ? labels.all : pillar;
              return (
                <button
                  key={pillar}
                  onClick={() => setActive(pillar)}
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? colors.text : "transparent",
                    border: `1.5px solid ${isActive ? colors.text : "#E8DFF0"}`,
                    color: isActive ? "#fff" : "#6E6478",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => {
                const colors = pillarColors[article.pillar];
                const imageSrc = articleImageSrc(article, "thumbnail");
                return (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group block rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-[0_8px_40px_rgba(110,63,214,0.1)] hover:-translate-y-1"
                    style={{ borderColor: "#E8DFF0", background: "#fff" }}
                  >
                    <div
                      className="h-40 relative flex items-center justify-center"
                      style={{
                        background: article.image ? "#F3ECFB" : colors.bg,
                      }}
                    >
                      {article.image && imageSrc ? (
                        <>
                          <Image
                            src={imageSrc}
                            alt={article.image.alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-[#2E2438]/10" aria-hidden="true" />
                        </>
                      ) : (
                        <PlaceholderVisual
                          variant={article.pillar === "Incarner" ? "nature" : article.pillar === "Réguler" ? "nervous-system" : "card"}
                          tone={article.pillar === "Incarner" ? "apricot" : article.pillar === "Réguler" ? "plum" : "violet"}
                          className="absolute inset-0 border-0 shadow-none"
                        />
                      )}
                      <div className="absolute left-4 top-4 z-10">
                        <CategoryChips article={article} />
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
                        className="text-sm leading-relaxed"
                        style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                      >
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.54fr)_minmax(260px,0.46fr)]">
              <div className="text-center lg:text-left">
                <p
                  className="text-base"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Les articles de cette catégorie arrivent bientôt.
                </p>
              </div>
              <PlaceholderVisual variant="breathing" tone="mixed" className="aspect-[1.25/1] w-full" />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
