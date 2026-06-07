"use client";

import { useState } from "react";

type Props = {
  locale: "fr" | "en";
  eventId: number;
  eventTitle: string;
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
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="mt-8 grid grid-cols-1 gap-4 rounded-[1.75rem] border bg-white p-6 md:grid-cols-2" style={{ borderColor: "#E8DFF0" }} onSubmit={handleSubmit} noValidate>
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Prénom" : "First name"}</span>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Nom" : "Last name"}</span>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Téléphone" : "Phone"}</span>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>{isFr ? "Message" : "Message"}</span>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }} />
      </label>
      <label className="md:col-span-2 flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 rounded border" />
        <span className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {isFr ? "J’accepte que mes informations soient utilisées pour traiter mon inscription à cet événement." : "I agree that my information can be used to process my registration for this event."}
        </span>
      </label>
      {state === "success" ? <p className="md:col-span-2 text-sm font-medium" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>{isFr ? "Votre inscription a bien été envoyée." : "Your registration has been sent."}</p> : null}
      {state === "error" ? <p className="md:col-span-2 text-sm font-medium" style={{ color: "#C0392B", fontFamily: "var(--font-inter)" }}>{isFr ? "L’inscription n’a pas pu être envoyée. Veuillez réessayer." : "The registration could not be sent. Please try again."}</p> : null}
      <div className="md:col-span-2">
        <button type="submit" disabled={state === "submitting"} className="rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}>
          {state === "submitting" ? (isFr ? "Envoi…" : "Submitting…") : (isFr ? "Je m'inscris" : "Register")}
        </button>
      </div>
    </form>
  );
}
