"use client";

import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import Container from "@/components/ui/Container";

const steps = [
  {
    id: 1,
    title: "Your situation",
    questions: [
      { id: "first_name", label: "Your first name", type: "text", required: true, placeholder: "Marie" },
      { id: "email", label: "Your email address", type: "email", required: true, placeholder: "marie@example.com" },
      { id: "age", label: "Your age", type: "select", required: true, options: ["35-40", "41-45", "46-50", "51-55", "56-60", "60 and above"] },
    ],
  },
  {
    id: 2,
    title: "Your transition",
    questions: [
      {
        id: "phase",
        label: "Where are you in your transition?",
        type: "radio",
        required: true,
        options: [
          "Perimenopause (irregular cycles, first signs)",
          "Menopause (cycles have stopped for less than one year)",
          "Post-menopause (more than one year without cycles)",
          "I am not sure, I feel something is shifting but I have no clear diagnosis",
        ],
      },
      {
        id: "challenge",
        label: "What is your main challenge right now?",
        type: "textarea",
        required: true,
        placeholder: "Describe in a few lines what feels heaviest right now, physically, emotionally, or in daily life...",
      },
    ],
  },
  {
    id: 3,
    title: "Your intention",
    questions: [
      {
        id: "intention",
        label: "What do you hope to transform through this support?",
        type: "textarea",
        required: true,
        placeholder: "What would you like your life to feel like in 6 months? What are you moving toward?",
      },
      {
        id: "program",
        label: "Which program feels most relevant right now?",
        type: "radio",
        required: false,
        options: [
          "Bloom, 3 months, to begin",
          "Rise, 6 months, to go deeper",
          "Metamorphosis, 12 months, to transform everything",
          "I do not know yet, I would like your recommendation",
        ],
      },
      {
        id: "message",
        label: "A final word, question, or free message",
        type: "textarea",
        required: false,
        placeholder: "Anything that did not fit into the previous questions...",
      },
    ],
  },
] as const;

export default function ApplicationFormPage() {
  notFound();

  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const router = useRouter();

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      router.push("/en/thank-you");
    } else {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              First step
            </p>
            <h1 className="mb-8 text-4xl font-bold leading-[1.08] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Application form
            </h1>
            <p className="mb-4 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              This form is not a test. It is an invitation to pause, reflect on your situation, and share what brings you here.
            </p>
            <p className="text-sm italic" style={{ color: "#6E6478", fontFamily: "var(--font-playfair)" }}>
              All your answers are confidential. They are only used to prepare our first conversation.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20" style={{ background: "#FCFAF8" }}>
        <Container size="sm">
          <div className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium" style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}>
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#E8DFF0" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, background: "linear-gradient(90deg, #6F3FD6, #F68B2C)" }} />
            </div>
          </div>

          <div className="rounded-3xl border border-[#E8DFF0] bg-white p-8 shadow-[0_4px_32px_rgba(110,63,214,0.06)] md:p-12">
            <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              {step.title}
            </h2>

            <div className="space-y-8">
              {step.questions.map((q) => (
                <div key={q.id}>
                  <label htmlFor={q.id} className="mb-3 block text-sm font-semibold" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                    {q.label}
                    {q.required ? <span style={{ color: "#F68B2C" }}> *</span> : null}
                  </label>

                  {q.type === "text" || q.type === "email" ? (
                    <input
                      id={q.id}
                      type={q.type}
                      value={values[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      required={q.required}
                      className="w-full rounded-xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }}
                    />
                  ) : q.type === "select" ? (
                    <select
                      id={q.id}
                      value={values[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required={q.required}
                      className="w-full cursor-pointer appearance-none rounded-xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:border-[#6F3FD6]"
                      style={{ borderColor: "#E8DFF0", color: values[q.id] ? "#2E2438" : "#6E6478", background: "#FCFAF8", fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">Select...</option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : q.type === "radio" ? (
                    <div className="space-y-3">
                      {q.options?.map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all duration-200 hover:border-[#6F3FD6]" style={{ borderColor: values[q.id] === opt ? "#6F3FD6" : "#E8DFF0", background: values[q.id] === opt ? "#F3ECFB" : "#FCFAF8" }}>
                          <input type="radio" name={q.id} value={opt} checked={values[q.id] === opt} onChange={() => handleChange(q.id, opt)} className="mt-1 flex-shrink-0 accent-[#6F3FD6]" />
                          <span className="text-sm leading-relaxed" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      id={q.id}
                      value={values[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      required={q.required}
                      rows={4}
                      className="w-full resize-none rounded-xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)", lineHeight: "1.6" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-[#E8DFF0] pt-8">
              {currentStep > 0 ? (
                <button onClick={handleBack} className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#6F3FD6]" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              <button onClick={handleNext} className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", fontFamily: "var(--font-inter)" }}>
                {isLast ? "Submit my application" : "Continue"}
                {!isLast ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
