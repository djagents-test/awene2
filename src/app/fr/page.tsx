import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EditorialImageBlock from "@/components/ui/EditorialImageBlock";
import NewsletterSignupForm from "@/components/ui/NewsletterSignupForm";
import PartnerCard from "@/components/ui/PartnerCard";
import Section from "@/components/ui/Section";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { breadcrumbSchema, webPageSchema, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AWENE | Coaching périménopause et ménopause, comprendre son corps autrement",
  description:
    "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique, humaine et apaisée. Comprendre les hormones, les symptômes et le système nerveux pour avancer avec plus de clarté.",
  keywords: [
    "coaching ménopause",
    "coaching périménopause",
    "accompagnement ménopause en ligne",
    "bouffées de chaleur",
    "fatigue ménopause",
    "brain fog",
    "troubles du sommeil",
    "prise de poids ménopause",
    "cycles irréguliers",
    "MENA",
  ],
};

const pillars = [
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

const homeFaqs = [
  {
    question: "Est-ce que vous travaillez uniquement avec des femmes en Tunisie ?",
    answer:
      "Non. Les séances se font en ligne. J'accompagne des femmes dans toute la région Afrique et Moyen Orient, Tunisie, Maroc, Algérie, et au-delà, y compris la diaspora en France et en Europe. Les séances peuvent se tenir en arabe, en français ou en anglais.",
  },
  {
    question: "Est-ce que c'est adapté si je ne prends pas de traitement hormonal ?",
    answer:
      "Oui. Mon approche intègre tous les aspects de votre santé et bien-être, y compris la prise d'un traitement médical. Que vous soyez sous traitement hormonal ou non, l'accompagnement s'adapte à votre situation.",
  },
  {
    question: "Quelle est la différence entre AWENE et un suivi médical classique ?",
    answer:
      "Je ne diagnostique pas et je ne prescris pas. J'accompagne là où la consultation s'arrête, dans le quotidien, les habitudes, la durée.",
  },
  {
    question: "Comment fonctionne le premier appel ?",
    answer:
      "C'est une conversation de 30 minutes. Gratuite. Pour comprendre ce que vous vivez, vos symptômes, votre contexte, vos priorités, et voir si mon accompagnement vous correspond.",
  },
];

export default function FrenchHomePageRoute() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([{ name: "Accueil", path: "/fr" }]),
          webPageSchema({
            path: "/fr",
            title: "AWENE | Coaching périménopause et ménopause, comprendre son corps autrement",
            description:
              "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique, humaine et apaisée. Comprendre les hormones, les symptômes et le système nerveux pour avancer avec plus de clarté.",
          }),
        ]}
      />

      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#FCFAF8" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/62256.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[62%_22%] opacity-[0.34] md:object-[76%_22%] lg:object-[82%_20%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,250,248,0.94) 0%, rgba(252,250,248,0.76) 28%, rgba(252,250,248,0.34) 56%, rgba(252,250,248,0.62) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.18]"
            style={{
              background:
                "radial-gradient(circle at center, #6F3FD6 0%, #F3ECFB 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 -left-24 h-[400px] w-[400px] rounded-full opacity-[0.22]"
            style={{
              background:
                "radial-gradient(circle at center, #F8EEF5 0%, #F3ECFB 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-3 w-3 rounded-full opacity-40"
            style={{ background: "#F68B2C" }}
          />
          <div
            className="absolute left-1/3 top-2/3 h-2 w-2 rounded-full opacity-30"
            style={{ background: "#6F3FD6" }}
          />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              coaching périménopause et ménopause
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              <em className="awene-emphasis block">
                Ton corps traverse une transition réelle.
              </em>
              Comprends-la. Agis.
            </h1>
            <p
              className="mb-6 text-xl font-medium md:text-2xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
            >
              Connais ton corps. C&apos;est ta force.
            </p>
            <p
              className="mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Bouffées de chaleur, fatigue inexpliquée, brouillard mental, sommeil fragmenté, humeur instable, poids qui change, ce n&apos;est pas dans ta tête. Ce n&apos;est pas une fatalité. C&apos;est une transition biologique documentée, que tu peux comprendre, et traverser avec les bons outils.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href={CALENDLY_BOOKING_URL} size="lg">
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
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              La méthode AWENE
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Une approche <span className="awene-emphasis">scientifique.</span> Un accompagnement <span className="awene-emphasis">humain.</span>
            </h2>
            <p
              className="mt-6 text-base leading-relaxed md:text-lg"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              AWENE accompagne les femmes en périménopause et ménopause en Afrique, au Moyen Orient et au-delà, avec rigueur, précision et respect de leur réalité. Pas du coaching intuitif. Pas des solutions miracles. Une méthode intégrative ancrée dans les données scientifiques les plus récentes sur les hormones, le système nerveux et la santé féminine.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="group relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(110,63,214,0.12)] md:p-10"
                style={{ background: pillar.bg, borderColor: "#E8DFF0" }}
              >
                <span
                  className="absolute right-8 top-8 text-xs font-semibold tracking-[0.2em] opacity-40"
                  style={{ color: pillar.color, fontFamily: "var(--font-inter)" }}
                >
                  {pillar.number}
                </span>
                <div
                  className="mb-6 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: pillar.color }}
                />
                <h3
                  className="mb-4 text-2xl font-bold md:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)", color: pillar.color }}
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

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(160deg, #2E1A4A 0%, #1C0F2E 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(19rem,23rem)_minmax(0,1fr)]">
            <div className="order-1 w-full">
              <div className="aspect-[4/5] w-full max-w-[23rem] lg:max-w-none">
                <AmiraPortraitSlot className="h-full w-full rounded-[2rem]" />
              </div>
            </div>

            <div className="order-2 flex flex-col justify-center">
              <p
                className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
              >
                <span className="block h-px w-8 shrink-0" style={{ background: "rgba(246,139,44,0.8)" }} />
                Votre accompagnatrice
              </p>
              <h2
                className="mb-3 text-3xl font-bold leading-tight md:text-4xl lg:text-[3rem]"
                style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
              >
                Amira Medimagh
              </h2>
              <p
                className="mb-7 text-sm font-medium leading-relaxed md:text-[0.95rem]"
                style={{ color: "rgba(246,139,44,0.9)", fontFamily: "var(--font-inter)" }}
              >
                Médecin · Experte en santé publique · Coach certifiée en santé et nutrition intégratives et en périménopause et ménopause
              </p>
              <p
                className="mb-10 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                20 ans d&apos;expérience en santé publique internationale. Une conviction : chaque femme mérite de comprendre son corps, ses cycles hormonaux, ses symptômes, ses transitions, et d&apos;avoir les outils pour aller bien.
              </p>
              <Button href="/fr/a-propos" variant="secondary">
                <span style={{ color: "#F3ECFB" }}>En savoir plus sur Amira</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "#FCFAF8" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <p
            className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            Par où commencer ?
          </p>
          <h2
            className="mb-16 text-center text-4xl font-bold leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Par où commencer ?
          </h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div
              className="flex flex-col rounded-3xl p-8 md:p-10"
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
              <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: "#6F3FD6" }} />
              <h3
                className="mb-4 text-2xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
              >
                Vous êtes prête à être accompagnée
              </h3>
              <div
                className="mb-8 flex-1 text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />30 minutes, gratuit, sans engagement.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />Un échange pour comprendre ce que vous vivez : vos symptômes, votre rythme, votre réalité.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />Pour voir si AWENE vous correspond.</li>
                </ul>
              </div>
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Réserver mon appel
              </Button>
            </div>

            <div
              className="flex flex-col rounded-3xl p-8 md:p-10"
              style={{ background: "#FEF3E8", border: "1.5px solid #E8DFF0" }}
            >
              <div className="mb-6 overflow-hidden rounded-[1.6rem]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/awene-femmes-diversite-inclusion.jpg"
                    alt="Femmes de différents horizons réunies dans un esprit de soutien et d’inclusion"
                    title="Diversité, inclusion et soutien entre femmes"
                    fill
                    className="object-cover object-[50%_15%] md:object-[50%_25%] xl:object-center"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
              <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: "#F68B2C" }} />
              <h3
                className="mb-4 text-2xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Vous voulez d'abord en savoir plus
              </h3>
              <p
                className="mb-8 flex-1 text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Rejoignez la newsletter AWENE, des informations fiables, scientifiquement fondées, sur la périménopause et la ménopause, les hormones, le système nerveux et la santé féminine. Une fois par semaine. Directement dans votre boîte mail.
              </p>
              <NewsletterSignupForm locale="fr" />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, rgba(246,139,44,0.4) 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "rgba(246,139,44,0.92)", fontFamily: "var(--font-inter)" }}
            >
              Partenariats
            </p>
            <h2
              className="mt-6 text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
            >
              Vous êtes employeur, professionnel de la santé ou du bien-être ? Construisons un partenariat rigoureux.
            </h2>
            <p
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(243,236,251,0.78)", fontFamily: "var(--font-inter)" }}
            >
              Awene développe des collaborations sérieuses, structurées et durables, avec un cadre clair, une démarche éthique et un accompagnement aligné sur les réalités du terrain.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <PartnerCard
              eyebrow="Vous êtes une entreprise ?"
              title="Vous êtes une entreprise ?"
              body="Vos collaboratrices de 40-55 ans traversent la périménopause et la ménopause en silence. Bouffées de chaleur au bureau, brouillard mental, fatigue chronique, difficultés de concentration — l&apos;absentéisme et la baisse de productivité ont un coût réel. Les solutions aussi."
              href="/fr/contact"
              cta="Parlons-en"
              variant="primary"
            />
            <PartnerCard
              eyebrow="Vous êtes un professionnel de santé ?"
              title="Vous êtes un professionnel de la santé et/ou du bien-être ?"
              body={[
                "AWENE collabore avec des médecins, gynécologues, nutritionnistes, psychologues, ostéopathes, coaches sportifs et autres professionnels qui accompagnent les femmes en transition hormonale.",
                "Si vous accompagnez des femmes de 40 ans et plus et que vous cherchez un partenaire rigoureux et engagé dans la région MENA, parlons-en.",
              ]}
              href="/fr/contact"
              cta="Proposer une collaboration"
              variant="light"
            />
          </div>
        </Container>
      </section>

      <HomeFaqSection />
    </>
  );
}


function HomeFaqSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "#FCFAF8" }}>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.64fr)_minmax(250px,0.36fr)]">
          <div>
            <p
              className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] lg:text-left"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Vos questions
            </p>
            <h2
              className="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl lg:text-left"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Foire aux questions
            </h2>

            <div className="space-y-3">
              {homeFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border bg-white transition-all duration-200"
                  style={{ borderColor: "#E8DFF0" }}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-7 py-5 list-none">
                    <span
                      className="text-base font-semibold leading-snug"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm"
                      style={{ background: "#E8DFF0", color: "#6E6478" }}
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className="px-7 pb-6"
                    style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  >
                    <p className="text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="relative hidden w-full overflow-hidden rounded-[1.75rem] lg:block lg:aspect-[0.92/1.15]">
            <Image
              src="/images/faq-side-accent.jpg"
              alt="Portrait d'une femme dans une lumière douce, illustrant les questionnements personnels autour du bien-être et de la santé mentale."
              title="Réponses aux questions fréquentes"
              fill
              className="object-cover object-[50%_35%]"
              sizes="(min-width: 1024px) 24rem, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
