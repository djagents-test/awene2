import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID ?? 15);

function welcomeEmailHtml(locale: "fr" | "en") {
  const isEn = locale === "en";
  const articlesHref = isEn ? `${SITE_URL}/en/articles` : `${SITE_URL}/fr/articles`;
  const footer = isEn
    ? "AWENE supports women through perimenopause and menopause with a science-rooted, deeply human approach."
    : "AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique et profondément humaine.";

  return `
    <!doctype html>
    <html lang="${locale}">
      <body style="margin:0;padding:0;background:#f8f4fb;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:radial-gradient(circle at top left,rgba(246,139,44,0.14),transparent 34%),radial-gradient(circle at top right,rgba(111,63,214,0.18),transparent 40%),linear-gradient(180deg,#fcfaf8 0%,#f6f0fb 100%);margin:0;padding:28px 14px 40px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;">
                <tr>
                  <td style="padding:0 0 18px 0;text-align:center;">
                    <img src="${SITE_URL}/AWENE.png" alt="AWENE" width="52" height="52" style="display:block;margin:0 auto 14px auto;border:0;outline:none;text-decoration:none;" />
                    <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2.8px;text-transform:uppercase;color:#8f7aa8;">
                      ${isEn ? "Newsletter" : "Newsletter"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background:rgba(255,255,255,0.92);border:1px solid rgba(232,223,240,0.9);border-radius:28px;padding:42px 38px 30px;box-shadow:0 18px 60px rgba(111,63,214,0.08);">
                    <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:40px;line-height:1.08;font-weight:700;color:#2e2438;">
                      ${isEn ? "Welcome to AWENE." : "Bienvenue dans AWENE."}
                    </h1>
                    <div style="width:72px;height:3px;border-radius:999px;background:linear-gradient(90deg,#f68b2c 0%,#6f3fd6 100%);margin:0 0 22px 0;"></div>
                    <p style="margin:0 0 14px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${isEn
                        ? "You&rsquo;re now subscribed to the AWENE newsletter."
                        : "Vous êtes désormais inscrite à la newsletter AWENE."}
                    </p>
                    <div style="margin:24px 0;padding:22px 22px;background:linear-gradient(135deg,rgba(243,236,251,0.92) 0%,rgba(254,243,232,0.92) 100%);border-radius:22px;">
                      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#4a3c59;">
                        ${isEn
                          ? "Every week, science-grounded writing on perimenopause and menopause, hormones, the nervous system and women&rsquo;s health. Straight to your inbox."
                          : "Chaque semaine, des informations fiables et scientifiquement fondées sur la périménopause, la ménopause, les hormones, le système nerveux et la santé féminine. Directement dans votre boîte mail."}
                      </p>
                    </div>
                    <p style="margin:0 0 28px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${isEn
                        ? "In the meantime, explore our articles and resources."
                        : "En attendant, explorez nos articles et ressources."}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 26px 0;">
                      <tr>
                        <td style="border-radius:999px;background:linear-gradient(135deg,#6f3fd6 0%,#8e52f1 100%);box-shadow:0 10px 24px rgba(111,63,214,0.22);">
                          <a href="${articlesHref}" style="display:inline-block;padding:14px 24px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
                            ${isEn ? "Read the articles" : "Lire les articles"}
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

export async function POST(request: Request) {
  try {
    const { email, locale } = (await request.json()) as { email?: string; locale?: string };
    const normalizedLocale: "fr" | "en" = locale === "en" ? "en" : "fr";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (!BREVO_API_KEY) {
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    // Add contact to Brevo list
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
      cache: "no-store",
    });

    // Send welcome confirmation email
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "AWENE", email: "contact@awene.net" },
        to: [{ email }],
        subject: normalizedLocale === "en"
          ? "Welcome to the AWENE newsletter"
          : "Bienvenue dans la newsletter AWENE",
        htmlContent: welcomeEmailHtml(normalizedLocale),
        textContent: normalizedLocale === "en"
          ? `Welcome to AWENE.\n\nYou're now subscribed to the AWENE newsletter. Every week, science-grounded writing on perimenopause, menopause, hormones and women's health.\n\nAWENE`
          : `Bienvenue dans AWENE.\n\nVous êtes désormais inscrite à la newsletter AWENE. Chaque semaine, des informations fiables sur la périménopause, la ménopause, les hormones et la santé féminine.\n\nAWENE`,
      }),
      cache: "no-store",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Signup failed. Please try again." }, { status: 500 });
  }
}
