"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export type EventItem = {
  id: string;
  slug?: string;
  title: string;
  date: string;
  location: string;
  type: string;
  status: "open" | "full" | "past" | "closed";
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  startsAt?: string;
  format?: "online" | "in_person" | "hybrid";
  availableSeats?: number;
  capacity?: number;
  language?: "fr" | "en" | "ar";
};

type Labels = {
  filtersTitle: string;
  upcomingTitle: string;
  pastTitle: string;
  emptyUpcoming: string;
  date: string;
  location: string;
  type: string;
  status: string;
  all: string;
  upcoming: string;
  thisMonth: string;
  past: string;
  online: string;
  inPerson: string;
  hybrid: string;
  tunis: string;
  nabeul: string;
  workshop: string;
  webinar: string;
  meetup: string;
  discussionCircle: string;
  training: string;
  open: string;
  full: string;
  ended: string;
  register: string;
  closed: string;
  registrationClosed: string;
  learnMore: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  noPastResults: string;
  seatsLeft: string;
  seatsToBeConfirmed?: string;
};

type Props = {
  locale: "fr" | "en";
  labels: Labels;
  events: EventItem[];
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

function isThisMonth(iso?: string) {
  if (!iso) return false;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function isPastDate(iso?: string) {
  if (!iso) return false;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return date.getTime() < midnight;
}

function lower(value: string) {
  return value.toLowerCase().trim();
}

function statusPill(status: EventItem["status"], labels: Labels) {
  switch (status) {
    case "open":
      return { label: labels.open, background: "#F3ECFB", color: "#6F3FD6" };
    case "full":
      return { label: labels.full, background: "#FEF3E8", color: "#F68B2C" };
    case "closed":
      return { label: labels.closed, background: "#F8EEF5", color: "#4B1F7A" };
    case "past":
    default:
      return { label: labels.ended, background: "#F8EEF5", color: "#4B1F7A" };
  }
}

function eventTypeKey(item: EventItem, labels: Labels) {
  const value = lower(item.type);
  if (value.includes(lower(labels.workshop)) || value.includes("atelier")) return "workshop";
  if (value.includes(lower(labels.webinar)) || value.includes("webinaire")) return "webinar";
  if (value.includes(lower(labels.meetup)) || value.includes("rencontre")) return "meetup";
  if (value.includes(lower(labels.discussionCircle)) || value.includes("cercle")) return "discussion";
  if (value.includes(lower(labels.training)) || value.includes("formation")) return "training";
  return "other";
}

function emptyState(message: string) {
  return (
    <div className="rounded-3xl border bg-white px-8 py-12 text-center md:px-12" style={{ borderColor: "#E8DFF0" }}>
      <p className="text-base leading-relaxed md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
        {message}
      </p>
    </div>
  );
}

function SeatsDisplay({ item, labels }: { item: EventItem; labels: Labels }) {
  if (typeof item.availableSeats === "number") {
    return (
      <span>{labels.seatsLeft.replace("{count}", String(item.availableSeats))}</span>
    );
  }
  if (typeof item.capacity === "number" && labels.seatsToBeConfirmed) {
    return <span>{labels.seatsToBeConfirmed}</span>;
  }
  return null;
}

export default function EventsHub({ locale, labels, events }: Props) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState(events);
  const [activeRegistrationId, setActiveRegistrationId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const locationOptions = useMemo(() => {
    const fixed = [
      { value: "all", label: labels.all },
      { value: "online", label: labels.online },
      { value: "in_person", label: labels.inPerson },
      { value: "hybrid", label: labels.hybrid },
      { value: "tunis", label: labels.tunis },
      { value: "nabeul", label: labels.nabeul },
    ];

    const seen = new Set(fixed.map((item) => item.value));
    const dynamic = items
      .map((item) => item.location.trim())
      .filter(Boolean)
      .filter((location) => {
        const value = lower(location);
        if (value.includes("en ligne") || value.includes("online")) return false;
        if (value.includes("hybride") || value.includes("hybrid")) return false;
        if (value.includes("présentiel") || value.includes("presentiel") || value.includes("in person")) return false;
        if (value.includes("tunis") || value.includes("nabeul")) return false;
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      })
      .map((location) => ({ value: location, label: location }));

    return [...fixed, ...dynamic];
  }, [items, labels]);

  const filteredEvents = useMemo(() => {
    return items.filter((sourceItem) => {
      const item =
        sourceItem.status !== "past" && isPastDate(sourceItem.startsAt)
          ? { ...sourceItem, status: "past" as const }
          : sourceItem;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "upcoming" && item.status !== "past") ||
        (dateFilter === "past" && item.status === "past") ||
        (dateFilter === "this_month" && isThisMonth(item.startsAt));

      const locationValue = lower(item.location);
      const matchesLocation =
        locationFilter === "all" ||
        (locationFilter === "online" && item.format === "online") ||
        (locationFilter === "in_person" && item.format === "in_person") ||
        (locationFilter === "hybrid" && item.format === "hybrid") ||
        (locationFilter === "tunis" && locationValue.includes("tunis")) ||
        (locationFilter === "nabeul" && locationValue.includes("nabeul")) ||
        lower(locationFilter) === locationValue;

      const typeKey = eventTypeKey(item, labels);
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "workshop" && typeKey === "workshop") ||
        (typeFilter === "webinar" && typeKey === "webinar") ||
        (typeFilter === "meetup" && typeKey === "meetup") ||
        (typeFilter === "discussion" && typeKey === "discussion") ||
        (typeFilter === "training" && typeKey === "training");

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "open" && item.status === "open") ||
        (statusFilter === "full" && item.status === "full") ||
        (statusFilter === "past" && item.status === "past");

      return matchesDate && matchesLocation && matchesType && matchesStatus;
    });
  }, [dateFilter, locationFilter, typeFilter, statusFilter, items, labels]);

  const upcomingEvents = filteredEvents.filter((item) => item.status !== "past");
  const pastEvents = filteredEvents.filter((item) => item.status === "past");

  function buildDetailUrl(item: EventItem): string | null {
    if (!item.slug) return null;
    return locale === "fr"
      ? `/fr/evenements/${item.slug}`
      : `/en/events/${item.slug}`;
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeRegistrationId || submitState === "submitting") return;
    const target = items.find((item) => item.id === activeRegistrationId);
    if (!target) return;

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: target.id,
          eventTitle: target.title,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          consent: form.consent,
          language: locale,
          website: form.website,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        availableSeats?: number;
        registrationStatus?: "open" | "full" | "closed";
      };

      if (!response.ok) {
        throw new Error("registration_failed");
      }

      setItems((current) =>
        current.map((item) =>
          item.id === activeRegistrationId
            ? {
                ...item,
                availableSeats: payload.availableSeats ?? item.availableSeats,
                status:
                  payload.registrationStatus === "full"
                    ? "full"
                    : payload.registrationStatus === "closed"
                      ? "closed"
                      : item.status,
              }
            : item,
        ),
      );
      setSubmitState("success");
      setForm(EMPTY_FORM);
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <>
      <Section background="offwhite" size="md">
        <Container>
          <div className="rounded-[2rem] border bg-white p-5 md:p-6" style={{ borderColor: "#E8DFF0" }}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              {labels.filtersTitle}
            </p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.date}</span>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  <option value="all">{labels.all}</option>
                  <option value="upcoming">{labels.upcoming}</option>
                  <option value="this_month">{labels.thisMonth}</option>
                  <option value="past">{labels.past}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.location}</span>
                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  {locationOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.type}</span>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  <option value="all">{labels.all}</option>
                  <option value="workshop">{labels.workshop}</option>
                  <option value="webinar">{labels.webinar}</option>
                  <option value="meetup">{labels.meetup}</option>
                  <option value="discussion">{labels.discussionCircle}</option>
                  <option value="training">{labels.training}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.status}</span>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  <option value="all">{labels.all}</option>
                  <option value="open">{labels.open}</option>
                  <option value="full">{labels.full}</option>
                  <option value="past">{labels.ended}</option>
                </select>
              </label>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="lg">
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>{labels.upcomingTitle}</p>
          <h2 className="mb-8 text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{labels.upcomingTitle}</h2>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((item) => {
                const badge = statusPill(item.status, labels);
                const isRegisterable = item.status === "open";
                const isActive = activeRegistrationId === item.id;
                const detailUrl = buildDetailUrl(item);

                return (
                  <article
                    key={item.id}
                    onClick={() => detailUrl && router.push(detailUrl)}
                    className={`rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(75,31,122,0.1)] md:p-8${detailUrl ? " cursor-pointer" : ""}`}
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#F3ECFB", color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>{item.type}</span>
                          <span className="text-xs font-medium tracking-wide" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{item.date}</span>
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: badge.background, color: badge.color, fontFamily: "var(--font-inter)" }}>{badge.label}</span>
                        </div>
                        <h3 className="mb-3 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                          {detailUrl ? (
                            <Link
                              href={detailUrl}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline"
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              {item.title}
                            </Link>
                          ) : item.title}
                        </h3>
                        <p className="max-w-3xl text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{item.description}</p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                          <span>{item.location}</span>
                          <SeatsDisplay item={item} labels={labels} />
                        </div>
                      </div>
                      <div
                        className="flex flex-col items-start gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isRegisterable ? (
                          <Button onClick={() => {
                            setActiveRegistrationId(isActive ? null : item.id);
                            setSubmitState("idle");
                          }} variant="outline" size="sm">
                            {labels.register}
                          </Button>
                        ) : item.status === "full" ? (
                          <Button variant="outline" size="sm" disabled>
                            {labels.full}
                          </Button>
                        ) : item.status === "closed" ? (
                          <Button variant="outline" size="sm" disabled>
                            {labels.registrationClosed}
                          </Button>
                        ) : item.ctaHref ? (
                          <Button href={item.ctaHref} variant="outline" size="sm" external={Boolean(item.ctaHref.startsWith("http"))}>
                            {labels.learnMore}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            {labels.closed}
                          </Button>
                        )}
                        {detailUrl && !isRegisterable && (
                          <Button href={detailUrl} variant="outline" size="sm">
                            {labels.learnMore}
                          </Button>
                        )}
                      </div>
                    </div>

                    {isRegisterable && isActive ? (
                      <form
                        className="mt-6 grid grid-cols-1 gap-4 rounded-[1.75rem] border bg-[#FCFAF8] p-5 md:grid-cols-2"
                        style={{ borderColor: "#E8DFF0" }}
                        onSubmit={handleRegister}
                        onClick={(e) => e.stopPropagation()}
                        noValidate
                      >
                        <input type="hidden" value={form.website} onChange={() => null} name="website" />
                        <label className="flex flex-col gap-2">
                          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.firstName}</span>
                          <input value={form.firstName} onChange={(e) => setForm((current) => ({ ...current, firstName: e.target.value }))} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.lastName}</span>
                          <input value={form.lastName} onChange={(e) => setForm((current) => ({ ...current, lastName: e.target.value }))} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.email}</span>
                          <input type="email" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.phone}</span>
                          <input value={form.phone} onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{labels.message}</span>
                          <textarea value={form.message} onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))} rows={4} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
                        </label>
                        <label className="md:col-span-2 flex items-start gap-3">
                          <input type="checkbox" checked={form.consent} onChange={(e) => setForm((current) => ({ ...current, consent: e.target.checked }))} required className="mt-1 h-4 w-4 rounded border" />
                          <span className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{labels.consent}</span>
                        </label>
                        {submitState === "success" ? <p className="md:col-span-2 text-sm font-medium" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>{labels.success}</p> : null}
                        {submitState === "error" ? <p className="md:col-span-2 text-sm font-medium" style={{ color: "#C0392B", fontFamily: "var(--font-inter)" }}>{labels.error}</p> : null}
                        <div className="md:col-span-2">
                          <button type="submit" disabled={submitState === "submitting"} className="rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}>
                            {submitState === "submitting" ? labels.submitting : labels.submit}
                          </button>
                        </div>
                      </form>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : emptyState(labels.emptyUpcoming)}
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>{labels.pastTitle}</p>
          <h2 className="mb-8 text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{labels.pastTitle}</h2>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {pastEvents.map((item) => {
                const badge = statusPill(item.status, labels);
                const detailUrl = buildDetailUrl(item) ?? item.ctaHref;
                return (
                  <article
                    key={item.id}
                    onClick={() => detailUrl && router.push(detailUrl)}
                    className={`rounded-3xl border bg-[#FCFAF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(75,31,122,0.08)] md:p-8${detailUrl ? " cursor-pointer" : ""}`}
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#F8EEF5", color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>{item.type}</span>
                      <span className="text-xs font-medium tracking-wide" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{item.date}</span>
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: badge.background, color: badge.color, fontFamily: "var(--font-inter)" }}>{badge.label}</span>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                      {detailUrl ? (
                        <Link
                          href={detailUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {item.title}
                        </Link>
                      ) : item.title}
                    </h3>
                    <p className="mb-5 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{item.description}</p>
                    <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      <span>{item.location}</span>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Button href={detailUrl} variant="outline" size="sm">
                        {labels.learnMore}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border bg-[#FCFAF8] px-8 py-12 text-center md:px-12" style={{ borderColor: "#E8DFF0" }}>
              <p className="text-base leading-relaxed md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                {labels.noPastResults}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
