import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const prerender = false;
const brevoApiKey = "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";
const brevoListId = Number.parseInt("15", 10);
const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoSenderName = process.env.BREVO_SENDER_NAME || "Dr Amira Medimagh, AWENE";
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json"
  }
});
const cleanText = (value, maxLength = 5e3) => String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
const cleanTextarea = (value, maxLength = 5e3) => String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ").replace(/[<>]/g, "").replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, maxLength);
const cleanBoolean = (value) => value === true;
const cleanArray = (value, allowedValues2) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return [...new Set(value.map((entry) => cleanText(entry, 80)).filter((entry) => allowedValues2.includes(entry)))];
};
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isNumericAge = (value) => /^\d+$/.test(value);
const getGuidePdfUrl = (requestUrl) => {
  const configuredPdfUrl = process.env.AWENE_GUIDE_PDF_URL;
  if (configuredPdfUrl) {
    return configuredPdfUrl;
  }
  return new URL("/pdfs/AWENE_recap_Masterclass_12_Avril.pdf", requestUrl).toString();
};
const brevoRequest = async (endpoint, payload) => {
  if (!brevoSenderEmail) {
    throw new Error("Missing Brevo configuration.");
  }
  const response = await fetch(`https://api.brevo.com/v3/${endpoint}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo request failed (${endpoint}): ${response.status} ${body}`);
  }
  return response;
};
const addContactToBrevoList = async (payload) => {
  await brevoRequest("contacts", {
    email: payload.email,
    listIds: [brevoListId],
    updateEnabled: true
  });
};
const sendGuideEmail = async (payload, requestUrl) => {
  const guidePdfUrl = getGuidePdfUrl(requestUrl);
  const subject = "Votre guide récapitulatif AWENE";
  const textContent = [
    "Bonjour,",
    "",
    "Merci pour votre retour.",
    "Comme promis, je vous partage le guide récapitulatif de la masterclass :",
    `Accéder au guide : ${guidePdfUrl}`,
    "",
    "Ce document a été conçu pour vous accompagner après cette session, en vous aidant à :",
    "- mieux comprendre ce qui se passe dans votre corps",
    "- mettre des mots sur ce que vous ressentez",
    "- faire le lien entre vos symptômes et les mécanismes en jeu",
    "- identifier des premières actions adaptées à votre situation",
    "",
    "Prenez le temps de le parcourir à votre rythme.",
    "Il ne s’agit pas de tout appliquer immédiatement, mais plutôt de commencer à observer, comprendre… et avancer progressivement.",
    "Beaucoup de femmes réalisent à ce moment-là qu’elles ne manquent pas d’informations,",
    "mais plutôt d’un accompagnement adapté à leur propre réalité.",
    "C’est un point que j’aborderai dans les prochaines communications.",
    "D’ici là, prenez soin de vous et de votre énergie.",
    "",
    "Bien à vous,",
    "Dr Amira Médimagh, AWENE"
  ].join("\n");
  const htmlContent = `
    <html>
      <body style="margin:0;padding:32px;background:#FFF4F8;font-family:Inter,Arial,sans-serif;color:#3D3142;">
        <div style="max-width:620px;margin:0 auto;background:#FFFAF4;border-radius:24px;padding:32px;">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#F04FB9;font-weight:700;">AWENE</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Bonjour,</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Merci pour votre retour.</p>
          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">
            Comme promis, je vous partage le guide récapitulatif de la masterclass :
          </p>
          <p style="margin:0 0 24px;">
            <a
              href="${guidePdfUrl}"
              style="display:inline-block;padding:14px 20px;border-radius:999px;background:linear-gradient(135deg, #9B5CFF 0%, #F04FB9 50%, #FF7D4D 100%);color:#FFFAF4;text-decoration:none;font-weight:700;"
            >
              Accéder au guide PDF
            </a>
          </p>
          <div style="margin:0 0 24px;padding:20px;border-radius:20px;background:#FAF7FB;">
            <p style="margin:0 0 12px;font-size:16px;line-height:1.7;">Ce document a été conçu pour vous accompagner après cette session, en vous aidant à :</p>
            <ul style="margin:0;padding-left:20px;color:#5F5562;line-height:1.8;">
              <li>mieux comprendre ce qui se passe dans votre corps</li>
              <li>mettre des mots sur ce que vous ressentez</li>
              <li>faire le lien entre vos symptômes et les mécanismes en jeu</li>
              <li>identifier des premières actions adaptées à votre situation</li>
            </ul>
          </div>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Prenez le temps de le parcourir à votre rythme.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Il ne s’agit pas de tout appliquer immédiatement, mais plutôt de commencer à observer, comprendre… et avancer progressivement.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Beaucoup de femmes réalisent à ce moment-là qu’elles ne manquent pas d’informations, mais plutôt d’un accompagnement adapté à leur propre réalité.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            C’est un point que j’aborderai dans les prochaines communications.
          </p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;">
            D’ici là, prenez soin de vous et de votre énergie.
          </p>
          <p style="margin:0;font-size:16px;line-height:1.7;">
            Bien à vous,<br />
            Dr Amira Médimagh, AWENE
          </p>
        </div>
      </body>
    </html>
  `;
  await brevoRequest("smtp/email", {
    sender: {
      name: brevoSenderName,
      email: brevoSenderEmail
    },
    to: [
      {
        email: payload.email
      }
    ],
    subject,
    htmlContent,
    textContent
  });
};
const allowedValues = {
  profile_stage: [
    "Périménopause",
    "Ménopause",
    "Je ne sais pas"
  ],
  satisfaction_global: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
  expectations_met: ["Oui, totalement", "Partiellement", "Pas du tout"],
  explanations_clarity: ["Très claire", "Moyennement claire", "Peu claire"],
  content_relevance: ["Très pertinent", "Pertinent", "Moyennement utile", "Peu utile"],
  masterclass_pace: ["Très bien adapté", "Trop rapide", "Trop lent"],
  impact_after_masterclass: [
    "Beaucoup plus informée et confiante",
    "Un peu plus éclairée",
    "Pas vraiment changée"
  ],
  apply_advice: ["Oui, immédiatement", "Oui, en partie", "Peut-être", "Non"],
  interested_in_support: ["Oui, absolument", "Oui, probablement", "Peut-être", "Non"],
  preferred_format: [
    "Programme en ligne",
    "Accompagnement en groupe",
    "Coaching individuel",
    "Ateliers pratiques",
    "Application en ligne",
    "Je ne sais pas"
  ],
  symptoms: [
    "Fatigue",
    "Troubles du sommeil",
    "Prise de poids",
    "Variations d’humeur",
    "Bouffées de chaleur",
    "Symptoms génito-urinaires",
    "Autre"
  ]
};
const sanitizePayload = (raw) => ({
  full_name: cleanText(raw.full_name, 160),
  profile_stage: cleanText(raw.profile_stage, 40),
  age_text: cleanText(raw.age_text, 40),
  address_text: cleanText(raw.address_text, 160),
  profession_text: cleanText(raw.profession_text, 160),
  satisfaction_global: cleanText(raw.satisfaction_global, 40),
  expectations_met: cleanText(raw.expectations_met, 40),
  explanations_clarity: cleanText(raw.explanations_clarity, 40),
  content_relevance: cleanText(raw.content_relevance, 40),
  masterclass_pace: cleanText(raw.masterclass_pace, 40),
  impact_after_masterclass: cleanText(raw.impact_after_masterclass, 120),
  apply_advice: cleanText(raw.apply_advice, 40),
  symptoms: cleanArray(raw.symptoms, allowedValues.symptoms),
  symptoms_other: cleanText(raw.symptoms_other, 200),
  interested_in_support: cleanText(raw.interested_in_support, 40),
  preferred_format: cleanText(raw.preferred_format, 80),
  most_appreciated: cleanTextarea(raw.most_appreciated, 3e3),
  improvement_suggestions: cleanTextarea(raw.improvement_suggestions, 3e3),
  email: cleanText(raw.email, 320).toLowerCase(),
  consent_to_contact: cleanBoolean(raw.consent_to_contact)
});
const validatePayload = (payload, rawInput) => {
  const fieldErrors = {};
  const requiredFields = [
    "profile_stage",
    "age_text",
    "address_text",
    "profession_text",
    "satisfaction_global",
    "expectations_met",
    "explanations_clarity",
    "content_relevance",
    "masterclass_pace",
    "impact_after_masterclass",
    "apply_advice",
    "interested_in_support",
    "preferred_format",
    "email"
  ];
  for (const field of requiredFields) {
    if (!payload[field]) {
      fieldErrors[field] = "Ce champ est requis.";
    }
  }
  if (!payload.symptoms.length) {
    fieldErrors.symptoms = "Sélectionnez au moins un symptôme.";
  }
  if (Array.isArray(rawInput.symptoms)) {
    const invalidSymptoms = rawInput.symptoms.map((value) => cleanText(value, 80)).filter((value) => !allowedValues.symptoms.includes(value));
    if (invalidSymptoms.length > 0) {
      fieldErrors.symptoms = `Valeur invalide. Valeurs autorisées: ${allowedValues.symptoms.join(" | ")}.`;
    }
  }
  if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Adresse email invalide.";
  }
  if (!isNumericAge(payload.age_text)) {
    fieldErrors.age_text = "L'âge doit contenir uniquement des chiffres.";
  }
  if (payload.symptoms.includes("Autre") && !payload.symptoms_other) {
    fieldErrors.symptoms_other = "Merci de préciser le symptôme autre.";
  }
  if (!payload.symptoms.includes("Autre") && payload.symptoms_other) {
    fieldErrors.symptoms_other = "Le champ autre ne peut être rempli que si Autre est sélectionné.";
  }
  for (const [field, values] of Object.entries(allowedValues)) {
    if (field === "symptoms") {
      continue;
    }
    if (!values.includes(payload[field])) {
      fieldErrors[field] = `Valeur invalide. Valeurs autorisées: ${values.join(" | ")}.`;
    }
  }
  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors
  };
};
const GET = async () => json({ error: "Method not allowed." }, 405);
const POST = async ({ request, url }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }
  const sanitized = sanitizePayload(body ?? {});
  const { valid, fieldErrors } = validatePayload(sanitized, body ?? {});
  if (!valid) {
    return json(
      {
        error: "Merci de corriger les champs requis.",
        fieldErrors
      },
      400
    );
  }
  const payload = {
    ...sanitized,
    symptoms_other: sanitized.symptoms.includes("Autre") ? sanitized.symptoms_other : "",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  delete payload.full_name;
  try {
    const { error } = await supabase.from("awene_masterclass_feedback").insert([payload]);
    if (error) {
      console.error("[awene-feedback] supabase_insert_failed", {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return json({ error: "Impossible d'enregistrer votre réponse pour le moment." }, 500);
    }
    await addContactToBrevoList(payload);
    await sendGuideEmail(payload, url);
    return json({
      ok: true,
      message: "Je vous enverrai ensuite le guide récapitulatif de la masterclass. Pensez à vérifier votre dossier spam si vous ne le recevez pas."
    });
  } catch (error) {
    console.error("[awene-feedback] request_failed", {
      message: error instanceof Error ? error.message : "unknown_error"
    });
    return json({ error: "Une erreur serveur est survenue." }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
