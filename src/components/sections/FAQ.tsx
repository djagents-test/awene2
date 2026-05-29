"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

type Faq = {
  question: string;
  answer: string;
};

type FAQProps = {
  eyebrow?: string;
  title?: string;
  faqs?: Faq[];
};

const defaultFaqs: Faq[] = [
  {
    question: "Est-ce que vous travaillez uniquement avec des femmes en Tunisie ?",
    answer:
      "Non. Les séances se font en ligne. J'accompagne des femmes dans toute la région Afrique et Moyen Orient, Tunisie, Maroc, Algérie, et au-delà, y compris la diaspora en France et en Europe. Les séances peuvent se tenir en arabe, en français ou en anglais.",
  },
  {
    question: "Est-ce que c'est adapté si je ne prends pas de traitement hormonal ?",
    answer:
      "Oui. Mon approche intègre tous les aspects de votre santé et bien-être, y compris la prise d'un traitement médical. Que vous soyez sous traitement hormonal ou non, l'accompagnement s'adapte à votre situation.",
  },
  {
    question: "Quelle est la différence entre AWENE et un suivi médical classique ?",
    answer:
      "Je ne diagnostique pas et je ne prescris pas. J'accompagne là où la consultation s'arrête, dans le quotidien, les habitudes, la durée.",
  },
  {
    question: "Comment fonctionne le premier appel ?",
    answer:
      "C'est une conversation de 30 minutes. Gratuite. Pour comprendre ce que vous vivez, vos symptômes, votre contexte, vos priorités, et voir si mon accompagnement vous correspond.",
  },
];

export default function FAQ({
  eyebrow = "Vos questions",
  title = "Foire aux questions",
  faqs = defaultFaqs,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28" style={{ background: "#FCFAF8" }}>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.64fr)_minmax(250px,0.36fr)]">
          <div>
            <p
              className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] lg:text-left"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {eyebrow}
            </p>
            <h2
              className="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl lg:text-left"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {title}
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border transition-all duration-200"
                  style={{
                    borderColor: openIndex === index ? "#6F3FD6" : "#E8DFF0",
                    background: openIndex === index ? "#F3ECFB" : "#fff",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-base font-semibold leading-snug"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm transition-transform duration-200"
                      style={{
                        background: openIndex === index ? "#6F3FD6" : "#E8DFF0",
                        color: openIndex === index ? "#fff" : "#6E6478",
                        transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openIndex === index && (
                    <div
                      className="px-7 pb-6"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      <p className="text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block aspect-[0.92/1.15] w-full overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/faq-side-accent.jpg"
              alt="Portrait emotionnel d une femme dans une ambiance intime"
              fill
              className="object-cover object-[58%_center]"
              sizes="(min-width: 1024px) 24rem, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
