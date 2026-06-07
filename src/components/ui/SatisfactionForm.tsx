"use client";

import { useEffect, useState } from "react";
import type { CmsSatisfactionForm, CmsSatisfactionQuestion } from "@/lib/cms";

type Props = {
  locale: "fr" | "en";
  eventId: number;
  form: CmsSatisfactionForm;
};

// ── i18n ─────────────────────────────────────────────────────────────────────

const T = {
  fr: {
    required: "Obligatoire",
    yes: "Oui",
    no: "Non",
    submit: "Envoyer mes réponses",
    submitting: "Envoi…",
    emailLabel: "Email",
    emailPlaceholder: "votre@email.com",
    consent: "J'accepte l'utilisation de mes réponses pour le suivi qualité de cet événement.",
    errorMsg: "Le questionnaire n'a pas pu être envoyé. Veuillez réessayer.",
    thankyouFallback: "Merci pour votre retour.",
    fieldRequired: "Ce champ est obligatoire.",
    emailRequired: "Veuillez saisir une adresse email valide.",
    consentRequired: "Veuillez accepter les conditions pour continuer.",
  },
  en: {
    required: "Required",
    yes: "Yes",
    no: "No",
    submit: "Submit my answers",
    submitting: "Submitting…",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    consent: "I agree that my answers may be used for quality follow-up for this event.",
    errorMsg: "The survey could not be submitted. Please try again.",
    thankyouFallback: "Thank you for your feedback.",
    fieldRequired: "This field is required.",
    emailRequired: "Please enter a valid email address.",
    consentRequired: "Please accept the terms to continue.",
  },
} as const;

// ── Field wrapper ─────────────────────────────────────────────────────────────

function FieldBlock({
  question,
  isFr,
  error,
  children,
}: {
  question: CmsSatisfactionQuestion;
  isFr: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const t = isFr ? T.fr : T.en;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-sm font-semibold" style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>
          {question.label || "—"}
        </span>
        {question.required && (
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: "#fef3e7", color: "#d97706" }}>
            {t.required}
          </span>
        )}
      </div>
      {children}
      {error ? (
        <p className="text-xs font-medium" style={{ color: "#C0392B" }}>{error}</p>
      ) : null}
    </div>
  );
}

// ── Question inputs ───────────────────────────────────────────────────────────

const inputCls = "rounded-2xl border px-4 py-3 text-sm outline-none transition-colors focus:border-violet-400";
const inputStyle = { borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" };
const inputErrStyle = { borderColor: "#C0392B", color: "#2E2438", fontFamily: "var(--font-inter)" };

function RatingField({ question, max, value, onChange }: { question: CmsSatisfactionQuestion; max: 5 | 10; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {Array.from({ length: max }, (_, i) => String(i + 1)).map((n) => {
        const active = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(n)}
            className="h-10 w-10 rounded-full text-sm font-bold transition-all duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            style={{ background: active ? "#7c3aed" : "#f5f0fb", color: active ? "#fff" : "#4B1F7A", border: active ? "2px solid #7c3aed" : "1.5px solid #e0d9ee", fontFamily: "var(--font-inter)" }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function YesNoField({ question, isFr, value, onChange }: { question: CmsSatisfactionQuestion; isFr: boolean; value: string; onChange: (v: string) => void }) {
  const t = isFr ? T.fr : T.en;
  return (
    <div className="flex gap-3" role="radiogroup">
      {(["yes", "no"] as const).map((val) => {
        const active = value === val;
        return (
          <button
            key={val}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(val)}
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-150 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            style={{ background: active ? "#7c3aed" : "#f5f0fb", color: active ? "#fff" : "#4B1F7A", border: active ? "2px solid #7c3aed" : "1.5px solid #e0d9ee", fontFamily: "var(--font-inter)" }}
          >
            {val === "yes" ? t.yes : t.no}
          </button>
        );
      })}
    </div>
  );
}

function MultipleChoiceField({ question, value, onChange, hasError }: { question: CmsSatisfactionQuestion; value: string; onChange: (v: string) => void; hasError?: boolean }) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {(question.options ?? []).map((option) => {
        const active = value === option;
        return (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors"
            style={{ borderColor: hasError ? "#C0392B" : active ? "#7c3aed" : "#E8DFF0", background: active ? "#f5f0fb" : "#fff", color: "#2E2438", fontFamily: "var(--font-inter)" }}
          >
            <input type="radio" name={`q-${question.id}`} value={option} checked={active} onChange={() => onChange(option)} className="h-4 w-4 accent-violet-600" />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxField({ question, value, onChange, hasError }: { question: CmsSatisfactionQuestion; value: string[]; onChange: (v: string[]) => void; hasError?: boolean }) {
  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  }
  return (
    <div className="flex flex-col gap-2">
      {(question.options ?? []).map((option) => {
        const checked = value.includes(option);
        return (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors"
            style={{ borderColor: hasError ? "#C0392B" : checked ? "#7c3aed" : "#E8DFF0", background: checked ? "#f5f0fb" : "#fff", color: "#2E2438", fontFamily: "var(--font-inter)" }}
          >
            <input type="checkbox" value={option} checked={checked} onChange={() => toggle(option)} className="h-4 w-4 accent-violet-600" />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function QuestionField({
  question,
  locale,
  values,
  onChange,
  error,
}: {
  question: CmsSatisfactionQuestion;
  locale: "fr" | "en";
  values: Record<string, string | string[]>;
  onChange: (id: string, val: string | string[]) => void;
  error?: string;
}) {
  const isFr = locale === "fr";
  const strVal = String(values[question.id] ?? "");
  const arrVal = Array.isArray(values[question.id]) ? (values[question.id] as string[]) : [];
  const hasError = Boolean(error);

  let input: React.ReactNode;
  switch (question.type) {
    case "long_text":
      input = <textarea rows={4} value={strVal} onChange={(e) => onChange(question.id, e.target.value)} className={inputCls} style={hasError ? inputErrStyle : inputStyle} />;
      break;
    case "rating_1_5":
      input = <RatingField question={question} max={5} value={strVal} onChange={(v) => onChange(question.id, v)} />;
      break;
    case "rating_1_10":
      input = <RatingField question={question} max={10} value={strVal} onChange={(v) => onChange(question.id, v)} />;
      break;
    case "yes_no":
      input = <YesNoField question={question} isFr={isFr} value={strVal} onChange={(v) => onChange(question.id, v)} />;
      break;
    case "multiple_choice":
      input = <MultipleChoiceField question={question} value={strVal} onChange={(v) => onChange(question.id, v)} hasError={hasError} />;
      break;
    case "checkbox":
      input = <CheckboxField question={question} value={arrVal} onChange={(v) => onChange(question.id, v)} hasError={hasError} />;
      break;
    case "email":
      input = <input type="email" value={strVal} onChange={(e) => onChange(question.id, e.target.value)} className={inputCls} style={hasError ? inputErrStyle : inputStyle} />;
      break;
    default:
      input = <input type="text" value={strVal} onChange={(e) => onChange(question.id, e.target.value)} className={inputCls} style={hasError ? inputErrStyle : inputStyle} />;
  }

  return (
    <FieldBlock question={question} isFr={isFr} error={error}>
      {input}
    </FieldBlock>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export default function SatisfactionForm({ locale, eventId, form }: Props) {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState("");

  const isFr = locale === "fr";
  const t = isFr ? T.fr : T.en;

  const needsEmail = Boolean(form.requireEmail) || !form.anonymousAllowed || Boolean(form.pdfAfterSubmissionUrl);

  // Dev-only: log normalized questions so the field mapping can be verified
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[AWENE] satisfaction form", { eventId, formId: form.id, questions: form.questions, needsEmail });
    }
  }, [form, eventId, needsEmail]);

  function handleChange(id: string, val: string | string[]) {
    setValues((prev) => ({ ...prev, [id]: val }));
    // Clear error on change
    if (fieldErrors[id]) setFieldErrors((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};

    for (const q of form.questions) {
      if (!q.required) continue;
      const val = values[q.id];
      const empty =
        q.type === "checkbox"
          ? !Array.isArray(val) || val.length === 0
          : !val || String(val).trim() === "";
      if (empty) errors[q.id] = t.fieldRequired;
    }

    if (needsEmail && !email.trim()) {
      errors["__email"] = t.emailRequired;
    } else if (needsEmail && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors["__email"] = t.emailRequired;
    }

    if (!consent) {
      errors["__consent"] = t.consentRequired;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBackendError("");

    if (!validate()) return;

    setState("submitting");
    try {
      const res = await fetch("/api/satisfaction-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          formId: form.id,
          answers: values,
          email: email.trim() || "",
          consent,
          language: locale,
          website,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({})) as { message?: string };
        const msg = payload?.message ?? t.errorMsg;
        setBackendError(msg);
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setBackendError(t.errorMsg);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-8 rounded-[1.75rem] border p-8 text-center" style={{ borderColor: "#E8DFF0", background: "#f8f4fb" }}>
        <div className="mb-3 text-4xl">🎉</div>
        <p className="text-base font-semibold" style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>
          {form.thankYouMessage || t.thankyouFallback}
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-8 grid grid-cols-1 gap-6 rounded-[1.75rem] border bg-white p-6 md:p-8"
      style={{ borderColor: "#E8DFF0" }}
      onSubmit={handleSubmit}
    >
      {/* Honeypot — hidden from real users */}
      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {form.introText ? (
        <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
          {form.introText}
        </p>
      ) : null}

      {form.questions.map((question) => (
        <QuestionField
          key={question.id}
          question={question}
          locale={locale}
          values={values}
          onChange={handleChange}
          error={fieldErrors[question.id]}
        />
      ))}

      {needsEmail ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <label htmlFor="sf-email" className="text-sm font-semibold" style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>
              {t.emailLabel}
            </label>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: "#fef3e7", color: "#d97706" }}>
              {t.required}
            </span>
          </div>
          <input
            id="sf-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (fieldErrors["__email"]) setFieldErrors((p) => { const n = { ...p }; delete n["__email"]; return n; }); }}
            placeholder={t.emailPlaceholder}
            className={inputCls}
            style={fieldErrors["__email"] ? inputErrStyle : inputStyle}
          />
          {fieldErrors["__email"] ? (
            <p className="text-xs font-medium" style={{ color: "#C0392B" }}>{fieldErrors["__email"]}</p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); if (fieldErrors["__consent"]) setFieldErrors((p) => { const n = { ...p }; delete n["__consent"]; return n; }); }}
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-violet-600"
          />
          <span className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
            {t.consent}
          </span>
        </label>
        {fieldErrors["__consent"] ? (
          <p className="ml-7 text-xs font-medium" style={{ color: "#C0392B" }}>{fieldErrors["__consent"]}</p>
        ) : null}
      </div>

      {backendError ? (
        <p className="rounded-xl border px-4 py-3 text-sm font-medium" style={{ color: "#C0392B", borderColor: "#fca5a5", background: "#fef2f2", fontFamily: "var(--font-inter)" }}>
          {backendError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff", fontFamily: "var(--font-inter)" }}
      >
        {state === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
