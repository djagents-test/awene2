import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { breadcrumbSchema, cmsEventSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Events | AWENE" },
  description:
    "Workshops, webinars and gatherings around menopause and perimenopause.",
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
            title: "Events | AWENE",
            description: "Workshops, webinars and gatherings around menopause and perimenopause.",
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
              Spaces to come together
            </h1>
          </div>
        </Container>
      </section>
      <Section background="offwhite" size="lg">
        <Container>
          <div className="space-y-4">
            {events.map((event) => {
              const imageSrc = eventImageSrc(event);
              return (
                <div key={event.id} className="overflow-hidden rounded-3xl border bg-white" style={{ borderColor: "#E8DFF0" }}>
                  {imageSrc ? (
                    <div className="relative h-56 md:h-72">
                      <Image src={imageSrc} alt={event.image?.alt ?? event.title} fill className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:justify-between md:p-8">
                    <div>
                      <h2 className="mb-3 text-2xl font-bold md:text-3xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{event.title}</h2>
                      <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{event.description}</p>
                    </div>
                    <Button href={event.url ?? "/en/contact"} variant="outline" size="sm" external={Boolean(event.url)}>
                      Learn more
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
