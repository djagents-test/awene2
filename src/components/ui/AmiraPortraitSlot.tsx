"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderVisual from "@/components/ui/PlaceholderVisual";

const AMIRA_PORTRAIT_SRC = "/images/amira_portrait-20260531.jpeg";
const AMIRA_PORTRAIT_ENABLED = true;

type AmiraPortraitSlotProps = {
  alt?: string;
  className?: string;
};

export default function AmiraPortraitSlot({
  alt = "Portrait d'Amira Medimagh",
  className = "",
}: AmiraPortraitSlotProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const shouldRenderPlaceholder = !AMIRA_PORTRAIT_ENABLED || imageUnavailable;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {shouldRenderPlaceholder ? (
        <PlaceholderVisual
          variant="portrait"
          tone="plum"
          className="h-full w-full border-0 shadow-none"
        />
      ) : (
        <>
          <Image
            src={AMIRA_PORTRAIT_SRC}
            alt={alt}
            fill
            className="object-cover object-center md:object-[center_top]"
            sizes="(min-width: 1024px) 18rem, 100vw"
            onError={() => setImageUnavailable(true)}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(46,26,74,0.06) 0%, rgba(46,26,74,0.14) 100%)",
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
