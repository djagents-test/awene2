import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getEvents, type CmsEvent } from "@/lib/cms";

function eventImageSrc(event: CmsEvent) {
  return (
    event.image?.medium ??
    event.image?.thumbnail ??
    event.image?.large ??
    event.image?.full
  );
}

export default async function EventsPreview() {
  const events = (await getEvents(2)).slice(0, 2);

  return (
    <Section background="offwhite" size="lg">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Événements"
            title="Des espaces de rencontre"
            subtitle="Webinaires, ateliers et moments de partage pour les femmes du mouvement."
            align="left"
            className="mb-0"
          />
          <Button href="/evenements" variant="outline">
            Voir les événements
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => {
              const imageSrc = eventImageSrc(event);

              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-[#E8DFF0] bg-white overflow-hidden hover:shadow-[0_8px_32px_rgba(110,63,214,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  {imageSrc && (
                    <div className="relative h-44">
                      <Image
                        src={imageSrc}
                        alt={event.image?.alt ?? event.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-5">
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
                        className="text-xs font-medium tracking-wide text-right"
                        style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                      >
                        {event.date}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {event.description}
                    </p>
                    {(event.time || event.location) && (
                      <p
                        className="text-xs font-medium mb-6"
                        style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                      >
                        {[event.time, event.location].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <Button
                      href={event.url ?? "/evenements"}
                      variant="ghost"
                      size="sm"
                      external={Boolean(event.url)}
                    >
                      <span className="flex items-center gap-2">
                        M&apos;informer
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p
            className="text-base"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            Les prochains événements seront annoncés bientôt.
          </p>
        )}
      </Container>
    </Section>
  );
}
