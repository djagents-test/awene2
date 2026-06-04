import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { breadcrumbSchema, webPageSchema, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "AWENE | Menopause & Perimenopause Coaching",
  },
  description:
    "AWENE guides women through perimenopause and menopause with a science-based, deeply human approach. Online, across the MENA region and beyond.",
};

const pillars = [
  {
    title: "Understand",
    body: "Make sense of symptoms, hormones and nervous-system patterns with clear, science-based explanations.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    title: "Regulate",
    body: "Work on stress, sleep, metabolism and recovery with a structured approach adapted to real life.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    title: "Embody",
    body: "Turn insights into sustainable habits that fit your context, your relationships and your rhythms.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
];

const faqs = [
  [
    "Do you only work with women in Tunisia?",
    "No. Sessions are online and AWENE supports women across Africa, the Middle East and beyond, including the diaspora in Europe.",
  ],
  [
    "Does this work if I am not on hormonal treatment?",
    "Yes. The approach adapts whether you use hormonal treatment or not, and always works alongside medical care rather than replacing it.",
  ],
];

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([{ name: "Home", path: "/en" }]),
          webPageSchema({
            path: "/en",
            title: "AWENE | Menopause & Perimenopause Coaching",
            description:
              "AWENE guides women through perimenopause and menopause with a science-based, deeply human approach. Online, across the MENA region and beyond.",
            inLanguage: "en",
          }),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Perimenopause and menopause coaching
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.05] md:text-7xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              You do not feel like yourself anymore. Your body is going through a real transition.
            </h1>
            <p
              className="max-w-3xl text-xl leading-relaxed md:text-2xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Hot flashes, fatigue, brain fog, broken sleep, weight changes. This is not in your head. AWENE helps you understand what is happening and act with clarity.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Book my free call
              </Button>
              <Button href="/en/about" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              The AWENE method
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              A scientific approach. Human support.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border p-8"
                style={{ borderColor: "#E8DFF0", background: pillar.bg }}
              >
                <h3
                  className="mb-4 text-2xl font-bold"
                  style={{ color: pillar.color, fontFamily: "var(--font-playfair)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(160deg, #2E1A4A 0%, #1C0F2E 100%)" }}
      >
        <Container className="relative z-10">
          <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(19rem,23rem)_minmax(0,1fr)]">
            <div className="order-1 w-full">
              <div className="aspect-[4/5] w-full max-w-[23rem] lg:max-w-none">
                <AmiraPortraitSlot alt="Portrait of Amira Medimagh" className="h-full w-full rounded-[2rem]" />
              </div>
            </div>
            <div className="order-2 flex flex-col justify-center">
              <p
                className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
              >
                <span className="block h-px w-8 shrink-0" style={{ background: "rgba(246,139,44,0.8)" }} />
                Your guide
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
                Physician · Public health expert · Certified integrative health and perimenopause coach
              </p>
              <p
                className="mb-10 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                20 years in international public health. One conviction: every woman deserves to understand her body, her hormonal cycles, her symptoms, her transitions, and to have the tools to feel well.
              </p>
              <Button href="/en/about" variant="secondary">
                <span style={{ color: "#F3ECFB" }}>Learn more about Amira</span>
              </Button>
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
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "rgba(246,139,44,0.92)", fontFamily: "var(--font-inter)" }}
            >
              Partnerships
            </p>
            <h2
              className="mt-6 text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
            >
              Are you an employer or a health or wellness professional? Let&apos;s build a rigorous partnership.
            </h2>
            <p
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(243,236,251,0.78)", fontFamily: "var(--font-inter)" }}
            >
              Awene builds serious, structured and durable collaborations with a clear framework, an ethical approach and support aligned with on-the-ground realities.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/en/contact" size="lg">
                Discuss a partnership
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-[2rem] border border-[rgba(243,236,251,0.12)] bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_18px_60px_rgba(35,12,58,0.12)] backdrop-blur-[2px] md:p-8">
              <div className="mb-6 overflow-hidden rounded-[1.4rem]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/employeur-bien-etre-travail.jpg"
                    alt="Smiling woman holding a tablet in an outdoor professional setting, representing an employer committed to workplace well-being."
                    title="Employer committed to workplace well-being"
                    fill
                    className="object-cover object-[50%_35%]"
                    sizes="(min-width: 1024px) 28rem, 100vw"
                  />
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}>
                Employers
              </p>
              <h3 className="mt-6 text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
                Are you an employer?
              </h3>
              <p className="mt-6 flex-1 text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
                AWENE helps you bring menopause and mental wellbeing into a structured, ethical approach adapted to your organisation.
              </p>
              <div className="mt-8">
                <Button href="/en/contact" variant="primary" size="lg">
                  Discuss a partnership
                </Button>
              </div>
            </article>
            <article className="flex h-full flex-col rounded-[2rem] border border-[rgba(243,236,251,0.12)] bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_18px_60px_rgba(35,12,58,0.12)] backdrop-blur-[2px] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}>
                Health and wellness professionals
              </p>
              <h3 className="mt-6 text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
                Are you a health or wellness professional?
              </h3>
              <p className="mt-6 flex-1 text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}>
                Let&apos;s create a clear, durable and rigorous framework to support women with seriousness and coherence.
              </p>
              <div className="mt-8">
                <Button href="/en/contact" variant="light" size="lg">
                  Build a partnership
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <Section background="white" size="md">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.64fr)_minmax(250px,0.36fr)]">
            <div>
              <p
                className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] lg:text-left"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Your questions
              </p>
              <h2
                className="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl lg:text-left"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Common questions
              </h2>
              <div className="space-y-4">
                {faqs.map(([question, answer]) => (
                  <details key={question} className="overflow-hidden rounded-2xl border bg-white transition-all duration-200" style={{ borderColor: "#E8DFF0" }}>
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-7 py-5 list-none">
                      <span className="text-base font-semibold leading-snug" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                        {question}
                      </span>
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm" style={{ background: "#E8DFF0", color: "#6E6478" }}>
                        +
                      </span>
                    </summary>
                    <div className="px-7 pb-6" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      <p className="text-base leading-relaxed">{answer}</p>
                    </div>
                  </details>
                ))}
              </div>
              <p className="mt-8 text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                Continue with <Link href="/en/coaching" style={{ color: "#6F3FD6" }}>coaching</Link>, <Link href="/en/articles" style={{ color: "#6F3FD6" }}>articles</Link> or <Link href="/en/contact" style={{ color: "#6F3FD6" }}>contact</Link>.
              </p>
            </div>
            <div className="relative hidden w-full overflow-hidden rounded-[1.75rem] lg:block lg:aspect-[0.92/1.15]">
              <Image
                src="/images/faq-side-accent.jpg"
                alt="Portrait of a woman in soft lighting, illustrating personal questions around well-being and mental health."
                title="Answers to frequently asked questions"
                fill
                className="object-cover object-[50%_35%]"
                sizes="(min-width: 1024px) 24rem, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
