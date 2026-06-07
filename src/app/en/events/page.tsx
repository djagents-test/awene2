import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import EventsHub, { type EventItem } from "@/components/ui/EventsHub";
import NewsletterSignupForm from "@/components/ui/NewsletterSignupForm";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { breadcrumbSchema, cmsEventSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AWENE Workshops and Events | AWENE",
  description:
    "Women engaged in a collaborative workshop focused on learning, shared experiences, health, and wellbeing.",
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

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeStatus(value?: string): EventItem["status"] {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("closed") || normalized.includes("fermé")) {
    return "closed";
  }
  if (normalized.includes("complet") || normalized.includes("full") || normalized.includes("sold")) {
    return "full";
  }
  if (normalized.includes("past") || normalized.includes("termin") || normalized.includes("ended")) {
    return "past";
  }
  return "open";
}

function isPastEvent(event: CmsEvent) {
  if (event.eventStatus === "past") return true;
  if (!event.startsAt) return false;
  const date = new Date(event.startsAt);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return date.getTime() < midnight;
}

function normalizeFormat(event: CmsEvent): EventItem["format"] | undefined {
  const normalized = `${event.locationType ?? event.format ?? ""} ${event.location ?? ""}`.toLowerCase();
  if (normalized.includes("ligne") || normalized.includes("online")) return "online";
  if (normalized.includes("présentiel") || normalized.includes("presentiel") || normalized.includes("in person") || normalized.includes("tunis") || normalized.includes("nabeul")) return "in_person";
  if (normalized.includes("hybride") || normalized.includes("hybrid")) return "hybrid";
  return undefined;
}

export default async function EventsPage() {
  const events = await getEvents({ perPage: 100, language: "en" });
  const normalizedEvents: EventItem[] = events.map((event) => ({
    id: String(event.id),
    slug: event.slug,
    title: event.title,
    date: event.date,
    location: event.location || "Location to be confirmed",
    type: event.type || "Workshop",
    status: normalizeStatus(isPastEvent(event) ? "past" : event.registrationStatus ?? event.status),
    description: event.shortDescription || stripHtml(event.description) || "More details about this event will be shared soon.",
    ctaLabel: isPastEvent(event) ? "Learn more" : event.ctaLabel || "Register",
    ctaHref: isPastEvent(event) ? `/en/events/${event.slug}` : event.url ?? "/en/contact",
    format: normalizeFormat(event),
    startsAt: event.startsAt,
    availableSeats: event.availableSeats,
    capacity: event.capacity,
    language: event.language,
  }));

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
            title: "AWENE Workshops and Events | AWENE",
            description:
              "Women engaged in a collaborative workshop focused on learning, shared experiences, health, and wellbeing.",
            type: "CollectionPage",
            inLanguage: "en",
          }),
          ...events.map((event) => cmsEventSchema(event, "/en/events")),
        ]}
      />
      <section className="relative min-h-[76vh] overflow-hidden">
        <Image
          src="/images/awene-evenement-atelier-participation.jpg"
          alt=""
          title="AWENE Workshop and Active Participation"
          fill
          priority
          aria-hidden="true"
          className="object-cover object-[25%_50%] md:object-[30%_50%] xl:object-[35%_10%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/70 md:bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.68)_35%,rgba(255,255,255,0.18)_100%)]" />
        <Container className="relative z-10 flex min-h-[76vh] items-end pt-32 pb-20">
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

      <EventsHub
        locale="en"
        labels={{
          filtersTitle: "Filters",
          upcomingTitle: "Upcoming Events",
          pastTitle: "Past Events",
          emptyUpcoming:
            "No events are scheduled at the moment. Subscribe to the newsletter to be the first to hear.",
          date: "Date",
          location: "Location",
          type: "Type",
          status: "Status",
          all: "All",
          upcoming: "Upcoming",
          thisMonth: "This month",
          past: "Past",
          online: "Online",
          inPerson: "In person",
          hybrid: "Hybrid",
          tunis: "Tunis",
          nabeul: "Nabeul",
          workshop: "Workshop",
          webinar: "Webinar",
          meetup: "Meetup",
          discussionCircle: "Discussion Circle",
          training: "Training",
          open: "Open",
          full: "Full",
          ended: "Ended",
          register: "Register",
          closed: "Closed",
          registrationClosed: "Registration closed",
          learnMore: "Learn more",
          firstName: "First name",
          lastName: "Last name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          consent: "I agree that my information can be used to process my registration for this event.",
          submit: "Submit my registration",
          submitting: "Submitting…",
          success: "Your registration has been sent. You will receive a confirmation soon.",
          error: "The registration could not be sent. Please try again.",
          noPastResults: "No past events match these filters.",
          seatsLeft: "{count} seats left",
          seatsToBeConfirmed: "Seats to be confirmed",
        }}
        events={normalizedEvents}
      />

      <section className="relative overflow-x-hidden overflow-y-hidden py-20 md:py-24" style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}>
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <h2
              className="mb-4 text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "rgb(243, 236, 251)",
                fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                lineHeight: 1.1,
                maxWidth: "min(100%, 48rem)",
                marginInline: "auto",
                overflowWrap: "normal",
                wordBreak: "normal",
              }}
            >
              Sign up for the newsletter to hear first
            </h2>
            <p className="mb-8 text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
              Subscribe to the AWENE newsletter to receive event announcements before everyone else.
            </p>
            <div className="w-full max-w-sm">
              <NewsletterSignupForm locale="en" variant="dark" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
