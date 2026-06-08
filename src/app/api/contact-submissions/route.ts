import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const CMS_API_BASE =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  "https://cms.awene.net/wp-json/wp/v2";
const BREVO_API_KEY = process.env.BREVO_API_KEY;

type ContactSubmissionBody = {
  first_name?: string;
  email?: string;
  subject?: string;
  message?: string;
  locale?: string;
  source_page?: string;
  website?: string;
  [key: string]: unknown;
};

function payloadMessage(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string" &&
    payload.message.trim() !== ""
  ) {
    return payload.message.trim();
  }

  return fallback;
}

function emailShell({
  eyebrow,
  headline,
  intro,
  detail,
  closing,
  ctaLabel,
  locale,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  detail: string;
  closing: string;
  ctaLabel: string;
  locale: "fr" | "en";
}) {
  const ctaHref = locale === "en" ? `${SITE_URL}/en/articles` : `${SITE_URL}/fr/articles`;
  const footer = locale === "en"
    ? "AWENE supports women through perimenopause and menopause with a science-rooted, deeply human approach."
    : "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique et profondément humaine.";

  return `
    <!doctype html>
    <html lang="${locale}">
      <body style="margin:0;padding:0;background:#f8f4fb;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:
          radial-gradient(circle at top left, rgba(246,139,44,0.14), transparent 34%),
          radial-gradient(circle at top right, rgba(111,63,214,0.18), transparent 40%),
          linear-gradient(180deg, #fcfaf8 0%, #f6f0fb 100%);
          margin:0;padding:28px 14px 40px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;">
                <tr>
                  <td style="padding:0 0 18px 0;text-align:center;">
                    <img
                      src="${SITE_URL}/AWENE.png"
                      alt="AWENE"
                      width="52"
                      height="52"
                      style="display:block;margin:0 auto 14px auto;border:0;outline:none;text-decoration:none;"
                    />
                    <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2.8px;text-transform:uppercase;color:#8f7aa8;">
                      ${eyebrow}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background:rgba(255,255,255,0.92);border:1px solid rgba(232,223,240,0.9);border-radius:28px;padding:42px 38px 30px;box-shadow:0 18px 60px rgba(111,63,214,0.08);">
                    <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:40px;line-height:1.08;font-weight:700;color:#2e2438;">
                      ${headline}
                    </h1>
                    <div style="width:72px;height:3px;border-radius:999px;background:linear-gradient(90deg,#f68b2c 0%,#6f3fd6 100%);margin:0 0 22px 0;"></div>
                    <p style="margin:0 0 14px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${intro}
                    </p>
                    <div style="margin:24px 0;padding:22px 22px;background:linear-gradient(135deg, rgba(243,236,251,0.92) 0%, rgba(254,243,232,0.92) 100%);border-radius:22px;">
                      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#4a3c59;">
                        ${detail}
                      </p>
                    </div>
                    <p style="margin:0 0 28px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${closing}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 26px 0;">
                      <tr>
                        <td bgcolor="#6f3fd6" style="border-radius:999px;background:#6f3fd6;box-shadow:0 10px 24px rgba(111,63,214,0.22);">
                          <a
                            href="${ctaHref}"
                            style="display:inline-block;padding:14px 24px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;mso-padding-alt:14px 24px;"
                          >
                            ${ctaLabel}
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#8f7aa8;">
                      ${footer}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function confirmationEmailContent(locale: string, firstName: string) {
  if (locale === "en") {
    return {
      subject: "We received your message | AWENE",
      html: emailShell({
        eyebrow: "Message received",
        headline: `Hello ${firstName || "there"},`,
        intro: "Thank you for your message. It has been received and added to our inbox successfully.",
        detail:
          "At AWENE, every message is read with care and answered personally. If you wrote to us about support, training, or a collaboration, we will come back to you as soon as possible.",
        closing: "In the meantime, you can continue exploring AWENE’s articles and resources.",
        ctaLabel: "Read the articles",
        locale: "en",
      }),
      text: `Hello ${firstName || "there"},\n\nThank you for your message. We have received it and will get back to you as soon as possible.\n\nAt AWENE, every message is read carefully and answered personally.\n\nWarmly,\nAWENE`,
    };
  }

  return {
    subject: "Nous avons bien reçu votre message | AWENE",
    html: emailShell({
      eyebrow: "Message bien reçu",
      headline: `Bonjour ${firstName || ""},`,
      intro: "Merci pour votre message. Il a bien été reçu et ajouté à notre boîte de réception.",
      detail:
        "Chez AWENE, chaque message est lu avec attention et reçoit une réponse personnelle. Si vous nous avez écrit au sujet d’un accompagnement, d’une formation ou d’une collaboration, nous reviendrons vers vous dès que possible.",
      closing: "En attendant, vous pouvez continuer à explorer les articles et ressources AWENE.",
      ctaLabel: "Lire les articles",
      locale: "fr",
    }),
    text: `Bonjour ${firstName || ""},\n\nMerci pour votre message. Nous l’avons bien reçu et nous vous répondrons dès que possible.\n\nChez AWENE, chaque message est lu avec attention et reçoit une réponse personnelle.\n\nBien à vous,\nAWENE`,
  };
}

function restUrl(path: string) {
  if (!CMS_API_BASE) {
    throw new Error("WORDPRESS_API_URL is required.");
  }

  const api = new URL(CMS_API_BASE);
  const wpJsonIndex = api.pathname.indexOf("/wp-json/");
  const restPath =
    wpJsonIndex >= 0
      ? api.pathname.slice(0, wpJsonIndex + "/wp-json/".length)
      : "/wp-json/";
  const url = new URL(api.origin);
  url.pathname = `${restPath}${path.replace(/^\//, "")}`;
  return url.toString();
}

async function sendBrevoConfirmationEmail(body: ContactSubmissionBody) {
  if (!BREVO_API_KEY) {
    return { ok: false, reason: "missing_api_key" as const };
  }

  const locale = body.locale === "en" ? "en" : "fr";
  const firstName = String(body.first_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const content = confirmationEmailContent(locale, firstName);

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "AWENE",
        email: "contact@awene.net",
      },
      to: [
        {
          email,
          name: firstName || undefined,
        },
      ],
      subject: content.subject,
      htmlContent: content.html,
      textContent: content.text,
    }),
    cache: "no-store",
  });

  return {
    ok: response.ok,
    reason: response.ok ? null : "brevo_request_failed",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactSubmissionBody;

    if (!body.first_name || !body.email || !body.message) {
      return NextResponse.json(
        { message: "Merci de renseigner un prénom, un email et un message." },
        { status: 400 },
      );
    }

    const response = await fetch(restUrl("awene/v1/contact-submissions"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { ...payload, message: payloadMessage(payload, "Le message n'a pas pu être envoyé.") },
        { status: response.status },
      );
    }

    let emailResult = { ok: false, reason: "skipped" as string | null };
    try {
      emailResult = await sendBrevoConfirmationEmail(body);
    } catch (error) {
      console.error("Brevo confirmation email failed", error);
      emailResult = { ok: false, reason: "brevo_request_failed" };
    }

    return NextResponse.json(
      {
        ...payload,
        confirmation_email_sent: emailResult.ok,
        confirmation_email_error: emailResult.ok ? null : emailResult.reason,
      },
      { status: response.status },
    );
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json(
      { message: "Le message n'a pas pu être envoyé." },
      { status: 500 },
    );
  }
}
