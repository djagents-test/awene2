import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy and legal information for AWENE.",
};

const sections = [
  {
    title: "1. Data controller",
    body: "AWENE is responsible for the personal data collected through this website. For any question, you can contact us through the contact form.",
  },
  {
    title: "2. Data collected",
    body: "We collect only the data necessary for our services: name, first name, email address, and the information you voluntarily share in our forms. This data is used to contact you after a support request or a newsletter subscription.",
  },
  {
    title: "3. Use of data",
    body: "Your data is used exclusively to answer your requests, send you information related to the AWENE movement if you have agreed to receive it, and manage the support relationship. We do not sell or rent your data to third parties.",
  },
  {
    title: "4. Cookies",
    body: "This website uses technical cookies necessary for its operation. No advertising cookies or third-party tracking cookies are placed without your consent.",
  },
  {
    title: "5. Data retention",
    body: "Your data is kept for the time necessary to manage the relationship, then deleted or anonymized. You can request its deletion at any time.",
  },
  {
    title: "6. Your rights",
    body: "In accordance with GDPR, you have the right to access, correct, erase, and transfer your data. To exercise these rights, contact us through the contact form.",
  },
  {
    title: "7. Legal notice",
    body: "AWENE, support in neuro wellness and the menopausal transition. For any complaint related to the processing of your data, you may contact the competent data protection authority in your jurisdiction.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/en/privacy-policy", title: "Privacy policy", description: "Privacy policy and legal information for AWENE.", inLanguage: "en" })} />
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Legal
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-[1.08] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Privacy policy
            </h1>
            <p className="text-sm" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Last updated: April 2024
            </p>
          </div>
        </Container>
      </section>
      <Section background="white" size="lg">
        <Container size="md">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
