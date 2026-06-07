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
  title?: string;
  metaTitle?: string;
  description?: string;
  objectPosition?: string;
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
    src: "/images/awene-femmes-diversite-inclusion.jpg",
    referenceUrl: "",
    alt: "Femmes de différents horizons réunies dans un esprit de soutien et d’inclusion",
    title: "Diversité, inclusion et soutien entre femmes",
    metaTitle: "Diversité et inclusion féminine | AWENE",
    description:
      "Une représentation authentique de la diversité des parcours féminins et de la richesse des expériences vécues.",
    objectPosition: "center center",
    note: "Homepage enterprise and partnership support image.",
  },
  homeReadyCall: {
    src: "/images/awene-diversite-feminine-bien-etre.jpg",
    referenceUrl: "",
    alt: "Deux femmes représentant la diversité et le bien-être",
    title: "Diversité féminine et bien-être",
    metaTitle: "Bien-être féminin et diversité | AWENE",
    description:
      "Portrait naturel mettant en valeur la diversité, l’écoute et l’épanouissement personnel.",
    objectPosition: "center center",
    note: "Homepage support image for the call booking card.",
  },
  homeCommunity: {
    src: "/images/awene-femmes-diversite-inclusion.jpg",
    referenceUrl: "",
    alt: "Femmes de différents horizons réunies dans un esprit de soutien et d’inclusion",
    title: "Diversité, inclusion et soutien entre femmes",
    metaTitle: "Diversité et inclusion féminine | AWENE",
    description:
      "Une représentation authentique de la diversité des parcours féminins et de la richesse des expériences vécues.",
    objectPosition: "center center",
    note: "Homepage newsletter and community support image.",
  },
  coachingProcessSupport: {
    src: "/images/awene-diversite-feminine-bien-etre.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/medium-shot-woman-wearing-halal-outdoors_59234194.htm#fromView=search&page=1&position=25&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Deux femmes représentant la diversité et le bien-être",
    title: "Diversité féminine et bien-être",
    metaTitle: "Bien-être féminin et diversité | AWENE",
    description:
      "Portrait naturel mettant en valeur la diversité, l’écoute et l’épanouissement personnel.",
    objectPosition: "center center",
    note: "Supporting image for coaching process section.",
  },
  formationsHero: {
    src: "/images/awene-femmes-professionnelles-collaboration.jpg",
    referenceUrl:
      "https://www.magnific.com/free-ai-image/world-cancer-day-awareness-with-patient_138695624.htm#fromView=search&page=1&position=12&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Groupe de femmes professionnelles collaborant dans un environnement moderne",
    title: "Femmes professionnelles réunies autour d’un projet commun",
    metaTitle: "Femmes et collaboration professionnelle | AWENE",
    description:
      "Une équipe de femmes issues de parcours variés réunies autour de la collaboration, du partage et du développement personnel.",
    objectPosition: "center center",
    note: "Strong editorial portrait for formations hero.",
  },
  articlesFeaturedFallback: {
    src: "/images/awene-femme-professionnelle-accompagnement.jpg",
    referenceUrl:
      "https://www.magnific.com/free-photo/smiley-woman-posing-indoors-mediums-hot_33803123.htm#fromView=search&page=1&position=7&uuid=1f0d3254-ddd7-4650-b8ce-99cd1f95b3b7&query=menopause+arab+women",
    alt: "Portrait d’une femme professionnelle dans un environnement de travail",
    title: "Accompagnement professionnel et confiance en soi",
    metaTitle: "Coaching professionnel pour femmes | AWENE",
    description:
      "Une femme professionnelle représentant la confiance, l’accompagnement et l’évolution personnelle.",
    objectPosition: "center 25%",
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
