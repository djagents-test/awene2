"use client";

import { useState } from "react";
import type { CmsSatisfactionForm } from "@/lib/cms";

type Props = {
  locale: "fr" | "en";
  eventId: number;
  form: CmsSatisfactionForm;
};

export default function SatisfactionForm({ locale, eventId, form }: Props) {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isFr = locale === "fr";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/satisfaction-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          formId: form.id,
          answers: values,
          email: email || undefined,
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
    <form className="mt-8 grid grid-cols-1 gap-4 rounded-[1.75rem] border bg-white p-6" style={{ borderColor: "#E8DFF0" }} onSubmit={handleSubmit} noValidate>
      {form.introText ? (
        <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {form.introText}
        </p>
      ) : null}
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
      {form.questions.map((question) => (
        <label key={question.id} className="flex flex-col gap-2">
          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
            {question.label}
          </span>
          {question.type === "long_text" ? (
            <textarea
              rows={4}
              value={String(values[question.id] ?? "")}
              onChange={(e) => setValues((current) => ({ ...current, [question.id]: e.target.value }))}
              className="rounded-2xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
              required={question.required}
            />
          ) : question.type === "multiple_choice" ? (
            <select
              value={String(values[question.id] ?? "")}
              onChange={(e) => setValues((current) => ({ ...current, [question.id]: e.target.value }))}
              className="rounded-2xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
              required={question.required}
            >
              <option value="">{isFr ? "Choisir" : "Choose"}</option>
              {(question.options ?? []).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : question.type === "yes_no" ? (
            <select
              value={String(values[question.id] ?? "")}
              onChange={(e) => setValues((current) => ({ ...current, [question.id]: e.target.value }))}
              className="rounded-2xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
              required={question.required}
            >
              <option value="">{isFr ? "Choisir" : "Choose"}</option>
              <option value="yes">{isFr ? "Oui" : "Yes"}</option>
              <option value="no">{isFr ? "Non" : "No"}</option>
            </select>
          ) : (
            <input
              type={question.type === "email" ? "email" : "text"}
              value={String(values[question.id] ?? "")}
              onChange={(e) => setValues((current) => ({ ...current, [question.id]: e.target.value }))}
              className="rounded-2xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
              required={question.required}
            />
          )}
        </label>
      ))}
      {!form.anonymousAllowed || form.pdfAfterSubmissionUrl ? (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border px-4 py-3 text-sm outline-none"
            style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
            required
          />
        </label>
      ) : null}
      <label className="flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 rounded border" />
        <span className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {isFr ? "J’accepte l’utilisation de mes réponses pour le suivi qualité de cet événement." : "I agree to the use of my answers for this event quality follow-up."}
        </span>
      </label>
      {state === "success" ? (
        <p className="text-sm font-medium" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
          {form.thankYouMessage || (isFr ? "Merci pour votre retour." : "Thank you for your feedback.")}
        </p>
      ) : null}
      {state === "error" ? (
        <p className="text-sm font-medium" style={{ color: "#C0392B", fontFamily: "var(--font-inter)" }}>
          {isFr ? "Le questionnaire n’a pas pu être envoyé. Veuillez réessayer." : "The survey could not be submitted. Please try again."}
        </p>
      ) : null}
      <button type="submit" disabled={state === "submitting"} className="rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}>
        {state === "submitting"
          ? isFr ? "Envoi…" : "Submitting…"
          : isFr ? "Envoyer mes réponses" : "Submit my answers"}
      </button>
    </form>
  );
}
