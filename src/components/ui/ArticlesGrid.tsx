"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CmsArticle } from "@/lib/cms";

type Props = {
  articles: CmsArticle[];
  locale: "fr" | "en";
};

function formatDate(isoDate: string, locale: "fr" | "en") {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getYear(isoDate: string) {
  if (!isoDate) return null;
  const d = new Date(isoDate);
  return isNaN(d.getTime()) ? null : d.getFullYear();
}

function FilterPill({
  label,
  active,
  onClick,
  accent = "#6F3FD6",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200"
      style={{
        fontFamily: "var(--font-inter)",
        background: active ? accent : "#F3ECFB",
        color: active ? "#fff" : accent,
        border: "1.5px solid",
        borderColor: active ? accent : "#D8C7F3",
      }}
    >
      {label}
    </button>
  );
}

export default function ArticlesGrid({ articles, locale }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const allCategories = useMemo(() => {
    const seen = new Set<string>();
    const cats: { name: string; slug: string }[] = [];
    for (const article of articles) {
      for (const cat of article.categories) {
        if (!seen.has(cat.slug)) {
          seen.add(cat.slug);
          cats.push(cat);
        }
      }
    }
    return cats;
  }, [articles]);

  const allYears = useMemo(() => {
    const years = new Set<number>();
    for (const article of articles) {
      const y = getYear(article.isoDate);
      if (y) years.add(y);
    }
    return [...years].sort((a, b) => b - a); // newest first
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const catMatch =
        !activeCategory ||
        a.categories.some((c) => c.slug === activeCategory);
      const yearMatch =
        !activeYear || getYear(a.isoDate) === activeYear;
      return catMatch && yearMatch;
    });
  }, [articles, activeCategory, activeYear]);

  const allLabel = locale === "en" ? "All" : "Tous";
  const articlePath = (slug: string) =>
    locale === "en" ? `/en/articles/${slug}` : `/fr/articles/${slug}`;

  const noResults =
    locale === "en"
      ? "No articles match this filter."
      : "Aucun article ne correspond à ce filtre.";

  return (
    <div>
      {/* Filters row */}
      {(allCategories.length > 0 || allYears.length > 0) && (
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* Category filter */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <FilterPill
                label={allLabel}
                active={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              />
              {allCategories.map((cat) => (
                <FilterPill
                  key={cat.slug}
                  label={cat.name}
                  active={activeCategory === cat.slug}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.slug ? null : cat.slug,
                    )
                  }
                />
              ))}
            </div>
          )}

          {/* Divider */}
          {allCategories.length > 0 && allYears.length > 0 && (
            <div
              className="hidden h-5 w-px md:block"
              style={{ background: "#D8C7F3" }}
              aria-hidden="true"
            />
          )}

          {/* Year filter */}
          {allYears.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <FilterPill
                label={allLabel}
                active={activeYear === null}
                onClick={() => setActiveYear(null)}
                accent="#F68B2C"
              />
              {allYears.map((year) => (
                <FilterPill
                  key={year}
                  label={String(year)}
                  active={activeYear === year}
                  onClick={() =>
                    setActiveYear(activeYear === year ? null : year)
                  }
                  accent="#F68B2C"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const imageSrc = article.image
              ? article.image.thumbnail ??
                article.image.medium ??
                article.image.large ??
                article.image.full
              : undefined;

            return (
              <Link
                key={article.slug}
                href={articlePath(article.slug)}
                className="group flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(110,63,214,0.1)]"
                style={{ borderColor: "#E8DFF0" }}
              >
                {article.image && imageSrc ? (
                  <div className="relative h-40 flex-shrink-0">
                    <Image
                      src={imageSrc}
                      alt={article.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  {article.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {article.categories.map((cat) => (
                        <span
                          key={cat.slug}
                          className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{
                            background: "#F3ECFB",
                            color: "#6F3FD6",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3
                    className="mb-2 text-xl font-bold leading-snug transition-colors group-hover:text-[#6F3FD6]"
                    style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="mb-4 flex-1 text-sm leading-relaxed"
                    style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  >
                    {article.excerpt}
                  </p>
                  <div
                    className="mt-auto flex items-center gap-3 text-xs"
                    style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}
                  >
                    {article.isoDate && (
                      <span>{formatDate(article.isoDate, locale)}</span>
                    )}
                    {article.isoDate && article.readTime && (
                      <span aria-hidden="true">·</span>
                    )}
                    {article.readTime && <span>{article.readTime}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {noResults}
        </p>
      )}
    </div>
  );
}
