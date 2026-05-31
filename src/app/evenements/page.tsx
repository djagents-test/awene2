import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";
import NewsletterBand from "@/components/sections/NewsletterBand";
import { getEvents, type CmsEvent } from "@/lib/cms";
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
            { name: "Accueil", path: "/" },
            { name: "Événements", path: "/evenements" },
          ]),
          webPageSchema({
            path: "/evenements",
            title: "Événements AWENE | Ateliers ménopause et périménopause",
            description:
              "Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause. Des espaces pour comprendre, partager et avancer ensemble. Inscrivez-vous à la newsletter pour être informée en première.",
            type: "CollectionPage",
          }),
          ...events.map((event) => cmsEventSchema(event)),
        ]}
      />
      <PageHero
        eyebrow="Événements"
        title="Des espaces de rencontre"
        subtitle="Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause, pour comprendre, partager et avancer ensemble."
        visual
        visualPlacement="eventsHero"
        visualVariant="movement"
        visualTone="mixed"
        blobs
      />

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
                      href={event.url ?? "/contact"}
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
      <NewsletterBand
        headline="Je m'inscris à la newsletter pour être informé-e en premier"
        body="Inscrivez-vous à la newsletter AWENE pour recevoir les annonces d'événements avant tout le monde."
      />
    </>
  );
}
