import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type EntreprisesProps = {
  employerEyebrow?: string;
  employerTitle?: string;
  employerBody?: string;
  employerHref?: string;
  employerCta?: string;
  partnerEyebrow?: string;
  partnerTitle?: string;
  partnerBody?: string;
  partnerHref?: string;
  partnerCta?: string;
};

type ColumnCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  buttonVariant: "primary" | "light";
};

function ColumnCard({
  eyebrow,
  title,
  body,
  href,
  cta,
  buttonVariant,
}: ColumnCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-[rgba(243,236,251,0.12)] bg-[rgba(255,255,255,0.04)] p-6 text-center shadow-[0_18px_60px_rgba(35,12,58,0.12)] backdrop-blur-[2px] md:p-8 lg:text-left">
      <div className="flex flex-1 flex-col">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase"
          style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-6 text-3xl font-bold leading-tight md:text-4xl xl:text-5xl"
          style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
        >
          {title}
        </h2>
        <p
          className="mt-6 flex-1 text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}
        >
          {body}
        </p>
        <div className="mt-8">
          <Button href={href} variant={buttonVariant} size="lg">
            {cta}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Entreprises({
  employerEyebrow = "Vous êtes une entreprise ?",
  employerTitle = "Vous êtes une entreprise ?",
  employerBody = "Vos collaboratrices de 40-55 ans traversent la périménopause et la ménopause en silence. Bouffées de chaleur au bureau, brouillard mental, fatigue chronique, difficultés de concentration, l'absentéisme et la baisse de productivité ont un coût réel. Les solutions aussi.",
  employerHref = "/contact",
  employerCta = "Parlons-en",
  partnerEyebrow = "Vous êtes un professionnel de la santé et/ou du bien-être ?",
  partnerTitle = "Construisons un partenariat rigoureux.",
  partnerBody = "AWENE collabore avec des médecins, gynécologues, nutritionnistes, psychologues, ostéopathes, coaches sportifs et autres professionnels qui accompagnent les femmes en transition hormonale. Notre approche est fondée sur la science, pas sur les tendances. Si vous accompagnez des femmes de 40 ans et plus et que vous cherchez un partenaire rigoureux et engagé dans la région MENA, parlons-en.",
  partnerHref = "/contact",
  partnerCta = "Proposer une collaboration",
}: EntreprisesProps) {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(246,139,44,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <ColumnCard
            eyebrow={employerEyebrow}
            title={employerTitle}
            body={employerBody}
            href={employerHref}
            cta={employerCta}
            buttonVariant="primary"
          />

          <ColumnCard
            eyebrow={partnerEyebrow}
            title={partnerTitle}
            body={partnerBody}
            href={partnerHref}
            cta={partnerCta}
            buttonVariant="light"
          />
        </div>
      </Container>
    </section>
  );
}
