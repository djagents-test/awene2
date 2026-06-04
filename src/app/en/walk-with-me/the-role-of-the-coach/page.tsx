import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The role of the coach",
  description:
    "Understand the stance, method, and commitment of an integrative health and nutrition coach specialized in the menopausal transition.",
};

const faq = [
  {
    q: "Is the coach a physician?",
    a: "No. Integrative health and nutrition coaching complements medicine; it does not replace it. The coach does not diagnose and does not prescribe treatment. She accompanies, structures, and supports your holistic health process.",
  },
  {
    q: "How does support work?",
    a: "Every support journey begins with an in-depth assessment. Together we explore your current situation, your goals, and your resources. Sessions are regular, structured around the four AWENE pillars, and adapted to your pace.",
  },
  {
    q: "Do I need to be in perimenopause to benefit from support?",
    a: "AWENE support is designed specifically for women in perimenopause and menopause. If you are not sure where you are hormonally, we can talk about it in the first conversation.",
  },
  {
    q: "Is there follow-up between sessions?",
    a: "Depending on the program chosen, follow-up by message is possible. The goal is that you never feel alone in the process between two sessions.",
  },
] as const;

export default function CoachRolePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/walk-with-me/the-role-of-the-coach",
          title: "The role of the coach",
          description:
            "Understand the stance, method, and commitment of an integrative health and nutrition coach specialized in the menopausal transition.",
          inLanguage: "en",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Walk with me
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              The role of the coach
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Understand who the coach is, how she works, and what she does not do, so you can make an informed choice.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                  Stance and intention
                </p>
                <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  A structured presence, not a directive one
                </h2>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                The role of the AWENE coach is not to tell you what to do. It is to create the conditions in which you can hear yourself more clearly, more deeply.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                She brings scientific structure, neuroscience, nutrition, the physiology of menopause, and a human presence: active listening, non-judgment, embodied support.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                She works with what you are living, not with what you should be living.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "She listens",
                  desc: "Without agenda. Without judgment. With deep attention to what you are moving through.",
                },
                {
                  label: "She structures",
                  desc: "She organizes what you feel into concrete levers, the four AWENE pillars.",
                },
                {
                  label: "She supports",
                  desc: "Between sessions, in difficult moments, and in the progress worth celebrating.",
                },
                {
                  label: "She empowers",
                  desc: "Not to make you feel guilty, but because your transformation belongs to you.",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "#F3ECFB" }}>
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#6F3FD6" }}>
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                      {item.label}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container size="md">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
            Training and expertise
          </p>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Expertise in service of your transition
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Integrative health and nutrition coaching",
              "Specialization in female neuroscience",
              "Support for the menopausal transition",
              "Behavioral and somato-cognitive approach",
              "Adapted movement protocols",
              "Functional nutrition support",
            ].map((qual) => (
              <div key={qual} className="flex items-center gap-3 rounded-xl border border-[#E8DFF0] bg-white p-4">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />
                <span className="text-sm font-medium" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                  {qual}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container size="md">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Your questions
            </p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <details key={item.q} className="group overflow-hidden rounded-2xl border border-[#E8DFF0]" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6" style={{ background: "#FCFAF8" }}>
                  <span className="text-base font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                    {item.q}
                  </span>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-45" style={{ background: "#F3ECFB", color: "#6F3FD6" }}>
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-2" style={{ background: "white" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="md">
        <Container size="md" className="text-center">
          <h2 className="mb-6 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Ready to go further?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/en/contact" variant="primary">
              Contact us
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
