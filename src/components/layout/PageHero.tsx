import { type ReactNode } from "react";
import Container from "@/components/ui/Container";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";
import EditorialImageBlock from "@/components/ui/EditorialImageBlock";
import type { EditorialImagePlacement } from "@/lib/editorialImageReferences";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  titleSize?: "sm" | "md";
  contentClassName?: string;
  blobs?: boolean;
  children?: ReactNode;
  visual?: boolean;
  visualVariant?:
    | "hero"
    | "portrait"
    | "nervous-system"
    | "movement"
    | "hormonal-rhythm"
    | "breathing"
    | "nature"
    | "card";
  visualTone?: "plum" | "violet" | "apricot" | "mixed";
  visualPlacement?: EditorialImagePlacement;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  titleSize = "md",
  contentClassName = "max-w-3xl",
  blobs = false,
  children,
  visual = false,
  visualVariant = "hero",
  visualTone = "mixed",
  visualPlacement,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FCFAF8" }}
    >
      {blobs && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
          />
        </div>
      )}
      <Container className="relative z-10 pt-32 pb-20">
        <div className={`grid items-center gap-10 lg:gap-14 ${visual ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.78fr)]" : "grid-cols-1"}`}>
          <div className={contentClassName}>
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              {eyebrow}
            </p>
            <h1
              className={`${titleSize === "sm" ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl"} mb-8 font-bold leading-[1.08]`}
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="max-w-2xl text-lg leading-relaxed md:text-xl"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {visual && (
            <div className="lg:justify-self-end">
              {visualPlacement ? (
                <EditorialImageBlock
                  placement={visualPlacement}
                  variant={visualVariant}
                  tone={visualTone}
                  className="aspect-[4/4.5] w-full max-w-[31rem]"
                />
              ) : (
                <PlaceholderVisual
                  variant={visualVariant}
                  tone={visualTone}
                  className="aspect-[4/4.5] w-full max-w-[31rem]"
                />
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
