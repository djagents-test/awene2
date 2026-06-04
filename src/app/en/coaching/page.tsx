import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Coaching | AWENE" },
  description:
    "Science-based menopause and perimenopause coaching to help you understand symptoms, regulate stress and build lasting change.",
};

const blocks = [
  ["Understand", "Make sense of hot flashes, fatigue, brain fog, mood changes and sleep disruption with clear explanations grounded in current science."],
  ["Regulate", "Work first on the nervous system, then on nutrition, movement and daily habits in a way that matches your real context."],
  ["Embody", "Turn insight into sustainable action so the changes become part of your life instead of another short-lived protocol."],
];

export default function CoachingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Coaching", path: "/en/coaching" },
          ]),
          webPageSchema({
            path: "/en/coaching",
            title: "Coaching | AWENE",
            description:
              "Science-based menopause and perimenopause coaching to help you understand symptoms, regulate stress and build lasting change.",
            inLanguage: "en",
          }),
        ]}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Coaching
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Understand what is happening in your body. Build a way forward.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              AWENE supports women through perimenopause and menopause with rigor, science and respect for real life constraints.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={CALENDLY_BOOKING_URL} size="lg">Book my free call</Button>
              <Button href="/en/about" variant="secondary" size="lg">Learn more</Button>
            </div>
          </div>
        </Container>
      </section>
      <Section background="white" size="lg">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blocks.map(([title, body], index) => (
              <article key={title} className="rounded-3xl border p-8" style={{ borderColor: "#E8DFF0", background: index === 0 ? "#F3ECFB" : index === 1 ? "#F8EEF5" : "#FEF3E8" }}>
                <h2 className="mb-4 text-2xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{title}</h2>
                <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white" size="md">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(240px,0.34fr)]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                Your questions
              </p>
              <h2 className="mb-10 text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                FAQ
              </h2>
              <div className="border-t" style={{ borderColor: "#E8DFF0" }}>
                {[
                  ["Does this coaching replace my doctor or gynaecologist?", "No. It works alongside your medical care. I do not diagnose or prescribe."],
                  ["Does this work if I am not on hormonal treatment?", "Yes. The approach adapts whether you use hormonal treatment or not, and always works alongside medical care rather than replacing it."],
                  ["Do you work with women outside Tunisia?", "Yes. Sessions are online. I support women across Africa, the Middle East and beyond, including the diaspora in Europe. Sessions can be in Arabic, French or English."],
                  ["How does the first call work?", "A 30-minute conversation. Not a sales call. Not a diagnosis. A listening session."],
                  ["Is the coaching personalised?", "Entirely. There is no standard programme. Every path is built from your symptoms, priorities and life context."],
                ].map(([question, answer], index) => (
                  <details key={question} className="border-b" style={{ borderColor: "#E8DFF0" }} open={index === 0}>
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
                      <span className="text-base font-semibold leading-snug" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                        {question}
                      </span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg" style={{ background: "#F3ECFB", color: "#6E6478" }}>
                        +
                      </span>
                    </summary>
                    <div className="pb-5">
                      <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                        {answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[0.92/1.15] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/coaching-faq-side-accent.jpg"
                  alt="Group of women speaking in a calm setting, representing questions and support within the Awene coaching approach."
                  title="Frequently asked questions about Awene coaching"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              First step
            </p>
            <h2 className="mb-5 text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Where to start?
            </h2>
            <p className="mx-auto max-w-[50ch] text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Book your first call. 30 minutes. Free. No commitment. To understand where you are, your symptoms, your context, your priorities, and see if my support is right for you.
            </p>
            <div className="mt-8">
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Book my free call
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
