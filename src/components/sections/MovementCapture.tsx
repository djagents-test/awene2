"use client";

import { type ReactNode, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import EditorialImageBlock from "@/components/ui/EditorialImageBlock";

type GetStartedProps = {
  eyebrow?: string;
  title?: string;
  readyTitle?: string;
  readyBody?: ReactNode;
  readyHref?: string;
  readyCta?: string;
  learnTitle?: string;
  learnBody?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  successMessage?: string;
};

export default function GetStarted({
  eyebrow = "Par où commencer ?",
  title = "Par où commencer ?",
  readyTitle = "Vous êtes prête à être accompagnée",
  readyBody = (
    <ul className="space-y-2 text-base leading-relaxed list-none">
      <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />30 minutes, gratuit, sans engagement.</li>
      <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />Un échange pour comprendre ce que vous vivez : vos symptômes, votre rythme, votre réalité.</li>
      <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />Pour voir si AWENE vous correspond.</li>
    </ul>
  ),
  readyHref = "/contact",
  readyCta = "Réserver mon appel",
  learnTitle = "Vous voulez d'abord en savoir plus",
  learnBody = "Rejoignez la newsletter AWENE, des informations fiables, scientifiquement fondées, sur la périménopause et la ménopause, les hormones, le système nerveux et la santé féminine. Une fois par semaine. Directement dans votre boîte mail.",
  emailPlaceholder = "Votre adresse email",
  submitLabel = "Je m'inscris",
  successMessage = "Bienvenue, à très vite dans votre boîte mail.",
}: GetStartedProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#FCFAF8" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-center"
          style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
        >
          {eyebrow}
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1, Book a call */}
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col"
            style={{ background: "#F3ECFB", border: "1.5px solid #E8DFF0" }}
          >
            <div className="mb-6 overflow-hidden rounded-[1.6rem]">
              <EditorialImageBlock
                placement="homeReadyCall"
                variant="portrait"
                tone="violet"
                className="aspect-[16/10] w-full"
              />
            </div>
            <div
              className="w-10 h-0.5 mb-6 rounded-full"
              style={{ background: "#6F3FD6" }}
            />
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
            >
              {readyTitle}
            </h3>
            <div
              className="text-base leading-relaxed mb-8 flex-1"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              {readyBody}
            </div>
            <Button href={readyHref} variant="primary" size="lg">
              {readyCta}
            </Button>
          </div>

          {/* Card 2, Newsletter */}
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col"
            style={{ background: "#FEF3E8", border: "1.5px solid #E8DFF0" }}
          >
            <div className="mb-6 overflow-hidden rounded-[1.6rem]">
              <EditorialImageBlock
                placement="homeCommunity"
                variant="portrait"
                tone="apricot"
                className="aspect-[16/10] w-full"
              />
            </div>
            <div
              className="w-10 h-0.5 mb-6 rounded-full"
              style={{ background: "#F68B2C" }}
            />
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {learnTitle}
            </h3>
            <p
              className="text-base leading-relaxed mb-8 flex-1"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              {learnBody}
            </p>

            {submitted ? (
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-2xl"
                style={{ background: "rgba(246,139,44,0.12)" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-white flex-shrink-0"
                  style={{ background: "#F68B2C" }}
                >
                  ✓
                </span>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  required
                  className="px-5 py-4 rounded-full text-sm outline-none border-2 transition-all"
                  style={{
                    background: "#fff",
                    borderColor: "#E8DFF0",
                    color: "#2E2438",
                    fontFamily: "var(--font-inter)",
                  }}
                />
                <button
                  type="submit"
                  className="px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
