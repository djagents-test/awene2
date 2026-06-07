"use client";

import { useState } from "react";

type Props = {
  locale: "fr" | "en";
  title: string;
  url: string;
};

export default function EventShareButtons({ locale, title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const isFr = locale === "fr";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)", background: "#fff" }}
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderColor: "#E8DFF0", color: "#2E2438", fontFamily: "var(--font-inter)", background: "#fff" }}
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderColor: copied ? "#6F3FD6" : "#E8DFF0", color: copied ? "#6F3FD6" : "#2E2438", fontFamily: "var(--font-inter)", background: "#fff" }}
      >
        {copied ? (isFr ? "Lien copié" : "Link copied") : isFr ? "Copier le lien" : "Copy link"}
      </button>
    </div>
  );
}
