import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticlesList from "@/app/articles/ArticlesList";
import ContactPage from "@/components/contact/ContactPage";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import NewsletterBand from "@/components/sections/NewsletterBand";
import { getArticleBySlug, getArticles, getEvents, type CmsEvent } from "@/lib/cms";
import { canonicalPathForLocale, localizedPath, locales, translations, type Locale } from "@/lib/i18n";
import { englishMetadata, getEnglishPage } from "./EnglishPages";

type LocalizedPageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

type PrefixedLocale = Exclude<Locale, "fr">;

function assertLocale(value: string): asserts value is PrefixedLocale {
  if (!locales.includes(value as Locale) || value === "fr") {
    notFound();
  }
}

function pagePath(slug: string[] | undefined, locale: Locale) {
  return canonicalPathForLocale(`/${slug?.join("/") ?? ""}`.replace(/\/$/, "") || "/", locale);
}

function eventImageSrc(event: CmsEvent) {
  return (
    event.image?.large ??
    event.image?.medium ??
    event.image?.full ??
    event.image?.thumbnail
  );
}

const translatedPages = {
  en: {
    "/coaching": {
      eyebrow: "Coaching",
      title: "You deserve to understand what is happening in your body. And to have the tools to feel better.",
      body: "Perimenopause and menopause affect your body: hot flashes, fatigue, brain fog, fragmented sleep, weight gain, unstable mood. It is not inevitable. It is a transition you can move through with clarity and strength. My role is to support you at every step, with rigor, science, and respect for your reality.",
      sections: [
        {
          title: "A 3-pillar approach",
          body: [
            "Understand: women who understand what is happening in their bodies have fewer symptoms and adopt new behaviors more easily. You will understand the origin of your hot flashes, chronic fatigue, sleep issues, brain fog, mood changes, and weight gain, clearly, without medical jargon.",
            "Regulate: everything starts with the nervous system. When it is in chronic stress, metabolism, sleep, hot flashes, and mood all become more unstable. We regulate this first, using approaches rooted in polyvagal theory and neuroscience.",
            "Embody: understanding and regulating are not enough if the changes do not fit into your real life. The goal is for new habits to become yours, sustainably.",
          ],
        },
        {
          title: "How we work together",
          items: ["We understand your story, symptoms, lifestyle, and priorities", "We build a path adapted to your real life, not a standard protocol", "We move forward together with implementation, adjustments, and support", "We review what has changed: energy, sleep, mood, and mental clarity"],
        },
        {
          title: "The tools I use",
          items: ["Integrative assessment", "Neurowellness and nervous-system regulation", "Behavior-change science", "Personalized tracking", "Updated scientific evidence", "Coordination with your healthcare team"],
        },
        {
          title: "My role",
          body: ["My role is not to diagnose or prescribe. It is to help you understand your symptoms, act, and integrate sustainable changes into your life. I work alongside your medical team, not in their place."],
        },
      ],
    },
    "/a-propos": {
      eyebrow: "About",
      title: "AWENE, why this approach exists.",
      body: "Perimenopause and menopause are not illnesses. They are real, documented, understandable biological transitions, and they can be crossed with the right tools.",
      sections: [
        {
          title: "What we believe",
          body: [
            "AWENE was born from a simple conviction: every woman deserves to understand what is happening in her body, her hormones, nervous system, symptoms, and transitions, and to access serious, science-rooted support adapted to her reality.",
            "Not generalities. Not promises. Concrete answers.",
          ],
        },
        {
          title: "What AWENE is not",
          body: ["AWENE is not another wellness platform. It is not intuitive coaching, positive thinking, or miracle solutions for hot flashes or weight gain. It is a rigorous integrative approach that starts from the body, biology, hormones, and each woman’s real life."],
        },
        {
          title: "Amira Medimagh",
          body: ["Physician. Public health expert. Certified coach. Amira Medimagh is a physician with a Master’s in public health and more than 20 years of international public health experience, especially in sexual and reproductive health, HIV/AIDS, and women’s rights in Tunisia and the MENA region.", "Since 2025, she has been certified as an integrative health and nutrition coach by the Institute for Integrative Nutrition, and as a perimenopause and menopause coach by the Integrative Women’s Health Institute."],
        },
        {
          title: "Training and certifications",
          items: ["Medical doctor", "Master in public health", "Certified integrative health and nutrition coach, IIN", "Certified perimenopause and menopause coach, IWHI", "In training: Longevity for Women in Menopause and Perimenopause", "In training: Applied polyvagal theory, Polyvagal Institute"],
        },
      ],
    },
    "/a-propos/pourquoi-awene": {
      eyebrow: "The reason why",
      title: "Why AWENE",
      body: "A name, a movement, and a conviction: menopause deserves more than silence or half answers.",
      sections: [
        {
          title: "AWENE, the breath that inspires",
          body: [
            "AWENE evokes breath: discreet, essential, transformative. It carries the idea of passage, transition, life continuing and renewing itself.",
            "The name was chosen because it holds what the project is: soft but powerful, feminine but structured, quiet but present.",
          ],
        },
        {
          title: "The mission",
          body: [
            "For too long, menopause has been taboo, under-studied, and misunderstood. Women have crossed this transition in silence, often alone, without the resources that could have changed the experience.",
            "AWENE exists to transform silence into a space of recognition, information, support, and power.",
          ],
        },
        {
          title: "What we stand for",
          items: ["Free women from isolation", "Honor the complexity of this transition", "Build a method rooted in body, brain, movement, and lifestyle", "Create a movement beyond individual support"],
        },
      ],
    },
    "/a-propos/mon-histoire": {
      eyebrow: "About",
      title: "My story",
      body: "What I lived through, what I crossed, and why it led me to create AWENE.",
      sections: [
        {
          title: "The starting point",
          body: [
            "Like many women, I entered perimenopause without really knowing what lay ahead. I had heard about hot flashes and discomfort. I had not been told about the rest: the feeling of no longer fully recognizing myself, energy shifting without warning, a brain that seemed to work differently.",
            "I looked for answers in books, with health professionals, and in online groups. I found a lot of information, but it was fragmented. Rarely did I find a space that could hold the full complexity of what I was living through: physical, emotional, cognitive, and existential.",
          ],
        },
        {
          title: "Training and conviction",
          body: [
            "Faced with that gap, I chose to train in integrative health and nutrition coaching, with a focus on women’s neuroscience and the menopausal transition.",
            "This transition can be crossed with awareness, support, and method. Not to make it easy, but to make it meaningful.",
          ],
        },
        {
          title: "Why AWENE was born",
          body: [
            "AWENE was not born from a marketing ambition. It was born from necessity: the need to create what was missing.",
            "A rigorous and human space, grounded in science and nourished by a deep understanding of what women go through.",
          ],
        },
      ],
    },
    "/chemine-avec-moi": {
      eyebrow: "Your path",
      title: "Walk with me",
      body: "AWENE support is structured, intentional, and deeply human. Here is how it works and how to begin.",
      sections: [
        {
          title: "Understand",
          body: ["The role of the coach: who she is, how she works, and what posture she brings to your transition."],
        },
        {
          title: "Choose",
          body: ["Three levels of commitment: Éclosion, Essor, and Métamorphose. Each program is built around the AWENE pillars for a personalized path."],
        },
        {
          title: "Begin",
          body: ["The selection form is the first concrete step to see whether AWENE support is aligned with where you are now."],
        },
      ],
    },
    "/chemine-avec-moi/accompagnements": {
      eyebrow: "Walk with me",
      title: "Programs",
      body: "Three paths, one objective: coming back to yourself. Each program is designed for where you are and the level of support you need.",
      sections: [
        {
          title: "Éclosion - the first step",
          items: ["3 months", "One session per week", "Initial deep assessment", "12 individual sessions", "Personalized life plan", "Resources and protocols adapted to you"],
        },
        {
          title: "Essor - the deeper path",
          items: ["6 months", "Two sessions per month", "Nutrition assessment", "Personalized movement protocol", "Community access", "Priority support between sessions"],
        },
        {
          title: "Métamorphose - complete transformation",
          items: ["12 months", "Flexible sessions", "Unlimited message support", "Priority access to AWENE events", "Quarterly protocol reviews", "Co-creation of your yearly life plan"],
        },
      ],
    },
    "/chemine-avec-moi/role-du-coach": {
      eyebrow: "Understand",
      title: "The role of the coach",
      body: "A coach does not replace your doctor, does not diagnose, and does not impose a ready-made solution. She listens, structures, supports, and helps you take responsibility for your own path.",
      sections: [
        {
          title: "What she does",
          items: ["She listens to your symptoms and context", "She structures the work into clear priorities", "She supports implementation between sessions", "She helps you build autonomy rather than dependence"],
        },
        {
          title: "The AWENE posture",
          body: ["Scientific rigor, emotional safety, concrete action, and deep respect for your rhythm."],
        },
      ],
    },
    "/chemine-avec-moi/formulaire-selection": {
      eyebrow: "Begin",
      title: "Selection form",
      body: "The first step is to understand where you are, what you are going through, and what kind of support would be truly useful.",
      sections: [
        {
          title: "What the form explores",
          items: ["Your age and stage of transition", "Your main current challenge", "What you hope to transform", "The program you feel drawn to", "Any question or personal note you want to add"],
        },
      ],
    },
    "/contact": {
      eyebrow: "Contact",
      title: "Let’s talk",
      body: "Write to us for a question, a collaboration, a media request, or a first conversation about AWENE support.",
      sections: [
        {
          title: "Common reasons to write",
          items: ["A question about programs", "A corporate collaboration", "A media request", "A personal question before applying"],
        },
      ],
    },
    "/formations": {
      eyebrow: "Training",
      title: "AWENE Training",
      body: "Clear, human, science-rooted sessions to understand perimenopause, menopause, hormonal health and the nervous system.",
      sections: [
        {
          title: "For women, teams and professionals",
          body: ["Training sessions can support individuals, companies and health or wellness professionals with practical, accessible reference points."],
        },
        {
          title: "Custom sessions",
          body: ["For a dedicated English session, contact AWENE so the content can be adapted to your audience and context."],
        },
      ],
    },
    "/merci": {
      eyebrow: "Thank you",
      title: "Your message has been received",
      body: "Thank you for reaching out. We will come back to you as soon as possible.",
      sections: [
        { title: "In the meantime", body: ["You can continue exploring AWENE articles, events, and programs."] },
      ],
    },
    "/politique-de-confidentialite": {
      eyebrow: "Legal",
      title: "Privacy policy",
      body: "AWENE respects your privacy. Information shared through forms is used only to respond to your request and support the relationship you initiated.",
      sections: [
        { title: "Data use", body: ["We collect only the information needed to answer you, process your request, or send updates you asked to receive."] },
        { title: "Your rights", body: ["You may request access, correction, or deletion of your personal data at any time."] },
      ],
    },
  },
  ar: {
    "/coaching": {
      eyebrow: "الكوتشينغ",
      title: "تستحقين أن تفهمي ما يحدث في جسمك. وأن تمتلكي الأدوات لتشعري بتحسن.",
      body: "فترة ما قبل سن اليأس وسن اليأس تغيّران جسمك: هبات ساخنة، تعب، ضبابية ذهنية، نوم متقطع، زيادة وزن، ومزاج غير مستقر. ليست قدراً. إنها مرحلة يمكنك عبورها بوضوح وقوة. دوري هو مرافقتك في كل خطوة, بصرامة، وبعلم، واحترام لواقعك.",
      sections: [
        { title: "مقاربة بثلاث ركائز", body: ["افهمي: النساء اللواتي يفهمن ما يحدث في أجسادهن يعانين من أعراض أقل ويُدخلن سلوكيات جديدة بسهولة أكبر. ستفهمين أصل الهبات الساخنة، والتعب المزمن، واضطرابات النوم، وضبابية الذهن، وتقلب المزاج، وتغير الوزن, بوضوح وبدون تعقيد طبي.", "نظّمي: كل شيء يبدأ من الجهاز العصبي. عندما يكون في ضغط مزمن يختل الأيض، ويتقطع النوم، وتشتد الهبات الساخنة، ويصبح المزاج غير مستقر. ننظم ذلك أولاً بمقاربات مستندة إلى النظرية متعددة المبهم وعلم الأعصاب.", "جسّدي: الفهم والتنظيم لا يكفيان إن لم تدخل التغييرات في حياتك الواقعية. الهدف أن تصبح العادات الجديدة عاداتك أنتِ، بشكل مستدام."] },
        { title: "كيف نعمل معاً", items: ["نفهم قصتك وأعراضك ونمط حياتك وأولوياتك", "نبني مساراً مناسباً لواقعك وليس بروتوكولاً موحداً", "نتقدم معاً عبر التطبيق والتعديل والدعم", "نقيّم ما تغير: الطاقة، النوم، المزاج، والوضوح الذهني"] },
        { title: "الأدوات التي أستخدمها", items: ["تقييم تكاملي", "تنظيم الجهاز العصبي والـ Neurowellness", "علم تغيير السلوك", "متابعة شخصية", "معطيات علمية محدثة", "تنسيق مع فريقك الصحي"] },
        { title: "دوري", body: ["دوري ليس التشخيص أو الوصف الطبي. دوري أن أساعدك على فهم أعراضك، والتحرك، وإدماج تغييرات مستدامة في حياتك. أعمل بتكامل مع فريقك الطبي، لا بدلاً عنه."] },
      ],
    },
    "/a-propos": {
      eyebrow: "عن AWENE",
      title: "AWENE, لماذا توجد هذه المقاربة.",
      body: "فترة ما قبل سن اليأس وسن اليأس ليستا مرضاً. إنهما انتقالان بيولوجيان حقيقيان، موثقان، قابلان للفهم, ويمكن عبورهما بالأدوات المناسبة.",
      sections: [
        { title: "ما نؤمن به", body: ["وُلدت AWENE من قناعة بسيطة: كل امرأة تستحق أن تفهم ما يحدث في جسمها, هرموناتها، جهازها العصبي، أعراضها، وتحولاتها, وأن تحصل على مرافقة جدية، قائمة على العلم، ومناسبة لواقعها.", "لا تعميمات. لا وعود. إجابات ملموسة."] },
        { title: "ما ليست عليه AWENE", body: ["AWENE ليست منصة رفاهية أخرى. ليست كوتشينغ حدسياً، ولا تفكيراً إيجابياً، ولا حلولاً سحرية للهبات الساخنة أو زيادة الوزن. إنها مقاربة تكاملية صارمة تبدأ من الجسم، والبيولوجيا، والهرمونات، والحياة الواقعية لكل امرأة."] },
        { title: "أميرة مديمغ", body: ["طبيبة. خبيرة في الصحة العامة. كوتش معتمدة. أميرة مديمغ طبيبة حاصلة على ماجستير في الصحة العامة، ولديها أكثر من 20 سنة من الخبرة في الصحة العامة الدولية، خصوصاً في الصحة الجنسية والإنجابية، وفيروس نقص المناعة، وحقوق النساء في تونس ومنطقة الشرق الأوسط وشمال إفريقيا.", "منذ 2025، أصبحت كوتش معتمدة في الصحة والتغذية التكاملية من Institute for Integrative Nutrition، وكوتش معتمدة في فترة ما قبل سن اليأس وسن اليأس من Integrative Women’s Health Institute."] },
        { title: "التكوين والشهادات", items: ["دكتورة في الطب", "ماجستير في الصحة العامة", "كوتش معتمدة في الصحة والتغذية التكاملية، IIN", "كوتش معتمدة في فترة ما قبل سن اليأس وسن اليأس، IWHI", "قيد التكوين: طول العمر للنساء في سن اليأس وما قبله", "قيد التكوين: النظرية متعددة المبهم التطبيقية، Polyvagal Institute"] },
      ],
    },
    "/a-propos/pourquoi-awene": {
      eyebrow: "سبب الوجود",
      title: "لماذا AWENE",
      body: "اسم، وحركة، وقناعة: سن اليأس يستحق أكثر من الصمت أو أنصاف الإجابات.",
      sections: [
        { title: "AWENE، النفس الذي يلهم", body: ["تستحضر AWENE معنى النفس: هادئ، أساسي، ومحوّل. تحمل فكرة العبور، والتحول، والحياة التي تستمر وتتجدد.", "اختير الاسم لأنه يحمل جوهر المشروع: لطيف وقوي، أنثوي ومنظم، هادئ وحاضر."] },
        { title: "المهمة", body: ["ظل سن اليأس طويلاً موضوعاً مسكوتاً عنه، ناقص الدراسة والفهم. عبرت النساء هذه المرحلة بصمت، غالباً وحدهن، وبدون الموارد التي كان يمكن أن تغير التجربة.", "توجد AWENE لتحويل الصمت إلى مساحة اعتراف، ومعلومة، ومرافقة، وقوة."] },
        { title: "ما نحمله", items: ["تحرير النساء من العزلة", "احترام تعقيد هذه المرحلة", "بناء منهج يرتكز على الجسم والدماغ والحركة ونمط الحياة", "خلق حركة تتجاوز المرافقة الفردية"] },
      ],
    },
    "/a-propos/mon-histoire": {
      eyebrow: "عن AWENE",
      title: "قصتي",
      body: "ما عشته، وما عبرته، ولماذا قادني ذلك إلى إنشاء AWENE.",
      sections: [
        { title: "نقطة البداية", body: ["مثل كثير من النساء، دخلت فترة ما قبل انقطاع الطمث دون أن أعرف فعلاً ما ينتظرني. قيل لي عن الهبات الساخنة وبعض الانزعاج، لكن لم يُخبرني أحد بالباقي: الإحساس بعدم التعرف الكامل على نفسي، والطاقة التي تتغير بلا إنذار، والدماغ الذي يعمل بشكل مختلف.", "بحثت عن إجابات في الكتب، وعند المختصين، وفي المجموعات الرقمية. وجدت معلومات كثيرة لكنها متفرقة، ونادراً ما وجدت مساحة تعترف بكل التعقيد الجسدي والعاطفي والمعرفي والوجودي."] },
        { title: "التكوين والقناعة", body: ["أمام هذا الفراغ، اخترت أن أتكوّن في الكوتشينغ التكاملي للصحة والتغذية، مع تركيز على علم الأعصاب الأنثوي والتحول المرتبط بسن اليأس.", "يمكن عبور هذه المرحلة بوعي، ودعم، ومنهج. ليس لجعلها سهلة، بل لجعلها ذات معنى."] },
        { title: "لماذا وُلدت AWENE", body: ["لم تولد AWENE من طموح تسويقي، بل من ضرورة: ضرورة خلق ما كان ناقصاً.", "مساحة دقيقة وإنسانية، قائمة على العلم ومغذاة بفهم عميق لما تعبره النساء."] },
      ],
    },
    "/chemine-avec-moi": {
      eyebrow: "مسارك",
      title: "رافِقيني في المسار",
      body: "مرافقة AWENE منظمة، واعية، وإنسانية بعمق. هنا كيف تعمل وكيف تبدئين.",
      sections: [
        { title: "افهمي", body: ["دور الكوتش: من هي، كيف تعمل، وما الموقف الذي تحمله أمام تحولك."] },
        { title: "اختاري", body: ["ثلاثة مستويات من الالتزام: Éclosion وEssor وMétamorphose. كل برنامج مبني حول ركائز AWENE لمسار شخصي."] },
        { title: "ابدئي", body: ["استمارة الاختيار هي الخطوة الأولى لمعرفة إن كانت مرافقة AWENE مناسبة لمرحلتك الحالية."] },
      ],
    },
    "/chemine-avec-moi/accompagnements": {
      eyebrow: "رافِقيني",
      title: "برامج المرافقة",
      body: "ثلاثة مسارات وهدف واحد: العودة إلى نفسك. كل برنامج مصمم حسب موقعك الحالي ومستوى الدعم الذي تحتاجينه.",
      sections: [
        { title: "Éclosion - الخطوة الأولى", items: ["3 أشهر", "جلسة واحدة أسبوعياً", "تقييم أولي معمق", "12 جلسة فردية", "خطة حياة شخصية", "موارد وبروتوكولات مناسبة لك"] },
        { title: "Essor - المسار الأعمق", items: ["6 أشهر", "جلستان في الشهر", "تقييم تغذوي", "بروتوكول حركة شخصي", "دخول إلى مجتمع AWENE", "متابعة ذات أولوية بين الجلسات"] },
        { title: "Métamorphose - التحول الكامل", items: ["12 شهراً", "جلسات مرنة", "مرافقة غير محدودة بالرسائل", "أولوية في فعاليات AWENE", "مراجعات فصلية للبروتوكول", "بناء خطة حياتك السنوية معاً"] },
      ],
    },
    "/chemine-avec-moi/role-du-coach": {
      eyebrow: "افهمي",
      title: "دور الكوتش",
      body: "الكوتش لا تستبدل الطبيبة، ولا تشخّص، ولا تفرض حلاً جاهزاً. هي تستمع، وتنظم، وتدعم، وتساعدك على تحمل مسؤولية مسارك.",
      sections: [
        { title: "ما الذي تفعله", items: ["تستمع إلى أعراضك وسياقك", "تنظم العمل حسب أولويات واضحة", "تدعم التطبيق بين الجلسات", "تساعدك على بناء الاستقلالية لا التبعية"] },
        { title: "موقف AWENE", body: ["صرامة علمية، أمان عاطفي، فعل ملموس، واحترام عميق لإيقاعك."] },
      ],
    },
    "/chemine-avec-moi/formulaire-selection": {
      eyebrow: "ابدئي",
      title: "استمارة الاختيار",
      body: "الخطوة الأولى هي فهم أين أنت، وما الذي تعبرينه، وما نوع المرافقة المفيد فعلاً لك.",
      sections: [
        { title: "ما تستكشفه الاستمارة", items: ["عمرك ومرحلة التحول", "التحدي الرئيسي حالياً", "ما ترغبين في تغييره", "البرنامج الأقرب إليك", "أي سؤال أو رسالة شخصية تريدين إضافتها"] },
      ],
    },
    "/contact": {
      eyebrow: "تواصل",
      title: "لنتحدث",
      body: "راسِلينا لسؤال، أو تعاون، أو طلب إعلامي، أو محادثة أولى حول مرافقة AWENE.",
      sections: [
        { title: "أسباب شائعة للتواصل", items: ["سؤال حول البرامج", "تعاون مع مؤسسة", "طلب إعلامي", "سؤال شخصي قبل التقديم"] },
      ],
    },
    "/formations": {
      eyebrow: "التكوينات",
      title: "تكوينات AWENE",
      body: "جلسات واضحة وإنسانية ومبنية على العلم لفهم ما قبل سن اليأس، سن اليأس، الصحة الهرمونية والجهاز العصبي.",
      sections: [
        { title: "للنساء والفرق والمهنيين", body: ["يمكن تكييف التكوينات للأفراد، المؤسسات، ومهنيي الصحة والرفاه بمراجع عملية ومفهومة."] },
        { title: "جلسات مخصصة", body: ["لتنظيم جلسة بالعربية، تواصلي مع AWENE حتى يتم تكييف المحتوى حسب الجمهور والسياق."] },
      ],
    },
    "/merci": {
      eyebrow: "شكراً",
      title: "تم استلام رسالتك",
      body: "شكراً لتواصلك. سنعود إليك في أقرب وقت ممكن.",
      sections: [
        { title: "في هذه الأثناء", body: ["يمكنك متابعة استكشاف مقالات AWENE وفعالياتها وبرامجها."] },
      ],
    },
    "/politique-de-confidentialite": {
      eyebrow: "قانوني",
      title: "سياسة الخصوصية",
      body: "تحترم AWENE خصوصيتك. تُستخدم المعلومات التي تشاركينها عبر النماذج فقط للرد على طلبك ومتابعة العلاقة التي بدأتها.",
      sections: [
        { title: "استخدام البيانات", body: ["نجمع فقط المعلومات الضرورية للرد عليك أو معالجة طلبك أو إرسال التحديثات التي طلبتِ تلقيها."] },
        { title: "حقوقك", body: ["يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت."] },
      ],
    },
  },
} as const;

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);
  const t = translations[rawLocale];
  const path = pagePath(slug, rawLocale);

  if (
    path === "/chemine-avec-moi/accompagnements" ||
    path === "/chemine-avec-moi/formulaire-selection"
  ) {
    notFound();
  }

  if (rawLocale === "en" && englishMetadata[path]) {
    return {
      ...englishMetadata[path],
      openGraph: {
        locale: "en_US",
      },
    };
  }

  if (path.startsWith("/articles/") && slug?.[1]) {
    const article = await getArticleBySlug(slug[1]);
    return {
      title: article ? `${article.title} | AWENE` : `${t.articles.title} | AWENE`,
      description: article?.excerpt ?? t.articles.body,
    };
  }

  const title =
    path === "/articles"
      ? t.articles.title
      : path === "/evenements"
      ? t.events.title
      : path === "/coaching"
      ? t.pages.coaching.title
      : path === "/a-propos"
      ? t.pages.about.title
      : path === "/formations"
      ? rawLocale === "ar"
        ? "تكوينات AWENE"
        : "AWENE Training"
      : path === "/contact"
      ? t.pages.contact.title
      : "AWENE";

  return {
    title,
    description: path === "/" ? t.home.body : t.articles.body,
    openGraph: {
      locale: rawLocale === "ar" ? "ar_AR" : "en_US",
    },
  };
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale: rawLocale, slug } = await params;
  assertLocale(rawLocale);

  const locale = rawLocale;
  const t = translations[locale];
  const path = pagePath(slug, locale);

  if (
    path === "/chemine-avec-moi/accompagnements" ||
    path === "/chemine-avec-moi/formulaire-selection"
  ) {
    notFound();
  }

  if (locale === "en") {
    const englishPage = getEnglishPage(path);
    if (englishPage) {
      return <div dir="ltr">{englishPage}</div>;
    }
  }

  if (path === "/") {
    return <LocalizedHome locale={locale} />;
  }

  if (path === "/articles") {
    const articles = await getArticles(100, locale);
    return (
      <LocalizedShell locale={locale} title={t.articles.title} body={t.articles.body}>
        <ArticlesList
          articles={articles}
          labels={{
            empty: t.articles.empty,
            featured: t.articles.featured,
            all: t.articles.all,
          }}
        />
        <NewsletterBand
          headline={locale === "ar" ? "هل تهمك هذه المقالات؟" : "Want more articles like this?"}
          body={
            locale === "ar"
              ? "تلقي موارد موثوقة حول فترة ما قبل انقطاع الطمث وسن اليأس."
              : "Receive clear, reliable resources about perimenopause and menopause."
          }
        />
      </LocalizedShell>
    );
  }

  if (path.startsWith("/articles/") && slug?.[1]) {
    return <LocalizedArticle locale={locale} slug={slug[1]} />;
  }

  if (path === "/evenements") {
    const events = await getEvents();
    return (
      <LocalizedShell locale={locale} title={t.events.title} body={t.events.body}>
        <section className="py-16 md:py-24" style={{ background: "#FCFAF8" }}>
          <Container size="md">
            <h2
              className="text-4xl md:text-5xl font-bold mb-10 text-center"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {t.events.upcoming}
            </h2>
            {events.length > 0 ? (
              <div className="space-y-5">
                {events.map((event) => {
                  const imageSrc = eventImageSrc(event);
                  return (
                    <div
                      key={event.id}
                      className="rounded-3xl border bg-white overflow-hidden"
                      style={{ borderColor: "#E8DFF0" }}
                    >
                      {imageSrc && (
                        <div className="relative h-56 md:h-72">
                          <Image
                            src={imageSrc}
                            alt={event.image?.alt ?? event.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 768px, 100vw"
                          />
                        </div>
                      )}
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: event.color + "18",
                              color: event.color,
                              fontFamily: "var(--font-inter)",
                            }}
                          >
                            {event.type}
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                          >
                            {event.date}
                          </span>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-3"
                          style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-sm md:text-base leading-relaxed mb-5"
                          style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                        >
                          {event.description}
                        </p>
                        <Button
                          href={event.url ?? localizedPath("/contact", locale)}
                          variant="outline"
                          size="sm"
                          external={Boolean(event.url)}
                        >
                          {t.events.more}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p
                className="text-center"
                style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
              >
                {t.events.empty}
              </p>
            )}
          </Container>
        </section>
      </LocalizedShell>
    );
  }

  if (path === "/coaching") {
    return <TranslatedContentPage locale={locale} page={translatedPages[locale][path]} />;
  }

  if (path === "/a-propos") {
    return <TranslatedContentPage locale={locale} page={translatedPages[locale][path]} />;
  }

  if (path === "/contact") {
    if (locale === "en") {
      return <ContactPage locale="en" />;
    }
    return <TranslatedContentPage locale={locale} page={translatedPages[locale][path]} />;
  }

  const translatedPage =
    translatedPages[locale][path as keyof (typeof translatedPages)[typeof locale]];

  if (translatedPage) {
    return <TranslatedContentPage locale={locale} page={translatedPage} />;
  }

  notFound();
}

function TranslatedContentPage({
  locale,
  page,
}: {
  locale: Locale;
  page: {
    eyebrow: string;
    title: string;
    body: string;
    sections: readonly {
      title: string;
      body?: readonly string[];
      items?: readonly string[];
    }[];
  };
}) {
  const t = translations[locale];

  return (
    <div dir={t.dir}>
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {page.eyebrow}
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {page.title}
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              {page.body}
            </p>
          </div>
        </Container>
      </section>
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="group rounded-3xl border p-7 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_42px_rgba(111,63,214,0.12)]"
                style={{ borderColor: "#E8DFF0", background: "#FCFAF8" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-5 transition-colors duration-300 group-hover:text-[#6F3FD6]"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
                >
                  {section.title}
                </h2>
                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed mb-4 last:mb-0"
                    style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: "#2E2438", fontFamily: "var(--font-inter)" }}
                      >
                        <span
                          className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                          style={{ background: "#6F3FD6" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={localizedPath("/contact", locale)}>
              {translations[locale].nav.cta}
            </Button>
            <Button href={localizedPath("/articles", locale)} variant="outline">
              {translations[locale].nav.articles}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function LocalizedShell({
  locale,
  title,
  body,
  children,
}: {
  locale: Locale;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  const t = translations[locale];
  return (
    <div dir={t.dir}>
      <section className="relative overflow-hidden" style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              AWENE
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {title}
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              {body}
            </p>
          </div>
        </Container>
      </section>
      {children}
    </div>
  );
}

function LocalizedHome({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return (
    <div dir={t.dir}>
      <section style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {t.home.eyebrow}
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {t.home.title}
            </h1>
            <p
              className="text-xl md:text-2xl leading-relaxed max-w-3xl mb-10"
              style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
            >
              {t.home.body}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={localizedPath("/contact", locale)}>{t.home.primary}</Button>
              <Button href={localizedPath("/articles", locale)} variant="outline">
                {t.home.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.home.pillars.map(([title, body]) => (
              <div
                key={title}
                className="p-7 rounded-3xl border"
                style={{ borderColor: "#E8DFF0", background: "#FCFAF8" }}
              >
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#6F3FD6" }}
                >
                  {title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

async function LocalizedArticle({ locale, slug }: { locale: Locale; slug: string }) {
  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const imageSrc =
    article.image?.large ?? article.image?.full ?? article.image?.medium ?? article.image?.thumbnail;

  return (
    <div dir={translations[locale].dir}>
      <section style={{ background: "#FCFAF8" }}>
        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {article.categories.map((category) => (
                <span
                  key={category.slug}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "#F3ECFB",
                    color: "#6F3FD6",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}
            >
              {article.title}
            </h1>
            <p style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              {article.date} · {article.readTime}
            </p>
          </div>
        </Container>
      </section>
      {imageSrc && (
        <section style={{ background: "#FCFAF8" }}>
          <Container>
            <div className="h-72 md:h-[460px] rounded-3xl overflow-hidden relative">
              <Image
                src={imageSrc}
                alt={article.image?.alt ?? article.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1280px) 1120px, 100vw"
              />
            </div>
          </Container>
        </section>
      )}
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container size="md">
          <article className="cms-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </Container>
      </section>
    </div>
  );
}
