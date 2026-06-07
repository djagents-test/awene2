import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import EventRegistrationForm from "@/components/ui/EventRegistrationForm";
import EventShareButtons from "@/components/ui/EventShareButtons";
import SatisfactionForm from "@/components/ui/SatisfactionForm";
import { getEventBySlug, getEventPvByEventId, getEvents, getSatisfactionFormByEventId } from "@/lib/cms";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getEvents({ perPage: 100, language: "en" });
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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

function statusLabel(registrationStatus?: string, eventPast?: boolean) {
  if (eventPast) return { label: "Ended", bg: "#F8EEF5", color: "#4B1F7A" };
  if (registrationStatus === "open") return { label: "Registration open", bg: "#ECFBF4", color: "#1A8A5A" };
  if (registrationStatus === "full") return { label: "Full", bg: "#FEF3E8", color: "#F68B2C" };
  return { label: "Registration closed", bg: "#F8EEF5", color: "#4B1F7A" };
}

function formatLabel(locationType?: string) {
  if (locationType === "online") return "Online";
  if (locationType === "hybrid") return "Hybrid";
  if (locationType === "in_person") return "In person";
  return null;
}

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CircleCheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function InfoItem({ icon, label, value, valueColor }: {
  icon: ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5" style={{ color: "#F68B2C" }}>
        {icon}
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-sm font-semibold leading-snug"
        style={{ color: valueColor ?? "#2E2438", fontFamily: "var(--font-inter)" }}
      >
        {value}
      </p>
    </div>
  );
}

export default async function EventSlugPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug, "en");
  if (!event) notFound();

  const past = isPast(event.startsAt, event.eventStatus);
  const pv = past ? await getEventPvByEventId(event.id) : null;
  const satisfactionForm = past ? await getSatisfactionFormByEventId(event.id) : null;
  const registrationOpen = !past && event.registrationStatus === "open";
  const isFull = !past && event.registrationStatus === "full";
  const status = statusLabel(event.registrationStatus, past);

  return (
    <main className="min-h-screen bg-[#FCFAF8] pb-24 pt-36">
      <Container>

        {/* Back */}
        <Link
          href="/en/events"
          className="mb-12 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
          style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All events
        </Link>

        {/* ── Hero: two-column layout ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">

          {/* Left col: badges · title · teaser · CTAs */}
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {event.type ? (
                <span
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  style={{ background: "#F3ECFB", color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
                >
                  {event.type}
                </span>
              ) : null}
              <span
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold"
                style={{ background: status.bg, color: status.color, fontFamily: "var(--font-inter)" }}
              >
                {status.label}
              </span>
            </div>

            <h1
              className="mb-6 text-4xl font-bold leading-tight md:text-5xl xl:text-[3.5rem]"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {event.title}
            </h1>

            {event.shortDescription ? (
              <p
                className="mb-8 max-w-2xl text-lg leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {event.shortDescription}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {!past && registrationOpen ? (
                <a
                  href="#registration"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Register
                </a>
              ) : !past && isFull ? (
                <span
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold"
                  style={{ background: "#FEF3E8", color: "#F68B2C", fontFamily: "var(--font-inter)" }}
                >
                  Full
                </span>
              ) : null}
              <a
                href="#share"
                className="inline-flex items-center justify-center gap-2 rounded-full border bg-white px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ borderColor: "#E8DFF0", color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </a>
              {past ? (
                <Link
                  href="/en/events"
                  className="inline-flex items-center justify-center rounded-full border bg-white px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  See more events
                </Link>
              ) : null}
            </div>
          </div>

          {/* Right col: event info card */}
          <div
            className="rounded-[2rem] border bg-white p-6 shadow-sm lg:sticky lg:top-32"
            style={{ borderColor: "#E8DFF0" }}
          >
            <p
              className="mb-5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Event details
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoItem icon={<CalendarIcon />} label="Date" value={event.date} />

              {(event.startTime || event.endTime) ? (
                <InfoItem
                  icon={<ClockIcon />}
                  label="Time"
                  value={`${event.startTime ?? ""}${event.endTime ? ` – ${event.endTime}` : ""}`}
                />
              ) : null}

              {event.locationType === "online" ? (
                <InfoItem icon={<MonitorIcon />} label="Format" value="Online" />
              ) : (event.locationName || event.location) ? (
                <InfoItem
                  icon={<MapPinIcon />}
                  label="Location"
                  value={event.locationName || event.location || ""}
                />
              ) : null}

              {event.locationType && event.locationType !== "online" ? (
                <InfoItem
                  icon={<TagIcon />}
                  label="Format"
                  value={formatLabel(event.locationType) ?? event.locationType}
                />
              ) : null}

              {event.type ? (
                <InfoItem icon={<TagIcon />} label="Type" value={event.type} />
              ) : null}

              {typeof event.availableSeats === "number" ? (
                <InfoItem
                  icon={<UsersIcon />}
                  label="Seats"
                  value={event.availableSeats === 0 ? "Full" : `${event.availableSeats} available`}
                  valueColor={event.availableSeats === 0 ? "#F68B2C" : "#1A8A5A"}
                />
              ) : typeof event.capacity === "number" ? (
                <InfoItem
                  icon={<UsersIcon />}
                  label="Capacity"
                  value={`${event.capacity} participants`}
                />
              ) : null}

              <InfoItem
                icon={<CircleCheckIcon />}
                label="Status"
                value={status.label}
                valueColor={status.color}
              />
            </div>

            {event.locationType !== "online" && event.locationAddress ? (
              <p
                className="mt-5 border-t pt-5 text-xs leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)", borderColor: "#E8DFF0" }}
              >
                {event.locationAddress}
              </p>
            ) : null}

            {event.locationType === "online" && event.onlineUrl ? (
              <div className="mt-5 border-t pt-5" style={{ borderColor: "#E8DFF0" }}>
                <a
                  href={event.onlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium underline"
                  style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
                >
                  Access the event
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            ) : null}

            {registrationOpen ? (
              <div className="mt-5 border-t pt-5" style={{ borderColor: "#E8DFF0" }}>
                <a
                  href="#registration"
                  className="block w-full rounded-full py-3.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Register now →
                </a>
              </div>
            ) : isFull ? (
              <div className="mt-5 border-t pt-5" style={{ borderColor: "#E8DFF0" }}>
                <p className="text-center text-sm font-medium" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                  This event is full
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* ── About this event ── */}
        {event.description ? (
          <section className="mt-16 max-w-4xl">
            <h2
              className="mb-6 text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              About this event
            </h2>
            <div
              className="rounded-[2rem] border bg-white p-8 shadow-sm"
              style={{ borderColor: "#E8DFF0" }}
            >
              <div
                className="prose prose-lg max-w-none [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl"
                style={{ color: "#4A3F56", fontFamily: "var(--font-inter)" }}
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          </section>
        ) : null}

        {/* ── Past event / upcoming registration ── */}
        {past ? (
          <div className="mt-16 space-y-10">
            {pv?.fullDescription ? (
              <section className="max-w-4xl rounded-[2rem] border bg-white p-8 shadow-sm" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Event recap
                </h2>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: pv.fullDescription }} />
              </section>
            ) : null}

            {pv?.keyTakeaways ? (
              <section className="max-w-4xl rounded-[2rem] border bg-white p-8 shadow-sm" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Key takeaways
                </h2>
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  dangerouslySetInnerHTML={{ __html: pv.keyTakeaways ?? "" }}
                />
              </section>
            ) : null}

            {pv?.gallery?.length ? (
              <section className="max-w-4xl rounded-[2rem] border bg-white p-8 shadow-sm" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Gallery
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {pv.gallery.map((image) => (
                    <img key={image} src={image} alt="" className="h-56 w-full rounded-3xl object-cover" />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="flex flex-wrap gap-4">
              {pv?.pdfUrl && pv.pdfIsPublic ? (
                <Link
                  href={pv.pdfUrl}
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}
                >
                  View resources
                </Link>
              ) : null}
              {satisfactionForm?.active ? (
                <a
                  href="#satisfaction"
                  className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  Answer the survey
                </a>
              ) : null}
              <Link
                href="/en/events"
                className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
              >
                Discover upcoming events
              </Link>
            </div>

            {satisfactionForm?.active ? (
              <section id="satisfaction" className="max-w-4xl rounded-[2rem] border bg-white p-8 shadow-sm" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Your feedback helps us improve future events.
                </h2>
                <SatisfactionForm locale="en" eventId={event.id} form={satisfactionForm} />
              </section>
            ) : null}
          </div>
        ) : (
          /* ── Registration section ── */
          <section id="registration" className="mt-16 max-w-4xl">
            <div
              className="rounded-[2rem] border bg-white p-8 shadow-sm"
              style={{ borderColor: "#E8DFF0" }}
            >
              <h2
                className="mb-5 text-2xl font-bold md:text-3xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Registration
              </h2>
              <div
                className="mb-7 rounded-2xl px-5 py-4"
                style={{ background: "#F3ECFB", borderLeft: "3px solid #6F3FD6" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#4A3F56", fontFamily: "var(--font-inter)" }}>
                  Reserve your spot for this AWENE event. The information shared here is only used to process your registration.
                </p>
              </div>
              {registrationOpen ? (
                <EventRegistrationForm locale="en" eventId={event.id} eventTitle={event.title} />
              ) : isFull ? (
                <p className="text-base font-medium" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                  This event is full. Subscribe to the newsletter to hear about upcoming events.
                </p>
              ) : (
                <p className="text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Registration is currently closed.
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Share section ── */}
        <section id="share" className="mt-16 max-w-4xl">
          <h3
            className="mb-5 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Share this event
          </h3>
          <EventShareButtons title={event.title} url={`https://www.awene.net/en/events/${slug}`} locale="en" />
        </section>

      </Container>
    </main>
  );
}
