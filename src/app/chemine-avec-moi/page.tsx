import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Chemine avec moi",
  description:
    "Découvrez les différents chemins d'accompagnement AWENE, du rôle du coach aux programmes structurés.",
};

const paths = [
  {
    eyebrow: "Comprendre",
    title: "Le rôle du coach",
    body: "Qui est-elle ? Comment travaille-t-elle ? Quelle posture adopte-t-elle face à votre transition ? Tout ce que vous avez besoin de savoir avant de commencer.",
    href: "/chemine-avec-moi/role-du-coach",
    bg: "#F3ECFB",
    color: "#6F3FD6",
  },
];

export default function ChemineAvecMoi() {
  return (
    <>
      <PageHero
        eyebrow="Votre chemin"
        title="Chemine avec moi"
        subtitle="L'accompagnement AWENE est structuré, intentionnel et profondément humain. Voici comment il fonctionne, et comment commencer."
        blobs
      />

      {/* Paths */}
      <Section background="white" size="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group block p-8 rounded-3xl border border-[#E8DFF0] hover:shadow-[0_12px_40px_rgba(110,63,214,0.12)] hover:-translate-y-1 transition-all duration-300"
                style={{ background: path.bg }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                  style={{ color: path.color, fontFamily: "var(--font-inter)" }}
                >
                  {path.eyebrow}
                </p>
                <h2
                  className="text-2xl font-bold mb-4 group-hover:text-[#6F3FD6] transition-colors"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {path.title}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {path.body}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: path.color, fontFamily: "var(--font-inter)" }}
                >
                  Découvrir
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* Warmth section */}
          <div
            className="p-8 md:p-12 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, #F3ECFB 0%, #F8EEF5 100%)" }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
            >
              Un mot avant de commencer
            </p>
            <p
              className="text-2xl md:text-3xl font-medium italic leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
            >
              « Il n&apos;y a pas de bon ou mauvais moment pour commencer à s&apos;écouter
              vraiment. Il y a juste le moment où on est prête. »
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
