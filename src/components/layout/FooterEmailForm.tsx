"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

export default function FooterEmailForm() {
  const locale = localeFromPath(usePathname());
  const isFr = locale !== "en";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
        style={{ color: "rgba(243,236,251,0.9)", fontFamily: "var(--font-inter)" }}
      >
        {isFr ? "✓ Bienvenue dans le mouvement." : "✓ Welcome to the movement."}
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
        className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#6F3FD6] transition-colors"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "#F3ECFB",
          fontFamily: "var(--font-inter)",
        }}
      />
      {status === "error" && (
        <p className="text-xs" style={{ color: "rgba(255,180,150,0.9)", fontFamily: "var(--font-inter)" }}>
          {isFr ? "Une erreur est survenue. Veuillez réessayer." : "Something went wrong. Please try again."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
          fontFamily: "var(--font-inter)",
        }}
      >
        {status === "submitting"
          ? isFr ? "Inscription…" : "Signing up…"
          : isFr ? "Rejoindre" : "Join"}
      </button>
    </form>
  );
}
