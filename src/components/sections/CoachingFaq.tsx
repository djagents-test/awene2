"use client";

import { useState } from "react";

type CoachingFaqItem = {
  question: string;
  answer: string;
};

type CoachingFaqProps = {
  items: CoachingFaqItem[];
};

export default function CoachingFaq({ items }: CoachingFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t" style={{ borderColor: "#E8DFF0" }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="border-b"
            style={{ borderColor: "#E8DFF0" }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="text-base font-semibold leading-snug"
                style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
              >
                {item.question}
              </span>
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg transition-transform duration-200"
                style={{
                  background: isOpen ? "#6F3FD6" : "#F3ECFB",
                  color: isOpen ? "#FFFFFF" : "#6E6478",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-5">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
