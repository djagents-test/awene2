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
    "Discover Awene trainings dedicated to perimenopause, menopause, hormonal health and women's well-being.",
};

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
              "Discover Awene trainings dedicated to perimenopause, menopause, hormonal health and women's well-being.",
            inLanguage: "en",
          }),
          itemListSchema(
            "/en/training",
            formations.map((formation) => ({ name: formation.title, url: absoluteUrl(`/en/training/${formation.slug}`) })),
          ),
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
              Awene training.
              <em className="awene-emphasis block">Understand the body. Support the transition.</em>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Clear, human, science-based sessions for women, employers and health or wellness professionals.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(280px,0.35fr)]">
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {formations.map((formation) => (
              <Link key={formation.slug} href={`/en/training/${formation.slug}`} className="rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(75,31,122,0.08)] md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-3 text-2xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{formation.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>{formation.description}</p>
              </Link>
            ))}
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
              { title: "For health and wellness professionals", body: "A rigorous, human foundation for better welcoming questions around perimenopause, menopause and hormonal transitions.", color: "#F68B2C", bg: "#FEF3E8" },
            ].map((audience) => (
              <article
                key={audience.title}
                className="rounded-3xl border p-8 md:p-9"
                style={{ background: audience.bg, borderColor: "#E8DFF0" }}
              >
                <div className="mb-6 h-0.5 w-10 rounded-full" style={{ background: audience.color }} />
                <h3 className="mb-4 text-2xl font-bold" style={{ color: audience.color, fontFamily: "var(--font-playfair)" }}>
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
    </>
  );
}
