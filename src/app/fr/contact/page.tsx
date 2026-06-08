import type { Metadata } from "next";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact | AWENE",
  description:
    "Écrivez-nous pour une question, une collaboration ou un premier échange autour de votre accompagnement.",
};

async function contactApiUrl() {
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const forwardedHost = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (forwardedHost) {
    const protocol = forwardedProto ?? (forwardedHost.includes("localhost") ? "http" : "https");
    return `${protocol}://${forwardedHost}/api/contact-submissions`;
  }

  return `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/contact-submissions`;
}

function buildErrorRedirect(message?: string) {
  const params = new URLSearchParams({ erreur: "1" });

  if (message) {
    params.set("message", message);
  }

  return `/fr/contact?${params.toString()}`;
}

async function submitContact(formData: FormData) {
  "use server";

  const body = {
    first_name: String(formData.get("prenom") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("sujet") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    website: String(formData.get("website") ?? ""),
    locale: "fr",
    source_page: "contact",
  };

  try {
    const response = await fetch(await contactApiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const message =
        payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
          ? payload.message
          : "Le message n'a pas pu être envoyé.";
      redirect(buildErrorRedirect(message));
    }

    redirect("/fr/merci");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    redirect(buildErrorRedirect("Le message n'a pas pu être envoyé."));
  }
}

const cards = [
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
    desc: "Interview, podcast, collaboration éditoriale, je suis ouverte aux échanges traités avec sérieux.",
    color: "#4B1F7A",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ formation?: string; sujet?: string; erreur?: string; message?: string }>;
}) {
  const { formation, sujet, erreur, message: errorMessage } = await searchParams;
  const message = formation
    ? `Bonjour, je souhaite recevoir des informations sur la formation : ${formation}.`
    : "";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/fr/contact",
          title: "Contact | AWENE",
          description:
            "Écrivez-nous pour une question, une collaboration ou un premier échange autour de votre accompagnement.",
          type: "ContactPage",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Prendre contact
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Je suis là.
            </h1>
            <p
              className="max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Une question, une hésitation, un premier pas, toutes les raisons sont bonnes pour écrire.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2
                  className="mb-4 text-3xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  Une conversation commence toujours quelque part
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Que vous souhaitiez en savoir plus sur les accompagnements, poser une question ou simplement dire bonjour, je lis chaque message personnellement.
                </p>
              </div>
              <div className="space-y-5">
                {cards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#E8DFF0] p-5"
                    style={{ background: "#FCFAF8" }}
                  >
                    <h3
                      className="mb-2 font-semibold"
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

            <div className="space-y-8">
              <div
                className="rounded-3xl border border-[#E8DFF0] p-6 shadow-[0_4px_32px_rgba(110,63,214,0.06)] md:p-8"
                style={{ background: "white" }}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  Réserver un appel découverte
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Choisissez directement votre créneau pour un premier échange de 30 minutes, gratuit et sans engagement.
                </p>
                <div className="mt-6">
                  <Button href={CALENDLY_BOOKING_URL}>Ouvrir Calendly</Button>
                </div>
              </div>

              <div
                className="rounded-3xl border border-[#E8DFF0] p-8 shadow-[0_4px_32px_rgba(110,63,214,0.06)] md:p-10"
                style={{ background: "white" }}
              >
                <h2
                  className="mb-2 text-2xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  Vous préférez écrire d&apos;abord ?
                </h2>
                <p
                  className="mb-6 text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Écrivez-moi.
                </p>
                {erreur ? (
                  <p
                    className="mb-4 rounded-2xl border border-[#F5D4D4] bg-[#FFF6F6] px-4 py-3 text-sm"
                    style={{ color: "#9C3D3D", fontFamily: "var(--font-inter)" }}
                  >
                    {errorMessage || "Le message n'a pas pu être envoyé."}
                  </p>
                ) : null}
                <form action={submitContact} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-2 block text-sm font-semibold"
                        htmlFor="prenom"
                        style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                      >
                        Prénom <span style={{ color: "#F68B2C" }}>*</span>
                      </label>
                      <input id="prenom" name="prenom" required placeholder="Marie" className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                    </div>
                    <div>
                      <label
                        className="mb-2 block text-sm font-semibold"
                        htmlFor="email"
                        style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                      >
                        Email <span style={{ color: "#F68B2C" }}>*</span>
                      </label>
                      <input id="email" name="email" type="email" required placeholder="marie@exemple.com" className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="sujet"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      Sujet
                    </label>
                    <select id="sujet" name="sujet" defaultValue={sujet ?? ""} className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }}>
                      <option value="">Choisir un sujet...</option>
                      <option value="Formation AWENE">Formation AWENE</option>
                      <option value="Formation sur mesure">Formation sur mesure</option>
                      <option value="Question sur les accompagnements">Question sur les accompagnements</option>
                      <option value="Collaboration entreprise">Collaboration entreprise</option>
                      <option value="Demande médias">Demande médias</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="message"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      Message <span style={{ color: "#F68B2C" }}>*</span>
                    </label>
                    <textarea id="message" name="message" required defaultValue={message} placeholder="Ce que vous souhaitez partager..." rows={6} className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                  </div>
                  <div className="hidden">
                    <label className="sr-only" htmlFor="website">
                      Website
                    </label>
                    <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      fontFamily: "var(--font-inter)",
                      background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
                      color: "#fff",
                    }}
                  >
                    Envoyer mon message
                  </button>
                </form>
                <p
                  className="mt-6 text-sm"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Je réponds personnellement sous 48h.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
