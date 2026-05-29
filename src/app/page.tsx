import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Pillars";
import AmiraBio from "@/components/sections/Manifesto";
import GetStarted from "@/components/sections/MovementCapture";
import Entreprises from "@/components/sections/CTABand";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "AWENE | Coaching ménopause et périménopause : Comprendre, Réguler, Incarner",
  description:
    "Bouffées de chaleur, fatigue, brouillard mental, sommeil perturbé : ce n'est pas une fatalité. AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique et humaine. En ligne, région MENA et au-delà.",
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
      <Hero />
      <Approach />
      <AmiraBio />
      <GetStarted />
      <Entreprises />
      <FAQ />
    </>
  );
}
