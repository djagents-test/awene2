"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PageHero from "@/components/layout/PageHero";
import { localizedPath, type Locale } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sideTitle: string;
  sideBody: string;
  cards: { title: string; desc: string; color: string }[];
  formTitle: string;
  firstName: string;
  email: string;
  subject: string;
  message: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  subjectOptions: string[];
  submit: string;
  submitting: string;
  footerNote: string;
  genericError: string;
};

const copyByLocale: Record<"fr" | "en", Copy> = {
  fr: {
    eyebrow: "Prendre contact",
    title: "Je suis là",
    subtitle: "Une question, une hésitation, un premier pas, toutes les raisons sont bonnes pour écrire.",
    sideTitle: "Une conversation commence toujours quelque part",
    sideBody:
      "Que vous souhaitiez en savoir plus sur les accompagnements, poser une question, ou simplement dire bonjour, je lis chaque message personnellement.",
    cards: [
      {
        title: "Pour les accompagnements",
        desc: "Décrivez votre situation directement ici pour une réponse adaptée à votre contexte.",
        color: "#6F3FD6",
      },
      {
        title: "Pour les entreprises",
        desc: "Vous représentez une entreprise et souhaitez intégrer le bien-être ménopause dans votre politique RH ?",
        color: "#F68B2C",
      },
      {
        title: "Pour les médias",
        desc: "Interview, podcast, collaboration éditoriale, je suis ouverte aux échanges avec les médias qui traitent ces sujets avec sérieux.",
        color: "#4B1F7A",
      },
    ],
    formTitle: "Écrivez-moi",
    firstName: "Prénom",
    email: "Email",
    subject: "Sujet",
    message: "Message",
    subjectPlaceholder: "Choisir un sujet...",
    messagePlaceholder: "Ce que vous souhaitez partager...",
    subjectOptions: [
      "Formation AWENE",
      "Formation sur mesure",
      "Question sur les accompagnements",
      "Collaboration entreprise",
      "Demande médias",
      "Autre",
    ],
    submit: "Envoyer mon message",
    submitting: "Envoi en cours...",
    footerNote: "Je réponds personnellement sous 48h.",
    genericError: "Le message n'a pas pu être envoyé.",
  },
  en: {
    eyebrow: "Get in touch",
    title: "I’m here",
    subtitle: "A question, a hesitation, a first step, every reason is a valid reason to write.",
    sideTitle: "Every conversation starts somewhere",
    sideBody:
      "Whether you want to learn more about support, ask a question, or simply say hello, I read every message personally.",
    cards: [
      {
        title: "For coaching support",
        desc: "Describe your situation here directly so I can reply with something relevant to your context.",
        color: "#6F3FD6",
      },
      {
        title: "For companies",
        desc: "If you represent a company and want to integrate menopause wellbeing into your HR approach, write to me here.",
        color: "#F68B2C",
      },
      {
        title: "For media",
        desc: "Interviews, podcasts, editorial collaborations, I’m open to serious conversations with media outlets covering these topics well.",
        color: "#4B1F7A",
      },
    ],
    formTitle: "Write to me",
    firstName: "First name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    subjectPlaceholder: "Choose a subject...",
    messagePlaceholder: "What would you like to share?",
    subjectOptions: [
      "AWENE training",
      "Custom training",
      "Question about coaching support",
      "Company collaboration",
      "Media request",
      "Other",
    ],
    submit: "Send my message",
    submitting: "Sending...",
    footerNote: "I reply personally within 48 hours.",
    genericError: "Your message could not be sent.",
  },
};

function ContactContent({ locale }: { locale: "fr" | "en" }) {
  const copy = copyByLocale[locale];
  const searchParams = useSearchParams();
  const formationTitle = searchParams.get("formation");
  const requestedSubject = searchParams.get("sujet");
  const [values, setValues] = useState({
    prenom: "",
    email: "",
    sujet: requestedSubject ?? "",
    message:
      locale === "fr"
        ? formationTitle
          ? `Bonjour, je souhaite recevoir des informations sur la formation : ${formationTitle}.`
          : ""
        : formationTitle
          ? `Hello, I would like to receive more information about the training: ${formationTitle}.`
          : "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: values.prenom.trim(),
          email: values.email.trim(),
          subject: values.sujet.trim(),
          message: values.message.trim(),
          website: values.website,
          locale,
          source_page: locale === "en" ? "contact_en" : "contact",
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        setError(payload.message ?? copy.genericError);
        setSubmitting(false);
        return;
      }

      router.push(localizedPath("/merci", locale as Locale));
    } catch {
      setError(copy.genericError);
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <Section background="white" size="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {copy.sideTitle}
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {copy.sideBody}
                </p>
              </div>

              <div className="space-y-5">
                {copy.cards.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-2xl border border-[#E8DFF0]"
                    style={{ background: "#FCFAF8" }}
                  >
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: item.color, fontFamily: "var(--font-inter)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-8 md:p-10 rounded-3xl border border-[#E8DFF0] shadow-[0_4px_32px_rgba(110,63,214,0.06)]"
              style={{ background: "white" }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                {copy.formTitle}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {copy.firstName} <span style={{ color: "#F68B2C" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={values.prenom}
                      onChange={(e) => setValues({ ...values, prenom: e.target.value })}
                      required
                      placeholder={locale === "fr" ? "Marie" : "Emma"}
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{
                        borderColor: "#E8DFF0",
                        color: "#2E2438",
                        background: "#FCFAF8",
                        fontFamily: "var(--font-inter)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {copy.email} <span style={{ color: "#F68B2C" }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      required
                      placeholder={locale === "fr" ? "marie@mail.com" : "emma@mail.com"}
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                      style={{
                        borderColor: "#E8DFF0",
                        color: "#2E2438",
                        background: "#FCFAF8",
                        fontFamily: "var(--font-inter)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    type="text"
                    value={values.website}
                    onChange={(e) => setValues({ ...values, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    {copy.subject}
                  </label>
                  <select
                    value={values.sujet}
                    onChange={(e) => setValues({ ...values, sujet: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all focus:border-[#6F3FD6] appearance-none"
                    style={{
                      borderColor: "#E8DFF0",
                      color: values.sujet ? "#2E2438" : "#6E6478",
                      background: "#FCFAF8",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <option value="">{copy.subjectPlaceholder}</option>
                    {copy.subjectOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    {copy.message} <span style={{ color: "#F68B2C" }}>*</span>
                  </label>
                  <textarea
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    required
                    rows={5}
                    placeholder={copy.messagePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none resize-none transition-all focus:border-[#6F3FD6] focus:shadow-[0_0_0_3px_rgba(110,63,214,0.1)]"
                    style={{
                      borderColor: "#E8DFF0",
                      color: "#2E2438",
                      background: "#FCFAF8",
                      fontFamily: "var(--font-inter)",
                      lineHeight: "1.6",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {submitting ? copy.submitting : copy.submit}
                </button>
                {error ? (
                  <p
                    className="text-sm text-center"
                    style={{ color: "#C0221A", fontFamily: "var(--font-inter)" }}
                  >
                    {error}
                  </p>
                ) : null}
                <p
                  className="text-xs text-center"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {copy.footerNote}
                </p>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function ContactPage({ locale = "fr" }: { locale?: "fr" | "en" }) {
  return (
    <Suspense fallback={null}>
      <ContactContent locale={locale} />
    </Suspense>
  );
}
