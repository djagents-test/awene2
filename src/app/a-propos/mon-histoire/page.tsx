import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mon histoire",
  description:
    "L'histoire derrière AWENE, une femme, une transition, une conviction profonde que les choses peuvent être vécues autrement.",
};

export default function MonHistoire() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/a-propos/mon-histoire",
          title: "Mon histoire",
          description:
            "L'histoire derrière AWENE, une femme, une transition, une conviction profonde que les choses peuvent être vécues autrement.",
          type: "AboutPage",
        })}
      />
      <PageHero
        eyebrow="À propos"
        title="Mon histoire"
        subtitle="Ce que je vis, ce que j'ai traversé, et pourquoi tout cela m'a conduit à créer AWENE."
        blobs
      />

      {/* Content */}
      <Section background="white" size="lg">
        <Container size="md">
          <div className="prose-custom space-y-10">
            <div
              className="p-8 md:p-10 rounded-3xl border-l-4"
              style={{ background: "#F3ECFB", borderColor: "#6F3FD6" }}
            >
              <p
                className="text-xl md:text-2xl font-medium italic leading-relaxed"
                style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
              >
                « Il y a un moment dans la vie d&apos;une femme où tout ce qu&apos;elle savait
                d&apos;elle-même commence à se transformer. Ce moment mérite un espace. »
              </p>
            </div>

            <div className="space-y-6">
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Le point de départ
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Comme beaucoup de femmes, j&apos;ai abordé la péri-ménopause sans vraiment
                savoir ce qui m&apos;attendait. On m&apos;avait parlé de chaleurs, de quelques
                inconforts. On ne m&apos;avait pas parlé du reste, cette sensation de ne plus
                se reconnaître complètement, cette énergie qui fluctue sans crier gare, ce
                cerveau qui semble tourner différemment.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                J&apos;ai cherché des réponses. Dans les livres, auprès de professionnels de
                santé, dans des groupes en ligne. J&apos;ai trouvé beaucoup d&apos;informations
                fragmentées, mais rarement un espace qui tenait compte de toute la complexité
                de ce que je vivais, corporelle, émotionnelle, cognitive, existentielle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-2xl"
                style={{ background: "#F8EEF5" }}
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#4B1F7A" }}
                >
                  La formation
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Face à ce vide, j&apos;ai choisi de me former, en coaching intégratif en
                  santé et nutrition, avec une spécialisation sur les neurosciences
                  féminines et la transition ménopausique.
                </p>
              </div>
              <div
                className="p-6 rounded-2xl"
                style={{ background: "#F3ECFB" }}
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}
                >
                  La conviction
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  Cette transition peut être traversée avec conscience, avec soutien, avec
                  une méthode. Pas pour la rendre facile, mais pour la rendre significative.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
              >
                Pourquoi AWENE est né
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                AWENE n&apos;est pas né d&apos;une ambition marketing. Il est né d&apos;une
                nécessité, celle de créer ce qui manquait. Un espace à la fois rigoureux et
                humain, fondé sur la science mais nourri d&apos;une compréhension profonde de
                ce que traversent les femmes.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Un espace où la ménopause n&apos;est pas un problème à régler, mais un passage
                à habiter avec présence et intention. C&apos;est cela, AWENE.
              </p>
            </div>
          </div>

          <div
            className="mt-14 pt-10 border-t flex flex-wrap gap-4"
            style={{ borderColor: "#E8DFF0" }}
          >
            <Button href="/a-propos/pourquoi-awene" variant="primary">
              Pourquoi AWENE
            </Button>
            <Button href="/chemine-avec-moi" variant="secondary">
              Cheminer avec moi
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
