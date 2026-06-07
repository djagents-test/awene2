import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import EventRegistrationForm from "@/components/ui/EventRegistrationForm";
import EventShareButtons from "@/components/ui/EventShareButtons";
import SatisfactionForm from "@/components/ui/SatisfactionForm";
import { getEventBySlug, getEventPvByEventId, getSatisfactionFormByEventId } from "@/lib/cms";

type Props = {
  searchParams: Promise<{ slug?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { slug } = await searchParams;
  if (!slug) return {};
  const event = await getEventBySlug(slug, "en");
  if (!event) return {};
  return {
    title: event.seoTitle || `${event.title} | AWENE`,
    description: event.metaDescription || event.shortDescription || event.description,
  };
}

function isPast(startsAt?: string, eventStatus?: string) {
  if (eventStatus === "past") return true;
  if (!startsAt) return false;
  const date = new Date(startsAt);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return date.getTime() < midnight;
}

function registrationStatusLabel(status?: string) {
  if (status === "full") return "Full";
  if (status === "closed") return "Registration closed";
  return "Open";
}

export default async function EventDetailPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  if (!slug) notFound();

  const event = await getEventBySlug(slug, "en");
  if (!event) notFound();

  const past = isPast(event.startsAt, event.eventStatus);
  const pv = past ? await getEventPvByEventId(event.id) : null;
  const satisfactionForm = past ? await getSatisfactionFormByEventId(event.id) : null;
  const publicUrl = `https://www.awene.net/en/events/${event.slug}`;

  const infoItems = [
    { label: "Date", value: event.date || "To be confirmed" },
    { label: "Time", value: event.time || "To be confirmed" },
    { label: "Location", value: event.location || "To be confirmed" },
    { label: "Type", value: event.type || "Event" },
    {
      label: "Seats",
      value:
        typeof event.availableSeats === "number"
          ? `${event.availableSeats} seat${event.availableSeats > 1 ? "s" : ""} available`
          : "Seats to be confirmed",
    },
    { label: "Status", value: past ? "Ended" : registrationStatusLabel(event.registrationStatus) },
  ];

  return (
    <main className="bg-[#FCFAF8] pb-24 pt-32 md:pt-36">
      <Container>
        <section className="relative overflow-hidden rounded-[2.5rem] border px-6 py-10 shadow-[0_20px_70px_rgba(75,31,122,0.08)] md:px-10 md:py-14" style={{ borderColor: "#E8DFF0", background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(243,236,251,0.95) 100%)" }}>
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(246,139,44,0.22) 0%, rgba(246,139,44,0.08) 45%, transparent 75%)" }} />
          <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(111,63,214,0.22) 0%, rgba(111,63,214,0.08) 42%, transparent 76%)" }} />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:items-start">
            <div>
              <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
                {past ? "Event recap" : "Event"}
              </p>
              <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-[1.04] md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                {event.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                {event.shortDescription || "Join an AWENE event designed to help women understand, regulate and move forward with practical support."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={past ? "#about-event" : "#registration"}
                  className="inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] hover:shadow-lg sm:min-w-[12rem]"
                  style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}
                >
                  {past ? "Learn more" : "Register"}
                </a>
                <a
                  href="#share-event"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border px-7 py-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:min-w-[10rem]"
                  style={{ borderColor: "#DCCBFF", background: "rgba(255,255,255,0.7)", color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  Share
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border p-5 shadow-[0_16px_40px_rgba(75,31,122,0.07)] md:p-6" style={{ borderColor: "#E8DFF0", background: "rgba(255,255,255,0.94)" }}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                Essential details
              </p>
              <div className="grid grid-cols-2 gap-3">
                {infoItems.map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border p-4" style={{ borderColor: "#EFE7F6", background: item.label === "Status" ? "#F8F4FC" : "#FFFEFD" }}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>
                      {item.label}
                    </p>
                    <p className="text-base font-medium leading-6" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="about-event" className="mt-12 rounded-[2rem] border bg-white p-6 md:p-8 lg:p-10" style={{ borderColor: "#E8DFF0" }}>
          <h2 className="mb-5 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            About this event
          </h2>
          <div
            className="prose prose-lg max-w-[52rem] [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[1.5rem] [&_p]:leading-8"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </section>

        {past ? (
          <div className="mt-12 space-y-10">
            {pv?.fullDescription ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Event recap</h2>
                <div className="prose max-w-[54rem] [&_p]:leading-8 [&_img]:rounded-[1.5rem]" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }} dangerouslySetInnerHTML={{ __html: pv.fullDescription }} />
              </section>
            ) : null}
            {pv?.keyTakeaways ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Key takeaways</h2>
                <p className="max-w-[50rem] text-base leading-8" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{pv.keyTakeaways}</p>
              </section>
            ) : null}
            {pv?.gallery?.length ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Gallery</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {pv.gallery.map((image) => (
                    <img key={image} src={image} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
                  ))}
                </div>
              </section>
            ) : null}
            <section id="share-event" className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                Share this event
              </p>
              <EventShareButtons locale="en" title={event.title} url={publicUrl} />
            </section>
            <div className="flex flex-wrap gap-4">
              {pv?.pdfUrl && pv.pdfIsPublic ? (
                <Link href={pv.pdfUrl} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}>
                  View resources
                </Link>
              ) : null}
              {satisfactionForm?.active ? (
                <a href="#satisfaction" className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  Answer the survey
                </a>
              ) : null}
              <Link href="/en/events" className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                Discover upcoming events
              </Link>
            </div>
            {satisfactionForm?.active ? (
              <section id="satisfaction" className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Your feedback helps us improve future events.</h2>
                <SatisfactionForm locale="en" eventId={event.id} form={satisfactionForm} />
              </section>
            ) : null}
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            <section id="registration" className="rounded-[2rem] border bg-white p-6 shadow-[0_18px_48px_rgba(75,31,122,0.06)] md:p-8 lg:p-10" style={{ borderColor: "#E8DFF0" }}>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                Registration
              </h2>
              <div className="mb-7 rounded-[1.5rem] border px-5 py-4" style={{ borderColor: "#F3E3CF", background: "#FFF7EF" }}>
                <p className="text-sm leading-7 md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Reserve your spot for this AWENE event. The information shared here is only used to process your registration.
                </p>
              </div>
              {event.registrationStatus === "open" ? (
                <EventRegistrationForm locale="en" eventId={event.id} eventTitle={event.title} />
              ) : (
                <div className="rounded-[1.5rem] border px-5 py-4" style={{ borderColor: "#E8DFF0", background: "#FCFAF8" }}>
                  <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {event.registrationStatus === "full" ? "Full" : "Registration closed"}
                  </p>
                </div>
              )}
            </section>
            <section id="share-event" className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                Share this event
              </p>
              <EventShareButtons locale="en" title={event.title} url={publicUrl} />
            </section>
          </div>
        )}
      </Container>
    </main>
  );
}
