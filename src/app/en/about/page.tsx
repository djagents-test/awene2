import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About | AWENE — Menopause & Perimenopause Coaching by Amira Medimagh",
  description:
    "Amira Medimagh is a physician, public health expert and certified menopause and perimenopause coach. Learn what AWENE is built on — and why this approach is different.",
  keywords: [
    "Amira Medimagh menopause coach",
    "physician menopause coach",
    "AWENE Tunisia MENA",
    "women's health",
    "polyvagal theory",
    "female longevity",
    "public health",
    "IIN",
    "IWHI",
    "hormonal health",
  ],
};

const beliefParagraphs = [
  "Perimenopause and menopause are not a disease. They are not years to be quietly endured — years of hot flashes, bone-deep fatigue, a mind that fogs over, sleep that won't come, or weight that shifts for no reason you can name.",
  "They are real biological transitions — documented, understandable, navigable — with the right tools and the right support.",
  "AWENE was built on a single conviction: every woman deserves to understand what is happening inside her body — her hormones, her nervous system, her symptoms — and to have access to support that is serious, science-based and genuinely adapted to her life.",
] as const;

const notBullets = [
  "AWENE is not another wellness platform.",
  "It is not intuitive coaching, positive thinking, or quick fixes for hot flashes and weight gain.",
] as const;

const bio = [
  "Amira Medimagh is a physician with a Master's in public health and over twenty years of experience in international public health — in sexual and reproductive health, HIV/AIDS and women's rights, across Tunisia and the MENA region.",
  "Since 2025, she holds certifications in integrative health and nutrition coaching from the Institute for Integrative Nutrition (USA), and in perimenopause and menopause coaching from the Integrative Women's Health Institute.",
  "She is currently deepening her training in polyvagal theory and female longevity — bringing the most current thinking in neuroscience and hormonal health into her practice.",
] as const;

const certifications = [
  "Doctor of Medicine",
  "Master's in Public Health",
  "Certified Coach in Integrative Health & Nutrition — Institute for Integrative Nutrition (IIN), USA",
  "Certified Perimenopause & Menopause Coach — Integrative Women's Health Institute (IWHI)",
  "Currently training: Longevity for Women in Menopause and Perimenopause",
  "Currently training: Applied Polyvagal Theory — Polyvagal Institute",
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

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/en/about",
            title: "About | AWENE — Menopause & Perimenopause Coaching by Amira Medimagh",
            description:
              "Amira Medimagh is a physician, public health expert and certified menopause and perimenopause coach. Learn what AWENE is built on — and why this approach is different.",
            type: "AboutPage",
            about: organizationSchema(),
            inLanguage: "en",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "About", path: "/en/about" },
          ]),
        ]}
      />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 top-[8rem] h-[26rem] w-[26rem] rounded-full opacity-[0.34]" style={{ background: "radial-gradient(circle, rgba(246,139,44,0.22) 0%, rgba(246,139,44,0.1) 34%, transparent 68%)" }} />
          <div className="absolute right-[-8rem] top-0 h-[34rem] w-[34rem] rounded-full opacity-[0.42]" style={{ background: "radial-gradient(circle, rgba(111,63,214,0.22) 0%, rgba(111,63,214,0.12) 34%, transparent 72%)" }} />
          <div className="absolute left-[12%] bottom-[12%] h-[22rem] w-[22rem] rounded-full opacity-[0.24]" style={{ background: "radial-gradient(circle, rgba(220,203,255,0.28) 0%, rgba(220,203,255,0.12) 38%, transparent 74%)" }} />
        </div>

        <section style={{ background: "#FCFAF8" }}>
          <Container className="relative z-10 pt-32 pb-20">
            <div className="max-w-none lg:max-w-[46rem]">
              <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
                About
              </p>
              <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                <span style={{ background: "linear-gradient(135deg, #F68B2C 0%, #6F3FD6 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  AWENE
                </span>{" "}
                — Why This Exists.
              </h1>
            </div>
          </Container>
        </section>

        <Section background="white" size="lg">
          <Container>
            <div className="grid gap-10 lg:gap-12">
              <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
                <div className="order-2 py-4 lg:order-1 lg:pr-14 lg:py-6">
                  <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                    <span className="block h-px w-8 shrink-0" style={{ background: "#F68B2C" }} />
                    What We Believe
                  </p>
                  <h2 className="mb-4 text-4xl font-bold leading-[1.02] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2B2240" }}>
                    What We Believe
                  </h2>
                  <div className="mb-8 h-px w-16 rounded-full" style={{ background: "#F68B2C" }} />
                  <div className="grid gap-6">
                    {beliefParagraphs.map((paragraph, index) => (
                      <div key={paragraph} className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: index % 2 === 0 ? "linear-gradient(145deg, rgba(243,236,251,1) 0%, rgba(232,220,251,1) 100%)" : "linear-gradient(145deg, rgba(255,243,234,1) 0%, rgba(255,231,216,1) 100%)" }}>
                          <ConvictionIcon kind={index === 0 ? "leaf" : index === 1 ? "thermo" : "brain"} />
                        </div>
                        <p className="text-base leading-relaxed md:text-[1.02rem]" style={{ color: "#5A5670", fontFamily: "var(--font-inter)" }}>
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <p className="awene-emphasis text-xl leading-tight md:text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
                      No generalities. No empty promises. Real answers.
                    </p>
                  </div>
                </div>

                <div className="order-1 flex items-center justify-center py-6 lg:order-2">
                  <Image src="/AWENE.png" alt="AWENE" width={320} height={320} className="h-auto w-full max-w-[11rem] md:max-w-[14rem] lg:max-w-[16rem]" />
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.25rem] bg-[linear-gradient(90deg,#d9cbff_0%,#f6ddd1_100%)] px-6 py-6 md:px-8 md:py-7 lg:px-10">
                <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
                  <div className="text-6xl leading-none md:text-7xl" style={{ color: "#6F3FD6", fontFamily: "var(--font-playfair)" }}>
                    “
                  </div>
                  <p className="text-lg italic leading-relaxed md:text-[1.6rem]" style={{ color: "#2B2240", fontFamily: "var(--font-playfair)" }}>
                    Every woman deserves to understand what is happening inside her body — her hormones, her nervous system, her symptoms — and to have access to support that is serious, science-based and genuinely adapted to her life.
                  </p>
                  <div className="flex items-start justify-start lg:justify-end" aria-hidden="true">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                        <path d="M12 2L13.9 8.1L20 10L13.9 11.9L12 18L10.1 11.9L4 10L10.1 8.1L12 2Z" fill="#F68B2C" fillOpacity="0.9" />
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
              <div className="absolute -right-20 -top-16 h-40 w-40 rounded-full md:h-52 md:w-52" style={{ background: "radial-gradient(circle, rgba(255,214,202,0.95) 0%, rgba(255,214,202,0.42) 58%, transparent 72%)" }} aria-hidden="true" />
              <div className="absolute -right-24 -bottom-8 h-44 w-44 rounded-full md:h-56 md:w-56" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(237,229,251,0.52) 55%, transparent 72%)" }} aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:gap-14">
                <div>
                  <h2 className="text-4xl font-bold leading-[0.95] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2B2240" }}>
                    What AWENE Is Not
                  </h2>
                </div>
                <div>
                  <div className="space-y-4">
                    {notBullets.map((item) => (
                      <p key={item} className="text-xl leading-relaxed md:text-[1.6rem]" style={{ color: "#5A5670", fontFamily: "var(--font-inter)" }}>
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="my-7 h-px w-16 rounded-full" style={{ background: "#F68B2C" }} />
                  <p className="max-w-xl text-xl leading-relaxed md:text-[1.55rem]" style={{ color: "#4B1F7A", fontFamily: "var(--font-inter)" }}>
                    It is a rigorous integrative approach — one that starts with the body, with biology, with hormones, and with the actual reality of each woman's life.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="white" size="lg">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.6fr)_minmax(0,1fr)] lg:gap-14">
              <div className="mx-auto w-full max-w-[19rem] lg:mx-0">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F3ECFB]">
                  <AmiraPortraitSlot alt="Portrait of Amira Medimagh" className="h-full w-full rounded-[2rem]" />
                </div>
              </div>
              <div>
                <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                  <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
                  Amira Medimagh
                </p>
                <h2 className="mb-3 text-4xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Amira Medimagh
                </h2>
                <p className="mb-8 text-base font-semibold leading-relaxed md:text-lg" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                  Physician. Public Health Expert. Certified Coach.
                </p>
                <div className="space-y-5 text-base leading-relaxed md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 rounded-[2rem] bg-[#F3ECFB] p-6 md:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1fr)_minmax(0,1fr)] md:p-8">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#DDA3A0] min-h-[12rem]">
                <Image
                  src="/images/apropos-pourquoi-chemin.jpg"
                  alt="Two women seated in a moment of emotional support, illustrating the human guidance at the heart of Awene."
                  title="Why this support path exists"
                  fill
                  className="object-cover object-[50%_30%]"
                  sizes="(min-width: 768px) 20rem, 100vw"
                />
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                  Why This Path
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  After two decades working on health systems — the structures, the data, the policies — Amira made a deliberate choice: to get much closer to individual women. Not to statistics. Not to programmes. To real women, with real bodies, real symptoms and real lives.
                </p>
                <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  AWENE is that bridge: between the rigour of public health and the intimacy of genuine human support.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                  What Sets Her Apart
                </h3>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Not just a coach. A physician who accompanies.
                </p>
                <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  The difference is not the title — it is the ability to read what a body is saying: the hormonal signals, the nervous system patterns, the biological mechanisms beneath the symptoms. To read all of that with precision. And to help each woman respond to it with humanity.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="offwhite" size="lg">
          <Container size="md">
            <h2 className="mb-10 text-4xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Qualifications & Certifications
            </h2>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.56fr)]">
              <div className="space-y-4">
                {certifications.map((item) => (
                  <div key={item} className="rounded-2xl border bg-white px-5 py-4 md:px-6" style={{ borderColor: "#E8DFF0" }}>
                    <p className="text-sm font-medium md:text-base" style={{ color: "#5A5670", fontFamily: "var(--font-inter)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mx-auto w-full max-w-[18rem]">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
                  <AmiraPortraitSlot alt="Portrait of Amira Medimagh" className="h-full w-full rounded-[2rem]" />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
