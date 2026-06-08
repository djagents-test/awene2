import type { Metadata } from "next";
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
    "Write to us for a question, a collaboration, or a first conversation about your support journey.",
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

async function submitContact(formData: FormData) {
  "use server";

  const body = {
    first_name: String(formData.get("first_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    website: String(formData.get("website") ?? ""),
    locale: "en",
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
      redirect("/en/contact?error=1");
    }

    redirect("/en/thank-you");
  } catch {
    redirect("/en/contact?error=1");
  }
}

const cards = [
  {
    title: "For support journeys",
    desc: "Describe your situation here directly to receive a response adapted to your context.",
    color: "#6F3FD6",
  },
  {
    title: "For employers",
    desc: "Do you represent an organization and want to integrate menopause wellbeing into your HR approach?",
    color: "#F68B2C",
  },
  {
    title: "For media",
    desc: "Interview, podcast, editorial collaboration: I am open to serious, thoughtful exchanges.",
    color: "#4B1F7A",
  },
] as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ training?: string; subject?: string; error?: string }>;
}) {
  const { training, subject, error } = await searchParams;
  const message = training ? `Hello, I would like to receive information about the training: ${training}.` : "";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/en/contact",
          title: "Contact | AWENE",
          description:
            "Write to us for a question, a collaboration, or a first conversation about your support journey.",
          type: "ContactPage",
          inLanguage: "en",
        })}
      />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Get in touch
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              I am here.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              A question, a hesitation, a first step: every reason is a good reason to write.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Every conversation starts somewhere
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Whether you want to know more about support, ask a question, or simply say hello, I read every message personally.
                </p>
              </div>
              <div className="space-y-5">
                {cards.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#E8DFF0] p-5" style={{ background: "#FCFAF8" }}>
                    <h3 className="mb-2 font-semibold" style={{ color: item.color, fontFamily: "var(--font-inter)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-[#E8DFF0] p-6 shadow-[0_4px_32px_rgba(110,63,214,0.06)] md:p-8" style={{ background: "white" }}>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Book a discovery call
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Choose your time slot directly for a first 30-minute conversation, free of charge and without commitment.
                </p>
                <div className="mt-6">
                  <Button href={CALENDLY_BOOKING_URL}>Book a call</Button>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8DFF0] p-8 shadow-[0_4px_32px_rgba(110,63,214,0.06)] md:p-10" style={{ background: "white" }}>
                <h2 className="mb-2 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Prefer to write first?
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  Write to me.
                </p>
                {error ? (
                  <p className="mb-4 rounded-2xl border border-[#F5D4D4] bg-[#FFF6F6] px-4 py-3 text-sm" style={{ color: "#9C3D3D", fontFamily: "var(--font-inter)" }}>
                    The message could not be sent.
                  </p>
                ) : null}
                <form action={submitContact} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold" htmlFor="first_name" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                        First name <span style={{ color: "#F68B2C" }}>*</span>
                      </label>
                      <input id="first_name" name="first_name" required placeholder="Marie" className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold" htmlFor="email" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                        Email <span style={{ color: "#F68B2C" }}>*</span>
                      </label>
                      <input id="email" name="email" type="email" required placeholder="marie@example.com" className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold" htmlFor="subject" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                      Subject
                    </label>
                    <select id="subject" name="subject" defaultValue={subject ?? ""} className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }}>
                      <option value="">Choose a subject...</option>
                      <option value="AWENE training">AWENE training</option>
                      <option value="Custom training">Custom training</option>
                      <option value="Question about support">Question about support</option>
                      <option value="Employer collaboration">Employer collaboration</option>
                      <option value="Media request">Media request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold" htmlFor="message" style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}>
                      Message <span style={{ color: "#F68B2C" }}>*</span>
                    </label>
                    <textarea id="message" name="message" required defaultValue={message} placeholder="What would you like to share?" rows={6} className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:border-[#6F3FD6]" style={{ borderColor: "#E8DFF0", color: "#2E2438", background: "#FCFAF8", fontFamily: "var(--font-inter)" }} />
                  </div>
                  <div className="hidden">
                    <label className="sr-only" htmlFor="website">
                      Website
                    </label>
                    <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" style={{ fontFamily: "var(--font-inter)", background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)", color: "#fff" }}>
                    Send my message
                  </button>
                </form>
                <p className="mt-6 text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  I reply personally within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
