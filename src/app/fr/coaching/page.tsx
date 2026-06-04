import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

export const metadata: Metadata = {
  title: "Coaching ménopause et périménopause | AWENE, Comprendre, Réguler, Incarner",
  description:
    "Bouffées de chaleur, brouillard mental, fatigue hormonale, sommeil fragmenté : votre corps vous parle. AWENE vous donne les clés pour le comprendre et agir, avec une approche scientifique, personnalisée, en ligne.",
  keywords: [
    "coaching ménopause en ligne",
    "accompagnement périménopause",
    "coaching ménopause MENA",
    "bouffées de chaleur",
    "fatigue hormonale",
    "brain fog ménopause",
    "théorie polyvagale",
    "œstrogène",
    "progestérone",
    "cortisol",
  ],
};

const coachingHeroImage = {
  src: "/images/awene-comprehension-corps-hormones-femme.jpg",
  title: "Le chemin vers une meilleure compréhension de soi",
  metaDescription:
    "Chaque transition mérite écoute, compréhension et accompagnement. AWENE aide les femmes à mieux comprendre leur corps, leurs hormones et leurs besoins à chaque étape de leur vie.",
  alt: "Portrait d’une femme regardant vers l’horizon dans un paysage naturel au coucher du soleil",
  caption:
    "Comprendre son corps, avancer avec confiance et retrouver un équilibre durable grâce à une approche fondée sur la science et l’écoute.",
  seoFilename: "awene-comprehension-corps-hormones-femme.jpg",
  shortDescription:
    "Une image symbolisant la réflexion, la connaissance de soi et l’accompagnement des femmes à travers les transitions hormonales et les changements de vie.",
} as const;

const pillars = [
  {
    title: "Comprendre",
    body: "Les femmes qui comprennent ce qui se passe dans leur corps ont moins de symptômes et introduisent plus facilement de nouveaux comportements, c'est prouvé scientifiquement. Vous allez comprendre l'origine de vos bouffées de chaleur, de votre fatigue chronique, de vos troubles du sommeil, de votre brouillard mental, de vos variations d'humeur et de votre prise de poids. Pas avec du jargon médical. Avec des explications claires ancrées dans les données scientifiques les plus récentes.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    title: "Réguler",
    body: "Tout part du système nerveux. Quand il est en état de stress chronique, le métabolisme déraille, le sommeil se fragmente, les bouffées de chaleur s'intensifient, l'humeur devient instable. On régule d'abord ça, avec des approches ancrées dans la théorie polyvagale et les neurosciences. Ensuite on agit sur la nutrition, le mouvement, et les autres leviers de votre équilibre, progressivement, à votre rythme.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    title: "Incarner",
    body: "Comprendre et réguler ne suffisent pas si les changements ne s'intègrent pas dans votre vie réelle. L'objectif est que les nouvelles habitudes deviennent les vôtres, dans votre quotidien, vos relations, votre relation à vous-même. Durablement.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
];

const steps = [
  ["1. On se comprend", "Une à deux séances pour que je comprenne votre histoire, vos symptômes, votre mode de vie et vos priorités. C'est le point de départ de tout."],
  ["2. On construit votre parcours", "Je vous propose un programme adapté à votre réalité. Pas un protocole standard. Un chemin qui vous correspond, en tenant compte de vos contraintes, de votre contexte de vie, de vos préférences."],
  ["3. On avance ensemble", "Mise en œuvre, ajustements, soutien. Vous n'êtes pas seule."],
  ["4. On fait le point", "On évalue ce qui a changé, énergie, sommeil, humeur, clarté mentale, et on décide ensemble de la suite."],
];

const tools = [
  ["Évaluation intégrative", "Une évaluation complète qui s'intéresse à tous les aspects de votre vie, corps, alimentation, sommeil, relations, énergie, bien-être émotionnel. Pas seulement vos symptômes."],
  ["Neurowellness et régulation du système nerveux", "Une approche basée sur la théorie polyvagale pour réguler votre système nerveux autonome, le point de départ de tout équilibre durable. Quand le système nerveux se régule, les symptômes de la ménopause diminuent."],
  ["Science du changement de comportement", "Des stratégies ancrées dans la neurobiologie du changement. Pas de la volonté. Des mécanismes qui fonctionnent, durablement."],
  ["Suivi personnalisé", "Des repères concrets pour mesurer votre progression à chaque étape, énergie, qualité du sommeil, stabilité de l'humeur, clarté mentale."],
  ["Données scientifiques actualisées", "Une approche basée sur les recherches les plus récentes en santé féminine, ménopause, métabolisme, hormones, système nerveux, nutrition."],
  ["Coordination avec votre équipe de santé", "Je travaille en complémentarité avec votre médecin, votre gynécologue et les autres professionnels qui vous accompagnent. Pas à leur place."],
];

const faqs = [
  ["Est-ce que cet accompagnement remplace mon médecin ou mon gynécologue ?", "Non. Il travaille en complémentarité avec votre suivi médical. Je ne diagnostique pas, je ne prescris pas."],
  ["Est-ce adapté si je ne prends pas de traitement hormonal ?", "Oui. Mon approche intègre tous les aspects de votre santé et bien-être, y compris la prise d'un traitement médical. Que vous soyez sous traitement hormonal ou non, l'accompagnement s'adapte à votre situation."],
  ["Est-ce que vous travaillez avec des femmes hors de Tunisie ?", "Oui. Les séances peuvent se faire en ligne. J'accompagne des femmes dans toute la région Afrique et Moyen Orient et au-delà, y compris la diaspora en France et en Europe. Les séances peuvent se tenir en arabe, en français ou en anglais."],
  ["Comment se passe le premier appel ?", "C'est une conversation de 30 minutes. Pas un entretien de vente. Pas un diagnostic. Une écoute."],
  ["Est-ce que l'accompagnement est personnalisé ?", "Entièrement. Il n'y a pas de programme standard. Chaque parcours est construit à partir de vos symptômes, vos priorités et votre réalité de vie."],
];

export default function CoachingPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/fr/coaching",
          title: "Coaching ménopause et périménopause | AWENE, Comprendre, Réguler, Incarner",
          description:
            "Bouffées de chaleur, brouillard mental, fatigue hormonale, sommeil fragmenté : votre corps vous parle. AWENE vous donne les clés pour le comprendre et agir, avec une approche scientifique, personnalisée, en ligne.",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/fr" },
          { name: "Coaching", path: "/fr/coaching" },
        ])}
      />
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#FCFAF8" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={coachingHeroImage.src}
            alt={coachingHeroImage.alt}
            fill
            priority
            className="object-cover object-[76%_24%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,250,248,0.95) 0%, rgba(252,250,248,0.82) 28%, rgba(252,250,248,0.38) 58%, rgba(252,250,248,0.7) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Coaching
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Vous méritez de comprendre{" "}
              <em className="awene-emphasis">
                ce qui se passe dans votre corps.
              </em>{" "}
              Et d&apos;avoir les outils pour aller mieux.
            </h1>
            <p
              className="max-w-[35rem] text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              La périménopause et la ménopause bouleversent votre corps : bouffées de chaleur, fatigue, brouillard mental, sommeil fragmenté, prise de poids, humeur instable. Ce n&apos;est pas une fatalité. C&apos;est une transition que vous pouvez traverser avec clarté et avec force. Mon rôle est de vous accompagner à chaque étape, avec rigueur, avec science, et avec respect de votre réalité.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={CALENDLY_BOOKING_URL} variant="primary" size="lg">
                Réserver mon appel gratuit
              </Button>
              <Button href="/fr/a-propos" variant="secondary" size="lg">
                En savoir plus
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section background="offwhite" size="lg">
        <Container className="relative">
          <div className="mb-14 max-w-3xl text-center mx-auto">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              La méthode AWENE
            </p>
            <h2
              className="text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Une approche en 3{" "}
              <span className="awene-emphasis">
                piliers
              </span>
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border p-8 md:p-10"
                style={{ borderColor: "#E8DFF0", background: pillar.bg }}
              >
                <span
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-40"
                  style={{ color: pillar.color, fontFamily: "var(--font-inter)" }}
                >
                  0{index + 1}
                </span>
                <div
                  className="mb-6 h-0.5 w-10 rounded-full"
                  style={{ background: pillar.color }}
                />
                <h3
                  className="mb-4 text-2xl font-bold md:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)", color: pillar.color }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="flex-1 text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.55fr)] lg:gap-12">
            <div className="w-full max-w-[20rem] mx-auto lg:mx-0 lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/30 lg:h-full lg:aspect-auto">
                <AmiraPortraitSlot className="h-full w-full" />
              </div>
            </div>

            <div className="flex h-full flex-col">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-center lg:text-left"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Accompagnement
              </p>
              <h2
                className="mb-10 text-center text-4xl font-bold leading-tight lg:text-left"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Comment nous travaillons ensemble
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {steps.map(([title, body]) => (
                  <article
                    key={title}
                    className="group flex h-full flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)] hover:border-[#D8C7F3]"
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    <h3
                      className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                      style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="flex-1 text-sm leading-relaxed"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container>
          <div className="mb-14 max-w-3xl text-center mx-auto">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Les outils
            </p>
            <h2
              className="text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Les outils que{" "}
              <span className="awene-emphasis">
                j&apos;utilise
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map(([title, body]) => (
              <article
                key={title}
                className="group flex h-full flex-col rounded-3xl border bg-[#FCFAF8] p-7 shadow-[0_10px_30px_rgba(75,31,122,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)] hover:border-[#D8C7F3] hover:bg-white"
                style={{ borderColor: "#E8DFF0" }}
              >
                <div
                  className="mb-5 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ background: "#6F3FD6" }}
                />
                <h3
                  className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {title}
                </h3>
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="deep" size="md" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]">
            <div className="max-w-[33.75rem]">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
              >
                Mon rôle
              </p>
              <h2
                className="mb-6 text-3xl font-bold leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
              >
                Mon rôle, la différence entre coach et médecin
              </h2>
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                Mon rôle n&apos;est pas de diagnostiquer ni de prescrire. C&apos;est de vous aider à comprendre vos symptômes, à agir et à intégrer des changements durables dans votre vie. Je travaille en complémentarité avec votre équipe médicale, je prends le relais là où la consultation s&apos;arrête, dans le quotidien, les habitudes, la durée.
              </p>
            </div>
            <div className="w-full max-w-[18rem] justify-self-center lg:justify-self-end">
              <Image
                src="/AWENE.png"
                alt="AWENE"
                width={180}
                height={180}
                className="h-auto w-full justify-self-center"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Première étape
            </p>
            <h2
              className="mb-5 text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Par où commencer ?
            </h2>
            <p
              className="mx-auto max-w-[50ch] text-base leading-relaxed"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Réservez votre premier appel. 30 minutes. Gratuit. Sans engagement. Pour comprendre où vous en êtes, vos symptômes, votre situation, vos priorités, et voir si mon accompagnement vous correspond.
            </p>
            <div className="mt-8">
                <Button href={CALENDLY_BOOKING_URL} size="lg">
                  Réserver mon appel gratuit
                </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" size="md">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(240px,0.34fr)]">
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Vos questions
              </p>
              <h2
                className="mb-10 text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                FAQ
              </h2>
              <div className="border-t" style={{ borderColor: "#E8DFF0" }}>
                {faqs.map(([question, answer], index) => (
                  <details key={question} className="border-b" style={{ borderColor: "#E8DFF0" }} open={index === 0}>
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                        {question}
                      </span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg" style={{ background: "#F3ECFB", color: "#6E6478" }}>
                        +
                      </span>
                    </summary>
                    <div className="pb-5">
                      <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                        {answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[0.92/1.15] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/coaching-faq-side-accent.jpg"
                  alt="Groupe de femmes échangeant dans un cadre calme, représentant les questions et l'accompagnement proposés par Awene."
                  title="Questions fréquentes sur le coaching Awene"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
