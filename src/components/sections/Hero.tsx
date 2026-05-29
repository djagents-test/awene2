import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Image from "next/image";

type HeroProps = {
  eyebrow?: string;
  titleBeforeEmphasis?: string;
  emphasizedTitle?: string;
  titleAfterEmphasis?: string;
  tagline?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  scrollLabel?: string;
};

export default function Hero({
  eyebrow = "coaching périménopause et ménopause",
  titleBeforeEmphasis = "",
  emphasizedTitle = "Ton corps traverse une transition réelle.",
  titleAfterEmphasis = "Comprends-la. Agis.",
  tagline = "Connais ton corps. C'est ta force.",
  body = "Bouffées de chaleur, fatigue inexpliquée, brouillard mental, sommeil fragmenté, humeur instable, poids qui change, ce n'est pas dans ta tête. Ce n'est pas une fatalité. C'est une transition biologique documentée, que tu peux comprendre, et traverser avec les bons outils.",
  primaryHref = "/contact",
  primaryLabel = "Réserver mon appel gratuit",
  secondaryHref = "/a-propos",
  secondaryLabel = "En savoir plus",
  scrollLabel,
}: HeroProps) {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#FCFAF8" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/2151249731.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[78%_18%] opacity-[0.34] md:object-[76%_22%] lg:object-[82%_20%]"
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

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.18]"
          style={{
            background:
              "radial-gradient(circle at center, #6F3FD6 0%, #F3ECFB 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.22]"
          style={{
            background:
              "radial-gradient(circle at center, #F8EEF5 0%, #F3ECFB 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full opacity-40"
          style={{ background: "#F68B2C" }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full opacity-30"
          style={{ background: "#6F3FD6" }}
        />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 inline-flex items-center gap-3"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            <span className="block w-8 h-px" style={{ background: "#F68B2C" }} />
            {eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl font-bold leading-[1.08] mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            {titleBeforeEmphasis ? (
              <span className="block">{titleBeforeEmphasis}</span>
            ) : null}
            <em className="awene-emphasis block">
              {emphasizedTitle}
            </em>
            {titleAfterEmphasis}
          </h1>

          {/* Tagline */}
          <p
            className="text-xl md:text-2xl font-medium mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
          >
            {tagline}
          </p>

          {/* Body */}
          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            {body}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button href={primaryHref} variant="primary" size="lg">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </div>
          {scrollLabel ? (
            <p
              className="mt-8 text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: "#8F7AA8", fontFamily: "var(--font-inter)" }}
            >
              {scrollLabel}
            </p>
          ) : null}
        </div>
      </Container>

    </section>
  );
}
