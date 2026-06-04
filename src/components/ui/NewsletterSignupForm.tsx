"use client";

import { useState } from "react";

type Props = {
  locale: "fr" | "en";
  variant?: "light" | "dark";
};

export default function NewsletterSignupForm({ locale, variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isDark = variant === "dark";
  const isFr = locale === "fr";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="py-3 text-sm font-medium"
        style={{
          color: isDark ? "rgba(243,236,251,0.9)" : "#6F3FD6",
          fontFamily: "var(--font-inter)",
        }}
      >
        {isFr
          ? "✓ Bienvenue ! Un email de confirmation vous a été envoyé."
          : "✓ Welcome! A confirmation email has been sent to you."}
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={isFr ? "Votre adresse email" : "Your email address"}
        required
        disabled={status === "submitting"}
        className="rounded-full border-2 px-5 py-4 text-sm outline-none transition-all"
        style={
          isDark
            ? {
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "#F3ECFB",
                fontFamily: "var(--font-inter)",
              }
            : {
                background: "#fff",
                borderColor: "#E8DFF0",
                color: "#2E2438",
                fontFamily: "var(--font-inter)",
              }
        }
      />
      {status === "error" && (
        <p
          className="text-xs"
          style={{ color: isDark ? "rgba(255,180,150,0.9)" : "#c0392b", fontFamily: "var(--font-inter)" }}
        >
          {isFr
            ? "Une erreur est survenue. Veuillez réessayer."
            : "Something went wrong. Please try again."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full px-7 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
          color: "#fff",
          fontFamily: "var(--font-inter)",
        }}
      >
        {status === "submitting"
          ? isFr ? "Inscription…" : "Signing up…"
          : isFr ? "Je m'inscris" : "Sign me up"}
      </button>
    </form>
  );
}
