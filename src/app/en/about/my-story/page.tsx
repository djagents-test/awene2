import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "My story",
  description:
    "The story behind AWENE: one woman, one transition, and a deep conviction that things can be lived differently.",
};

export default function MyStoryPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/about/my-story",
          title: "My story",
          description:
            "The story behind AWENE: one woman, one transition, and a deep conviction that things can be lived differently.",
          type: "AboutPage",
          inLanguage: "en",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              About
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              My story
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              What I have lived, what I have moved through, and why all of it led me to create AWENE.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="md">
          <div className="prose-custom space-y-10">
            <div className="rounded-3xl border-l-4 p-8 md:p-10" style={{ background: "#F3ECFB", borderColor: "#6F3FD6" }}>
              <p className="text-xl font-medium italic leading-relaxed md:text-2xl" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                “There is a moment in a woman’s life when everything she thought she knew about herself begins to shift. That moment deserves space.”
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                The starting point
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                Like many women, I entered perimenopause without really knowing what was ahead. I had heard about heat, a few discomforts. No one had spoken to me about the rest: that feeling of no longer fully recognizing yourself, that energy that shifts without warning, that mind that seems to work differently.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                I looked for answers in books, with healthcare professionals, in online groups. I found a lot of fragmented information, but rarely a space that could hold the full complexity of what I was living through: bodily, emotional, cognitive, existential.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl p-6" style={{ background: "#F8EEF5" }}>
                <h3 className="mb-3 text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                  The training
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Faced with that gap, I chose to train in integrative health and nutrition coaching, with a specialization in female neuroscience and the menopausal transition.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "#F3ECFB" }}>
                <h3 className="mb-3 text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}>
                  The conviction
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  This transition can be lived through with awareness, with support, and with method. Not to make it easy, but to make it meaningful.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                Why AWENE was born
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                AWENE was not born from a marketing ambition. It was born from necessity, the need to create what was missing: a space that is both rigorous and human, grounded in science but nourished by a deep understanding of what women are actually moving through.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                A space where menopause is not a problem to fix, but a passage to inhabit with presence and intention. That is AWENE.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-4 border-t pt-10" style={{ borderColor: "#E8DFF0" }}>
            <Button href="/en/about/why-awene" variant="primary">
              Why AWENE
            </Button>
            <Button href="/en/walk-with-me" variant="secondary">
              Walk with me
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
