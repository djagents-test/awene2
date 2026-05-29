import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AmiraPortraitSlot from "@/components/ui/AmiraPortraitSlot";

type AmiraBioProps = {
  eyebrow?: string;
  name?: string;
  credentials?: string;
  body?: string;
  photoLabel?: ReactNode;
  href?: string;
  ctaLabel?: string;
};

export default function AmiraBio({
  eyebrow = "Votre accompagnatrice",
  name = "Amira Medimagh",
  credentials = "Médecin · Experte en santé publique · Coach certifiée en santé et nutrition intégratives et en périménopause et ménopause",
  body = "20 ans d'expérience en santé publique internationale. Une conviction : chaque femme mérite de comprendre son corps, ses cycles hormonaux, ses symptômes, ses transitions, et d'avoir les outils pour aller bien.",
  photoLabel = (
    <>
      Photo
      <br />
      Amira
    </>
  ),
  href = "/a-propos",
  ctaLabel = "En savoir plus sur Amira",
}: AmiraBioProps) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #2E1A4A 0%, #1C0F2E 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"
          style={{ background: "radial-gradient(circle, #F68B2C 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.08] rounded-full"
          style={{ background: "radial-gradient(circle, #6F3FD6 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(19rem,23rem)_minmax(0,1fr)]">
          <div className="order-1 w-full">
            <div className="aspect-[4/5] w-full max-w-[23rem] lg:max-w-none">
              <AmiraPortraitSlot className="h-full w-full rounded-[2rem]" />
            </div>
          </div>

          <div className="order-2 flex flex-col justify-center">
            <p
              className="mb-8 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: "rgba(246,139,44,0.8)", fontFamily: "var(--font-inter)" }}
            >
              <span
                className="block h-px w-8 shrink-0"
                style={{ background: "rgba(246,139,44,0.8)" }}
                aria-hidden="true"
              />
              {eyebrow}
            </p>
            <h2
              className="mb-3 text-3xl leading-tight font-bold md:text-4xl lg:text-[3rem]"
              style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
            >
              {name}
            </h2>
            <p
              className="mb-7 text-sm font-medium leading-relaxed md:text-[0.95rem]"
              style={{ color: "rgba(246,139,44,0.9)", fontFamily: "var(--font-inter)" }}
            >
              {credentials}
            </p>
            <p
              className="mb-10 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(243,236,251,0.75)", fontFamily: "var(--font-inter)" }}
            >
              {body}
            </p>
            <Button href={href} variant="secondary">
              <span style={{ color: "#F3ECFB" }}>
                {ctaLabel}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
