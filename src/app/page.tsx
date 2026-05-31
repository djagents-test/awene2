import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Pillars";
import AmiraBio from "@/components/sections/Manifesto";
import GetStarted from "@/components/sections/MovementCapture";
import Entreprises from "@/components/sections/CTABand";
import FAQ from "@/components/sections/FAQ";
import { breadcrumbSchema, webPageSchema, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AWENE | Coaching périménopause et ménopause, comprendre son corps autrement",
  description:
    "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique, humaine et apaisée. Comprendre les hormones, les symptômes et le système nerveux pour avancer avec plus de clarté.",
  keywords: [
    "coaching ménopause",
    "coaching périménopause",
    "accompagnement ménopause en ligne",
    "bouffées de chaleur",
    "fatigue ménopause",
    "brain fog",
    "troubles du sommeil",
    "prise de poids ménopause",
    "cycles irréguliers",
    "MENA",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([{ name: "Accueil", path: "/" }]),
          webPageSchema({
            path: "/",
            title: "AWENE | Coaching périménopause et ménopause, comprendre son corps autrement",
            description:
              "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique, humaine et apaisée. Comprendre les hormones, les symptômes et le système nerveux pour avancer avec plus de clarté.",
          }),
        ]}
      />
      <Hero />
      <Approach />
      <AmiraBio />
      <GetStarted />
      <Entreprises />
      <FAQ />
    </>
  );
}
