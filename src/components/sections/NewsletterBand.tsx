"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";

interface NewsletterBandProps {
  headline?: string;
  body?: string;
}

export default function NewsletterBand({
  headline = "Ces articles vous parlent ?",
  body = "Recevez chaque semaine des informations fiables sur la périménopause et la ménopause, directement dans votre boîte mail.",
}: NewsletterBandProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(246,139,44,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(280px,0.42fr)]">
          <div className="text-center lg:text-left">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
            >
              {headline}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-10 max-w-xl lg:mx-0 mx-auto"
              style={{
                color: "rgba(243,236,251,0.75)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {body}
            </p>

            {submitted ? (
              <div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-white flex-shrink-0"
                  style={{ background: "#F68B2C" }}
                >
                  ✓
                </span>
                <p
                  className="text-base font-medium"
                  style={{ color: "#F3ECFB", fontFamily: "var(--font-inter)" }}
                >
                  Bienvenue, à très vite dans votre boîte mail.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="flex-1 px-5 py-4 rounded-full text-sm outline-none border-2 border-transparent focus:border-white/30 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#F3ECFB",
                    fontFamily: "var(--font-inter)",
                  }}
                />
                <button
                  type="submit"
                  className="px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Je m&apos;inscris à la newsletter
                </button>
              </form>
            )}

            <p
              className="mt-5 text-xs"
              style={{
                color: "rgba(243,236,251,0.45)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Aucun spam. Uniquement ce qui compte.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <PlaceholderVisual
              variant="breathing"
              tone="plum"
              className="aspect-[1/1] w-full border-[rgba(243,236,251,0.12)] shadow-none"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src="/AWENE.png"
                alt=""
                aria-hidden="true"
                width={160}
                height={160}
                className="h-auto w-[42%] opacity-85 drop-shadow-[0_2px_20px_rgba(243,236,251,0.35)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
