"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { CmsFormation } from "@/lib/cms";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  audienceType: string;
  message: string;
  consent: boolean;
};

function analyticsPayload(formation: CmsFormation, sourcePage = "single_formation") {
  const params =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);

  return {
    formation_id: formation.id,
    formation_title: formation.title,
    formation_slug: formation.slug,
    formation_date: formation.date,
    formation_format: formation.formatLabel,
    formation_language: formation.languageLabel,
    formation_status: formation.statusLabel,
    source_page: sourcePage,
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
  };
}

function pushAnalytics(event: string, payload: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(`awene:${event}`, { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event, ...payload });
}

function unavailableMessage(formation: CmsFormation) {
  if (formation.status === "sold_out" || formation.remainingSeats === 0) {
    return "Formation complète.";
  }

  if (formation.status === "past") {
    return "Formation terminée.";
  }

  if (formation.status === "cancelled") {
    return "Formation annulée.";
  }

  return "";
}

export default function FormationRegistrationForm({
  formation,
}: {
  formation: CmsFormation;
}) {
  const unavailable = unavailableMessage(formation);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    audienceType: formation.audience,
    message: "",
    consent: false,
  });

  const basePayload = useMemo(() => analyticsPayload(formation), [formation]);

  useEffect(() => {
    pushAnalytics("formation_view", basePayload);
  }, [basePayload]);

  const setValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (unavailable || state === "submitting") {
      return;
    }

    setState("submitting");
    setError("");
    pushAnalytics("formation_registration_started", basePayload);

    const response = await fetch("/api/formation-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        formation_id: formation.id,
        formation_title: formation.title,
        formation_slug: formation.slug,
        formation_date: formation.date,
        formation_format: formation.formatLabel,
        formation_language: formation.languageLabel,
        formation_audience: formation.audienceLabel,
        source_page: "single_formation",
        utm_source: basePayload.utm_source,
        utm_medium: basePayload.utm_medium,
        utm_campaign: basePayload.utm_campaign,
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(body?.message ?? "L'inscription n'a pas pu être envoyée. Merci de réessayer.");
      setState("error");
      return;
    }

    pushAnalytics("formation_registration_submitted", basePayload);
    setState("success");
  }

  if (state === "success") {
    return (
      <div
        className="rounded-3xl border p-7 md:p-9"
        style={{ background: "#F3ECFB", borderColor: "#E8DFF0" }}
      >
        <h2
          className="mb-4 text-3xl font-bold"
          style={{ color: "#4B1F7A", fontFamily: "var(--font-playfair)" }}
        >
          Votre inscription a bien été envoyée.
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
        >
          L'équipe AWENE vous contactera bientôt.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl border bg-white p-6 shadow-[0_8px_36px_rgba(110,63,214,0.08)] md:p-8"
      style={{ borderColor: "#E8DFF0" }}
    >
      <h2
        className="mb-3 text-3xl font-bold"
        style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
      >
        Je m'inscris
      </h2>
      <p
        className="mb-7 text-sm leading-relaxed"
        style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
      >
        Remplissez ce formulaire. L'équipe AWENE vous recontactera avec les
        informations pratiques.
      </p>

      {unavailable ? (
        <div
          className="rounded-2xl px-5 py-4 text-sm font-semibold"
          style={{ background: "#FEF3E8", color: "#4B1F7A", fontFamily: "var(--font-inter)" }}
        >
          {unavailable}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="formation_id" value={formation.id} />
          <input type="hidden" name="formation_title" value={formation.title} />
          <input type="hidden" name="formation_slug" value={formation.slug} />
          <input type="hidden" name="formation_date" value={formation.date} />
          <input type="hidden" name="formation_format" value={formation.formatLabel} />
          <input type="hidden" name="formation_language" value={formation.languageLabel} />
          <input type="hidden" name="formation_audience" value={formation.audienceLabel} />
          <input type="hidden" name="source_page" value="single_formation" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Prénom" required>
              <input
                required
                value={values.firstName}
                onChange={(event) => setValue("firstName", event.target.value)}
                className="awene-input"
              />
            </Field>
            <Field label="Nom" required>
              <input
                required
                value={values.lastName}
                onChange={(event) => setValue("lastName", event.target.value)}
                className="awene-input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Email" required>
              <input
                required
                type="email"
                value={values.email}
                onChange={(event) => setValue("email", event.target.value)}
                className="awene-input"
              />
            </Field>
            <Field label="Téléphone">
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => setValue("phone", event.target.value)}
                className="awene-input"
              />
            </Field>
          </div>

          <Field label="Profession ou organisation">
            <input
              value={values.organization}
              onChange={(event) => setValue("organization", event.target.value)}
              className="awene-input"
            />
          </Field>

          <Field label="Type de public">
            <select
              value={values.audienceType}
              onChange={(event) => setValue("audienceType", event.target.value)}
              className="awene-input"
            >
              <option value="particuliers">Particuliers</option>
              <option value="entreprises">Entreprises</option>
              <option value="professionnels">Professionnels de santé et bien-être</option>
            </select>
          </Field>

          <Field label="Message">
            <textarea
              rows={4}
              value={values.message}
              onChange={(event) => setValue("message", event.target.value)}
              className="awene-input resize-none"
            />
          </Field>

          <label
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            <input
              required
              type="checkbox"
              checked={values.consent}
              onChange={(event) => setValue("consent", event.target.checked)}
              className="mt-1"
            />
            <span>
              J'accepte que les informations transmises soient utilisées pour
              traiter ma demande d'inscription.
            </span>
          </label>

          {error && (
            <p className="text-sm font-semibold" style={{ color: "#C0221A" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 md:w-auto"
            style={{
              background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {state === "submitting" ? "Envoi..." : "Envoyer mon inscription"}
          </button>
        </form>
      )}

      <style jsx>{`
        .awene-input {
          min-height: 3rem;
          width: 100%;
          border-radius: 0.9rem;
          border: 1.5px solid #e8dff0;
          background: #fcfaf8;
          padding: 0.85rem 1rem;
          color: #2e2438;
          font-family: var(--font-inter);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .awene-input:focus {
          border-color: #6f3fd6;
          box-shadow: 0 0 0 3px rgba(111, 63, 214, 0.12);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-semibold"
        style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
      >
        {label} {required && <span style={{ color: "#F68B2C" }}>*</span>}
      </span>
      {children}
    </label>
  );
}
