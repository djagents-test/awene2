"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CmsFormation } from "@/lib/cms";

type FilterState = {
  date: "all" | "upcoming" | "month";
  format: "all" | CmsFormation["format"];
  audience: "all" | CmsFormation["audience"];
  language: "all" | CmsFormation["language"];
  status: "all" | CmsFormation["status"];
};

type Faq = {
  question: string;
  answer: string;
};

const filters = {
  date: [
    ["all", "All dates"],
    ["upcoming", "Upcoming"],
    ["month", "This month"],
  ],
  format: [
    ["all", "All formats"],
    ["online", "Online"],
    ["in_person", "In person"],
    ["hybrid", "Hybrid"],
  ],
  audience: [
    ["all", "All audiences"],
    ["particuliers", "Individuals"],
    ["entreprises", "Companies"],
    ["professionnels", "Professionals"],
  ],
  language: [
    ["all", "All languages"],
    ["fr", "French"],
    ["ar", "Arabic"],
    ["en", "English"],
  ],
  status: [
    ["all", "All statuses"],
    ["upcoming", "Upcoming"],
    ["sold_out", "Sold out"],
    ["past", "Past"],
    ["cancelled", "Cancelled"],
  ],
} as const;

const statusStyles = {
  upcoming: { background: "#F3ECFB", color: "#6F3FD6" },
  sold_out: { background: "#FEF3E8", color: "#F68B2C" },
  past: { background: "#F8EEF5", color: "#4B1F7A" },
  cancelled: { background: "#F8EEF5", color: "#6E6478" },
};

const statusLabelsEn: Record<CmsFormation["status"], string> = {
  upcoming: "Upcoming",
  sold_out: "Sold out",
  past: "Past",
  cancelled: "Cancelled",
};

function isThisMonth(date?: string) {
  if (!date) return false;
  const parsed = new Date(date);
  const now = new Date();
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getFullYear() === now.getFullYear()
  );
}

function trackingPayload(formation: CmsFormation, ctaText: string) {
  const params =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);

  return {
    formation_title: formation.title,
    formation_date: formation.date,
    formation_format: formation.formatLabel,
    formation_language: formation.languageLabel,
    formation_audience: formation.audienceLabel,
    formation_status: formation.statusLabel,
    source_page: "en/formations",
    cta_text: ctaText,
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
  };
}

function trackFormationCta(formation: CmsFormation, ctaText: string) {
  const payload = trackingPayload(formation, ctaText);
  window.dispatchEvent(new CustomEvent("awene:formation_cta", { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event: "formation_cta_click", ...payload });
}

function ctaForFormation(formation: CmsFormation) {
  if (formation.status === "sold_out" || formation.remainingSeats === 0) {
    return { text: "Sold out", href: "", disabled: true, external: false };
  }
  if (formation.status === "past") {
    return { text: "See upcoming training sessions", href: "/en/formations", disabled: false, external: false };
  }
  if (formation.status === "cancelled") {
    return { text: "Cancelled", href: "", disabled: true, external: false };
  }
  return { text: "Register", href: `/formations/${formation.slug}`, disabled: false, external: false };
}

function FormationCard({ formation }: { formation: CmsFormation }) {
  const cta = ctaForFormation(formation);

  return (
    <article
      className="group rounded-3xl border bg-white p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_48px_rgba(110,63,214,0.12)]"
      style={{ borderColor: "#E8DFF0" }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ ...statusStyles[formation.status], fontFamily: "var(--font-inter)" }}
        >
          {statusLabelsEn[formation.status]}
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: "#FCFAF8", color: "#6E6478", border: "1px solid #E8DFF0", fontFamily: "var(--font-inter)" }}
        >
          {formation.audienceLabel}
        </span>
      </div>

      <h3
        className="mb-4 text-2xl font-bold leading-tight md:text-3xl"
        style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
      >
        {formation.title}
      </h3>

      <dl
        className="mb-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2"
        style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
      >
        <div>
          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Date</dt>
          <dd>{formation.date}</dd>
        </div>
        {formation.time && (
          <div>
            <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Time</dt>
            <dd>{formation.time}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Format</dt>
          <dd>{formation.formatLabel}</dd>
        </div>
        <div>
          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Location</dt>
          <dd>{formation.location}</dd>
        </div>
        <div>
          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Language</dt>
          <dd>{formation.languageLabel}</dd>
        </div>
        {typeof formation.remainingSeats === "number" && (
          <div>
            <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Seats</dt>
            <dd>{formation.remainingSeats} remaining</dd>
          </div>
        )}
      </dl>

      {formation.description && (
        <p className="mb-7 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {formation.description}
        </p>
      )}

      {cta.disabled ? (
        <button
          type="button"
          disabled
          className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold opacity-55 sm:w-auto"
          style={{ background: "#E8DFF0", color: "#6E6478", fontFamily: "var(--font-inter)" }}
        >
          {cta.text}
        </button>
      ) : (
        <a
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          onClick={() => trackFormationCta(formation, cta.text)}
          className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] sm:w-auto"
          style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", fontFamily: "var(--font-inter)" }}
        >
          {cta.text}
        </a>
      )}
    </article>
  );
}

export function EnglishFormationFilters({ formations }: { formations: CmsFormation[] }) {
  const [filterState, setFilterState] = useState<FilterState>({
    date: "all",
    format: "all",
    audience: "all",
    language: "all",
    status: "all",
  });

  const filteredFormations = useMemo(
    () =>
      formations.filter((formation) => {
        if (filterState.format !== "all" && formation.format !== filterState.format) return false;
        if (filterState.audience !== "all" && formation.audience !== filterState.audience) return false;
        if (filterState.language !== "all" && formation.language !== filterState.language) return false;
        if (filterState.status !== "all" && formation.status !== filterState.status) return false;
        if (filterState.date === "upcoming" && formation.status !== "upcoming") return false;
        if (filterState.date === "month" && !isThisMonth(formation.startDate)) return false;
        return true;
      }),
    [filterState, formations],
  );

  return (
    <div id="upcoming-training">
      <div
        className="mb-8 rounded-3xl border p-4 md:p-6"
        style={{ background: "#FCFAF8", borderColor: "#E8DFF0" }}
      >
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
        >
          Filter by
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(Object.keys(filters) as Array<keyof FilterState>).map((key) => (
            <select
              key={key}
              aria-label={`Filter by ${key}`}
              value={filterState[key]}
              onChange={(event) =>
                setFilterState((current) => ({ ...current, [key]: event.target.value }))
              }
              className="min-h-12 rounded-full border px-4 text-sm font-semibold outline-none transition-colors focus:border-[#6F3FD6]"
              style={{ background: "#fff", borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
            >
              {filters[key].map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {filteredFormations.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredFormations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
      ) : (
        <div
          className="grid items-center gap-8 rounded-3xl border p-8 text-center md:p-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(240px,0.45fr)] lg:text-left"
          style={{ background: "#fff", borderColor: "#E8DFF0" }}
        >
          <div>
            <h3
              className="mb-3 text-2xl font-bold"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              No training sessions scheduled at the moment.
            </h3>
            <p
              className="mx-auto max-w-xl text-base leading-relaxed lg:mx-0"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Upcoming dates will be published here as soon as they are confirmed. You can also request a custom session.
            </p>
            <a
              href="/en/contact?sujet=Formation%20sur%20mesure"
              className="mt-7 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", fontFamily: "var(--font-inter)" }}
            >
              Request a custom training session
            </a>
          </div>
          <div className="relative aspect-[1.15/1] w-full overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/formations-empty-state.jpg"
              alt="Woman reflecting"
              fill
              className="object-cover object-center grayscale"
              sizes="(min-width: 1024px) 24rem, 100vw"
            />
            <div className="absolute inset-0 bg-[#2E2438]/18" aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}

export function EnglishFormationsFAQ({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-2xl border transition-all duration-200"
          style={{
            borderColor: openIndex === index ? "#6F3FD6" : "#E8DFF0",
            background: openIndex === index ? "#F3ECFB" : "#fff",
          }}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={openIndex === index}
          >
            <span
              className="text-base font-semibold leading-snug"
              style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
            >
              {faq.question}
            </span>
            <span
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm transition-transform duration-200"
              style={{
                background: openIndex === index ? "#6F3FD6" : "#E8DFF0",
                color: openIndex === index ? "#fff" : "#6E6478",
                transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              <p className="text-base leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
