/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";
import CoachingFaq from "@/components/sections/CoachingFaq";
import HomeHero from "@/components/sections/Hero";
import HomeApproach from "@/components/sections/Pillars";
import HomeAmiraBio from "@/components/sections/Manifesto";
import HomeGetStarted from "@/components/sections/MovementCapture";
import HomeEntreprises from "@/components/sections/CTABand";
import HomeFAQ from "@/components/sections/FAQ";

type TextBlock = {
  title: string;
  body: readonly string[];
};

type Faq = {
  question: string;
  answer: string;
};

export const englishMetadata: Record<string, Metadata> = {
  "/": {
    title: {
      absolute:
        "AWENE | Menopause & Perimenopause Coaching, Understand, Regulate, Embody",
    },
    description:
      "Hot flashes, fatigue, brain fog, broken sleep, this isn't your fault, and it isn't forever. AWENE guides women through perimenopause and menopause with a science-based, deeply human approach. Online, across the MENA region and beyond.",
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
  },
  "/coaching": {
    title: {
      absolute:
        "Menopause & Perimenopause Coaching | AWENE, Understand, Regulate, Embody",
    },
    description:
      "Hot flashes, brain fog, hormonal exhaustion, broken sleep: your body is telling you something. AWENE helps you hear it, and act on it. Science-based, personalised, online.",
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
  },
  "/a-propos": {
    title: {
      absolute:
        "About | AWENE, Menopause & Perimenopause Coaching by Amira Medimagh",
    },
    description:
      "Amira Medimagh is a physician, public health expert and certified menopause and perimenopause coach. Learn what AWENE is built on, and why this approach is different.",
    keywords: [
      "Amira Medimagh menopause coach",
      "physician menopause coach",
      "AWENE Tunisia MENA",
      "women's health",
      "polyvagal theory",
      "female longevity",
      "public health",
      "IIN",
      "IWHI",
      "hormonal health",
    ],
  },
  "/articles": {
    title: {
      absolute: "Articles | AWENE, Understanding Menopause and Perimenopause",
    },
    description:
      "Honest, science-based articles on menopause, perimenopause, hormones and women's health. Written to help you understand what is happening in your body, and actually do something about it.",
    keywords: [
      "menopause articles",
      "understanding perimenopause",
      "women's health menopause",
      "hot flashes explained",
      "hormonal fatigue",
      "menopause brain fog",
      "nervous system",
      "oestrogen",
    ],
  },
  "/evenements": {
    title: {
      absolute: "AWENE Events | Menopause & Perimenopause Workshops",
    },
    description:
      "Workshops, webinars and gatherings centred on menopause and perimenopause, to understand what's happening, share it with others, and keep moving forward. Subscribe to the newsletter to hear about them first.",
    keywords: [
      "menopause workshop",
      "MENA menopause events",
      "perimenopause webinar",
      "women's health workshop",
      "menopause conference",
      "women over 40",
      "hormone webinar",
    ],
  },
  "/formations": {
    title: {
      absolute:
        "AWENE Training | Menopause, Perimenopause and Women's Health",
    },
    description:
      "AWENE training sessions to understand perimenopause, menopause, hormonal health and support women, companies and professionals.",
    keywords: [
      "menopause training",
      "perimenopause training",
      "women's health training",
      "menopause workplace training",
      "hormonal health",
    ],
  },
};

const coachingPillars: TextBlock[] = [
  {
    title: "Understand",
    body: [
      "When women understand what their bodies are actually doing, their symptoms ease and change becomes possible, the research is clear on this. Together, we will make sense of where your hot flashes come from, why you are exhausted, what is behind the broken sleep and the shifting moods and the weight that resists. Not with medical jargon. With clear, honest explanations grounded in the most current science.",
    ],
  },
  {
    title: "Regulate",
    body: [
      "The nervous system is where everything begins. In chronic stress, your metabolism loses its footing, sleep becomes fragmented, hot flashes intensify, moods grow harder to manage. We address this first, drawing on polyvagal theory and neuroscience. Then, gradually and at your pace, we turn to nutrition, movement and the other levers that help you find your balance again.",
    ],
  },
  {
    title: "Embody",
    body: [
      "Understanding and regulating only matter if the changes actually become part of your life. The goal is for what we build together to feel like yours, in your routines, in your relationships, in how you carry yourself. Not temporary. Lasting.",
    ],
  },
];

const coachingSteps: TextBlock[] = [
  {
    title: "1. We get to know each other",
    body: [
      "One or two sessions where I learn your history, your symptoms, the shape of your life, what matters most to you. Nothing else can happen without this foundation.",
    ],
  },
  {
    title: "2. We build your path",
    body: [
      "I put together a programme shaped around your reality. Not a template. Not a protocol designed for someone else. A path built specifically for you, your constraints, your context, your preferences.",
    ],
  },
  {
    title: "3. We move forward",
    body: [
      "We put things into practice, adjust as we go, and I am here when you need support. You are not doing this alone.",
    ],
  },
  {
    title: "4. We take stock",
    body: [
      "We look honestly at what has shifted, energy levels, sleep, mood, mental clarity, and we decide together what comes next.",
    ],
  },
];

const coachingTools: TextBlock[] = [
  {
    title: "Integrative Assessment",
    body: [
      "A thorough look at every part of your life, body, food, sleep, relationships, energy, emotional wellbeing. Not just the symptoms on the surface.",
    ],
  },
  {
    title: "Nervous System Regulation & Neurowellness",
    body: [
      "An approach rooted in polyvagal theory, focused on regulating your autonomic nervous system. This is the starting point for any lasting change, and it has a direct impact on the symptoms of menopause.",
    ],
  },
  {
    title: "The Science of Behaviour Change",
    body: [
      "Strategies drawn from the neurobiology of change. This is not about willpower. It is about understanding how the brain actually shifts, and working with that, not against it.",
    ],
  },
  {
    title: "Personalised Tracking",
    body: [
      "Concrete, meaningful markers to help you see your own progress, in energy, sleep quality, emotional steadiness, and mental clarity.",
    ],
  },
  {
    title: "Current Scientific Research",
    body: [
      "Everything I do is grounded in the most recent research in women's health, menopause, metabolism, hormones, the nervous system, nutrition.",
    ],
  },
  {
    title: "Collaboration with Your Healthcare Team",
    body: [
      "I work alongside your doctor, your gynaecologist, and anyone else supporting your health. Not instead of them.",
    ],
  },
];

const homeFaqs: Faq[] = [
  {
    question: "Do you only work with women in Tunisia?",
    answer:
      "Not at all. Sessions are held online. I work with women across Africa and the Middle East, Tunisia, Morocco, Algeria and beyond, including the diaspora in France and throughout Europe. Sessions can be conducted in Arabic, French or English.",
  },
  {
    question: "Does this work if I'm not taking hormonal treatment?",
    answer:
      "Yes. My approach looks at every dimension of your health and wellbeing, including any medical treatment you may or may not be on. Whether you're taking hormonal therapy or not, the support adapts entirely to where you are.",
  },
  {
    question: "What makes AWENE different from a regular medical appointment?",
    answer:
      "I don't diagnose and I don't prescribe. What I do is support you in the space where medical consultations tend to end, the daily reality of habits, routines and lasting change.",
  },
  {
    question: "What actually happens on the first call?",
    answer:
      "It's a 30-minute conversation. Free. No agenda other than understanding what you're going through, your symptoms, your context, your priorities, and being honest about whether my support is the right fit.",
  },
];

const coachingFaqs: Faq[] = [
  {
    question: "Does this replace my doctor or gynaecologist?",
    answer:
      "No. It works alongside your medical care, not instead of it. I don't diagnose and I don't prescribe.",
  },
  {
    question: "Does this work if I'm not on hormonal treatment?",
    answer:
      "Yes. My approach looks at the full picture of your health and wellbeing, with or without hormonal therapy. The support adapts to wherever you are.",
  },
  {
    question: "Do you work with women outside Tunisia?",
    answer:
      "Yes. All sessions are online. I work with women across Africa and the Middle East and beyond, including the diaspora in France and Europe. Sessions can be in Arabic, French or English.",
  },
  {
    question: "What is the first call like?",
    answer:
      "A 30-minute conversation. Not a sales pitch. Not an assessment. Just listening, to understand what you're going through and whether we're a good fit.",
  },
  {
    question: "Is the programme personalised?",
    answer:
      "Completely. There is no standard programme here. Every journey is built from your symptoms, your priorities and what your life actually looks like.",
  },
];

const qualifications = [
  "Doctor of Medicine",
  "Master's in Public Health",
  "Certified Coach in Integrative Health & Nutrition, Institute for Integrative Nutrition (IIN), USA",
  "Certified Perimenopause & Menopause Coach, Integrative Women's Health Institute (IWHI)",
];

const articleThemes: TextBlock[] = [
  {
    title: "Understand",
    body: [
      "The biology, the hormones, the mechanisms, explained clearly. Examples: 'What Is Perimenopause, Really?', 'Why Hot Flashes Happen at Night', 'Oestrogen and Progesterone: What Actually Changes After 40'.",
    ],
  },
  {
    title: "Regulate",
    body: [
      "The nervous system, sleep, metabolism, and why they matter. Examples: 'Your Nervous System and Menopause: The Connection Nobody Talks About', 'Why You Wake Up at 3am During Perimenopause', 'Chronic Stress and Hot Flashes: What the Science Says'.",
    ],
  },
  {
    title: "Embody",
    body: [
      "Habits, daily life, changes that actually stick. Examples: 'Menopause Weight Gain: What Actually Works', 'Brain Fog: 5 Strategies That Are Actually Validated', 'How to Move Your Body When You Have No Energy'.",
    ],
  },
];

function Hero({
  title,
  body,
  kicker,
}: {
  title: string;
  body?: string | readonly string[];
  kicker?: string;
}) {
  const bodyParagraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <section style={{ background: "#FCFAF8" }}>
      <Container className="relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
        {kicker && (
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            {kicker}
          </p>
        )}
        <h1
          className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          {title}
        </h1>
        {bodyParagraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-xl leading-relaxed mb-4 last:mb-0"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            {paragraph}
          </p>
        ))}
        </div>
      </Container>
    </section>
  );
}

function TextSection({
  title,
  children,
  background = "white",
}: {
  title: string;
  children: React.ReactNode;
  background?: "white" | "offwhite" | "lavender" | "deep";
}) {
  return (
    <Section background={background} size="lg">
      <Container size="md">
        <h2
          className="text-4xl font-bold mb-7"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          {title}
        </h2>
        <div
          className="space-y-5 text-base leading-relaxed"
          style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
        >
          {children}
        </div>
      </Container>
    </Section>
  );
}

function Cards({ title, items }: { title?: string; items: readonly TextBlock[] }) {
  return (
    <Section background="white" size="lg">
      <Container>
        {title && (
          <h2
            className="text-4xl font-bold mb-10 text-center"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="p-8 rounded-3xl border"
              style={{ borderColor: "#E8DFF0", background: "#FCFAF8" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}
              >
                {item.title}
              </h3>
              {item.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TwoColumnCards({
  title,
  items,
  background = "lavender",
}: {
  title: string;
  items: readonly TextBlock[];
  background?: "white" | "offwhite" | "lavender";
}) {
  return (
    <Section background={background} size="lg">
      <Container>
        <h2
          className="text-4xl font-bold mb-10 text-center"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="p-7 rounded-3xl bg-white border"
              style={{ borderColor: "#E8DFF0" }}
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
              >
                {item.title}
              </h3>
              {item.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex text-sm font-semibold"
      style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </Link>
  );
}

function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Section background="white" size="md">
      <Container size="md">
        <h2
          className="text-4xl font-bold mb-8 text-center"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          FAQ
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.question}
              className="p-6 rounded-2xl border"
              style={{ borderColor: "#E8DFF0", background: "#FCFAF8" }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
              >
                Q, {item.question}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function EnglishHomePage() {
  return (
    <>
      <HomeHero
        eyebrow="perimenopause and menopause coaching"
        titleBeforeEmphasis="You don't feel like yourself anymore."
        emphasizedTitle="Your body is going through a real transition."
        titleAfterEmphasis="Understand it. Act."
        tagline="Know your body. It is your strength."
        body="Hot flashes, unexplained fatigue, brain fog, fragmented sleep, unstable mood, weight changes, it is not in your head. It is not inevitable. It is a documented biological transition that you can understand, and move through with the right tools."
        primaryHref="/en/contact"
        primaryLabel="Book my free call"
        secondaryHref="/en/a-propos"
        secondaryLabel="Learn more"
        scrollLabel="Discover"
      />
      <HomeApproach
        eyebrow="The AWENE method"
        title="A scientific approach. Human support."
        subtitle="AWENE supports women in perimenopause and menopause across Africa, the Middle East and beyond, with rigor, precision, and respect for their reality. No intuitive coaching. No miracle solutions. An integrative method rooted in the most current scientific evidence on hormones, the nervous system, and women's health."
        pillars={[
          {
            number: "01",
            name: "Understand",
            description:
              "Women who understand what is happening in their bodies feel better, this is proven. Your hot flashes, chronic fatigue, sleep disruption, mood changes, and weight gain all have hormonal and neurological explanations. We make them clear.",
            color: "#6F3FD6",
            bg: "#F3ECFB",
          },
          {
            number: "02",
            name: "Regulate",
            description:
              "Your nervous system first. When it is in chronic stress, metabolism gets disrupted, sleep fragments, and brain fog sets in. When it is balanced, your metabolism, sleep, and mood begin to follow. This is the base of everything we build together.",
            color: "#4B1F7A",
            bg: "#F8EEF5",
          },
          {
            number: "03",
            name: "Embody",
            description:
              "Changes that fit into your real life. Not a standard program. A path that matches you, in your everyday life, your relationships, and your relationship with yourself. Sustainably.",
            color: "#F68B2C",
            bg: "#FEF3E8",
          },
        ]}
      />
      <HomeAmiraBio
        eyebrow="Your guide"
        credentials="Physician · Public health expert · Certified coach in integrative health and nutrition, perimenopause and menopause"
        body="20 years of international public health experience. One conviction: every woman deserves to understand her body, its hormonal cycles, its symptoms, its transitions, and to have the tools to feel well."
        href="/en/a-propos"
        ctaLabel="Learn more about Amira"
      />
      <HomeGetStarted
        eyebrow="Where to start?"
        title="Where to start?"
        readyTitle="You are ready to be supported"
        readyBody={
          <ul className="space-y-2 text-base leading-relaxed list-none">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />30 minutes, free, no commitment.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />A conversation to understand what you are experiencing: your symptoms, your pace, your reality.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6F3FD6" }} />To see whether AWENE is the right fit for you.</li>
          </ul>
        }
        readyHref="/en/contact"
        readyCta="Book my call"
        learnTitle="You want to learn more first"
        learnBody="Join the AWENE newsletter, reliable, science-based information on perimenopause and menopause, hormones, the nervous system, and women's health. Once a week. Straight to your inbox."
        emailPlaceholder="Your email address"
        submitLabel="Sign me up"
        successMessage="Welcome, see you soon in your inbox."
      />
      <HomeEntreprises
        employerEyebrow="Are you an employer?"
        employerTitle="Are you an employer?"
        employerBody="Women on your team aged 40-55 are moving through perimenopause and menopause in silence. Hot flashes at work, brain fog, chronic fatigue, difficulty concentrating, absenteeism and lower productivity carry a real cost. So do the solutions."
        employerHref="/en/contact"
        employerCta="Let's talk"
        partnerEyebrow="Are you a health or wellness professional?"
        partnerTitle="Let's build a rigorous partnership."
        partnerBody="AWENE collaborates with physicians, gynaecologists, nutritionists, psychologists, osteopaths, fitness coaches, and other professionals who support women through hormonal transition. Our approach is grounded in science, not trends. If you support women over 40 and are looking for a rigorous, committed partner in the MENA region, let's talk."
        partnerHref="/en/contact"
        partnerCta="Propose a collaboration"
      />
      <HomeFAQ
        eyebrow="Your questions"
        title="Frequently asked questions"
        faqs={homeFaqs}
      />
    </>
  );
}

const pillarColors = [
  { color: "#6F3FD6", bg: "#F3ECFB" },
  { color: "#4B1F7A", bg: "#F8EEF5" },
  { color: "#F68B2C", bg: "#FEF3E8" },
];

export function EnglishCoachingPage() {
  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#FCFAF8" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/awene-comprehension-corps-hormones-femme.jpg"
            alt="A woman looking towards the horizon in a natural landscape at sunset"
            fill
            priority
            className="object-cover object-[76%_24%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,250,248,0.95) 0%, rgba(252,250,248,0.82) 28%, rgba(252,250,248,0.38) 58%, rgba(252,250,248,0.7) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
          />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Coaching
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              You deserve to understand{" "}
              <em className="awene-emphasis">
                what is happening inside your body.
              </em>{" "}
              And to have what you need to feel better.
            </h1>
            <p
              className="max-w-[35rem] text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Perimenopause and menopause can upend everything: hot flashes, exhaustion, a mind that fogs over, sleep that shatters, weight changes, moods you don&apos;t recognise. None of this is inevitable. This is a transition, and you can move through it with clarity, with agency, with strength. My role is to walk alongside you at every step, with rigour, with science, and with full respect for what your life actually looks like.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/en/contact" variant="primary" size="lg">
                Book my free call
              </Button>
              <Button href="/en/a-propos" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section background="offwhite" size="lg">
        <Container className="relative">
          <div className="mb-14 max-w-3xl text-center mx-auto">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              The AWENE method
            </p>
            <h2
              className="text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              A{" "}
              <span className="awene-emphasis">3-pillar</span>{" "}
              approach
            </h2>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 hidden w-[16rem] translate-x-6 -translate-y-8 lg:block">
            <div className="relative aspect-[0.9/1.1] w-full overflow-hidden rounded-[1.5rem] opacity-90">
              <Image
                src="/images/coaching-pillars-side-accent.jpg"
                alt="Woman reflecting in a calm environment"
                fill
                className="object-cover object-center"
                sizes="16rem"
              />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coachingPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border p-8 md:p-10"
                style={{ borderColor: "#E8DFF0", background: pillarColors[index].bg }}
              >
                <span
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-40"
                  style={{ color: pillarColors[index].color, fontFamily: "var(--font-inter)" }}
                >
                  0{index + 1}
                </span>
                <div
                  className="mb-6 h-0.5 w-10 rounded-full"
                  style={{ background: pillarColors[index].color }}
                />
                <h3
                  className="mb-4 text-2xl font-bold md:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)", color: pillarColors[index].color }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="flex-1 text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {pillar.body[0]}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="lavender" size="lg">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.55fr)] lg:gap-12">
            <div className="w-full max-w-[20rem] mx-auto lg:mx-0 lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/30 lg:h-full lg:aspect-auto">
                <AmiraPortraitSlot alt="Portrait of Amira Medimagh" className="h-full w-full" />
              </div>
            </div>

            <div className="flex h-full flex-col">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-center lg:text-left"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Support
              </p>
              <h2
                className="mb-10 text-center text-4xl font-bold leading-tight lg:text-left"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                How We Work Together
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {coachingSteps.map((step) => (
                  <article
                    key={step.title}
                    className="group flex h-full flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)] hover:border-[#D8C7F3]"
                    style={{ borderColor: "#E8DFF0" }}
                  >
                    <h3
                      className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                      style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="flex-1 text-sm leading-relaxed"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {step.body[0]}
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
          <div className="mb-14 max-w-3xl text-center mx-auto">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              The tools
            </p>
            <h2
              className="text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              What I Work{" "}
              <span className="awene-emphasis">With</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coachingTools.map((tool) => (
              <article
                key={tool.title}
                className="group flex h-full flex-col rounded-3xl border bg-[#FCFAF8] p-7 shadow-[0_10px_30px_rgba(75,31,122,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(75,31,122,0.12)] hover:border-[#D8C7F3] hover:bg-white"
                style={{ borderColor: "#E8DFF0" }}
              >
                <div
                  className="mb-5 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ background: "#6F3FD6" }}
                />
                <h3
                  className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-[#6F3FD6]"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {tool.title}
                </h3>
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {tool.body[0]}
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
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
              >
                My role
              </p>
              <h2
                className="mb-6 text-3xl font-bold leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
              >
                My Role, Where Coaching Ends and Medicine Begins
              </h2>
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
              >
                I do not diagnose. I do not prescribe. What I do is help you understand what your body is telling you, take meaningful action, and build changes that actually last. I work in close collaboration with your medical team, picking up where the appointment ends and carrying that support into real life, into daily habits, over time.
              </p>
            </div>
            <div className="w-full max-w-[18rem] justify-self-center lg:justify-self-end">
              <Image
                src="/AWENE.png"
                alt="AWENE"
                width={180}
                height={180}
                className="h-auto w-full max-w-[9rem] justify-self-center"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="offwhite" size="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              First step
            </p>
            <h2
              className="mb-5 text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Where Would You Like to Start?
            </h2>
            <p
              className="mx-auto max-w-[50ch] text-base leading-relaxed"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              30 minutes. Free. No commitment required. To understand where you are right now, your symptoms, your situation, what you need, and to be honest about whether I am the right person to support you.
            </p>
            <div className="mt-8">
              <Button href="/en/contact" size="lg">
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
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
              >
                Your questions
              </p>
              <h2
                className="mb-10 text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                FAQ
              </h2>
              <CoachingFaq items={coachingFaqs} />
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[0.92/1.15] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/coaching-faq-side-accent.jpg"
                  alt="A woman supporting another woman in a difficult moment"
                  fill
                  className="object-cover object-[30%_center]"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function EnglishAboutPage() {
  return (
    <>
      <Hero title="AWENE, Why This Exists." />
      <TextSection title="What We Believe">
        <p>
          Perimenopause and menopause are not a disease. They are not years to
          be quietly endured, years of hot flashes, bone-deep fatigue, a mind
          that fogs over, sleep that won't come, or weight that shifts for no
          reason you can name.
        </p>
        <p>
          They are real biological transitions, documented, understandable,
          navigable, with the right tools and the right support.
        </p>
        <p>
          AWENE was built on a single conviction: every woman deserves to
          understand what is happening inside her body, her hormones, her
          nervous system, her symptoms, and to have access to support that is
          serious, science-based and genuinely adapted to her life.
        </p>
        <p>No generalities. No empty promises. Real answers.</p>
      </TextSection>
      <TextSection title="What AWENE Is Not" background="lavender">
        <p>AWENE is not another wellness platform.</p>
        <p>
          It is not intuitive coaching, positive thinking, or quick fixes for
          hot flashes and weight gain.
        </p>
        <p>
          It is a rigorous integrative approach, one that starts with the body,
          with biology, with hormones, and with the actual reality of each
          woman's life.
        </p>
      </TextSection>
      <TextSection title="Amira Medimagh">
        <p>Physician. Public Health Expert. Certified Coach.</p>
        <p>
          Amira Medimagh is a physician with a Master's in public health and
          over twenty years of experience in international public health, in
          sexual and reproductive health, HIV/AIDS and women's rights, across
          Tunisia and the MENA region.
        </p>
        <p>
          Since 2025, she holds certifications in integrative health and
          nutrition coaching from the Institute for Integrative Nutrition (USA),
          and in perimenopause and menopause coaching from the Integrative
          Women's Health Institute.
        </p>
        <p>
          She is currently deepening her training in polyvagal theory and female
          longevity, bringing the most current thinking in neuroscience and
          hormonal health into her practice.
        </p>
        <h3 className="text-2xl font-bold pt-4" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
          Why This Path
        </h3>
        <p>
          After two decades working on health systems, the structures, the
          data, the policies, Amira made a deliberate choice: to get much
          closer to individual women. Not to statistics. Not to programmes. To
          real women, with real bodies, real symptoms and real lives.
        </p>
        <p>
          AWENE is that bridge: between the rigour of public health and the
          intimacy of genuine human support.
        </p>
        <h3 className="text-2xl font-bold pt-4" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
          What Sets Her Apart
        </h3>
        <p>Not just a coach. A physician who accompanies.</p>
        <p>
          The difference is not the title, it is the ability to read what a
          body is saying: the hormonal signals, the nervous system patterns, the
          biological mechanisms beneath the symptoms. To read all of that with
          precision. And to help each woman respond to it with humanity.
        </p>
      </TextSection>
      <Section background="offwhite" size="md">
        <Container size="md">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
            Qualifications & Certifications
          </h2>
          <ul className="space-y-3">
            {qualifications.map((item) => (
              <li key={item} className="p-4 rounded-2xl border bg-white" style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
            [ Photo to place here ]
          </p>
        </Container>
      </Section>
    </>
  );
}

export function EnglishArticlesPage() {
  return (
    <>
      <Cards title="Three Themes" items={articleThemes} />
      <TextSection title="Newsletter CTA" background="offwhite">
        <p>
          'Do these articles speak to you? Get reliable, science-based writing
          on perimenopause and menopause, once a week, straight to your inbox.'
        </p>
        <p>
          <ArrowLink href="/en/articles">→ Sign me up for the newsletter</ArrowLink>
        </p>
      </TextSection>
    </>
  );
}

export function EnglishEventsPage() {
  return (
    <>
      <Hero
        title="Spaces to Come Together"
        body="Workshops, webinars and gatherings around menopause and perimenopause, to understand, to share and to move forward, together."
      />
      <TextSection title="Upcoming Events" background="offwhite">
        <p>
          Events coming soon, subscribe to the newsletter to be the first to
          hear.
        </p>
        <p>[ Upcoming events ]</p>
        <p>
          <ArrowLink href="/en/evenements">→ Subscribe to the newsletter to hear first</ArrowLink>
        </p>
      </TextSection>
    </>
  );
}

export function getEnglishPage(path: string) {
  if (path === "/") return <EnglishHomePage />;
  if (path === "/coaching") return <EnglishCoachingPage />;
  return null;
}
