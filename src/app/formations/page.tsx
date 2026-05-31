import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PageHero from "@/components/layout/PageHero";
import { getFormations } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, formationEventSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";
import { FormationFilters, FormationsFAQ } from "./FormationsClient";

export const metadata: Metadata = {
  title: "Formations AWENE | Ménopause, périménopause et santé féminine",
  description:
    "Formations AWENE pour comprendre la périménopause, la ménopause, la santé hormonale et accompagner les femmes, les entreprises et les professionnels.",
  keywords: [
    "formations ménopause",
    "formation périménopause",
    "santé hormonale",
    "formation santé féminine",
    "formation entreprise ménopause",
    "formation professionnels santé ménopause",
    "système nerveux",
    "AWENE",
  ],
};

const audiences = [
  {
    title: "Pour les femmes en transition",
    body: "Des repères clairs pour comprendre ce qui change, mieux lire les signaux du corps et avancer sans se sentir seule ou dépassée.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    title: "Pour les entreprises",
    body: "Des sessions accessibles pour sensibiliser les équipes, soutenir les collaboratrices et créer des environnements de travail plus informés.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    title: "Pour les professionnels de santé et bien-être",
    body: "Une base rigoureuse et humaine pour mieux accueillir les questions liées à la périménopause, à la ménopause et aux transitions du corps féminin.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
];

const learnings = [
  "Comprendre les changements hormonaux",
  "Lire les signaux du corps sans paniquer",
  "Mieux gérer fatigue, sommeil, stress et charge mentale",
  "Adapter communication, travail et rythme quotidien",
  "Savoir quand orienter vers un professionnel de santé",
  "Créer des environnements plus informés et plus humains",
];

const faqs = [
  {
    question: "Est-ce que les formations sont médicales ?",
    answer:
      "Non. Les formations AWENE ne remplacent pas une consultation, un diagnostic ou un traitement. Elles donnent des repères fiables, compréhensibles et utiles pour mieux comprendre cette transition et savoir quand consulter.",
  },
  {
    question: "Est-ce adapté aux entreprises ?",
    answer:
      "Oui. Les contenus peuvent être adaptés aux équipes RH, managers, collaboratrices et comités bien-être, avec un ton clair, respectueux et non intrusif.",
  },
  {
    question: "Peut-on organiser une formation en présentiel ?",
    answer:
      "Oui. Selon le lieu, le public et le format souhaité, une session peut être organisée en présentiel, en ligne ou en format hybride.",
  },
  {
    question: "Les formations sont-elles disponibles en arabe ?",
    answer:
      "Oui. Les formations peuvent être proposées en français, en arabe ou en anglais selon le public et le contexte.",
  },
  {
    question: "Comment s'inscrire ?",
    answer:
      "Chaque formation ouverte affiche un bouton “Je m'inscris” qui mène vers sa page dédiée, avec le détail de la session et un formulaire d'inscription intégré.",
  },
  {
    question: "Que se passe-t-il si une formation est complète ?",
    answer:
      "Le statut “Complet” est affiché clairement. Vous pouvez consulter les prochaines dates ou demander une session adaptée à votre groupe.",
  },
];

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function FormationsPage() {
  const formations = await getFormations();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-20 top-[10rem] h-[24rem] w-[24rem] rounded-full opacity-[0.28]"
          style={{ background: "radial-gradient(circle, rgba(246,139,44,0.2) 0%, rgba(246,139,44,0.08) 36%, transparent 72%)" }}
        />
        <div
          className="absolute right-[-10rem] top-[3rem] h-[36rem] w-[36rem] rounded-full opacity-[0.42]"
          style={{ background: "radial-gradient(circle, rgba(111,63,214,0.2) 0%, rgba(111,63,214,0.1) 34%, transparent 72%)" }}
        />
        <div
          className="absolute left-[18%] bottom-[14%] h-[20rem] w-[20rem] rounded-full opacity-[0.22]"
          style={{ background: "radial-gradient(circle, rgba(243,236,251,0.4) 0%, rgba(243,236,251,0.12) 42%, transparent 76%)" }}
        />
      </div>
      <div className="relative z-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Formations", path: "/formations" },
          ]),
          webPageSchema({
            path: "/formations",
            title: "Formations AWENE | Ménopause, périménopause et santé féminine",
            description:
              "Formations AWENE pour comprendre la périménopause, la ménopause, la santé hormonale et accompagner les femmes, les entreprises et les professionnels.",
            type: "CollectionPage",
          }),
          itemListSchema(
            "/formations",
            formations.map((formation) => ({
              name: formation.title,
              url: absoluteUrl(`/formations/${formation.slug}`),
            })),
          ),
          faqSchema(),
          ...formations.map((formation) => formationEventSchema(formation)),
        ]}
      />

      <PageHero
        eyebrow="Formations"
        title={
          <>
            Formations AWENE.
            <em className="awene-emphasis block">
              Comprendre le corps. Accompagner la transition.
            </em>
          </>
        }
        subtitle="Des formations claires, humaines et fondées sur la science pour mieux comprendre la périménopause, la ménopause, la santé hormonale, le système nerveux et les transitions du corps féminin."
        visual
        visualPlacement="formationsHero"
        visualVariant="hormonal-rhythm"
        visualTone="mixed"
        blobs
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#prochaines-formations" size="lg">
            Voir les prochaines formations
          </Button>
          <Button href="/contact?sujet=Formation%20sur%20mesure" variant="secondary" size="lg">
            Demander une formation sur mesure
          </Button>
        </div>
      </PageHero>

      <Section background="white" size="lg">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(280px,0.35fr)]">
            <div className="max-w-4xl">
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Des repères fiables
              </p>
              <h2
                className="mb-7 text-4xl font-bold md:text-5xl"
                style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
              >
                Comprendre{" "}
                <span className="awene-emphasis">
                  sans dramatiser.
                </span>{" "}
                Accompagner{" "}
                <span className="awene-emphasis">
                  sans remplacer
                </span>{" "}
                le soin.
              </h2>
              <div
                className="space-y-5 text-base leading-relaxed md:text-lg"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                <p>
                  Les formations AWENE ne remplacent pas un avis médical, une
                  consultation ou un diagnostic. Elles apportent des repères fiables,
                  concrets et compréhensibles pour mieux accompagner les femmes, les
                  équipes et les professionnelles.
                </p>
                <p>
                  L&apos;objectif est simple : rendre les transitions hormonales moins
                  floues, moins isolantes, et plus faciles à aborder dans la vie
                  quotidienne, au travail et dans les espaces de soin ou de bien-être.
                </p>
              </div>
            </div>
            <div className="relative hidden lg:block aspect-[0.95/1.05] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-hero.jpg"
                alt="Femme professionnelle dans un environnement elegant representant les formations AWENE"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="lg">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Prochaines sessions
            </p>
            <h2
              className="mb-5 text-4xl font-bold md:text-5xl"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              Trouver la formation adaptée.
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Filtrez par date, format, public, langue ou statut. Les formations
              affichées viennent du CMS WordPress via le flux AWENE Formations.
            </p>
          </div>
          <FormationFilters formations={formations} />
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Pour qui ?
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              Trois publics. Une même exigence de clarté.
            </h2>
          </div>
          <div className="mb-8 hidden lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="relative aspect-[1.35/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-audience-1.jpg"
                alt="Groupe de femmes elegantes et confiantes representant differentes generations"
                fill
                className="object-cover object-[50%_20%]"
                sizes="(min-width: 1024px) 20rem, 100vw"
              />
            </div>
            <div className="relative aspect-[1.35/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-audience-2.jpg"
                alt="Femme professionnelle dans un espace moderne"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 20rem, 100vw"
              />
            </div>
            <div className="relative aspect-[1.35/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-audience-3.jpg"
                alt="Femme mature dans un environnement naturel et apaisant"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 20rem, 100vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:shadow-[0_18px_40px_rgba(75,31,122,0.1)] md:p-9"
                style={{ background: audience.bg, borderColor: "#E8DFF0" }}
              >
                <div
                  className="mb-6 h-0.5 w-10 rounded-full"
                  style={{ background: audience.color }}
                />
                <h3
                  className="mb-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                  style={{ color: audience.color, fontFamily: "var(--font-playfair)" }}
                >
                  {audience.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {audience.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Apprendre utile
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              <span className="awene-emphasis">
                Ce que vous allez apprendre.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {learnings.map((item) => (
              <div
                key={item}
                className="group flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8C7F3] hover:shadow-[0_14px_30px_rgba(75,31,122,0.08)]"
                style={{ borderColor: "#E8DFF0" }}
              >
                <span
                  className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "#6F3FD6" }}
                >
                  ✓
                </span>
                <p
                  className="text-sm font-semibold leading-relaxed transition-colors duration-300 group-hover:text-[#4B1F7A]"
                  style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="deep" size="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(246,139,44,0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(250px,0.38fr)]">
            <div className="text-center lg:text-left">
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                Formation sur mesure
              </p>
              <h2
                className="mb-6 text-4xl font-bold leading-tight md:text-5xl"
                style={{ color: "#F3ECFB", fontFamily: "var(--font-playfair)" }}
              >
                Vous voulez une formation adaptée à votre public ?
              </h2>
              <p
                className="mx-auto mb-9 max-w-2xl text-base leading-relaxed md:text-lg lg:mx-0"
                style={{ color: "rgba(243,236,251,0.82)", fontFamily: "var(--font-inter)" }}
              >
                AWENE peut concevoir des sessions sur mesure pour entreprises,
                associations, équipes RH, espaces bien-être, cliniques, cabinets et
                communautés.
              </p>
              <Button href="/contact?sujet=Formation%20sur%20mesure" size="lg">
                Demander une formation sur mesure
              </Button>
            </div>
            <div className="relative hidden lg:block aspect-[1.05/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-sur-mesure.jpg"
                alt="Deux femmes discutant dans un environnement calme et rassurant"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 24rem, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="lg">
        <Container>
          <div className="max-w-4xl">
            <p
              className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Questions fréquentes
            </p>
            <h2
              className="mb-12 text-center text-4xl font-bold md:text-5xl"
              style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
            >
              FAQ
            </h2>
            <FormationsFAQ faqs={faqs} />
          </div>
        </Container>
      </Section>
      </div>
    </div>
  );
}
