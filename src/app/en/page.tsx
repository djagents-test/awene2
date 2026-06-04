import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EditorialImageBlock from "@/components/ui/EditorialImageBlock";
import NewsletterSignupForm from "@/components/ui/NewsletterSignupForm";
import PartnerCard from "@/components/ui/PartnerCard";
import Section from "@/components/ui/Section";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { breadcrumbSchema, webPageSchema, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "AWENE | Menopause & Perimenopause Coaching — Understand, Regulate, Embody",
  },
  description:
    "Hot flashes, fatigue, brain fog, broken sleep — this isn't your fault, and it isn't forever. AWENE guides women through perimenopause and menopause with a science-based, deeply human approach. Online, across the MENA region and beyond.",
  keywords: [
    "menopause coaching",
    "perimenopause coaching",
    "online menopause support",
    "hot flashes",
    "menopause fatigue",
    "brain fog",
    "sleep disruption",
    "menopause weight gain",
    "irregular periods",
    "MENA",
  ],
};

const pillars = [
  {
    title: "Understand",
    body: "Women who understand what is actually happening inside their bodies feel better. That is not a claim — it is documented. Your hot flashes, your bone-deep fatigue, your fractured sleep, your shifting moods, the weight that won't budge: all of it has a hormonal and neurological explanation. We give it to you, clearly and without jargon.",
    color: "#6F3FD6",
    bg: "#F3ECFB",
  },
  {
    title: "Regulate",
    body: "Everything starts with the nervous system. When it is locked in chronic stress, your metabolism falters, your sleep breaks apart, and brain fog moves in. When it finds balance, your metabolism, your sleep and your mood begin to follow. This is the ground we build everything else on, together.",
    color: "#4B1F7A",
    bg: "#F8EEF5",
  },
  {
    title: "Embody",
    body: "Understanding and regulating only matter if the changes actually take root in your real life. The goal is for new ways of living to become genuinely yours — in your daily rhythms, your relationships, your relationship with yourself. Not for a season. For good.",
    color: "#F68B2C",
    bg: "#FEF3E8",
  },
];

const faqs = [
  [
    "Do you only work with women in Tunisia?",
    "Not at all. Sessions are held online. I work with women across Africa and the Middle East — Tunisia, Morocco, Algeria and beyond — including the diaspora in France and throughout Europe. Sessions can be conducted in Arabic, French or English.",
  ],
  [
    "Does this work if I'm not taking hormonal treatment?",
    "Yes. My approach looks at every dimension of your health and wellbeing — including any medical treatment you may or may not be on. Whether you're taking hormonal therapy or not, the support adapts entirely to where you are.",
  ],
  [
    "What makes AWENE different from a regular medical appointment?",
    "I don't diagnose and I don't prescribe. What I do is support you in the space where medical consultations tend to end — the daily reality of habits, routines and lasting change.",
  ],
  [
    "What actually happens on the first call?",
    "It's a 30-minute conversation. Free. No agenda other than understanding what you're going through — your symptoms, your context, your priorities — and being honest about whether my support is the right fit.",
  ],
] as const;

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([{ name: "Home", path: "/en" }]),
          webPageSchema({
            path: "/en",
            title: "AWENE | Menopause & Perimenopause Coaching — Understand, Regulate, Embody",
            description:
              "Hot flashes, fatigue, brain fog, broken sleep — this isn't your fault, and it isn't forever. AWENE guides women through perimenopause and menopause with a science-based, deeply human approach. Online, across the MENA region and beyond.",
            inLanguage: "en",
          }),
        ]}
      />
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#FCFAF8" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/62256.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[62%_22%] opacity-[0.34] md:object-[76%_22%] lg:object-[82%_20%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,250,248,0.94) 0%, rgba(252,250,248,0.76) 28%, rgba(252,250,248,0.34) 56%, rgba(252,250,248,0.62) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.18]"
            style={{
              background:
                "radial-gradient(circle at center, #6F3FD6 0%, #F3ECFB 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 -left-24 h-[400px] w-[400px] rounded-full opacity-[0.22]"
            style={{
              background:
                "radial-gradient(circle at center, #F8EEF5 0%, #F3ECFB 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-3 w-3 rounded-full opacity-40"
            style={{ background: "#F68B2C" }}
          />
          <div
            className="absolute left-1/3 top-2/3 h-2 w-2 rounded-full opacity-30"
            style={{ background: "#6F3FD6" }}
          />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Menopause coaching · Perimenopause coaching
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              <em className="awene-emphasis block">
                Your body is going through something real.
              </em>
              Understand it. Do something about it.
            </h1>
            <p
              className="mb-6 text-xl font-medium md:text-2xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
            >
              Know your body. That is your power.
            </p>
            <p
              className="mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Hot flashes, exhaustion you can&apos;t explain, a mind that won&apos;t stay sharp, sleep that falls apart, moods that shift without warning, a body that feels unfamiliar — this is not in your head. This is not something you simply endure. This is a biological transition, a documented one, and you can understand it — and move through it with the right support.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Book my call
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
              A scientific approach. A human one.
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              A Scientific Approach. A Human One.
            </h2>
            <p
              className="mt-6 text-base leading-relaxed md:text-lg"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              AWENE works with women in perimenopause and menopause across Africa, the Middle East and beyond — with rigour, precision and genuine respect for what they are living through.
            </p>
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              No intuitive guesswork. No miracle fixes. A truly integrative method, built on the most current science around hormones, the nervous system and women&apos;s health.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="group relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(110,63,214,0.12)] md:p-10"
                style={{ background: pillar.bg, borderColor: "#E8DFF0" }}
              >
                <span
                  className="absolute right-8 top-8 text-xs font-semibold tracking-[0.2em] opacity-40"
                  style={{ color: pillar.color, fontFamily: "var(--font-inter)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="mb-6 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: pillar.color }}
                />
                <h3
                  className="mb-4 text-2xl font-bold md:text-3xl"
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
              </div>
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
                Physician. Public health expert. Certified coach in integrative health, nutrition, perimenopause and menopause.
              </p>
              <p
                className="mb-10 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                Twenty years working in international public health. One conviction that has never wavered: every woman deserves to understand her own body — its hormonal rhythms, its signals, its transitions — and to have real tools for feeling well.
              </p>
              <Button href="/en/about" variant="secondary">
                <span style={{ color: "#F3ECFB" }}>Learn more about Amira</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#FCFAF8" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }} />
        </div>

        <Container className="relative z-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
            Where Would You Like to Start?
          </p>
          <h2 className="mb-16 text-center text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Where Would You Like to Start?
          </h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl p-8 md:p-10" style={{ background: "#F3ECFB", border: "1.5px solid #E8DFF0" }}>
              <div className="mb-6 overflow-hidden rounded-[1.6rem]">
                <EditorialImageBlock placement="homeReadyCall" variant="portrait" tone="violet" className="aspect-[16/10] w-full" />
              </div>
              <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: "#6F3FD6" }} />
              <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}>
                You&apos;re ready to work with someone
              </h3>
              <div className="mb-8 flex-1 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />Book your first call — 30 minutes, free, no strings attached.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />A real conversation about what you&apos;re experiencing — your symptoms, your pace, your life.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />To see whether AWENE is the right fit for you.</li>
                </ul>
              </div>
              <Button href={CALENDLY_BOOKING_URL} size="lg">
                Book my call
              </Button>
            </div>

            <div className="flex flex-col rounded-3xl p-8 md:p-10" style={{ background: "#FEF3E8", border: "1.5px solid #E8DFF0" }}>
              <div className="mb-6 overflow-hidden rounded-[1.6rem]">
                <div className="relative aspect-[16/10] w-full">
                  <Image src="/images/formations-audience-2.jpg" alt="Smiling woman in a calm and bright space" fill className="object-cover object-center" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              </div>
              <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: "#F68B2C" }} />
              <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                You&apos;d like to learn more first
              </h3>
              <p className="mb-8 flex-1 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                Join the AWENE newsletter — grounded, science-based writing on perimenopause and menopause, hormones, the nervous system and women&apos;s health. Once a week. Straight to your inbox.
              </p>
              <NewsletterSignupForm locale="en" />
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
              AWENE works alongside physicians, gynaecologists, nutritionists, psychologists, osteopaths, fitness coaches and other professionals who support women through hormonal transitions.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <PartnerCard
              eyebrow="Employers"
              title="Are you an employer?"
              body="The women on your team aged 40 to 55 are navigating perimenopause and menopause quietly, often invisibly. Hot flashes at their desk, a mind that won't focus, fatigue that won't lift — absenteeism and lost productivity carry a real cost. So does doing nothing about it."
              href="/en/contact"
              cta="Let's talk"
              variant="primary"
            />
            <PartnerCard
              eyebrow="Health and wellness professionals"
              title="Are you a health or wellness professional?"
              body="A partnership with AWENE might look like co-creating educational content, cross-referring clients, joining forces for online events, or something else entirely — as long as it serves the women we both work with. If you support women over 40 and are looking for a rigorous, committed partner in the MENA region, we should talk."
              href="/en/contact"
              cta="Propose a collaboration"
              variant="light"
            />
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
              <h2 className="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl lg:text-left" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                Frequently asked questions
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
