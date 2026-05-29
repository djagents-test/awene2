import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getFormationBySlug, getFormations, type CmsFormation } from "@/lib/cms";
import FormationRegistrationForm from "./FormationRegistrationForm";

type FormationPageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://awene.net";

function metaDescription(formation: CmsFormation) {
  return (
    formation.description ||
    `Formation AWENE : ${formation.title}. Comprendre la périménopause, la ménopause et la santé féminine avec des repères clairs et accessibles.`
  );
}

export async function generateStaticParams() {
  const formations = await getFormations();
  return formations.map((formation) => ({ slug: formation.slug }));
}

export async function generateMetadata({
  params,
}: FormationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    return {};
  }

  const title = `${formation.title} | Formation AWENE`;
  const description = metaDescription(formation);
  const canonical = `${siteUrl}/formations/${formation.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AWENE",
      type: "article",
    },
  };
}

function eventSchema(formation: CmsFormation) {
  const attendanceMode = {
    online: "https://schema.org/OnlineEventAttendanceMode",
    in_person: "https://schema.org/OfflineEventAttendanceMode",
    hybrid: "https://schema.org/MixedEventAttendanceMode",
  }[formation.format];

  const eventStatus = {
    upcoming: "https://schema.org/EventScheduled",
    sold_out: "https://schema.org/EventScheduled",
    past: "https://schema.org/EventCompleted",
    cancelled: "https://schema.org/EventCancelled",
  }[formation.status];

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: formation.title,
    description: metaDescription(formation),
    startDate: formation.startDate,
    endDate: formation.endDate || undefined,
    eventAttendanceMode: attendanceMode,
    eventStatus,
    location:
      formation.format === "online"
        ? {
            "@type": "VirtualLocation",
            name: "En ligne",
          }
        : {
            "@type": "Place",
            name: formation.location,
          },
    organizer: {
      "@type": "Organization",
      name: "AWENE",
      url: siteUrl,
    },
  };
}

function details(formation: CmsFormation) {
  return [
    ["Date", formation.date],
    ["Heure", formation.time || "Horaire à confirmer"],
    ["Durée", durationLabel(formation)],
    ["Format", formation.formatLabel],
    ["Lieu", formation.location],
    ["Langue", formation.languageLabel],
    ["Public", formation.audienceLabel],
    [
      "Places restantes",
      typeof formation.remainingSeats === "number"
        ? String(formation.remainingSeats)
        : "À confirmer",
    ],
    ["Prix", formation.price || "À confirmer"],
  ];
}

function durationLabel(formation: CmsFormation) {
  if (!formation.startTime || !formation.endTime) {
    return "À confirmer";
  }

  const [startHour, startMinute] = formation.startTime.split(":").map(Number);
  const [endHour, endMinute] = formation.endTime.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  const minutes = end - start;

  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "À confirmer";
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (hours && remainder) {
    return `${hours}h${String(remainder).padStart(2, "0")}`;
  }

  return hours ? `${hours}h` : `${remainder} min`;
}

export default async function FormationSinglePage({ params }: FormationPageProps) {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(formation)) }}
      />

      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full opacity-[0.13]"
            style={{
              background:
                "radial-gradient(circle at center, #6F3FD6 0%, #F3ECFB 58%, transparent 100%)",
            }}
          />
        </div>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Formation AWENE
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              {formation.title}
            </h1>
            <div
              className="mb-8 flex flex-wrap gap-2 text-xs font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {[
                formation.date,
                formation.time,
                formation.formatLabel,
                formation.location,
                formation.languageLabel,
                formation.audienceLabel,
                formation.statusLabel,
                typeof formation.remainingSeats === "number"
                  ? `${formation.remainingSeats} places restantes`
                  : undefined,
              ]
                .filter(Boolean)
                .map((item, index) => (
                  <span
                    key={`${index}-${item}`}
                    className="rounded-full border px-3 py-1"
                    style={{
                      background: "#fff",
                      borderColor: "#E8DFF0",
                      color: "#4B1F7A",
                    }}
                  >
                    {item}
                  </span>
                ))}
            </div>
            <Button href="#inscription" size="lg">
              Je m'inscris
            </Button>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div>
              <h2
                className="mb-6 text-4xl font-bold"
                style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
              >
                Aperçu de la formation
              </h2>
              {formation.description && (
                <p
                  className="mb-8 text-lg leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {formation.description}
                </p>
              )}
              {formation.content ? (
                <article
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: formation.content }}
                />
              ) : (
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Le contenu détaillé sera ajouté prochainement depuis le CMS.
                </p>
              )}
            </div>

            <aside
              className="h-fit rounded-3xl border p-6 md:p-7"
              style={{ background: "#FCFAF8", borderColor: "#E8DFF0" }}
            >
              <h2
                className="mb-5 text-2xl font-bold"
                style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
              >
                Détails pratiques
              </h2>
              <dl className="space-y-4">
                {details(formation).map(([label, value]) => (
                  <div key={label}>
                    <dt
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
                    >
                      {label}
                    </dt>
                    <dd
                      className="text-sm font-semibold"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h2
                className="mb-6 text-4xl font-bold"
                style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
              >
                Ce que vous allez apprendre
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Comprendre les repères clés de cette transition.",
                  "Identifier les signaux du corps sans dramatiser.",
                  "Relier fatigue, sommeil, stress et charge mentale.",
                  "Savoir quand orienter vers un professionnel de santé.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border bg-white p-5 text-sm font-semibold"
                    style={{ borderColor: "#E8DFF0", color: "#2E2438" }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2
                className="mb-6 text-4xl font-bold"
                style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
              >
                Pour qui ?
              </h2>
              <div
                className="rounded-3xl border bg-white p-7"
                style={{ borderColor: "#E8DFF0" }}
              >
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}
                >
                  {formation.audienceLabel}
                </p>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Cette formation s'adresse aux publics indiqués dans le CMS
                  AWENE et garde un langage clair, humain et accessible.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="inscription" background="offwhite" size="lg">
        <Container size="lg">
          <FormationRegistrationForm formation={formation} />
        </Container>
      </Section>
    </>
  );
}
