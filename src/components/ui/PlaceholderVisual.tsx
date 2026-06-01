type PlaceholderVisualProps = {
  className?: string;
  variant?:
    | "hero"
    | "portrait"
    | "nervous-system"
    | "movement"
    | "hormonal-rhythm"
    | "breathing"
    | "nature"
    | "card";
  tone?: "plum" | "violet" | "apricot" | "mixed";
  rounded?: "xl" | "2xl" | "3xl" | "full";
};

const toneMap = {
  plum: {
    base: "linear-gradient(160deg, rgba(46,26,74,0.96) 0%, rgba(75,31,122,0.92) 48%, rgba(111,63,214,0.88) 100%)",
    accentA: "rgba(243,236,251,0.32)",
    accentB: "rgba(246,139,44,0.22)",
    accentC: "rgba(255,255,255,0.16)",
    line: "rgba(243,236,251,0.34)",
  },
  violet: {
    base: "linear-gradient(155deg, rgba(243,236,251,0.92) 0%, rgba(208,190,246,0.95) 42%, rgba(111,63,214,0.82) 100%)",
    accentA: "rgba(255,255,255,0.38)",
    accentB: "rgba(246,139,44,0.2)",
    accentC: "rgba(75,31,122,0.14)",
    line: "rgba(75,31,122,0.24)",
  },
  apricot: {
    base: "linear-gradient(155deg, rgba(252,250,248,0.96) 0%, rgba(254,243,232,0.95) 45%, rgba(246,139,44,0.78) 100%)",
    accentA: "rgba(255,255,255,0.48)",
    accentB: "rgba(111,63,214,0.16)",
    accentC: "rgba(75,31,122,0.12)",
    line: "rgba(75,31,122,0.18)",
  },
  mixed: {
    base: "linear-gradient(145deg, rgba(252,250,248,0.98) 0%, rgba(243,236,251,0.96) 36%, rgba(248,238,245,0.96) 68%, rgba(254,243,232,0.94) 100%)",
    accentA: "rgba(255,255,255,0.42)",
    accentB: "rgba(246,139,44,0.18)",
    accentC: "rgba(111,63,214,0.14)",
    line: "rgba(75,31,122,0.18)",
  },
} as const;

const roundedMap = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

function variantMarkup(
  variant: NonNullable<PlaceholderVisualProps["variant"]>,
  colors: (typeof toneMap)[keyof typeof toneMap],
) {
  switch (variant) {
    case "portrait":
      return (
        <>
          <div
            className="absolute inset-x-[18%] bottom-[8%] top-[10%] rounded-[2rem]"
            style={{
              background:
                "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 18%, transparent 19%), radial-gradient(circle at 50% 38%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 24%, transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute left-[50%] top-[17%] h-[20%] w-[20%] -translate-x-1/2 rounded-full"
            style={{ background: colors.accentA }}
          />
          <div
            className="absolute left-[50%] top-[34%] h-[42%] w-[46%] -translate-x-1/2 rounded-[46%_46%_34%_34%/36%_36%_26%_26%]"
            style={{ background: colors.accentC }}
          />
          <div
            className="absolute inset-x-[16%] bottom-[11%] h-px"
            style={{ background: colors.line }}
          />
        </>
      );
    case "nervous-system":
      return (
        <>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="absolute left-[10%] right-[10%] rounded-full"
              style={{
                top: `${22 + index * 18}%`,
                height: "24%",
                border: `1.5px solid ${colors.line}`,
                transform: `rotate(${index % 2 === 0 ? -8 : 6}deg)`,
              }}
            />
          ))}
          <div
            className="absolute left-[46%] top-[14%] h-[68%] w-px"
            style={{ background: colors.line }}
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <span
              key={index}
              className="absolute h-3 w-3 rounded-full"
              style={{
                left: `${24 + index * 13}%`,
                top: `${24 + (index % 2) * 24}%`,
                background: index % 2 === 0 ? colors.accentB : colors.accentA,
              }}
            />
          ))}
        </>
      );
    case "movement":
      return (
        <>
          <div
            className="absolute left-[8%] top-[12%] h-[62%] w-[62%] rounded-full"
            style={{ border: `1.5px solid ${colors.line}` }}
          />
          <div
            className="absolute right-[8%] bottom-[10%] h-[52%] w-[52%] rounded-full"
            style={{ border: `1.5px solid ${colors.line}` }}
          />
          <div
            className="absolute left-[26%] top-[18%] h-[46%] w-[46%] rounded-full"
            style={{ background: colors.accentA }}
          />
          <div
            className="absolute left-[44%] top-[40%] h-[30%] w-[30%] rounded-full"
            style={{ background: colors.accentB }}
          />
        </>
      );
    case "hormonal-rhythm":
      return (
        <>
          <div
            className="absolute inset-x-[8%] top-[50%] h-px -translate-y-1/2"
            style={{ background: colors.line }}
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${10 + index * 16}%`,
                top: `${20 + ((index + 1) % 3) * 16}%`,
                width: `${index % 2 === 0 ? 16 : 12}%`,
                height: `${index % 2 === 0 ? 16 : 12}%`,
                background: index % 2 === 0 ? colors.accentA : colors.accentB,
              }}
            />
          ))}
          <div
            className="absolute inset-x-[16%] bottom-[16%] h-[22%] rounded-full"
            style={{ border: `1.5px solid ${colors.line}` }}
          />
        </>
      );
    case "breathing":
      return (
        <>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                inset: `${12 + index * 8}%`,
                border: `1.5px solid ${index % 2 === 0 ? colors.line : colors.accentA}`,
              }}
            />
          ))}
          <div
            className="absolute inset-[34%] rounded-full"
            style={{ background: colors.accentB }}
          />
        </>
      );
    case "nature":
      return (
        <>
          <div
            className="absolute left-[12%] top-[18%] h-[62%] w-[28%] rounded-[50%_50%_40%_40%/60%_60%_30%_30%]"
            style={{ background: colors.accentA, transform: "rotate(-12deg)" }}
          />
          <div
            className="absolute left-[42%] top-[12%] h-[70%] w-[24%] rounded-[50%_50%_40%_40%/60%_60%_30%_30%]"
            style={{ background: colors.accentC, transform: "rotate(10deg)" }}
          />
          <div
            className="absolute right-[12%] top-[24%] h-[54%] w-[22%] rounded-[50%_50%_40%_40%/60%_60%_30%_30%]"
            style={{ background: colors.accentB, transform: "rotate(18deg)" }}
          />
        </>
      );
    case "card":
      return (
        <>
          <div
            className="absolute left-[8%] right-[8%] top-[14%] h-[26%] rounded-[1.8rem]"
            style={{ background: colors.accentA }}
          />
          <div
            className="absolute left-[12%] right-[28%] top-[48%] h-3 rounded-full"
            style={{ background: colors.line }}
          />
          <div
            className="absolute left-[12%] right-[18%] top-[58%] h-3 rounded-full"
            style={{ background: colors.line }}
          />
          <div
            className="absolute left-[12%] bottom-[14%] h-12 w-12 rounded-full"
            style={{ background: colors.accentB }}
          />
        </>
      );
    case "hero":
    default:
      return (
        <>
          <div
            className="absolute -right-[8%] top-[8%] h-[52%] w-[52%] rounded-full"
            style={{ background: colors.accentA }}
          />
          <div
            className="absolute left-[10%] top-[12%] h-[38%] w-[38%] rounded-full"
            style={{ background: colors.accentB }}
          />
          <div
            className="absolute left-[22%] top-[32%] h-[40%] w-[46%] rounded-[44%_56%_54%_46%/44%_40%_60%_56%]"
            style={{ background: colors.accentC }}
          />
          <div
            className="absolute right-[16%] bottom-[14%] h-[22%] w-[34%] rounded-full"
            style={{ border: `1.5px solid ${colors.line}` }}
          />
          <div
            className="absolute left-[18%] right-[18%] bottom-[16%] h-px"
            style={{ background: colors.line }}
          />
        </>
      );
  }
}

export default function PlaceholderVisual({
  className = "",
  variant = "hero",
  tone = "mixed",
  rounded = "3xl",
}: PlaceholderVisualProps) {
  const colors = toneMap[tone];

  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden border border-[rgba(232,223,240,0.9)] shadow-[0_18px_60px_rgba(75,31,122,0.08)] ${roundedMap[rounded]} ${className}`}
      style={{ background: colors.base }}
    >
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 36%, rgba(46,26,74,0.06) 100%)",
        }}
      />
      {variantMarkup(variant, colors)}
    </div>
  );
}
