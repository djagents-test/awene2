import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pourquoi AWENE",
  description:
    "Le nom, le mouvement, la mission, comprendre la raison d'être profonde d'AWENE.",
};

const values = [
  {
    title: "Libérer de la solitude",
    body: "Trop de femmes traversent cette transition dans un silence pesant. AWENE brise ce silence en créant un espace de reconnaissance, d'information et d'accompagnement structuré.",
  },
  {
    title: "Honorer la complexité",
    body: "La ménopause touche le corps, le cerveau, les émotions et l'identité. Notre approche tient compte de cette profondeur plutôt que de la réduire à quelques symptômes.",
  },
  {
    title: "Construire une méthode",
    body: "AWENE ne propose pas des conseils génériques. Nous proposons une architecture, 4 piliers fondés sur la neurologie, la nutrition, le mouvement et l'hygiène de vie.",
  },
  {
    title: "Créer un mouvement",
    body: "Au-delà de l'accompagnement individuel, AWENE est une communauté de femmes qui choisissent de vivre ce passage avec conscience, intention et profondeur.",
  },
];

export default function PourquoiAWENE() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/a-propos/pourquoi-awene",
          title: "Pourquoi AWENE",
          description:
            "Le nom, le mouvement, la mission, comprendre la raison d'être profonde d'AWENE.",
          type: "AboutPage",
        })}
      />
      <PageHero
        eyebrow="La raison d'être"
        title="Pourquoi AWENE"
        subtitle="Un nom. Un mouvement. Une conviction que la ménopause mérite mieux que le silence ou les demi-réponses."
      />

      {/* The name */}
      <Section background="white" size="lg">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Le nom
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                AWENE, le souffle qui inspire
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                AWENE évoque le souffle, ce qui est à la fois discret et fondamental. Ce
                qui inspire et transforme. Un mot qui porte en lui l&apos;idée de passage, de
                transition, de vie qui continue et qui se renouvelle.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Ce nom a été choisi parce qu&apos;il dit ce que le projet est, quelque chose de
                doux mais puissant, féminin mais structuré, discret mais présent.
              </p>
            </div>
            <div
              className="rounded-3xl p-10 flex flex-col items-center justify-center text-center"
              style={{ background: "#F3ECFB", minHeight: "280px" }}
            >
              <span
                className="text-6xl md:text-7xl font-bold tracking-[0.3em] mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}
              >
                AWENE
              </span>
              <span
                className="text-base italic"
                style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
              >
                « le souffle qui inspire et le moment qui transforme »
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section background="deep" size="lg">
        <Container size="md">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
          >
            La mission
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
          >
            Transformer le silence en espace de puissance
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}
          >
            La ménopause est longtemps restée un sujet tabou, sous-étudié, mal compris.
            Les femmes ont traversé cette transition en silence, souvent seules, souvent
            sans les ressources qui leur auraient permis de la vivre autrement.
          </p>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}
          >
            AWENE est là pour changer cela, un accompagnement à la fois, un mouvement à
            la fois, une femme à la fois.
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section background="offwhite" size="lg">
        <Container>
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Ce que nous portons
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Les raisons d&apos;exister
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-[#E8DFF0] bg-white hover:shadow-[0_8px_32px_rgba(110,63,214,0.08)] transition-all duration-300"
              >
                <span
                  className="text-4xl font-bold opacity-20 block mb-4"
                  style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="lavender" size="md">
        <Container size="md" className="text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Prête à rejoindre le mouvement ?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/chemine-avec-moi" variant="primary">
              Cheminer avec moi
            </Button>
            <Button href="/a-propos/mon-histoire" variant="secondary">
              Mon histoire
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
