import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ReactNode } from "react";

type Pillar = {
  number: string;
  name: string;
  description: string;
  color: string;
  bg: string;
};

type ApproachProps = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  pillars?: Pillar[];
};

const defaultPillars: Pillar[] = [
  {
    number: "01",
    name: "Comprendre",
    description:
      "Les femmes qui comprennent ce qui se passe dans leur corps vont mieux, c'est prouvé. Vos bouffées de chaleur, votre fatigue chronique, vos troubles du sommeil, vos variations d'humeur, votre prise de poids : tout a une explication hormonale et neurologique. On vous la donne, clairement.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    number: "02",
    name: "Réguler",
    description:
      "Votre système nerveux d'abord. Quand il est en état de stress chronique, le métabolisme déraille, le sommeil se fragmente, le brouillard mental s'installe. Quand il est équilibré, votre métabolisme, votre sommeil et votre humeur suivent. C'est la base de tout ce qu'on construit ensemble.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    number: "03",
    name: "Incarner",
    description:
      "Des changements qui s'intègrent dans votre vie réelle. Pas un programme standard. Un chemin qui vous correspond, dans votre quotidien, vos relations, votre relation à vous-même. Durablement.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
];

export default function Approach({
  eyebrow = "La méthode AWENE",
  title = (
    <>
      Une approche{" "}
      <span className="awene-emphasis">
        scientifique.
      </span>{" "}
      Un accompagnement{" "}
      <span className="awene-emphasis">
        humain.
      </span>
    </>
  ),
  subtitle = "AWENE accompagne les femmes en périménopause et ménopause en Afrique, au Moyen Orient et au-delà, avec rigueur, précision et respect de leur réalité. Pas du coaching intuitif. Pas des solutions miracles. Une méthode intégrative ancrée dans les données scientifiques les plus récentes sur les hormones, le système nerveux et la santé féminine.",
  pillars = defaultPillars,
}: ApproachProps) {
  return (
    <Section background="offwhite" size="lg">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative p-8 md:p-10 rounded-3xl border transition-all duration-300 hover:shadow-[0_8px_40px_rgba(110,63,214,0.12)] hover:-translate-y-1"
              style={{
                background: pillar.bg,
                borderColor: "#E8DFF0",
              }}
            >
              {/* Number */}
              <span
                className="absolute top-8 right-8 text-xs font-semibold tracking-[0.2em] opacity-40"
                style={{ color: pillar.color, fontFamily: "var(--font-inter)" }}
              >
                {pillar.number}
              </span>

              {/* Accent line */}
              <div
                className="w-10 h-0.5 mb-6 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: pillar.color }}
              />

              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: pillar.color,
                }}
              >
                {pillar.name}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
