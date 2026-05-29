import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className = "",
  size = "xl",
}: ContainerProps) {
  return (
    <div
      className={`${sizeMap[size]} mx-auto px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
