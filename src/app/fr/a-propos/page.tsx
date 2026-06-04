import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "À propos | AWENE",
  description:
    "Amira Medimagh est médecin, experte en santé publique et coach certifiée en périménopause et ménopause. Découvrez pourquoi AWENE existe, et ce qui rend cette approche différente.",
};

const beliefParagraphs = [
  "La périménopause et la ménopause ne sont pas une maladie. Ce ne sont pas non plus des années à subir en silence, avec des bouffées de chaleur, une fatigue chronique, un brouillard mental, des troubles du sommeil ou une prise de poids inexpliquée.",
  "Ce sont des transitions biologiques réelles, documentées, compréhensibles, et traversables avec les bons outils.",
  "AWENE est né d'une conviction simple : chaque femme mérite de comprendre ce qui se passe dans son corps, ses hormones, son système nerveux, ses symptômes, et d'avoir accès à un accompagnement sérieux, ancré dans la science, adapté à sa réalité.",
] as const;

const notBullets = [
  "AWENE n'est pas du coaching intuitif.",
  "Ce n'est pas de la pensée positive.",
  "Ce n'est pas des solutions miracles.",
] as const;

const bio = [
  "Amira Medimagh est médecin, titulaire d'un Master en santé publique avec plus de 20 ans d'expérience en santé publique internationale, notamment en santé sexuelle et reproductive, VIH-SIDA, et droits des femmes, en Tunisie et dans la région MENA.",
  "Depuis 2025, elle est certifiée coach en santé et nutrition intégrative par l'Institute for Integrative Nutrition (États-Unis), et coach certifiée en périménopause et ménopause par l'Integrative Women's Health Institute.",
  "Elle se forme actuellement à la théorie polyvagale et à la longévité féminine, pour intégrer les approches les plus récentes en neuroscience, santé hormonale et santé féminine dans son accompagnement.",
] as const;

const certifications = [
  "Docteur en médecine",
  "Master en santé publique",
  "Coach certifiée en santé et nutrition intégratives, Institute for Integrative Nutrition (IIN)",
  "Coach certifiée en périménopause et ménopause, Integrative Women's Health Institute (IWHI)",
] as const;

function ConvictionIcon({ kind }: { kind: "leaf" | "thermo" | "brain" }) {
  if (kind === "thermo") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 4V14" stroke="#F68B2C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 6.5V14.5a3.5 3.5 0 1 0 5 0V6.5a2.5 2.5 0 1 0-5 0Z" stroke="#F68B2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "brain") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M9.5 7.5a2.5 2.5 0 0 1 5 0a2.8 2.8 0 0 1 3 2.8A2.7 2.7 0 0 1 16 15a2.6 2.6 0 0 1-2.3 3H10.3A2.6 2.6 0 0 1 8 15a2.7 2.7 0 0 1-1.5-4.7a2.8 2.8 0 0 1 3-2.8Z" stroke="#6F3FD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6.2V18M9 10.2c1.4.1 2.2.8 3 2m3-2c-1.4.1-2.2.8-3 2" stroke="#6F3FD6" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M18.5 5.5C14 5 9.7 7.3 8.1 11.1c-1.1 2.7-.9 5.6.4 8.4c2.8-.6 5.1-2 6.7-4.4c2.2-3.2 2.5-6.9 1.8-9.6Z" stroke="#6F3FD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.7 15.8c2.3-1.1 4.1-2.9 5.5-5.5" stroke="#6F3FD6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/fr/a-propos",
            title: "À propos | AWENE",
            description:
              "Amira Medimagh est médecin, experte en santé publique et coach certifiée en périménopause et ménopause. Découvrez pourquoi AWENE existe, et ce qui rend cette approche différente.",
            type: "AboutPage",
            about: organizationSchema(),
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "À propos", path: "/fr/a-propos" },
          ]),
        ]}
      />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -left-24 top-[8rem] h-[26rem] w-[26rem] rounded-full opacity-[0.34]"
            style={{ background: "radial-gradient(circle, rgba(246,139,44,0.22) 0%, rgba(246,139,44,0.1) 34%, transparent 68%)" }}
          />
          <div
            className="absolute right-[-8rem] top-0 h-[34rem] w-[34rem] rounded-full opacity-[0.42]"
            style={{ background: "radial-gradient(circle, rgba(111,63,214,0.22) 0%, rgba(111,63,214,0.12) 34%, transparent 72%)" }}
          />
          <div
            className="absolute left-[12%] bottom-[12%] h-[22rem] w-[22rem] rounded-full opacity-[0.24]"
            style={{ background: "radial-gradient(circle, rgba(220,203,255,0.28) 0%, rgba(220,203,255,0.12) 38%, transparent 74%)" }}
          />
        </div>

        <section style={{ background: "#FCFAF8" }}>
          <Container className="relative z-10 pt-32 pb-20">
            <div className="max-w-none lg:max-w-[46rem]">
              <p
                className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
                À propos
              </p>
              <h1
                className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #6F3FD6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  AWENE
                </span>{" "}
                , Pourquoi cette approche existe.
              </h1>
            </div>
          </Container>
        </section>

        <Section background="white" size="lg">
          <Container>
            <div className="grid gap-10 lg:gap-12">
              <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
                <div className="order-2 py-4 lg:order-1 lg:pr-14 lg:py-6">
                  <p
                    className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
                  >
                    <span className="block h-px w-8 shrink-0" style={{ background: "#F68B2C" }} />
                    Notre conviction
                  </p>
                  <h2
                    className="mb-4 text-4xl font-bold leading-[1.02] md:text-5xl"
                    style={{ fontFamily: "var(--font-playfair)", color: "#2B2240" }}
                  >
                    Ce que nous croyons
                  </h2>
                  <div className="mb-8 h-px w-16 rounded-full" style={{ background: "#F68B2C" }} />
                  <div className="grid gap-6">
                    {beliefParagraphs.map((paragraph, index) => (
                      <div key={paragraph} className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                          style={{
                            background:
                              index % 2 === 0
                                ? "linear-gradient(145deg, rgba(243,236,251,1) 0%, rgba(232,220,251,1) 100%)"
                                : "linear-gradient(145deg, rgba(255,243,234,1) 0%, rgba(255,231,216,1) 100%)",
                          }}
                        >
                          <ConvictionIcon kind={index === 0 ? "leaf" : index === 1 ? "thermo" : "brain"} />
                        </div>
                        <p
                          className="text-base leading-relaxed md:text-[1.02rem]"
                          style={{ color: "#5A5670", fontFamily: "var(--font-inter)" }}
                        >
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <p
                      className="awene-emphasis text-xl leading-tight md:text-2xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Pas des généralités. Pas des promesses. Des réponses concrètes.
                    </p>
                  </div>
                </div>

                <div className="order-1 flex items-center justify-center py-6 lg:order-2">
                  <Image
                    src="/AWENE.png"
                    alt="AWENE"
                    width={320}
                    height={320}
                    className="h-auto w-full max-w-[11rem] md:max-w-[14rem] lg:max-w-[16rem]"
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.25rem] bg-[linear-gradient(90deg,#d9cbff_0%,#f6ddd1_100%)] px-6 py-6 md:px-8 md:py-7 lg:px-10">
                <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
                  <div
                    className="text-6xl leading-none md:text-7xl"
                    style={{ color: "#6F3FD6", fontFamily: "var(--font-playfair)" }}
                  >
                    “
                  </div>
                  <p
                    className="text-lg italic leading-relaxed md:text-[1.6rem]"
                    style={{ color: "#2B2240", fontFamily: "var(--font-playfair)" }}
                  >
                    Chaque femme mérite de comprendre son corps, ses hormones, ses symptômes, et d’avoir accès à un accompagnement sérieux, ancré dans la science, adapté à sa réalité.
                  </p>
                  <div className="flex items-start justify-start lg:justify-end" aria-hidden="true">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                        <path
                          d="M12 2L13.9 8.1L20 10L13.9 11.9L12 18L10.1 11.9L4 10L10.1 8.1L12 2Z"
                          fill="#F68B2C"
                          fillOpacity="0.9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="lavender" size="md">
          <Container>
            <div className="relative py-4 md:py-6">
              <div
                className="absolute -right-20 -top-16 h-40 w-40 rounded-full md:h-52 md:w-52"
                style={{ background: "radial-gradient(circle, rgba(255,214,202,0.95) 0%, rgba(255,214,202,0.42) 58%, transparent 72%)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -right-24 -bottom-8 h-44 w-44 rounded-full md:h-56 md:w-56"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(237,229,251,0.52) 55%, transparent 72%)" }}
                aria-hidden="true"
              />
              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:gap-14">
                <div>
                  <h2
                    className="text-4xl font-bold uppercase leading-[0.95] md:text-5xl lg:text-6xl"
                    style={{ fontFamily: "var(--font-playfair)", color: "#241c38" }}
                  >
                    <span style={{ color: "#6F3FD6", fontStyle: "italic", fontWeight: 500, textTransform: "none" }}>Pas</span>{" "}
                    UNE
                    <br />
                    AUTRE
                    <br />
                    PLATEFORME
                    <br />
                    DE <span style={{ color: "#6F3FD6", fontStyle: "italic", fontWeight: 500, textTransform: "none" }}>Bien-être.</span>
                  </h2>
                </div>

                <div className="max-w-[30rem] lg:pt-3">
                  <div
                    className="space-y-2 text-lg leading-relaxed md:text-[1.45rem]"
                    style={{ color: "#4B455B", fontFamily: "var(--font-inter)" }}
                  >
                    {notBullets.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <div className="my-6 h-px w-10 rounded-full" style={{ background: "rgba(246,139,44,0.6)" }} />
                  <p
                    className="text-lg leading-relaxed md:text-[1.45rem]"
                    style={{ color: "#4B455B", fontFamily: "var(--font-inter)" }}
                  >
                    AWENE est une approche intégrative rigoureuse, qui part du corps, de la biologie, des hormones, et de la vie réelle de chaque femme.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="white" size="lg">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:gap-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(16rem,21rem)_minmax(0,1fr)] lg:items-stretch lg:gap-12">
                <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
                  <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F3ECFB] lg:h-full lg:aspect-auto">
                    <AmiraPortraitSlot alt="Portrait d'Amira Medimagh" className="h-full w-full rounded-[2rem]" />
                  </div>
                </div>

                <div className="flex h-full flex-col">
                  <p
                    className="mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
                  >
                    <span className="block h-px w-8 shrink-0" style={{ background: "#F68B2C" }} />
                    Votre accompagnatrice
                  </p>
                  <h2
                    className="mb-4 text-4xl font-bold md:text-5xl"
                    style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                  >
                    Amira Medimagh
                  </h2>
                  <p
                    className="mb-7 text-base font-semibold leading-relaxed md:text-lg"
                    style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
                  >
                    Médecin. Experte en santé publique.
                    <br />
                    Coach certifiée.
                  </p>
                  <div className="space-y-5" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {bio.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="group rounded-[2rem] bg-[#F3ECFB] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(75,31,122,0.12)] md:p-8 lg:col-span-2"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
                  <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="relative aspect-[3.2/2.6] w-full overflow-hidden rounded-[1.5rem] shadow-[0_10px_24px_rgba(75,31,122,0.06)] transition-all duration-300 group-hover:shadow-[0_18px_34px_rgba(75,31,122,0.14)]">
                      <Image
                        src="/images/apropos-pourquoi-chemin.jpg"
                        alt="Deux femmes assises dans un moment de soutien émotionnel, illustrant l'accompagnement humain au cœur d'Awene."
                        title="Pourquoi ce chemin d'accompagnement"
                        fill
                        className="object-cover object-[50%_30%]"
                        sizes="(min-width: 1024px) 18rem, 100vw"
                      />
                    </div>
                  </div>
                  <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3
                      className="mb-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                      style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
                    >
                      Pourquoi ce chemin
                    </h3>
                    <p
                      className="text-sm leading-relaxed md:text-[0.97rem]"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      Après deux décennies à travailler sur les systèmes de santé, Amira a fait un choix : se rapprocher des femmes individuellement. Pas des statistiques. Pas des programmes. Des femmes réelles, avec des corps réels, des symptômes réels, des vies réelles. AWENE est ce pont, entre la rigueur de la santé publique et la proximité de l&apos;accompagnement humain.
                    </p>
                  </div>
                  <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3
                      className="mb-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                      style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
                    >
                      Ce qui la distingue
                    </h3>
                    <p
                      className="text-sm leading-relaxed md:text-[0.97rem]"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      Pas une coach parmi d&apos;autres. Une médecin qui accompagne. La différence, ce n&apos;est pas le titre. C&apos;est la capacité à lire ce que votre corps dit, les signaux hormonaux, les patterns du système nerveux, les mécanismes biologiques derrière vos symptômes, avec précision. Et à vous aider à y répondre, avec humanité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="offwhite" size="md">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-10 lg:col-start-2">
                <h2
                  className="mb-8 text-4xl font-bold md:text-5xl"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  Formations et certifications
                </h2>
                <ul className="space-y-3">
                  {certifications.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border bg-white p-4 text-base leading-relaxed transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8C7F3] hover:shadow-[0_14px_30px_rgba(75,31,122,0.08)] md:text-lg"
                      style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
