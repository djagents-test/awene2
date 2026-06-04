import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et mentions légales d'AWENE.",
};

const sections = [
  {
    title: "1. Responsable du traitement",
    body: "AWENE est responsable du traitement des données personnelles collectées via ce site. Pour toute question, vous pouvez nous contacter via le formulaire de contact.",
  },
  {
    title: "2. Données collectées",
    body: "Nous collectons uniquement les données nécessaires à nos services : nom, prénom, adresse email, et les informations que vous partagez volontairement dans nos formulaires. Ces données sont utilisées pour vous contacter suite à une demande d'accompagnement ou une inscription à notre liste de diffusion.",
  },
  {
    title: "3. Utilisation des données",
    body: "Vos données sont utilisées exclusivement pour répondre à vos demandes, vous envoyer des informations relatives au mouvement AWENE si vous y avez consenti, et gérer la relation d'accompagnement. Nous ne vendons ni ne louons vos données à des tiers.",
  },
  {
    title: "4. Cookies",
    body: "Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement.",
  },
  {
    title: "5. Conservation des données",
    body: "Vos données sont conservées le temps nécessaire à la gestion de la relation, puis supprimées ou anonymisées. Vous pouvez demander leur suppression à tout moment.",
  },
  {
    title: "6. Vos droits",
    body: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous via le formulaire de contact.",
  },
  {
    title: "7. Mentions légales",
    body: "AWENE, accompagnement en neuro wellness et transition ménopausique. Pour toute réclamation relative au traitement de vos données, vous pouvez saisir la CNIL.",
  },
];

export default function PolitiqueConfidentialite() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/fr/politique-de-confidentialite",
          title: "Politique de confidentialité",
          description: "Politique de confidentialité et mentions légales d'AWENE.",
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
              Légal
            </p>
            <h1
              className="mb-6 text-4xl font-bold leading-[1.08] md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Politique de confidentialité
            </h1>
            <p
              className="text-sm"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Dernière mise à jour : Avril 2024
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" size="lg">
        <Container size="md">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="mb-4 text-2xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
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
