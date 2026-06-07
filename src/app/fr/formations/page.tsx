import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getFormations } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, formationEventSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";

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
            { name: "Accueil", path: "/fr" },
            { name: "Formations", path: "/fr/formations" },
          ]),
          webPageSchema({
            path: "/fr/formations",
            title: "Formations AWENE | Ménopause, périménopause et santé féminine",
            description:
              "Formations AWENE pour comprendre la périménopause, la ménopause, la santé hormonale et accompagner les femmes, les entreprises et les professionnels.",
            type: "CollectionPage",
          }),
          itemListSchema(
            "/fr/formations",
            formations.map((formation) => ({
              name: formation.title,
              url: absoluteUrl(`/fr/formations/${formation.slug}`),
            })),
          ),
          faqSchema(),
          ...formations.map((formation) => formationEventSchema(formation)),
        ]}
      />

      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src="/images/awene-femmes-professionnelles-collaboration.jpg"
          alt=""
          title="Femmes professionnelles réunies autour d’un projet commun"
          fill
          priority
          quality={95}
          aria-hidden="true"
          className="object-cover object-[50%_22%] md:object-[50%_42%] xl:object-[50%_32%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,250,248,0.94)_0%,rgba(252,250,248,0.8)_48%,rgba(252,250,248,0.24)_100%)]" />
        <Container className="relative z-10 flex min-h-[72vh] items-end pt-32 pb-20">
          <div className="max-w-4xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Formations
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Formations AWENE.
              <em className="awene-emphasis block">
                Comprendre le corps. Accompagner la transition.
              </em>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Des formations claires, humaines et fondées sur la science pour mieux comprendre la périménopause, la ménopause, la santé hormonale, le système nerveux et les transitions du corps féminin.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#prochaines-formations" size="lg">
                Voir les prochaines formations
              </Button>
              <a
                href="/fr/contact?sujet=Formation%20sur%20mesure"
                className="inline-flex items-center justify-center gap-2 rounded-full px-9 py-4.5 text-base font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "transparent",
                  color: "#6F3FD6",
                  border: "1.5px solid #6F3FD6",
                }}
              >
                Demander une formation sur mesure
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container>
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
                <p>
                  Besoin d&apos;une session adaptée à votre organisation ou à votre public ?
                  {" "}
                  <a
                    href="/fr/contact?sujet=Formation%20sur%20mesure"
                    className="font-semibold"
                    style={{ color: "#6F3FD6" }}
                  >
                    Demandez une formation sur mesure.
                  </a>
                </p>
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
            <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Les prochaines formations confirmées sont listées ci-dessous.
            </p>
          </div>
          <div id="prochaines-formations">
            {formations.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {formations.map((formation) => (
                  <article
                    key={formation.id}
                    className="rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_48px_rgba(110,63,214,0.12)] md:p-8"
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background:
                            formation.status === "sold_out"
                              ? "#FEF3E8"
                              : formation.status === "past"
                                ? "#F8EEF5"
                                : "#F3ECFB",
                          color:
                            formation.status === "sold_out"
                              ? "#F68B2C"
                              : formation.status === "past"
                                ? "#4B1F7A"
                                : "#6F3FD6",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {formation.statusLabel}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: "#FCFAF8",
                          color: "#6E6478",
                          border: "1px solid #E8DFF0",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {formation.audienceLabel}
                      </span>
                    </div>
                    <h3
                      className="mb-4 text-2xl font-bold leading-tight md:text-3xl"
                      style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
                    >
                      {formation.title}
                    </h3>
                    <dl
                      className="mb-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Date</dt>
                        <dd>{formation.date}</dd>
                      </div>
                      {formation.time ? (
                        <div>
                          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Heure</dt>
                          <dd>{formation.time}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Format</dt>
                        <dd>{formation.formatLabel}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Lieu</dt>
                        <dd>{formation.location}</dd>
                      </div>
                    </dl>
                    {formation.description ? (
                      <p className="mb-7 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                        {formation.description}
                      </p>
                    ) : null}
                    <a
                      href={
                        formation.status === "sold_out" || formation.status === "cancelled"
                          ? undefined
                          : formation.status === "past"
                            ? "/fr/formations"
                            : `/fr/formations/${formation.slug}`
                      }
                      className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                      style={{
                        background:
                          formation.status === "sold_out" || formation.status === "cancelled"
                            ? "#E8DFF0"
                            : "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                        color:
                          formation.status === "sold_out" || formation.status === "cancelled"
                            ? "#6E6478"
                            : "#FFFFFF",
                        fontFamily: "var(--font-inter)",
                        pointerEvents:
                          formation.status === "sold_out" || formation.status === "cancelled"
                            ? "none"
                            : "auto",
                      }}
                    >
                      {formation.status === "sold_out"
                        ? "Complet"
                        : formation.status === "cancelled"
                          ? "Annulé"
                          : formation.status === "past"
                            ? "Voir les prochaines formations"
                            : "Je m'inscris"}
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className="rounded-3xl border bg-white p-8 text-center md:p-12"
                style={{ borderColor: "#E8DFF0" }}
              >
                <h3
                  className="mb-3 text-2xl font-bold"
                  style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}
                >
                  Aucune formation programmée pour le moment.
                </h3>
                <p
                  className="mx-auto max-w-xl text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Les prochaines dates seront publiées ici dès leur confirmation. Vous pouvez aussi demander une session sur mesure.
                </p>
              </div>
            )}
          </div>
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
          <div className="mb-8 hidden lg:block">
            <div className="relative aspect-[3/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/awene-femmes-diversite-inclusion.jpg"
                alt="Femmes de différents horizons réunies dans un esprit de soutien et d’inclusion"
                title="Diversité, inclusion et soutien entre femmes"
                fill
                className="object-cover object-[50%_15%] md:object-[50%_25%] xl:object-center"
                sizes="(min-width: 1024px) 60rem, 100vw"
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
                className="mb-4"
                style={{
                  color: "#F3ECFB",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                  lineHeight: 1.1,
                  maxWidth: "min(100%, 48rem)",
                }}
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
              <Button href="/fr/contact?sujet=Formation%20sur%20mesure" size="lg">
                Demander une formation sur mesure
              </Button>
            </div>
            <div className="relative hidden lg:block aspect-[1.05/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/awene-diversite-feminine-bien-etre.jpg"
                alt="Deux femmes représentant la diversité et le bien-être"
                title="Diversité féminine et bien-être"
                fill
                className="object-cover object-[50%_20%] md:object-[50%_25%] xl:object-center"
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
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: "#E8DFF0" }}
                  open={index === 0}
                >
                  <summary
                    className="cursor-pointer px-6 py-5 text-base font-semibold"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    <p className="text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      </div>
    </div>
  );
}
