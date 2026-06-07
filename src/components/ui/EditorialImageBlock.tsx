import Image from "next/image";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";
import {
  editorialImageReferences,
  type EditorialImagePlacement,
} from "@/lib/editorialImageReferences";

type EditorialImageBlockProps = {
  placement: EditorialImagePlacement;
  className?: string;
  variant?:
    | "hero"
    | "portrait"
    | "nervous-system"
    | "movement"
    | "hormonal-rhythm"
    | "breathing"
    | "nature"
    | "card";
  tone?: "plum" | "violet" | "apricot" | "mixed";
  decorative?: boolean;
};

export default function EditorialImageBlock({
  placement,
  className = "",
  variant = "hero",
  tone = "mixed",
  decorative = false,
}: EditorialImageBlockProps) {
  const reference = editorialImageReferences[placement];

  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : reference.alt}
      data-image-reference={reference.referenceUrl}
      data-image-note={reference.note}
      className={`relative overflow-hidden rounded-[inherit] ${className}`}
    >
      {reference.src ? (
        <>
          <Image
            src={reference.src}
            alt={decorative ? "" : reference.alt}
            title={decorative ? undefined : reference.title}
            fill
            className="object-cover"
            style={{ objectPosition: reference.objectPosition ?? "center center" }}
            sizes="(min-width: 1024px) 31rem, 100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(46,26,74,0.06) 0%, rgba(46,26,74,0.16) 100%)",
            }}
            aria-hidden="true"
          />
        </>
      ) : (
        <PlaceholderVisual variant={variant} tone={tone} className="h-full w-full" />
      )}
    </div>
  );
}
