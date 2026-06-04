import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  eyebrow: string;
  title: string;
  body: string | string[];
  href: string;
  cta: string;
  variant: "primary" | "light";
  imageSrc?: string;
  imageAlt?: string;
  imageTitle?: string;
};

export default function PartnerCard({
  eyebrow,
  title,
  body,
  href,
  cta,
  variant,
  imageSrc,
  imageAlt,
  imageTitle,
}: Props) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-[rgba(243,236,251,0.12)] bg-[rgba(255,255,255,0.04)] p-6 text-center shadow-[0_18px_60px_rgba(35,12,58,0.12)] backdrop-blur-[2px] md:p-8 lg:text-left">
      {imageSrc ? (
        <div className="mb-6 overflow-hidden rounded-[1.4rem]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              title={imageTitle}
              fill
              className="object-cover object-[50%_35%]"
              sizes="(min-width: 1024px) 28rem, 100vw"
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col">
        <p
          className="text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: "rgba(243,236,251,0.7)", fontFamily: "var(--font-inter)" }}
        >
          {eyebrow}
        </p>
        <h3
          className="mt-6 text-2xl font-bold leading-tight md:text-[2rem] xl:text-[2.4rem]"
          style={{ fontFamily: "var(--font-playfair)", color: "#F3ECFB" }}
        >
          {title}
        </h3>
        {(Array.isArray(body) ? body : [body]).map((para, i) => (
          <p
            key={i}
            className="mt-6 flex-1 text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}
          >
            {para}
          </p>
        ))}
        <div className="mt-8">
          <Button href={href} variant={variant} size="lg">
            {cta}
          </Button>
        </div>
      </div>
    </article>
  );
}
