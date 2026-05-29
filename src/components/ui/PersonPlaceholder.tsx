type PersonPlaceholderProps = {
  label?: string;
  aspectRatio?: string;
  className?: string;
};

export default function PersonPlaceholder({
  label = "Photo à venir",
  aspectRatio = "3 / 4",
  className = "",
}: PersonPlaceholderProps) {
  return (
    <div
      style={{ aspectRatio, background: "#E8E4F0" }}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-[1.75rem] text-center ${className}`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="24" cy="16" r="10" fill="#C4B5E8" />
        <ellipse cx="24" cy="38" rx="16" ry="10" fill="#C4B5E8" />
      </svg>
      <span
        className="text-sm font-medium"
        style={{ color: "#9B89C4", fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
    </div>
  );
}
