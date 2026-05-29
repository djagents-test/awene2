import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleItalic?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleItalic,
  light,
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{
            color: light ? "rgba(243,236,251,0.7)" : "#F68B2C",
            fontFamily: "var(--font-inter)",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${titleItalic ? "font-medium italic" : "font-bold"}`}
        style={{
          fontFamily: "var(--font-playfair)",
          color: light ? "#F3ECFB" : "#2E2438",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base md:text-lg leading-relaxed"
          style={{
            color: light ? "rgba(243,236,251,0.65)" : "#6E6478",
            fontFamily: "var(--font-inter)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
