import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Why AWENE",
  description:
    "The name, the movement, the mission: understanding the deeper reason why AWENE exists.",
};

const values = [
  {
    title: "Free women from isolation",
    body: "Too many women move through this transition under a heavy silence. AWENE breaks that silence by creating a space for recognition, information, and structured support.",
  },
  {
    title: "Honor complexity",
    body: "Menopause affects the body, the brain, the emotions, and identity itself. Our approach respects that depth instead of reducing it to a few symptoms.",
  },
  {
    title: "Build a method",
    body: "AWENE does not offer generic advice. We offer an architecture: four pillars rooted in neurology, nutrition, movement, and lifestyle.",
  },
  {
    title: "Create a movement",
    body: "Beyond individual support, AWENE is a community of women choosing to live this passage with awareness, intention, and depth.",
  },
] as const;

export default function WhyAwenePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/about/why-awene",
          title: "Why AWENE",
          description:
            "The name, the movement, the mission: understanding the deeper reason why AWENE exists.",
          type: "AboutPage",
          inLanguage: "en",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              The reason why
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Why AWENE
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              One name. One movement. One conviction that menopause deserves better than silence or half-answers.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="md">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                The name
              </p>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                AWENE, the breath that inspires
              </h2>
              <p className="mb-4 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                AWENE evokes breath, something both discreet and fundamental. Something that inspires and transforms. A word that carries the idea of passage, transition, and life that continues and renews itself.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                This name was chosen because it says what the project is: something gentle yet powerful, feminine yet structured, discreet yet present.
              </p>
            </div>
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl p-10 text-center" style={{ background: "#F3ECFB" }}>
              <span className="mb-4 text-6xl font-bold tracking-[0.3em] md:text-7xl" style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}>
                AWENE
              </span>
              <span className="text-base italic" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                “the breath that inspires and the moment that transforms”
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="deep" size="lg">
        <Container size="md">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}>
            The mission
          </p>
          <h2 className="mb-8 max-w-2xl text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
            Turning silence into a space of power
          </h2>
          <p className="max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}>
            Menopause has long remained taboo, under-studied, and poorly understood. Women have moved through this transition in silence, often alone, often without the resources that could have helped them live it differently.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}>
            AWENE is here to change that, one support journey at a time, one movement at a time, one woman at a time.
          </p>
        </Container>
      </Section>

      <Section background="offwhite" size="lg">
        <Container>
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              What we stand for
            </p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Why we exist
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={value.title} className="rounded-3xl border border-[#E8DFF0] bg-white p-8 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(110,63,214,0.08)]">
                <span className="mb-4 block text-4xl font-bold opacity-20" style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}>
                  0{index + 1}
                </span>
                <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="md">
        <Container size="md" className="text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Ready to join the movement?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/en/walk-with-me" variant="primary">
              Walk with me
            </Button>
            <Button href="/en/about/my-story" variant="secondary">
              My story
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
