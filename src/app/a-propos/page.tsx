import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AboutPage, { type AboutPageContent } from "@/components/pages/AboutPage";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "À propos | AWENE, Coaching ménopause et périménopause par Amira Medimagh",
  description:
    "Amira Medimagh est médecin, experte en santé publique et coach certifiée en périménopause et ménopause. Découvrez pourquoi AWENE existe, et ce qui rend cette approche différente.",
  keywords: [
    "Amira Medimagh coach ménopause",
    "médecin coach périménopause",
    "AWENE Tunisie MENA",
    "santé féminine",
    "théorie polyvagale",
    "longévité féminine",
    "santé publique",
    "IIN",
    "IWHI",
    "santé hormonale",
  ],
};

export const aboutPageContentFr: AboutPageContent = {
  heroEyebrow: "À propos",
  heroTitle: (
    <>
      <span
        style={{
          background: "linear-gradient(135deg, #F68B2C 0%, #6F3FD6 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        AWENE
      </span>{" "}
      , Pourquoi cette approche existe.
    </>
  ),
  beliefEyebrow: "NOTRE CONVICTION",
  beliefTitle: "Ce que nous croyons",
  beliefParagraphs: [
    "La périménopause et la ménopause ne sont pas une maladie. Ce ne sont pas non plus des années à subir en silence, avec des bouffées de chaleur, une fatigue chronique, un brouillard mental, des troubles du sommeil ou une prise de poids inexpliquée.",
    "Ce sont des transitions biologiques réelles, documentées, compréhensibles, et traversables avec les bons outils.",
    "AWENE est né d'une conviction simple : chaque femme mérite de comprendre ce qui se passe dans son corps, ses hormones, son système nerveux, ses symptômes, et d'avoir accès à un accompagnement sérieux, ancré dans la science, adapté à sa réalité.",
  ],
  beliefAnchor: "Pas des généralités. Pas des promesses. Des réponses concrètes.",
  quote:
    "Chaque femme mérite de comprendre son corps, ses hormones, ses symptômes, et d’avoir accès à un accompagnement sérieux, ancré dans la science, adapté à sa réalité.",
  notSectionTitleLines: ["Pas", "UNE", "AUTRE", <>PLATEFORME<br />DE <span style={{ color: "#6F3FD6", fontStyle: "italic", fontWeight: 500, textTransform: "none" }}>Bien-être.</span></>],
  notSectionBullets: [
    "AWENE n'est pas du coaching intuitif.",
    "Ce n'est pas de la pensée positive.",
    "Ce n'est pas des solutions miracles.",
  ],
  notSectionConclusion:
    "AWENE est une approche intégrative rigoureuse, qui part du corps, de la biologie, des hormones, et de la vie réelle de chaque femme.",
  companionEyebrow: "VOTRE ACCOMPAGNATRICE",
  companionTitle: "Amira Medimagh",
  companionCredentials: (
    <>
      Médecin. Experte en santé publique.
      <br />
      Coach certifiée.
    </>
  ),
  companionBio: [
    "Amira Medimagh est médecin, titulaire d'un Master en santé publique avec plus de 20 ans d'expérience en santé publique internationale, notamment en santé sexuelle et reproductive, VIH-SIDA, et droits des femmes, en Tunisie et dans la région MENA.",
    "Depuis 2025, elle est certifiée coach en santé et nutrition intégrative par l'Institute for Integrative Nutrition (États-Unis), et coach certifiée en périménopause et ménopause par l'Integrative Women's Health Institute.",
    "Elle se forme actuellement à la théorie polyvagale et à la longévité féminine, pour intégrer les approches les plus récentes en neuroscience, santé hormonale et santé féminine dans son accompagnement.",
  ],
  companionImageAlt: "Portrait d'Amira Medimagh",
  pathTitle: "Pourquoi ce chemin",
  pathBody:
    "Après deux décennies à travailler sur les systèmes de santé, Amira a fait un choix : se rapprocher des femmes individuellement. Pas des statistiques. Pas des programmes. Des femmes réelles, avec des corps réels, des symptômes réels, des vies réelles. AWENE est ce pont, entre la rigueur de la santé publique et la proximité de l'accompagnement humain.",
  distinctionTitle: "Ce qui la distingue",
  distinctionBody:
    "Pas une coach parmi d'autres. Une médecin qui accompagne. La différence, ce n'est pas le titre. C'est la capacité à lire ce que votre corps dit, les signaux hormonaux, les patterns du système nerveux, les mécanismes biologiques derrière vos symptômes, avec précision. Et à vous aider à y répondre, avec humanité.",
  supportImageAlt: "Femme accompagnant une autre femme dans un moment de soutien emotionnel",
  certificationsTitle: "Formations et certifications",
  certifications: [
    "Docteur en médecine",
    "Master en santé publique",
    "Coach certifiée en santé et nutrition intégratives, Institute for Integrative Nutrition (IIN)",
    "Coach certifiée en périménopause et ménopause, Integrative Women's Health Institute (IWHI)",
  ],
};

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/a-propos",
          title: "À propos | AWENE, Coaching ménopause et périménopause par Amira Medimagh",
          description:
            "Amira Medimagh est médecin, experte en santé publique et coach certifiée en périménopause et ménopause. Découvrez pourquoi AWENE existe, et ce qui rend cette approche différente.",
          type: "AboutPage",
          about: organizationSchema(),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ])}
      />
      <AboutPage content={aboutPageContentFr} />
    </>
  );
}
