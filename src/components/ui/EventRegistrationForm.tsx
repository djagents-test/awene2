"use client";

import { useState } from "react";

type Props = {
  locale: "fr" | "en";
  eventId: number;
  eventTitle: string;
};

type SuccessPayload = {
  registrationId: number;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  locationLabel: string;
  calendarUrl?: string;
  confirmationEmailSent: boolean;
};

export default function EventRegistrationForm({ locale, eventId, eventTitle }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [successPayload, setSuccessPayload] = useState<SuccessPayload | null>(null);
  const isFr = locale === "fr";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          eventTitle,
          firstName,
          lastName,
          email,
          phone,
          message,
          consent,
          language: locale,
          website,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      const payload = (await res.json()) as { registration?: SuccessPayload };
      setSuccessPayload(payload.registration ?? null);
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success" && successPayload) {
    const dateLabel = isFr ? "Date" : "Date";
    const timeLabel = isFr ? "Horaire" : "Time";
    const locationLabel = isFr ? "Lieu" : "Location";
    const participantLabel = isFr ? "Participante" : "Participant";
    const statusLabel = isFr ? "Statut" : "Status";
    const eventsHref = isFr ? "/fr/evenements" : "/en/events";
    const pastEventsHref = `${eventsHref}?status=past`;
    const articlesHref = isFr ? "/fr/articles" : "/en/articles";

    return (
      <div className="mt-8 rounded-[2.1rem] border bg-[#FCFAF8] p-4 md:p-6" style={{ borderColor: "#EFE4F8" }}>
        <div className="mx-auto max-w-2xl rounded-[2rem] border bg-white p-6 shadow-[0_18px_48px_rgba(75,31,122,0.08)] md:p-8" style={{ borderColor: "#E8DFF0" }}>
          <div className="mb-6 text-center">
            <img src="/AWENE.png" alt="AWENE" className="mx-auto mb-4 h-12 w-12 object-contain" />
            <span className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ background: "#FFF1E5", color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              {isFr ? "Inscription confirmée" : "Registration confirmed"}
            </span>
            <h3 className="mt-5 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              {isFr ? "Votre inscription est confirmée." : "Your registration is confirmed."}
            </h3>
            <p className="mt-3 text-sm leading-7 md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              {successPayload.confirmationEmailSent
                ? (isFr
                    ? (phone.trim()
                        ? "Un email de confirmation vient de vous être envoyé. Vous recevrez le lien de la masterclass par email et WhatsApp avant l’événement."
                        : "Un email de confirmation vient de vous être envoyé. Vous recevrez le lien de la masterclass par email avant l’événement.")
                    : (phone.trim()
                        ? "A confirmation email has just been sent to you. You will receive the masterclass link by email and WhatsApp before the event."
                        : "A confirmation email has just been sent to you. You will receive the masterclass link by email before the event."))
                : (isFr
                    ? "Votre inscription est enregistrée. Si vous ne recevez pas l’email de confirmation, contactez AWENE."
                    : "Your registration is saved. If you do not receive the confirmation email, please contact AWENE.")}
            </p>
          </div>

          <div className="rounded-[1.8rem] border p-5 md:p-6" style={{ borderColor: "#E8DFF0", background: "linear-gradient(135deg, rgba(252,250,248,0.96) 0%, rgba(243,236,251,0.92) 100%)" }}>
            <h4 className="text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              {successPayload.eventTitle || eventTitle}
            </h4>
            <div className="my-5 border-t border-dashed" style={{ borderColor: "#DCCBFF" }} />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>{dateLabel}</p>
                <p className="mt-1 text-base font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{successPayload.eventDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>{timeLabel}</p>
                <p className="mt-1 text-base font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  {successPayload.startTime && successPayload.endTime ? `${successPayload.startTime} – ${successPayload.endTime}` : successPayload.startTime || successPayload.endTime || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>{locationLabel}</p>
                <p className="mt-1 text-base font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{successPayload.locationLabel}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>{participantLabel}</p>
                <p className="mt-1 text-base font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{`${firstName} ${lastName}`.trim()}</p>
              </div>
            </div>
            <div className="mt-5 border-t border-dashed pt-5" style={{ borderColor: "#DCCBFF" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9B8EA8", fontFamily: "var(--font-inter)" }}>{statusLabel}</p>
              <p className="mt-1 text-base font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Confirmée" : "Confirmed"}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {successPayload.calendarUrl ? (
              <a
                href={successPayload.calendarUrl}
                className="inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}
              >
                {isFr ? "Ajouter à mon calendrier" : "Add to my calendar"}
              </a>
            ) : null}
            <div className="grid gap-3 md:grid-cols-3">
              <a href={eventsHref} className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                {isFr ? "Voir les prochains événements" : "View upcoming events"}
              </a>
              <a href={pastEventsHref} className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                {isFr ? "Voir les événements passés" : "View past events"}
              </a>
              <a href={articlesHref} className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                {isFr ? "Lire les articles" : "Read articles"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-8 grid grid-cols-1 gap-5 rounded-[1.9rem] border bg-[#FCFAF8] p-5 md:grid-cols-2 md:p-7" style={{ borderColor: "#EFE4F8" }} onSubmit={handleSubmit} noValidate>
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Prénom" : "First name"}</span>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="min-h-14 rounded-[1.15rem] border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-150 focus:border-[#6F3FD6] focus:shadow-[0_0_0_4px_rgba(111,63,214,0.10)]" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Nom" : "Last name"}</span>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="min-h-14 rounded-[1.15rem] border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-150 focus:border-[#6F3FD6] focus:shadow-[0_0_0_4px_rgba(111,63,214,0.10)]" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="min-h-14 rounded-[1.15rem] border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-150 focus:border-[#6F3FD6] focus:shadow-[0_0_0_4px_rgba(111,63,214,0.10)]" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Téléphone" : "Phone"}</span>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="min-h-14 rounded-[1.15rem] border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-150 focus:border-[#6F3FD6] focus:shadow-[0_0_0_4px_rgba(111,63,214,0.10)]" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Message" : "Message"}</span>
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-[1.15rem] border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-150 focus:border-[#6F3FD6] focus:shadow-[0_0_0_4px_rgba(111,63,214,0.10)]" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="md:col-span-2 flex items-start gap-3 rounded-[1.15rem] border bg-white px-4 py-4">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 rounded border accent-violet-600" />
        <span className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {isFr ? "J’accepte que mes informations soient utilisées pour traiter mon inscription à cet événement." : "I agree that my information can be used to process my registration for this event."}
        </span>
      </label>
      {state === "success" ? <div className="md:col-span-2 rounded-[1.15rem] border px-4 py-4" style={{ borderColor: "#DDD0F5", background: "#F7F1FD" }}><p className="text-sm font-semibold" style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>{isFr ? "Votre inscription est confirmée." : "Your registration is confirmed."}</p><p className="mt-1 text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{isFr ? (phone.trim() ? "Un email de confirmation vient de vous être envoyé. Vous recevrez le lien de la masterclass par email et WhatsApp avant l’événement." : "Un email de confirmation vient de vous être envoyé. Vous recevrez le lien de la masterclass par email avant l’événement.") : (phone.trim() ? "A confirmation email has just been sent to you. You will receive the masterclass link by email and WhatsApp before the event." : "A confirmation email has just been sent to you. You will receive the masterclass link by email before the event.")}</p></div> : null}
      {state === "error" ? <p className="md:col-span-2 text-sm font-medium" style={{ color: "#C0392B", fontFamily: "var(--font-inter)" }}>{isFr ? "L’inscription n’a pas pu être envoyée. Veuillez réessayer." : "The registration could not be sent. Please try again."}</p> : null}
      <div className="md:col-span-2">
        <button type="submit" disabled={state === "submitting"} className="min-h-14 w-full rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}>
          {state === "submitting" ? (isFr ? "Envoi…" : "Submitting…") : (isFr ? "Je m'inscris" : "Register")}
        </button>
      </div>
    </form>
  );
}
