import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Merci",
  description: "Votre message a bien été reçu.",
};

const nextSteps = [
  {
    number: "01",
    title: "Votre message est reçu",
    desc: "Je l'ai bien reçu et je le lirai personnellement.",
    color: "#6F3FD6",
  },
  {
    number: "02",
    title: "Je vous réponds sous 48h",
    desc: "Par email, avec une réponse adaptée à votre situation et à vos questions.",
    color: "#4B1F7A",
  },
  {
    number: "03",
    title: "On se retrouve",
    desc: "Si l'accompagnement vous convient, nous organisons un premier échange téléphonique.",
    color: "#F68B2C",
  },
];

export default function Merci() {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "#FCFAF8" }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <div className="mb-16 max-w-3xl">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
            style={{
              background: "linear-gradient(135deg, #6F3FD6 0%, #4B1F7A 100%)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M6 16l7 7 13-13"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            Message reçu
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Merci d&apos;avoir
            <em className="awene-emphasis block">
              fait le premier pas.
            </em>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            C&apos;est courageux de s&apos;arrêter, de chercher un espace, d&apos;écrire. Je suis là.
          </p>
        </div>

        {/* Next steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {nextSteps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl border border-[#E8DFF0] bg-white text-center"
            >
              <span
                className="text-3xl font-bold opacity-20 block mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: step.color }}
              >
                {step.number}
              </span>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p
            className="text-sm mb-6"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            En attendant, continuez à explorer AWENE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary">
              Retour à l&apos;accueil
            </Button>
            <Button href="/articles" variant="secondary">
              Lire des articles
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
