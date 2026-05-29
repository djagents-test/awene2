import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const offers = [
  {
    name: "Éclosion",
    tagline: "Le premier pas",
    duration: "3 mois",
    description:
      "Un programme d'entrée en douceur pour comprendre sa transition, poser les bases de sa méthode personnelle et commencer à habiter un nouveau rythme.",
    features: ["Bilan initial approfondi", "Séances hebdomadaires", "Plan de vie personnalisé"],
    color: "#6F3FD6",
    bg: "#F3ECFB",
    highlight: false,
  },
  {
    name: "Essor",
    tagline: "Le chemin au cœur",
    duration: "6 mois",
    description:
      "Un accompagnement en profondeur qui intègre les 4 piliers AWENE pour une transformation durable, structurée et incarnée.",
    features: ["Tout d'Éclosion", "Suivi nutritionnel", "Protocole de mouvement", "Accès communauté"],
    color: "#4B1F7A",
    bg: "#F8EEF5",
    highlight: true,
  },
  {
    name: "Métamorphose",
    tagline: "La transformation complète",
    duration: "12 mois",
    description:
      "Le programme signature AWENE. Un accompagnement annuel complet pour les femmes prêtes à transformer leur rapport à ce passage de vie.",
    features: ["Tout d'Essor", "Accompagnement prioritaire", "Retraite AWENE", "Suivi illimité"],
    color: "#F68B2C",
    bg: "#FEF3E8",
    highlight: false,
  },
];

export default function AccompagnementsPreview() {
  return (
    <Section background="white" size="lg">
      <Container>
        <SectionHeading
          eyebrow="Les accompagnements"
          title="Un chemin à votre mesure"
          subtitle="Trois niveaux d'engagement, un seul objectif, vous retrouver."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                offer.highlight
                  ? "shadow-[0_16px_48px_rgba(110,63,214,0.18)]"
                  : "hover:shadow-[0_8px_32px_rgba(110,63,214,0.1)]"
              }`}
              style={{
                background: offer.bg,
                border: offer.highlight
                  ? `2px solid ${offer.color}`
                  : "1.5px solid #E8DFF0",
              }}
            >
              {offer.highlight && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #4B1F7A, #6F3FD6)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Le plus choisi
                </div>
              )}

              <div className="mb-6">
                <p
                  className="text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                  style={{ color: offer.color, fontFamily: "var(--font-inter)" }}
                >
                  {offer.duration}
                </p>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)", color: offer.color }}
                >
                  {offer.name}
                </h3>
                <p
                  className="text-sm italic"
                  style={{ fontFamily: "var(--font-playfair)", color: "#6E6478" }}
                >
                  {offer.tagline}
                </p>
              </div>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {offer.description}
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {offer.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"
                      style={{ background: offer.color }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="/contact"
                variant={offer.highlight ? "primary" : "secondary"}
                fullWidth
                size="md"
              >
                Nous contacter
              </Button>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
