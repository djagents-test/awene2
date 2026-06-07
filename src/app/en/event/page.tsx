import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import EventRegistrationForm from "@/components/ui/EventRegistrationForm";
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

export default async function EventDetailPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  if (!slug) notFound();

  const event = await getEventBySlug(slug, "en");
  if (!event) notFound();

  const past = isPast(event.startsAt, event.eventStatus);
  const pv = past ? await getEventPvByEventId(event.id) : null;
  const satisfactionForm = past ? await getSatisfactionFormByEventId(event.id) : null;

  return (
    <main className="bg-[#FCFAF8] pb-24 pt-36">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
            <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
            {past ? "Event recap" : "Event"}
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            {event.title}
          </h1>
          <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
            <span>{event.date}</span>
            {event.location ? <span>{event.location}</span> : null}
            <span>{event.type}</span>
          </div>
          <p className="text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
            {event.shortDescription || event.description}
          </p>
        </div>

        {past ? (
          <div className="mt-16 space-y-12">
            {pv?.fullDescription ? (
              <section className="rounded-[2rem] border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Event recap</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pv.fullDescription }} />
              </section>
            ) : null}
            {pv?.keyTakeaways ? (
              <section className="rounded-[2rem] border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Key takeaways</h2>
                <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{pv.keyTakeaways}</p>
              </section>
            ) : null}
            {pv?.gallery?.length ? (
              <section className="rounded-[2rem] border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Gallery</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {pv.gallery.map((image) => (
                    <img key={image} src={image} alt="" className="h-56 w-full rounded-3xl object-cover" />
                  ))}
                </div>
              </section>
            ) : null}
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
              <section id="satisfaction" className="rounded-[2rem] border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Your feedback helps us improve future events.</h2>
                <SatisfactionForm locale="en" eventId={event.id} form={satisfactionForm} />
              </section>
            ) : null}
          </div>
        ) : (
          <section className="mt-16 rounded-[2rem] border bg-white p-8" style={{ borderColor: "#E8DFF0" }}>
            <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Registration</h2>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              {event.description}
            </p>
            {event.registrationStatus === "open" ? (
              <EventRegistrationForm locale="en" eventId={event.id} eventTitle={event.title} />
            ) : (
              <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                {event.registrationStatus === "full" ? "Full" : "Registration closed"}
              </p>
            )}
          </section>
        )}
      </Container>
    </main>
  );
}
