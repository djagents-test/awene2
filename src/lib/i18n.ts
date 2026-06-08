export type Locale = "fr" | "en" | "ar";

export const locales: Locale[] = ["fr", "en", "ar"];

const localizedSlugMaps = {
  en: {
    "/a-propos": "/about",
    "/a-propos/pourquoi-awene": "/about/why-awene",
    "/a-propos/mon-histoire": "/about/my-story",
    "/formations": "/training",
    "/formations-pv": "/training-recaps",
    "/evenements": "/events",
    "/merci": "/thank-you",
    "/politique-de-confidentialite": "/privacy-policy",
    "/chemine-avec-moi": "/walk-with-me",
    "/chemine-avec-moi/role-du-coach": "/walk-with-me/the-role-of-the-coach",
    "/chemine-avec-moi/accompagnements": "/walk-with-me/programs",
    "/chemine-avec-moi/formulaire-selection": "/walk-with-me/application-form",
  },
  ar: {},
} as const satisfies Record<Exclude<Locale, "fr">, Record<string, string>>;

function canonicalize(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function reverseSlugMap(locale: Exclude<Locale, "fr">) {
  return Object.fromEntries(
    Object.entries(localizedSlugMaps[locale]).map(([canonical, localized]) => [
      localized,
      canonical,
    ]),
  ) as Record<string, string>;
}

export function localeFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return "fr";
  }

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return "ar";
  }

  return "fr";
}

export function pathWithoutLocale(pathname: string) {
  const normalized = canonicalize(pathname);

  if (pathname === "/en" || pathname === "/fr" || pathname === "/ar") {
    return "/";
  }

  if (normalized.startsWith("/en/")) {
    const stripped = normalized.slice(3) || "/";
    return reverseSlugMap("en")[stripped] ?? stripped;
  }

  if (normalized.startsWith("/fr/")) {
    return normalized.slice(3) || "/";
  }

  if (normalized.startsWith("/ar/")) {
    const stripped = normalized.slice(3) || "/";
    return reverseSlugMap("ar")[stripped] ?? stripped;
  }

  return normalized;
}

export function localizedPath(path: string, locale: Locale) {
  const normalized = canonicalize(path);

  if (locale === "fr") {
    return normalized === "/" ? "/fr" : `/fr${normalized}`;
  }

  const localized = localizedSlugMaps[locale][normalized as keyof (typeof localizedSlugMaps)[typeof locale]] ?? normalized;

  return localized === "/" ? `/${locale}` : `/${locale}${localized}`;
}

export function canonicalPathForLocale(path: string, locale: Locale) {
  const normalized = canonicalize(path);

  if (locale === "fr") {
    return normalized;
  }

  return reverseSlugMap(locale)[normalized] ?? normalized;
}

export const translations = {
  fr: {
    dir: "ltr",
    languageName: "Français",
    nav: {
      home: "Accueil",
      coaching: "Coaching",
      about: "À propos",
      formations: "Formations",
      articles: "Articles",
      events: "Événements",
      contact: "Contact",
      cta: "Réserver mon appel",
      open: "Ouvrir le menu",
      close: "Fermer le menu",
      label: "Navigation principale",
    },
    footer: {
      description:
        "AWENE accompagne les femmes en transition avec une approche équilibrée, intentionnelle et profondément humaine.",
      explore: "Explorer",
      support: "Accompagnement",
      movement: "La newsletter",
      movementText:
        "Inscris-toi à la newsletter AWENE et reçois des informations fiables sur la périménopause et la ménopause.",
      rights: "Tous droits réservés.",
    },
    home: {
      eyebrow: "Neuro Wellness in Menopause",
      title: "Comprendre. Réguler. Incarner.",
      body:
        "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique, humaine et profondément ancrée.",
      primary: "Commencer",
      secondary: "Lire les articles",
      pillars: [
        ["Comprendre", "Des ressources claires pour nommer ce qui se passe dans le corps et le système nerveux."],
        ["Réguler", "Des pratiques réalistes pour soutenir le sommeil, l’énergie, l’humeur et le stress."],
        ["Incarner", "Un accompagnement pour habiter ce nouveau chapitre avec présence et confiance."],
      ],
    },
    pages: {
      coaching: {
        title: "Coaching",
        body:
          "Un accompagnement structuré pour traverser la périménopause et la ménopause avec compréhension, régulation et action.",
      },
      about: {
        title: "À propos d’AWENE",
        body:
          "AWENE est né pour offrir aux femmes une lecture plus juste, plus informée et plus humaine de la transition hormonale.",
      },
      contact: {
        title: "Contact",
        body:
          "Écrivez-nous pour une question, une collaboration ou un premier échange autour de votre accompagnement.",
      },
    },
    articles: {
      title: "Articles",
      body:
        "Des articles scientifiques, clairs et accessibles pour comprendre ce qui se passe dans votre corps et agir.",
      empty: "Les articles seront publiés prochainement.",
      featured: "À la une",
      all: "Tous",
    },
    events: {
      title: "Événements",
      body:
        "Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause.",
      empty: "Les prochains événements seront annoncés bientôt.",
      upcoming: "Prochains événements",
      more: "M’informer",
    },
  },
  en: {
    dir: "ltr",
    languageName: "English",
    nav: {
      home: "Home",
      coaching: "Coaching",
      about: "About",
      formations: "Training",
      articles: "Articles",
      events: "Events",
      contact: "Contact",
      cta: "Book a call",
      open: "Open menu",
      close: "Close menu",
      label: "Main navigation",
    },
    footer: {
      description:
        "AWENE supports women in transition with a balanced, intentional, deeply human approach.",
      explore: "Explore",
      support: "Support",
      movement: "Newsletter",
      movementText:
        "Subscribe to the AWENE newsletter and receive reliable information on perimenopause and menopause.",
      rights: "All rights reserved.",
    },
    home: {
      eyebrow: "Menopause coaching · Perimenopause coaching",
      title: "You no longer feel like yourself. Your body is going through a real transition. Understand it. Act.",
      body:
        "Know your body. It is your strength. Hot flashes, unexplained fatigue, brain fog, fragmented sleep, unstable mood, weight changes, it is not all in your head. It is not inevitable. It is a documented biological transition that you can understand and move through with the right tools.",
      primary: "Book my call",
      secondary: "Read articles",
      pillars: [
        ["Understand", "Women who understand what is happening in their bodies feel better, this is proven. Your hot flashes, chronic fatigue, sleep problems, mood swings, and weight changes all have hormonal and neurological explanations. We make them clear."],
        ["Regulate", "Your nervous system first. When it is in chronic stress, metabolism, sleep, mental clarity, and mood are disrupted. When it is balanced, the rest can follow."],
        ["Embody", "Changes that fit into your real life. Not a standard program. A path that matches your daily life, relationships, and relationship with yourself."],
      ],
    },
    pages: {
      coaching: {
        title: "You deserve to understand what is happening in your body. And to have the tools to feel better.",
        body:
          "Perimenopause and menopause affect your body: hot flashes, fatigue, brain fog, fragmented sleep, weight gain, unstable mood. It is not inevitable. It is a transition you can move through with clarity and strength.",
      },
      about: {
        title: "AWENE, why this approach exists.",
        body:
          "Every woman deserves to understand what is happening in her body, her hormones, nervous system, symptoms, and transitions, and to access serious, science-rooted support adapted to her real life.",
      },
      contact: {
        title: "Contact",
        body:
          "Reach out with a question, partnership idea, or first conversation about support.",
      },
    },
    articles: {
      title: "Articles",
      body:
        "Clear, accessible, science-rooted articles on menopause, perimenopause, hormones, and women’s health, to understand what is happening in your body and act.",
      empty: "Articles will be published soon.",
      featured: "Featured",
      all: "All",
    },
    events: {
      title: "Events",
      body: "Workshops, webinars, and gatherings around menopause and perimenopause, to understand, share, and move forward together.",
      empty: "Upcoming events coming soon, subscribe to the newsletter to be informed first.",
      upcoming: "Upcoming events",
      more: "Learn more",
    },
  },
  ar: {
    dir: "rtl",
    languageName: "العربية",
    nav: {
      home: "الرئيسية",
      coaching: "الكوتشينغ",
      about: "عن أوين",
      formations: "التكوينات",
      articles: "المقالات",
      events: "الفعاليات",
      contact: "اتصل بنا",
      cta: "احجزي مكالمة",
      open: "فتح القائمة",
      close: "إغلاق القائمة",
      label: "التنقل الرئيسي",
    },
    footer: {
      description:
        "ترافق AWENE النساء في مرحلة التحول الهرموني بمنهج متوازن، واع، وإنساني.",
      explore: "استكشاف",
      support: "المرافقة",
      movement: "الحركة",
      movementText:
        "انضمي إلى حركة AWENE وتلقي أخباراً مهمة حول هذه المرحلة.",
      rights: "جميع الحقوق محفوظة.",
    },
    home: {
      eyebrow: "كوتشينغ سن اليأس · كوتشينغ ما قبل سن اليأس",
      title: "لم تعودي تشعرين أنك أنتِ. جسمك يمر بتحول حقيقي. افهميه. تحركي.",
      body:
        "اعرفي جسمك. هذه قوتك. الهبات الساخنة، التعب غير المفسر، ضبابية الذهن، النوم المتقطع، تقلب المزاج، وتغير الوزن, ليست وهماً وليست قدراً. إنها مرحلة بيولوجية موثقة يمكنك فهمها وعبورها بالأدوات المناسبة.",
      primary: "احجزي مكالمتي",
      secondary: "قراءة المقالات",
      pillars: [
        ["افهمي", "النساء اللواتي يفهمن ما يحدث في أجسادهن يكنّ أفضل, وهذا مثبت. للهبات الساخنة، والتعب المزمن، واضطرابات النوم، وتقلب المزاج، وتغير الوزن تفسيرات هرمونية وعصبية واضحة."],
        ["نظّمي", "الجهاز العصبي أولاً. عندما يكون في ضغط مزمن يختل الأيض ويتقطع النوم وتزداد ضبابية الذهن. عندما يتوازن، يتبعه النوم والمزاج والطاقة."],
        ["جسّدي", "تغييرات تندمج في حياتك الواقعية. ليس برنامجاً موحداً، بل مسار يناسب يومك وعلاقاتك وعلاقتك بنفسك."],
      ],
    },
    pages: {
      coaching: {
        title: "تستحقين أن تفهمي ما يحدث في جسمك. وأن تمتلكي الأدوات لتشعري بتحسن.",
        body:
          "فترة ما قبل سن اليأس وسن اليأس تغيّر جسمك: هبات ساخنة، تعب، ضبابية ذهنية، نوم متقطع، زيادة وزن، ومزاج غير مستقر. ليست قدراً. إنها مرحلة يمكنك عبورها بوضوح وقوة.",
      },
      about: {
        title: "AWENE, لماذا توجد هذه المقاربة.",
        body:
          "كل امرأة تستحق أن تفهم ما يحدث في جسمها, هرموناتها، جهازها العصبي، أعراضها، وتحولاتها, وأن تحصل على مرافقة جدية، قائمة على العلم، ومناسبة لواقعها.",
      },
      contact: {
        title: "تواصل",
        body:
          "راسِلينا لأي سؤال أو تعاون أو محادثة أولى حول المرافقة المناسبة لك.",
      },
    },
    articles: {
      title: "المقالات",
      body:
        "مقالات علمية واضحة وميسرة حول سن اليأس، وما قبله، والهرمونات، وصحة المرأة, لفهم ما يحدث في جسمك والتحرك.",
      empty: "سيتم نشر المقالات قريباً.",
      featured: "المقال المميز",
      all: "الكل",
    },
    events: {
      title: "الفعاليات",
      body: "ورشات وندوات ولقاءات حول سن اليأس وفترة ما قبله, للفهم والمشاركة والتقدم معاً.",
      empty: "فعاليات قادمة قريباً, اشتركي في النشرة لتكوني أول من يعلم.",
      upcoming: "الفعاليات القادمة",
      more: "المزيد",
    },
  },
} as const;
