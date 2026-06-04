import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { NEWSLETTER_SIGNUP_URL } from "@/lib/newsletter";
import { breadcrumbSchema, cmsEventSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Événements AWENE | Ateliers ménopause et périménopause",
  description:
    "Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause. Des espaces pour comprendre, partager et avancer ensemble. Inscrivez-vous à la newsletter pour être informée en première.",
  keywords: [
    "atelier ménopause",
    "événement ménopause MENA",
    "webinaire périménopause",
    "atelier santé féminine",
    "conférence ménopause",
    "rencontre femmes 40 ans",
    "webinaire hormones",
  ],
};

function eventImageSrc(event: CmsEvent) {
  return (
    event.image?.large ??
    event.image?.medium ??
    event.image?.full ??
    event.image?.thumbnail
  );
}

export default async function EvenementsPage() {
  const events = await getEvents();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "Événements", path: "/fr/evenements" },
          ]),
          webPageSchema({
            path: "/fr/evenements",
            title: "Événements AWENE | Ateliers ménopause et périménopause",
            description:
              "Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause. Des espaces pour comprendre, partager et avancer ensemble. Inscrivez-vous à la newsletter pour être informée en première.",
            type: "CollectionPage",
          }),
          ...events.map((event) => cmsEventSchema(event)),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Événements
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Des espaces de rencontre
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause, pour comprendre, partager et avancer ensemble.
            </p>
          </div>
        </Container>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <Section background="offwhite" size="lg">
        <Container>
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-center"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            Prochainement
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Prochains événements
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-12 text-center max-w-xl mx-auto"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            Prochains événements à venir, inscrivez-vous à la newsletter pour être informé-e en premier.
          </p>
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => {
                const imageSrc = eventImageSrc(event);

                return (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:shadow-[0_18px_42px_rgba(75,31,122,0.1)]"
                  style={{ borderColor: "#E8DFF0" }}
                >
                  {imageSrc && (
                    <div className="relative h-56 md:h-72">
                      <Image
                        src={imageSrc}
                        alt={event.image?.alt ?? event.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 768px, 100vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 p-6 md:p-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: event.color + "18",
                            color: event.color,
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {event.type}
                        </span>
                        <span
                          className="text-xs font-medium tracking-wide"
                          style={{
                            color: "#6E6478",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {event.date}
                        </span>
                        {event.status && event.status !== "upcoming" && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: "#FEF3E8",
                              color: "#F68B2C",
                              fontFamily: "var(--font-inter)",
                            }}
                          >
                            {event.status}
                          </span>
                        )}
                      </div>
                      <h3
                        className="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6] md:text-3xl"
                        style={{
                          fontFamily: "var(--font-playfair)",
                          color: "#2E2438",
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="text-sm md:text-base leading-relaxed max-w-2xl"
                        style={{
                          color: "#6E6478",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {event.description}
                      </p>
                      {(event.time || event.location || event.price) && (
                        <div
                          className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-sm font-medium"
                          style={{
                            color: "#6E6478",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {event.time && <span>{event.time}</span>}
                          {event.location && <span>{event.location}</span>}
                          {event.price && <span>{event.price}</span>}
                        </div>
                      )}
                    </div>
                    <Button
                      href={event.url ?? "/fr/contact"}
                      variant="outline"
                      size="sm"
                      external={Boolean(event.url)}
                    >
                      M&apos;informer
                    </Button>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div
              className="group mx-auto max-w-3xl rounded-3xl border bg-white px-8 py-12 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8C7F3] hover:shadow-[0_14px_30px_rgba(75,31,122,0.08)] md:px-12"
              style={{ borderColor: "#E8DFF0" }}
            >
              <p
                className="text-base leading-relaxed transition-colors duration-300 group-hover:text-[#4B1F7A] md:text-lg"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Prochains événements à venir, inscrivez-vous à la newsletter pour être informé-e en premier.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ── NEWSLETTER ── */}
      <section
        className="relative overflow-x-hidden overflow-y-hidden py-20 md:py-24"
        style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}
      >
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <h2
              className="mb-4 max-w-full text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#F3ECFB",
                fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                lineHeight: 1.1,
                maxWidth: "min(100%, 48rem)",
                marginInline: "auto",
                overflowWrap: "normal",
                wordBreak: "normal",
              }}
            >
              Je m&apos;inscris à la newsletter pour être informée en premier
            </h2>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Inscrivez-vous à la newsletter AWENE pour recevoir les annonces d&apos;événements avant tout le monde.
            </p>
            <div className="mt-8">
              <Button href={NEWSLETTER_SIGNUP_URL} variant="light" size="lg" external>
                Je m&apos;inscris à la newsletter
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
