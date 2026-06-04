"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    title: "Votre situation",
    questions: [
      {
        id: "prenom",
        label: "Votre prénom",
        type: "text",
        required: true,
        placeholder: "Marie",
      },
      {
        id: "email",
        label: "Votre adresse email",
        type: "email",
        required: true,
        placeholder: "marie@exemple.com",
      },
      {
        id: "age",
        label: "Votre âge",
        type: "select",
        required: true,
        options: ["35-40 ans", "41-45 ans", "46-50 ans", "51-55 ans", "56-60 ans", "60 ans et plus"],
      },
    ],
  },
  {
    id: 2,
    title: "Votre transition",
    questions: [
      {
        id: "phase",
        label: "Où en êtes-vous dans votre transition ?",
        type: "radio",
        required: true,
        options: [
          "Péri-ménopause (cycles irréguliers, premiers signes)",
          "Ménopause (arrêt des cycles depuis moins d'un an)",
          "Post-ménopause (plus d'un an sans cycles)",
          "Je ne suis pas sûre, je ressens quelque chose mais sans diagnostic clair",
        ],
      },
      {
        id: "challenge",
        label: "Quel est votre défi principal en ce moment ?",
        type: "textarea",
        required: true,
        placeholder:
          "Décrivez en quelques lignes ce qui vous pèse le plus en ce moment, physiquement, émotionnellement, dans votre quotidien...",
      },
    ],
  },
  {
    id: 3,
    title: "Votre intention",
    questions: [
      {
        id: "intention",
        label: "Qu'espérez-vous transformer grâce à cet accompagnement ?",
        type: "textarea",
        required: true,
        placeholder:
          "Qu'est-ce que vous souhaitez que soit votre vie dans 6 mois ? Dans quoi vous projetez-vous ?",
      },
      {
        id: "programme",
        label: "Quel programme vous attire le plus pour l'instant ?",
        type: "radio",
        required: false,
        options: [
          "Éclosion, 3 mois, pour commencer",
          "Essor, 6 mois, pour aller en profondeur",
          "Métamorphose, 12 mois, pour tout transformer",
          "Je ne sais pas encore, j'attends votre conseil",
        ],
      },
      {
        id: "message",
        label: "Un dernier mot, une question ou un message libre",
        type: "textarea",
        required: false,
        placeholder: "Tout ce qui n'est pas passé dans les questions précédentes...",
      },
    ],
  },
];

export default function FormulaireSelection() {
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
      router.push("/fr/merci");
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
              Première étape
            </p>
            <h1 className="mb-8 text-4xl font-bold leading-[1.08] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Formulaire de sélection
            </h1>
            <p className="mb-4 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Ce formulaire n&apos;est pas un test. C&apos;est une invitation à vous poser, à réfléchir à votre situation et à partager ce qui vous amène ici.
            </p>
            <p className="text-sm italic" style={{ color: "#6E6478", fontFamily: "var(--font-playfair)" }}>
              Toutes vos réponses sont confidentielles. Elles ne servent qu&apos;à préparer notre première conversation.
            </p>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section
        className="pb-20"
        style={{ background: "#FCFAF8" }}
      >
        <Container size="sm">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-sm font-medium"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Étape {currentStep + 1} sur {steps.length}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
              >
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "#E8DFF0" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  background: "linear-gradient(90deg, #6F3FD6, #F68B2C)",
                }}
              />
            </div>
          </div>

          {/* Step */}
          <div
            className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8DFF0] shadow-[0_4px_32px_rgba(110,63,214,0.06)]"
          >
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {step.title}
            </h2>

            <div className="space-y-8">
              {step.questions.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={q.id}
                    className="block text-sm font-semibold mb-3"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    {q.label}
                    {q.required && (
                      <span style={{ color: "#F68B2C" }}> *</span>
                    )}
                  </label>

                  {q.type === "text" || q.type === "email" ? (
                    <input
                      id={q.id}
                      type={q.type}
                      value={values[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      required={q.required}
                      className="w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{
                        borderColor: "#E8DFF0",
                        color: "#2E2438",
                        background: "#FCFAF8",
                        fontFamily: "var(--font-inter)",
                      }}
                    />
                  ) : q.type === "select" ? (
                    <select
                      id={q.id}
                      value={values[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required={q.required}
                      className="w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-[#6F3FD6] appearance-none cursor-pointer"
                      style={{
                        borderColor: "#E8DFF0",
                        color: values[q.id] ? "#2E2438" : "#6E6478",
                        background: "#FCFAF8",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      <option value="">Sélectionnez...</option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : q.type === "radio" ? (
                    <div className="space-y-3">
                      {q.options?.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-[#6F3FD6]"
                          style={{
                            borderColor:
                              values[q.id] === opt ? "#6F3FD6" : "#E8DFF0",
                            background:
                              values[q.id] === opt ? "#F3ECFB" : "#FCFAF8",
                          }}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={values[q.id] === opt}
                            onChange={() => handleChange(q.id, opt)}
                            className="mt-1 accent-[#6F3FD6] flex-shrink-0"
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                          >
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
                      className="w-full px-5 py-4 rounded-xl border text-sm outline-none resize-none transition-all duration-200 focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{
                        borderColor: "#E8DFF0",
                        color: "#2E2438",
                        background: "#FCFAF8",
                        fontFamily: "var(--font-inter)",
                        lineHeight: "1.6",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#E8DFF0]">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="text-sm font-medium flex items-center gap-2 transition-colors hover:text-[#6F3FD6]"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Retour
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {isLast ? "Envoyer ma candidature" : "Continuer"}
                {!isLast && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
