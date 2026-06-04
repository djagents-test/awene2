import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Le rôle du coach",
  description:
    "Comprendre la posture, la méthode et l'engagement d'une coach intégrative en santé et nutrition spécialisée en transition ménopausique.",
};

const faq = [
  {
    q: "La coach est-elle un médecin ?",
    a: "Non. Le coaching intégratif en santé et nutrition est une démarche complémentaire à la médecine, pas un substitut. La coach ne pose pas de diagnostic et ne prescrit pas de traitement. Elle accompagne, structure et soutient votre démarche de santé holistique.",
  },
  {
    q: "Comment se déroule un accompagnement ?",
    a: "Chaque accompagnement commence par un bilan approfondi. Ensemble, nous explorons votre situation actuelle, vos objectifs et vos ressources. Les séances sont régulières, structurées autour des 4 piliers AWENE, et adaptées à votre rythme.",
  },
  {
    q: "Faut-il être en péri-ménopause pour bénéficier de l'accompagnement ?",
    a: "L'accompagnement AWENE est conçu spécifiquement pour les femmes en péri-ménopause et ménopause. Si vous n'êtes pas sûre de votre situation hormonale, nous pouvons en parler lors du premier contact.",
  },
  {
    q: "Y a-t-il un suivi entre les séances ?",
    a: "Selon le programme choisi, un suivi par message est possible. L'objectif est que vous ne vous sentiez jamais seule dans votre démarche entre deux séances.",
  },
];

export default function RoleDuCoach() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/fr/chemine-avec-moi/role-du-coach",
          title: "Le rôle du coach",
          description:
            "Comprendre la posture, la méthode et l'engagement d'une coach intégrative en santé et nutrition spécialisée en transition ménopausique.",
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
              Chemine avec moi
            </p>
            <h1
              className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Le rôle du coach
            </h1>
            <p
              className="max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              Comprendre qui est la coach, comment elle travaille et ce qu&apos;elle ne fait pas, pour que vous puissiez faire un choix éclairé.
            </p>
          </div>
        </Container>
      </section>

      {/* Coach role intro */}
      <Section background="white" size="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                  style={{ color: "#6F3FD6", fontFamily: "var(--font-inter)" }}
                >
                  Posture & intention
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  Une présence structurée, pas directive
                </h2>
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Le rôle de la coach AWENE n&apos;est pas de vous dire quoi faire. C&apos;est de
                créer les conditions pour que vous puissiez vous entendre vous-même,
                plus clairement, plus profondément.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Elle apporte une structure scientifique (neurosciences, nutrition,
                physiologie de la ménopause) et une présence humaine (écoute active,
                non-jugement, accompagnement incarné).
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                Elle travaille sur ce que vous vivez, pas sur ce que vous devriez vivre.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Elle écoute",
                  desc: "Sans agenda. Sans jugement. Avec une attention profonde à ce que vous traversez.",
                },
                {
                  label: "Elle structure",
                  desc: "Elle organise ce que vous ressentez en leviers concrets, les 4 piliers AWENE.",
                },
                {
                  label: "Elle soutient",
                  desc: "Entre les séances, dans les moments difficiles, dans les avancées à célébrer.",
                },
                {
                  label: "Elle responsabilise",
                  desc: "Pas pour vous culpabiliser, mais parce que votre transformation vous appartient.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: "#F3ECFB" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#6F3FD6" }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Qualifications */}
      <Section background="lavender" size="lg">
        <Container size="md">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
          >
            Formation & expertise
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Une expertise au service de votre transition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Coaching intégratif en santé et nutrition",
              "Spécialisation en neurosciences féminines",
              "Accompagnement en transition ménopausique",
              "Approche comportementale et somato-cognitive",
              "Protocoles de mouvement adaptés",
              "Accompagnement nutritionnel fonctionnel",
            ].map((qual) => (
              <div
                key={qual}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E8DFF0]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#6F3FD6" }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                >
                  {qual}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="white" size="lg">
        <Container size="md">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              Vos questions
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group border border-[#E8DFF0] rounded-2xl overflow-hidden"
              >
                <summary
                  className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none"
                  style={{ background: "#FCFAF8" }}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-open:rotate-45"
                    style={{ background: "#F3ECFB", color: "#6F3FD6" }}
                  >
                    +
                  </span>
                </summary>
                <div
                  className="px-6 pb-6 pt-2"
                  style={{ background: "white" }}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  >
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="lavender" size="md">
        <Container size="md" className="text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
          >
            Prête à aller plus loin ?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/fr/contact" variant="primary">
              Nous contacter
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
