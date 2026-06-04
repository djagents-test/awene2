import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getFormations } from "@/lib/cms";
import { absoluteUrl, breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Training | AWENE" },
  description:
    "AWENE training to understand perimenopause, menopause, hormonal health and support women, employers and professionals.",
};

const learnings = [
  "Understand hormonal changes",
  "Read body signals without panic",
  "Better manage fatigue, sleep, stress and mental load",
  "Adapt communication, work and daily rhythm",
  "Know when to refer to a healthcare professional",
  "Create more informed and more human environments",
];

const faqs = [
  {
    question: "Are these trainings medical?",
    answer:
      "No. AWENE trainings do not replace a consultation, a diagnosis or a treatment. They provide reliable, understandable and useful guidance to better understand this transition and know when to consult.",
  },
  {
    question: "Is this adapted to employers?",
    answer:
      "Yes. The content can be adapted to HR teams, managers, female employees and wellbeing committees, with a clear, respectful and non-intrusive tone.",
  },
  {
    question: "Can a training be organized in person?",
    answer:
      "Yes. Depending on the location, the audience and the desired format, a session can be organized in person, online or in hybrid format.",
  },
  {
    question: "Are the trainings available in Arabic?",
    answer:
      "Yes. Trainings can be delivered in French, Arabic or English depending on the audience and the context.",
  },
  {
    question: "How do I register?",
    answer:
      "Each open training shows a “Register” button leading to its dedicated page with the session details and an integrated registration form.",
  },
  {
    question: "What happens if a training is full?",
    answer:
      "The “Sold out” status is displayed clearly. You can check upcoming dates or request a session adapted to your group.",
  },
] as const;

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

export default async function TrainingPage() {
  const formations = await getFormations();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Training", path: "/en/training" },
          ]),
          webPageSchema({
            path: "/en/training",
            title: "Training | AWENE",
            description:
              "AWENE training to understand perimenopause, menopause, hormonal health and support women, employers and professionals.",
            inLanguage: "en",
          }),
          itemListSchema(
            "/en/training",
            formations.map((formation) => ({ name: formation.title, url: absoluteUrl(`/en/training/${formation.slug}`) })),
          ),
          faqSchema(),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Training
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              AWENE training.
              <em className="awene-emphasis block">Understand the body. Support the transition.</em>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Clear, human, science-based training to better understand perimenopause, menopause, hormonal health, the nervous system and transitions in the female body.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#upcoming-training" size="lg">
                See upcoming training
              </Button>
              <a
                href="/en/contact?subject=Tailored+training"
                className="inline-flex items-center justify-center gap-2 rounded-full px-9 py-4.5 text-base font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "transparent",
                  color: "#6F3FD6",
                  border: "1.5px solid #6F3FD6",
                }}
              >
                Request tailored training
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container>
          <div id="upcoming-training" className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(280px,0.35fr)]">
            <div className="max-w-4xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                Reliable guidance
              </p>
              <h2 className="mb-7 text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
                Understand{" "}
                <span className="awene-emphasis">without alarm.</span>{" "}
                Support{" "}
                <span className="awene-emphasis">without replacing</span>{" "}
                medical care.
              </h2>
              <div className="space-y-5 text-base leading-relaxed md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                <p>
                  Awene trainings do not replace medical advice, a consultation or a diagnosis. They provide reliable, concrete and accessible guidance to better support women, teams and professionals.
                </p>
                <p>
                  The goal is simple: make hormonal transitions less confusing, less isolating, and easier to address in daily life, at work and in care or wellness settings.
                </p>
              </div>
            </div>
            <div className="relative hidden lg:block aspect-[0.95/1.05] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-hero.jpg"
                alt="Two women in a professional setting, illustrating Awene trainings on hormonal health and well-being."
                title="Awene trainings on hormonal health"
                fill
                className="object-cover object-[50%_30%]"
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="lg">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Upcoming sessions
            </p>
            <h2 className="mb-5 text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
              Find the right training.
            </h2>
          </div>
          <div id="upcoming-training">
            {formations.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {formations.map((formation) => (
                  <article key={formation.id} className="rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_48px_rgba(110,63,214,0.12)] md:p-8" style={{ borderColor: "#E8DFF0" }}>
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: formation.status === "sold_out" ? "#FEF3E8" : formation.status === "past" ? "#F8EEF5" : "#F3ECFB", color: formation.status === "sold_out" ? "#F68B2C" : formation.status === "past" ? "#4B1F7A" : "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                        {formation.statusLabel}
                      </span>
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#FCFAF8", color: "#6E6478", border: "1px solid #E8DFF0", fontFamily: "var(--font-inter)" }}>
                        {formation.audienceLabel}
                      </span>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold leading-tight md:text-3xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
                      {formation.title}
                    </h3>
                    <dl className="mb-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Date</dt>
                        <dd>{formation.date}</dd>
                      </div>
                      {formation.time ? (
                        <div>
                          <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Time</dt>
                          <dd>{formation.time}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Format</dt>
                        <dd>{formation.formatLabel}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Location</dt>
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
                            ? "/en/training"
                            : `/en/training/${formation.slug}`
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
                        ? "Sold out"
                        : formation.status === "cancelled"
                          ? "Cancelled"
                          : formation.status === "past"
                            ? "See upcoming training"
                            : "Register"}
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border bg-white p-8 text-center md:p-12" style={{ borderColor: "#E8DFF0" }}>
                <h3 className="mb-3 text-2xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
                  No training scheduled right now.
                </h3>
                <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Upcoming dates will appear here as soon as they are confirmed. You can also request a tailored session.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              For whom?
            </p>
            <h2 className="text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
              Three audiences. One standard of clarity.
            </h2>
          </div>
          <div className="mb-8 hidden lg:block">
            <div className="relative aspect-[3/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-audience-2.jpg"
                alt="Woman in a warm professional setting, representing participants in Awene trainings."
                title="Training for women in hormonal transition"
                fill
                className="object-cover object-[50%_30%]"
                sizes="(min-width: 1024px) 60rem, 100vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "For women in transition", body: "Clear guidance to understand what is changing, better read body signals and move forward without feeling alone or overwhelmed.", color: "#6F3FD6", bg: "#F3ECFB" },
              { title: "For employers", body: "Accessible sessions to raise team awareness, support female colleagues and create more informed workplaces.", color: "#4B1F7A", bg: "#F8EEF5" },
              { title: "For health and wellness professionals", body: "A rigorous, human foundation to better welcome questions related to perimenopause, menopause and the transitions of the female body.", color: "#F68B2C", bg: "#FEF3E8" },
            ].map((audience) => (
              <article
                key={audience.title}
                className="group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:shadow-[0_18px_40px_rgba(75,31,122,0.1)] md:p-9"
                style={{ background: audience.bg, borderColor: "#E8DFF0" }}
              >
                <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: audience.color }} />
                <h3 className="mb-4 text-2xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]" style={{ color: audience.color, fontFamily: "var(--font-playfair)" }}>
                  {audience.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
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
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Useful learning
            </p>
            <h2 className="text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
              <span className="awene-emphasis">What you will learn.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {learnings.map((item) => (
              <div key={item} className="group flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8C7F3] hover:shadow-[0_14px_30px_rgba(75,31,122,0.08)]" style={{ borderColor: "#E8DFF0" }}>
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm text-white transition-transform duration-300 group-hover:scale-110" style={{ background: "#6F3FD6" }}>
                  ✓
                </span>
                <p className="text-sm font-semibold leading-relaxed transition-colors duration-300 group-hover:text-[#4B1F7A]" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="deep" size="lg" className="relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(250px,0.38fr)]">
            <div className="text-center lg:text-left">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}>
                Tailored training
              </p>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl" style={{ color: "#F3ECFB", fontFamily: "var(--font-playfair)" }}>
                Would you like a training adapted to your audience?
              </h2>
              <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed md:text-lg lg:mx-0" style={{ color: "rgba(243,236,251,0.82)", fontFamily: "var(--font-inter)" }}>
                Awene can design tailored sessions for companies, associations, HR teams, wellness spaces, clinics, practices and communities.
              </p>
              <Button href="/en/contact?subject=Tailored+training" size="lg">
                Request a tailored training
              </Button>
            </div>
            <div className="relative hidden lg:block aspect-[1.05/1] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/formations-sur-mesure.jpg"
                alt="Group of women in a professional setting, representing tailored trainings offered by Awene."
                title="Tailored trainings for organizations"
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
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Frequently asked questions
            </p>
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>
              FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#E8DFF0" }} open={index === 0}>
                  <summary className="cursor-pointer px-6 py-5 text-base font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
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
    </>
  );
}
