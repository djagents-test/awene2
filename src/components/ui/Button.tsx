import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4.5 text-base",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
    color: "#fff",
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "#6F3FD6",
    border: "1.5px solid #6F3FD6",
  },
  outline: {
    background: "transparent",
    color: "#2E2438",
    border: "1.5px solid #E8DFF0",
  },
  ghost: {
    background: "transparent",
    color: "#6F3FD6",
    border: "none",
  },
  light: {
    background: "rgba(255,255,255,0.12)",
    color: "#FFFFFF",
    border: "1.5px solid rgba(255,255,255,0.45)",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
  fullWidth,
  external,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none`;
  const classes = `${base} ${sizeMap[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = children;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          style={{ fontFamily: "var(--font-inter)", ...variantStyles[variant] }}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        style={{ fontFamily: "var(--font-inter)", ...variantStyles[variant] }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={{ fontFamily: "var(--font-inter)", ...variantStyles[variant] }}
    >
      {content}
    </button>
  );
}
