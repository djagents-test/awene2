import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Walk with me",
  description:
    "Discover the different AWENE support paths, from the role of the coach to structured programs.",
};

const paths = [
  {
    eyebrow: "Understand",
    title: "The role of the coach",
    body: "Who is she? How does she work? What kind of stance does she bring to your transition? Everything you need to know before beginning.",
    href: "/en/walk-with-me/the-role-of-the-coach",
    bg: "#F3ECFB",
    color: "#6F3FD6",
  },
] as const;

export default function WalkWithMePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/walk-with-me",
          title: "Walk with me",
          description:
            "Discover the different AWENE support paths, from the role of the coach to structured programs.",
          inLanguage: "en",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Your path
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Walk with me
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              AWENE support is structured, intentional, and deeply human. Here is how it works, and how to begin.
            </p>
          </div>
        </Container>
      </section>
      <Section background="white" size="lg">
        <Container>
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group block rounded-3xl border border-[#E8DFF0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(110,63,214,0.12)]"
                style={{ background: path.bg }}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: path.color, fontFamily: "var(--font-inter)" }}>
                  {path.eyebrow}
                </p>
                <h2 className="mb-4 text-2xl font-bold transition-colors group-hover:text-[#6F3FD6]" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {path.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {path.body}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: path.color, fontFamily: "var(--font-inter)" }}>
                  Discover
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl p-8 text-center md:p-12" style={{ background: "linear-gradient(135deg, #F3ECFB 0%, #F8EEF5 100%)" }}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
              One word before we begin
            </p>
            <p className="mx-auto max-w-2xl text-2xl font-medium italic leading-relaxed md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
              “There is no good or bad time to start truly listening to yourself. There is only the moment when you are ready.”
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
