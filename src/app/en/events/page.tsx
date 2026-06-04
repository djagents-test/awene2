import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { NEWSLETTER_SIGNUP_URL_EN } from "@/lib/newsletter";
import { breadcrumbSchema, cmsEventSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AWENE Events | Menopause & Perimenopause Workshops",
  description:
    "Workshops, webinars and gatherings centred on menopause and perimenopause — to understand what's happening, share it with others, and keep moving forward. Subscribe to the newsletter to hear about them first.",
  keywords: [
    "menopause workshop",
    "MENA menopause events",
    "perimenopause webinar",
    "women's health workshop",
    "menopause conference",
    "women over 40",
    "hormones webinar",
  ],
};

function eventImageSrc(event: CmsEvent) {
  return event.image?.large ?? event.image?.medium ?? event.image?.full ?? event.image?.thumbnail;
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Events", path: "/en/events" },
          ]),
          webPageSchema({
            path: "/en/events",
            title: "AWENE Events | Menopause & Perimenopause Workshops",
            description:
              "Workshops, webinars and gatherings centred on menopause and perimenopause — to understand what's happening, share it with others, and keep moving forward. Subscribe to the newsletter to hear about them first.",
            type: "CollectionPage",
            inLanguage: "en",
          }),
          ...events.map((event) => cmsEventSchema(event, "/en/events")),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Events
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Spaces to Come Together
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Workshops, webinars and gatherings around menopause and perimenopause — to understand what&apos;s happening, share it with others, and keep moving forward.
            </p>
          </div>
        </Container>
      </section>

      <Section background="offwhite" size="lg">
        <Container>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
            Upcoming Events
          </p>
          <h2 className="mb-6 text-center text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Upcoming events
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-base leading-relaxed md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
            Events coming soon — subscribe to the newsletter to be the first to hear.
          </p>
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => {
                const imageSrc = eventImageSrc(event);

                return (
                  <div key={event.id} className="group overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:shadow-[0_18px_42px_rgba(75,31,122,0.1)]" style={{ borderColor: "#E8DFF0" }}>
                    {imageSrc ? (
                      <div className="relative h-56 md:h-72">
                        <Image src={imageSrc} alt={event.image?.alt ?? event.title} fill className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:justify-between md:p-8">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${event.color}18`, color: event.color, fontFamily: "var(--font-inter)" }}>
                            {event.type}
                          </span>
                          <span className="text-xs font-medium tracking-wide" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                            {event.date}
                          </span>
                          {event.status && event.status !== "upcoming" ? (
                            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#FEF3E8", color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                              {event.status}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6] md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                          {event.title}
                        </h3>
                        <p className="max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                          {event.description}
                        </p>
                        {event.time || event.location || event.price ? (
                          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                            {event.time ? <span>{event.time}</span> : null}
                            {event.location ? <span>{event.location}</span> : null}
                            {event.price ? <span>{event.price}</span> : null}
                          </div>
                        ) : null}
                      </div>
                      <Button href={event.url ?? "/en/contact"} variant="outline" size="sm" external={Boolean(event.url)}>
                        Keep me informed
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="group mx-auto max-w-3xl rounded-3xl border bg-white px-8 py-12 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8C7F3] hover:shadow-[0_14px_30px_rgba(75,31,122,0.08)] md:px-12" style={{ borderColor: "#E8DFF0" }}>
              <p className="text-base leading-relaxed transition-colors duration-300 group-hover:text-[#4B1F7A] md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                Events coming soon — subscribe to the newsletter to be the first to hear.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <section className="relative overflow-x-hidden overflow-y-hidden py-20 md:py-24" style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}>
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center text-center">
            <h2
              className="mb-4 max-w-full text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#F3ECFB",
                fontSize: "clamp(2.2rem, 5vw, 4.75rem)",
                lineHeight: 1.05,
                maxWidth: "min(100%, 1100px)",
                marginInline: "auto",
                overflowWrap: "normal",
                wordBreak: "normal",
              }}
            >
              Subscribe to the newsletter to hear first
            </h2>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Join the AWENE newsletter to receive event announcements before everyone else.
            </p>
            <div className="mt-8">
              <Button href={NEWSLETTER_SIGNUP_URL_EN} variant="light" size="lg" external>
                Sign me up for the newsletter
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
