import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message has been received.",
  robots: { index: false, follow: true },
};

const nextSteps = [
  {
    number: "01",
    title: "Your message has been received",
    desc: "I have it and I will read it personally.",
    color: "#6F3FD6",
  },
  {
    number: "02",
    title: "I reply within 48 hours",
    desc: "By email, with a response adapted to your situation and your questions.",
    color: "#4B1F7A",
  },
  {
    number: "03",
    title: "We reconnect",
    desc: "If the support is the right fit, we organize a first phone conversation.",
    color: "#F68B2C",
  },
] as const;

export default function ThankYouPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/en/thank-you", title: "Thank you", description: "Your message has been received.", inLanguage: "en" })} />
      <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: "#FCFAF8" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-[0.12]" style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 -left-16 h-64 w-64 rounded-full opacity-[0.1]" style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }} />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="mb-16 max-w-3xl">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #6F3FD6 0%, #4B1F7A 100%)" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M6 16l7 7 13-13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Message received
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Thank you for
              <em className="awene-emphasis block">taking the first step.</em>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              It takes courage to pause, to look for space, to write. I’m here.
            </p>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {nextSteps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-[#E8DFF0] bg-white p-6 text-center">
                <span className="mb-3 block text-3xl font-bold opacity-20" style={{ fontFamily: "var(--font-playfair)", color: step.color }}>
                  {step.number}
                </span>
                <h3 className="mb-2 font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-center">
            <p className="mb-6 text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              In the meantime, keep exploring AWENE.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/en" variant="primary">
                Back to home
              </Button>
              <Button href="/en/coaching" variant="secondary">
                Explore coaching
              </Button>
              <Button href="/en/articles" variant="secondary">
                Read articles
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
