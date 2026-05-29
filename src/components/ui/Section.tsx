import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "lavender" | "blush" | "offwhite" | "deep" | "transparent";
  size?: "sm" | "md" | "lg" | "xl";
  id?: string;
  as?: "section" | "div" | "article";
}

const bgMap = {
  white: "rgba(255,255,255,0.72)",
  lavender: "rgba(243,236,251,0.68)",
  blush: "rgba(248,238,245,0.7)",
  offwhite: "rgba(252,250,248,0.76)",
  deep: "linear-gradient(160deg, #2E1A4A 0%, #1C0F2E 100%)",
  transparent: "transparent",
};

const sizeMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

export default function Section({
  children,
  className = "",
  background = "offwhite",
  size = "md",
  id,
  as: Tag = "section",
}: SectionProps) {
  const bg = bgMap[background];
  const isGradient = bg.startsWith("linear");

  return (
    <Tag
      id={id}
      className={`${sizeMap[size]} ${className}`}
      style={
        isGradient
          ? { background: bg }
          : {
              backgroundColor: bg,
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }
      }
    >
      {children}
    </Tag>
  );
}
