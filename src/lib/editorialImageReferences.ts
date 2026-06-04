export type EditorialImagePlacement =
  | "homeHero"
  | "homeEnterprise"
  | "homeReadyCall"
  | "homeCommunity"
  | "coachingHero"
  | "coachingProcessSupport"
  | "formationsHero"
  | "articlesFeaturedFallback"
  | "eventsHero"
  | "eventsCardFallback";

type EditorialImageReference = {
  src?: string;
  referenceUrl: string;
  alt: string;
  note: string;
};

// These Magnific links are reference pages, not direct image asset URLs.
// Keep them here so replacing placeholders with local licensed assets later is a straight swap.
export const editorialImageReferences: Record<
  EditorialImagePlacement,
  EditorialImageReference
> = {
  homeHero: {
    src: "/images/2151249731.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/portrait-smiley-stylish-senior-woman_16293656.htm#fromView=search&page=1&position=40&uuid=885f0ef2-94ae-4d8d-8050-11275514d921&query=MENA+adult+women",
    alt: "Femme souriante en portrait",
    note: "Homepage hero main emotional visual.",
  },
  coachingHero: {
    src: "/images/2149883558.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/image-thoughtful-asian-senior-woman-squinting-suspicious-camera-having-assumption-standing-ove_40068562.htm#fromView=search&page=1&position=27&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Femme adulte dans un moment de réflexion",
    note: "Coaching page hero image.",
  },
  homeEnterprise: {
    src: "/images/2149883526.jpg",
    referenceUrl: "",
    alt: "Femme adulte dans un cadre professionnel",
    note: "Homepage enterprise and partnership support image.",
  },
  homeReadyCall: {
    src: "/images/employeur-bien-etre-travail.jpg",
    referenceUrl: "",
    alt: "Femme souriante tenant une tablette dans un environnement professionnel extérieur",
    note: "Homepage support image for the call booking card.",
  },
  homeCommunity: {
    src: "/images/2994.jpg",
    referenceUrl: "",
    alt: "Femme souriante dans un moment chaleureux",
    note: "Homepage newsletter and community support image.",
  },
  coachingProcessSupport: {
    src: "/images/employeur-bien-etre-travail.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/medium-shot-woman-wearing-halal-outdoors_59234194.htm#fromView=search&page=1&position=25&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Femme souriante tenant une tablette dans un environnement professionnel extérieur, représentant un employeur engagé dans le bien-être au travail",
    note: "Supporting image for coaching process section.",
  },
  formationsHero: {
    src: "/images/formations-hero.jpg",
    referenceUrl:
      "https://www.magnific.com/free-ai-image/world-cancer-day-awareness-with-patient_138695624.htm#fromView=search&page=1&position=12&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Femme professionnelle dans un environnement élégant representant les formations AWENE",
    note: "Strong editorial portrait for formations hero.",
  },
  articlesFeaturedFallback: {
    src: "/images/2149038120.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/smiley-woman-posing-indoors-mediums-hot_33803123.htm#fromView=search&page=1&position=7&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Femme souriante en portrait",
    note: "Fallback image for featured article area when CMS image is missing.",
  },
  eventsHero: {
    src: "/images/156378.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/side-view-smiley-wise-woman-posing-studio_33803143.htm#fromView=search&page=2&position=47&uuid=885f0ef2-94ae-4d8d-8050-11275514d921&query=MENA+adult+women",
    alt: "Portrait de femme adulte",
    note: "Events page hero image.",
  },
  eventsCardFallback: {
    src: "/images/156378.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/side-view-smiley-wise-woman-posing-studio_33803143.htm#fromView=search&page=2&position=47&uuid=885f0ef2-94ae-4d8d-8050-11275514d921&query=MENA+adult+women",
    alt: "Femme accompagnée dans un cadre bienveillant",
    note: "Fallback event card image.",
  },
};
