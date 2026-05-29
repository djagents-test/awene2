"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "Est-ce que cet accompagnement remplace mon médecin ou mon gynécologue ?",
    answer: "Non. Il travaille en complémentarité avec votre suivi médical. Je ne diagnostique pas, je ne prescris pas.",
  },
  {
    question: "Est-ce adapté si je ne prends pas de traitement hormonal ?",
    answer: "Oui. Mon approche est indépendante du traitement médical que vous suivez ou non.",
  },
  {
    question: "Est-ce que vous travaillez avec des femmes hors de Tunisie ?",
    answer: "Oui. Les séances se font en ligne. J'accompagne des femmes dans toute la région MENA, Tunisie, Maroc, Algérie, et au-delà, y compris la diaspora en France et en Europe.",
  },
  {
    question: "Comment se passe le premier appel ?",
    answer: "C'est une conversation de 30 minutes. Pas un entretien de vente. Pas un diagnostic. Une écoute.",
  },
  {
    question: "Est-ce que l'accompagnement est personnalisé ?",
    answer: "Entièrement. Il n'y a pas de programme standard. Chaque parcours est construit à partir de vos symptômes, vos priorités et votre réalité de vie.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? "#6F3FD6" : "#E8DFF0",
        background: open ? "#F3ECFB" : "#fff",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold leading-snug"
          style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-transform duration-200"
          style={{
            background: open ? "#6F3FD6" : "#E8DFF0",
            color: open ? "#fff" : "#6E6478",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-7 pb-6">
          <p
            className="text-base leading-relaxed"
            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CoachingFAQ() {
  return (
    <section className="py-20 md:py-28" style={{ background: "#fff" }}>
      <Container size="md">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-center"
          style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
        >
          Vos questions
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
        >
          Foire aux questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Container>
    </section>
  );
}
