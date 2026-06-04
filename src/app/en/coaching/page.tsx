import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

export const metadata: Metadata = {
  title: "Menopause & Perimenopause Coaching | AWENE — Understand, Regulate, Embody",
  description:
    "Hot flashes, brain fog, hormonal exhaustion, broken sleep: your body is telling you something. AWENE helps you hear it — and act on it. Science-based, personalised, online.",
  keywords: [
    "online menopause coaching",
    "perimenopause support",
    "menopause coaching MENA",
    "hot flashes",
    "hormonal fatigue",
    "menopause brain fog",
    "polyvagal theory",
    "oestrogen",
    "progesterone",
    "cortisol",
  ],
};

const coachingHeroImage = {
  src: "/images/awene-comprehension-corps-hormones-femme.jpg",
  alt: "Portrait of a woman looking toward the horizon in a natural landscape at sunset",
} as const;

const pillars = [
  {
    title: "Understand",
    body: "When women understand what their bodies are actually doing, their symptoms ease and change becomes possible — the research is clear on this. Together, we will make sense of where your hot flashes come from, why you are exhausted, what is behind the broken sleep and the shifting moods and the weight that resists. Not with medical jargon. With clear, honest explanations grounded in the most current science.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    title: "Regulate",
    body: "The nervous system is where everything begins. In chronic stress, your metabolism loses its footing, sleep becomes fragmented, hot flashes intensify, moods grow harder to manage. We address this first — drawing on polyvagal theory and neuroscience. Then, gradually and at your pace, we turn to nutrition, movement and the other levers that help you find your balance again.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    title: "Embody",
    body: "Understanding and regulating only matter if the changes actually become part of your life. The goal is for what we build together to feel like yours — in your routines, in your relationships, in how you carry yourself. Not temporary. Lasting.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
] as const;

const steps = [
  ["1. We get to know each other", "One or two sessions where I learn your history — your symptoms, the shape of your life, what matters most to you. Nothing else can happen without this foundation."],
  ["2. We build your path", "I put together a programme shaped around your reality. Not a template. Not a protocol designed for someone else. A path built specifically for you — your constraints, your context, your preferences."],
  ["3. We move forward", "We put things into practice, adjust as we go, and I am here when you need support. You are not doing this alone."],
  ["4. We take stock", "We look honestly at what has shifted — energy levels, sleep, mood, mental clarity — and we decide together what comes next."],
] as const;

const tools = [
  ["Integrative Assessment", "A thorough look at every part of your life — body, food, sleep, relationships, energy, emotional wellbeing. Not just the symptoms on the surface."],
  ["Nervous System Regulation & Neurowellness", "An approach rooted in polyvagal theory, focused on regulating your autonomic nervous system. This is the starting point for any lasting change — and it has a direct impact on the symptoms of menopause."],
  ["The Science of Behaviour Change", "Strategies drawn from the neurobiology of change. This is not about willpower. It is about understanding how the brain actually shifts — and working with that, not against it."],
  ["Personalised Tracking", "Concrete, meaningful markers to help you see your own progress — in energy, sleep quality, emotional steadiness, and mental clarity."],
  ["Current Scientific Research", "Everything I do is grounded in the most recent research in women's health — menopause, metabolism, hormones, the nervous system, nutrition."],
  ["Collaboration with Your Healthcare Team", "I work alongside your doctor, your gynaecologist, and anyone else supporting your health. Not instead of them."],
] as const;

const faqs = [
  ["Does this replace my doctor or gynaecologist?", "No. It works alongside your medical care, not instead of it. I don't diagnose and I don't prescribe."],
  ["Does this work if I'm not on hormonal treatment?", "Yes. My approach looks at the full picture of your health and wellbeing — with or without hormonal therapy. The support adapts to wherever you are."],
  ["Do you work with women outside Tunisia?", "Yes. All sessions are online. I work with women across Africa and the Middle East and beyond, including the diaspora in France and Europe. Sessions can be in Arabic, French or English."],
  ["What is the first call like?", "A 30-minute conversation. Not a sales pitch. Not an assessment. Just listening — to understand what you're going through and whether we're a good fit."],
  ["Is the programme personalised?", "Completely. There is no standard programme here. Every journey is built from your symptoms, your priorities and what your life actually looks like."],
] as const;

export default function CoachingPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/coaching",
          title: "Menopause & Perimenopause Coaching | AWENE — Understand, Regulate, Embody",
          description:
            "Hot flashes, brain fog, hormonal exhaustion, broken sleep: your body is telling you something. AWENE helps you hear it — and act on it. Science-based, personalised, online.",
          inLanguage: "en",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Coaching", path: "/en/coaching" },
        ])}
      />
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#FCFAF8" }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={coachingHeroImage.src} alt={coachingHeroImage.alt} fill priority className="object-cover object-[76%_24%]" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(252,250,248,0.95) 0%, rgba(252,250,248,0.82) 28%, rgba(252,250,248,0.38) 58%, rgba(252,250,248,0.7) 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-[0.12]" style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-[0.12]" style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }} />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Coaching
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              You deserve to understand{" "}
              <em className="awene-emphasis">
                what is happening in your body.
              </em>{" "}
              And to have what you need to feel better.
            </h1>
            <p className="max-w-[35rem] text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Perimenopause and menopause can upend everything: hot flashes, exhaustion, a mind that fogs over, sleep that shatters, weight changes, moods you don&apos;t recognise. None of this is inevitable. This is a transition — and you can move through it with clarity, with agency, with strength. My role is to walk alongside you at every step, with rigour, with science, and with full respect for what your life actually looks like.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={CALENDLY_BOOKING_URL} variant="primary" size="lg">
                Book my free call
              </Button>
              <Button href="/en/about" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section background="offwhite" size="lg">
        <Container className="relative">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Three Pillars
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Three Pillars
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="flex h-full flex-col overflow-hidden rounded-3xl border p-8 md:p-10" style={{ borderColor: "#E8DFF0", background: pillar.bg }}>
                <span className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-40" style={{ color: pillar.color, fontFamily: "var(--font-inter)" }}>
                  0{index + 1}
                </span>
                <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: pillar.color }} />
                <h3 className="mb-4 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)", color: pillar.color }}>
                  {pillar.title}
                </h3>
                <p className="flex-1 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.55fr)] lg:gap-12">
            <div className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/30 lg:h-full lg:aspect-auto">
                <AmiraPortraitSlot alt="Portrait of Amira Medimagh" className="h-full w-full" />
              </div>
            </div>

            <div className="flex h-full flex-col">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] lg:text-left" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                How We Work Together
              </p>
              <h2 className="mb-10 text-center text-4xl font-bold leading-tight lg:text-left" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                How We Work Together
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {steps.map(([title, body]) => (
                  <article key={title} className="group flex h-full flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)]" style={{ borderColor: "#E8DFF0" }}>
                    <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                      {title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" size="lg">
        <Container>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              What I Work With
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              What I Work With
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map(([title, body]) => (
              <article key={title} className="group flex h-full flex-col rounded-3xl border bg-[#FCFAF8] p-7 shadow-[0_10px_30px_rgba(75,31,122,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C7F3] hover:bg-white hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)]" style={{ borderColor: "#E8DFF0" }}>
                <div className="mb-5 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-12" style={{ background: "#6F3FD6" }} />
                <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="deep" size="md" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)]">
            <div className="max-w-[33.75rem]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}>
                My Role
              </p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}>
                My Role — Where Coaching Ends and Medicine Begins
              </h2>
              <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}>
                I do not diagnose. I do not prescribe. What I do is help you understand what your body is telling you, take meaningful action, and build changes that actually last. I work in close collaboration with your medical team — picking up where the appointment ends and carrying that support into real life, into daily habits, over time.
              </p>
            </div>
            <div className="w-full max-w-[18rem] justify-self-center lg:justify-self-end">
              <Image src="/AWENE.png" alt="AWENE" width={180} height={180} className="h-auto w-full max-w-[9rem] justify-self-center" />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              Where Would You Like to Start?
            </p>
            <h2 className="mb-5 text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Where Would You Like to Start?
            </h2>
            <p className="mx-auto max-w-[50ch] text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              30 minutes. Free. No commitment required. To understand where you are right now — your symptoms, your situation, what you need — and to be honest about whether I am the right person to support you.
            </p>
            <div className="mt-8">
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Book my free call
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" size="md">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(240px,0.34fr)]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
                FAQ
              </p>
              <h2 className="mb-10 text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                FAQ
              </h2>
              <div className="border-t" style={{ borderColor: "#E8DFF0" }}>
                {faqs.map(([question, answer], index) => (
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
                <Image src="/images/coaching-faq-side-accent.jpg" alt="Group of women speaking in a calm setting, representing Awene coaching questions and support." fill className="object-cover object-center" sizes="(min-width: 1024px) 24rem, 100vw" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
