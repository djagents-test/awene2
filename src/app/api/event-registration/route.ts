import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const CMS_SITE_BASE =
  process.env.NEXT_PUBLIC_AWENE_CMS_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, "") ??
  process.env.WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, "") ??
  "https://cms.awene.net";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? "contact@awene.net";
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME ?? "AWENE";
const BREVO_REPLY_TO_EMAIL = process.env.BREVO_REPLY_TO_EMAIL ?? BREVO_SENDER_EMAIL;

type RegistrationBody = {
  eventId?: number | string;
  eventTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  language?: string;
  website?: string;
};

type EventApiPayload = {
  id: number;
  slug: string;
  title: string;
  date?: string;
  date_label?: string;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  time_label?: string;
  type?: string;
  language?: string;
  onlineUrl?: string;
  online_url?: string;
  locationLabel?: string;
  location?: { name?: string; address?: string } | string;
  locationType?: string;
  registration_url?: string;
  timezone?: string;
};

type RegistrationSuccessPayload = {
  registrationId: number;
  eventId: number;
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  language: "fr" | "en";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  locationLabel: string;
  calendarUrl?: string;
  confirmationEmailSent: boolean;
  successSource: "wordpress" | "next-fallback";
};

function restUrl(path: string) {
  const base = CMS_SITE_BASE.replace(/\/$/, "");
  return `${base}/wp-json/${path.replace(/^\//, "")}`;
}

function localeFrom(value?: string) {
  return value === "en" ? "en" : "fr";
}

function eventPublicUrl(event: EventApiPayload, locale: "fr" | "en") {
  if (event.registration_url) return event.registration_url;
  const path = locale === "en" ? `/en/events/${event.slug}` : `/fr/evenements/${event.slug}`;
  return `${SITE_URL}${path}`;
}

function eventLocationLabel(event: EventApiPayload, locale: "fr" | "en") {
  if (event.locationLabel && event.locationLabel.trim()) return event.locationLabel.trim();
  if (typeof event.location === "string" && event.location.trim()) return event.location.trim();
  if (event.location && typeof event.location === "object") {
    const combined = [event.location.name, event.location.address].filter(Boolean).join(", ").trim();
    if (combined) return combined;
  }
  const online = event.onlineUrl ?? event.online_url;
  if (online) return online;
  return locale === "en" ? "Online" : "En ligne";
}

function eventTimeLabel(event: EventApiPayload) {
  if (event.time_label?.trim()) return event.time_label.trim();
  if (event.start_time && event.end_time) return `${event.start_time} – ${event.end_time}`;
  return event.start_time ?? "";
}

function eventDateLabel(event: EventApiPayload) {
  return event.date_label?.trim() || event.date?.trim() || "";
}

function confirmationEmailHtml({
  locale,
  firstName,
  event,
  publicUrl,
  calendarUrl,
  locationLabel,
  deliveryNote,
}: {
  locale: "fr" | "en";
  firstName: string;
  event: EventApiPayload;
  publicUrl: string;
  calendarUrl: string;
  locationLabel: string;
  deliveryNote: string;
}) {
  const isEn = locale === "en";
  const title = event.title;
  const date = eventDateLabel(event);
  const time = eventTimeLabel(event);
  const type = event.type || (isEn ? "Event" : "Événement");
  const badge = isEn ? "Registration confirmed" : "Inscription confirmée";
  const heading = isEn ? "Your registration is confirmed." : "Votre inscription est confirmée.";
  const greeting = firstName ? (isEn ? `Hello ${firstName},` : `Bonjour ${firstName},`) : isEn ? "Hello," : "Bonjour,";
  const intro = isEn
    ? `Thank you for registering for “${title}”. Your spot has been saved.`
    : `Merci pour votre inscription à l’événement « ${title} ». Votre place est bien enregistrée.`;
  const detailsTitle = isEn ? "Event details" : "Détails de l’événement";
  const ctaCalendar = isEn ? "Add to my calendar" : "Ajouter à mon calendrier";
  const ctaEvent = isEn ? "View event" : "Voir l’événement";
  const footer = isEn
    ? "Clear, human and structured support for women in transition."
    : "Un accompagnement clair, humain et structuré pour les femmes en transition.";

  return `
    <!doctype html>
    <html lang="${locale}">
      <body style="margin:0;padding:0;background:#faf7f2;">
        <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;">
          ${isEn ? `Thank you ${firstName || "there"}, your registration for this AWENE event is confirmed.` : `Merci ${firstName || ""}, votre inscription à l’événement AWENE est bien confirmée.`}
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:radial-gradient(circle at top left,rgba(246,139,44,0.14),transparent 34%),radial-gradient(circle at top right,rgba(111,63,214,0.18),transparent 40%),linear-gradient(180deg,#fcfaf8 0%,#f6f0fb 100%);margin:0;padding:28px 14px 40px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;">
                <tr>
                  <td style="padding:0 0 18px 0;text-align:center;">
                    <img src="${SITE_URL}/AWENE.png" alt="AWENE" width="52" height="52" style="display:block;margin:0 auto 14px auto;border:0;outline:none;text-decoration:none;" />
                  </td>
                </tr>
                <tr>
                  <td style="background:rgba(255,255,255,0.94);border:1px solid rgba(232,223,240,0.9);border-radius:28px;padding:42px 38px 30px;box-shadow:0 18px 60px rgba(111,63,214,0.08);">
                    <span style="display:inline-block;background:#f4ebfd;color:#6f3fd6;border-radius:999px;padding:6px 12px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                      ${badge}
                    </span>
                    <h1 style="margin:18px 0 14px 0;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.08;font-weight:700;color:#2e2438;">
                      ${heading}
                    </h1>
                    <p style="margin:0 0 14px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${greeting}
                    </p>
                    <p style="margin:0 0 24px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#4a3c59;">
                      ${intro}
                    </p>
                    <div style="margin:24px 0;padding:22px;background:linear-gradient(135deg,rgba(243,236,251,0.92) 0%,rgba(254,243,232,0.92) 100%);border:1px solid rgba(232,223,240,0.9);border-radius:22px;">
                      <p style="margin:0 0 12px 0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8f7aa8;">
                        ${detailsTitle}
                      </p>
                      <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#2e2438;"><strong>${isEn ? "Date:" : "Date :"}</strong> ${date}</p>
                      <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#2e2438;"><strong>${isEn ? "Time:" : "Horaire :"}</strong> ${time}</p>
                      <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#2e2438;"><strong>${isEn ? "Location:" : "Lieu :"}</strong> ${locationLabel}</p>
                      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#2e2438;"><strong>${isEn ? "Type:" : "Type :"}</strong> ${type}</p>
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
                      <tr>
                        <td bgcolor="#f68b2c" style="border-radius:999px;background:#f68b2c;box-shadow:0 10px 24px rgba(246,139,44,0.22);">
                          <a href="${calendarUrl}" style="display:inline-block;padding:14px 24px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
                            ${ctaCalendar}
                          </a>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px 0;">
                      <tr>
                        <td style="border:1px solid rgba(232,223,240,0.9);border-radius:999px;background:#ffffff;">
                          <a href="${publicUrl}" style="display:inline-block;padding:14px 24px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#2e2438;text-decoration:none;border-radius:999px;">
                            ${ctaEvent}
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0 0 24px 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#4a3c59;">
                      ${deliveryNote}
                    </p>
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

function confirmationEmailText({
  locale,
  firstName,
  event,
  publicUrl,
  locationLabel,
  deliveryNote,
}: {
  locale: "fr" | "en";
  firstName: string;
  event: EventApiPayload;
  publicUrl: string;
  locationLabel: string;
  deliveryNote: string;
}) {
  const isEn = locale === "en";
  const greeting = firstName ? (isEn ? `Hello ${firstName},` : `Bonjour ${firstName},`) : isEn ? "Hello," : "Bonjour,";
  return [
    greeting,
    "",
    isEn ? `Thank you for registering for “${event.title}”.` : `Merci pour votre inscription à l’événement « ${event.title} ».`,
    isEn ? "Your spot has been saved." : "Votre place est bien enregistrée.",
    "",
    isEn ? "Event details:" : "Détails de l’événement :",
    `${isEn ? "Date" : "Date"}: ${eventDateLabel(event)}`,
    `${isEn ? "Time" : "Horaire"}: ${eventTimeLabel(event)}`,
    `${isEn ? "Location" : "Lieu"}: ${locationLabel}`,
    `${isEn ? "Type" : "Type"}: ${event.type || (isEn ? "Event" : "Événement")}`,
    "",
    deliveryNote,
    "",
    publicUrl,
    "",
    "AWENE",
  ].join("\n");
}

function icsDate(date?: string, time?: string) {
  if (!date || !time) return "";
  const normalizedTime = time.slice(0, 5);
  const iso = `${date}T${normalizedTime}:00`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hour = String(parsed.getHours()).padStart(2, "0");
  const minute = String(parsed.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function icsEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function buildIcs(event: EventApiPayload, locale: "fr" | "en", publicUrl: string, hasPhone: boolean) {
  const start = icsDate(event.start_date, event.start_time);
  const end = icsDate(event.end_date || event.start_date, event.end_time || event.start_time);
  if (!start || !end) return null;
  const timezone = event.timezone || "Africa/Tunis";
  const location = eventLocationLabel(event, locale);
  const description = hasPhone
    ? locale === "en"
      ? "Your registration for this AWENE event is confirmed. The masterclass link will be sent to you by email and WhatsApp before the event."
      : "Votre inscription à l’événement AWENE est confirmée. Le lien de la masterclass vous sera envoyé par email et WhatsApp avant l’événement."
    : locale === "en"
      ? "Your registration for this AWENE event is confirmed. The masterclass link will be sent to you by email before the event."
      : "Votre inscription à l’événement AWENE est confirmée. Le lien de la masterclass vous sera envoyé par email avant l’événement.";

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AWENE//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-${event.slug}@awene.net`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART;TZID=${timezone}:${start}`,
    `DTEND;TZID=${timezone}:${end}`,
    `SUMMARY:${icsEscape(event.title)}`,
    `DESCRIPTION:${icsEscape(`${description}\n${publicUrl}`)}`,
    `LOCATION:${icsEscape(location)}`,
    `URL:${icsEscape(publicUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    filename: `awene-event-${event.slug}.ics`,
    content,
  };
}

async function fetchEvent(eventId: number) {
  const response = await fetch(restUrl(`awene/v1/events/${eventId}`), { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as EventApiPayload;
}

function buildRegistrationSuccessPayload({
  locale,
  body,
  event,
  registrationId,
  confirmationEmailSent,
}: {
  locale: "fr" | "en";
  body: RegistrationBody;
  event: EventApiPayload | null;
  registrationId: number;
  confirmationEmailSent: boolean;
}): RegistrationSuccessPayload {
  const eventId = Number(body.eventId ?? event?.id ?? 0);
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (event) {
    return {
      registrationId,
      eventId: event.id,
      eventSlug: event.slug ?? "",
      eventTitle: event.title,
      eventDate: eventDateLabel(event),
      startTime: event.start_time ?? "",
      endTime: event.end_time ?? "",
      language: locale,
      firstName,
      lastName,
      email,
      phone,
      locationLabel: eventLocationLabel(event, locale),
      calendarUrl: event.start_date && event.start_time
        ? `${CMS_SITE_BASE.replace(/\/$/, "")}/wp-json/awene/v1/events/${event.id}/calendar.ics`
        : undefined,
      confirmationEmailSent,
      successSource: "wordpress",
    };
  }

  return {
    registrationId,
    eventId,
    eventSlug: "",
    eventTitle: String(body.eventTitle ?? "").trim(),
    eventDate: "",
    startTime: "",
    endTime: "",
    language: locale,
    firstName,
    lastName,
    email,
    phone,
    locationLabel: locale === "en" ? "To be confirmed by email" : "Confirmation envoyée par email",
    calendarUrl: undefined,
    confirmationEmailSent,
    successSource: "next-fallback",
  };
}

async function sendConfirmationEmail({
  locale,
  firstName,
  email,
  phone,
  event,
}: {
  locale: "fr" | "en";
  firstName: string;
  email: string;
  phone: string;
  event: EventApiPayload;
}) {
  if (!BREVO_API_KEY) {
    console.error("[AWENE] BREVO_API_KEY missing for event confirmation email");
    return { ok: false as const, reason: "missing_api_key" as const };
  }

  const publicUrl = eventPublicUrl(event, locale);
  const locationLabel = eventLocationLabel(event, locale);
  const deliveryNote = phone.trim()
    ? locale === "en"
      ? "You will receive the masterclass link by email and WhatsApp before the event."
      : "Vous recevrez le lien de la masterclass par email et WhatsApp avant l’événement."
    : locale === "en"
      ? "You will receive the masterclass link by email before the event."
      : "Vous recevrez le lien de la masterclass par email avant l’événement.";

  const htmlContent = confirmationEmailHtml({
    locale,
    firstName,
    event,
    publicUrl,
    calendarUrl: `${CMS_SITE_BASE.replace(/\/$/, "")}/wp-json/awene/v1/events/${event.id}/calendar.ics`,
    locationLabel,
    deliveryNote,
  });

  const textContent = confirmationEmailText({
    locale,
    firstName,
    event,
    publicUrl,
    locationLabel,
    deliveryNote,
  });

  const ics = buildIcs(event, locale, publicUrl, Boolean(phone.trim()));

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL,
      },
      replyTo: {
        email: BREVO_REPLY_TO_EMAIL,
      },
      to: [
        {
          email,
          name: firstName || undefined,
        },
      ],
      subject: locale === "en"
        ? `Your registration for ${event.title} is confirmed`
        : `Votre inscription à ${event.title} est confirmée`,
      htmlContent,
      textContent,
      attachment: ics
        ? [
            {
              name: ics.filename,
              content: Buffer.from(ics.content, "utf8").toString("base64"),
            },
          ]
        : undefined,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("[AWENE] Event confirmation email failed", {
      status: response.status,
      eventId: event.id,
      email,
      errorText,
    });
  }

  return {
    ok: response.ok,
    reason: response.ok ? null : "brevo_request_failed",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationBody;
    const locale = localeFrom(body.language);
    const logContext = {
      eventId: Number(body.eventId ?? 0),
      email: String(body.email ?? "").trim(),
      locale,
    };

    console.info("[AWENE] Registration submitted", logContext);

    if (!body.eventId || !body.firstName || !body.lastName || !body.email || !body.consent) {
      return NextResponse.json(
        { message: "Missing required registration fields." },
        { status: 400 },
      );
    }

    const response = await fetch(restUrl("awene/v1/registrations"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    const registrationId = Number(payload.registrationId ?? 0);
    console.info("[AWENE] Registration saved", {
      ...logContext,
      registrationId,
      wordpressStatus: response.status,
    });
    console.info("[AWENE] Registration ID returned", {
      ...logContext,
      registrationId,
    });

    let event: EventApiPayload | null = null;
    try {
      event = await fetchEvent(Number(body.eventId));
    } catch (error) {
      console.error("[AWENE] Event fetch failed after registration save", {
        ...logContext,
        registrationId,
        error,
      });
    }

    let confirmationEmailSent = false;
    let confirmationEmailError: string | null = null;

    if (event) {
      console.info("[AWENE] Confirmation email attempt", {
        ...logContext,
        registrationId,
      });

      try {
        const emailResult = await sendConfirmationEmail({
          locale,
          firstName: String(body.firstName ?? "").trim(),
          email: String(body.email ?? "").trim(),
          phone: String(body.phone ?? "").trim(),
          event,
        });
        confirmationEmailSent = emailResult.ok;
        confirmationEmailError = emailResult.ok ? null : emailResult.reason;

        if (emailResult.ok) {
          console.info("[AWENE] Confirmation email success", {
            ...logContext,
            registrationId,
          });
        } else {
          console.error("[AWENE] Confirmation email failure", {
            ...logContext,
            registrationId,
            reason: emailResult.reason,
          });
        }
      } catch (error) {
        confirmationEmailSent = false;
        confirmationEmailError = "email_request_failed";
        console.error("[AWENE] Confirmation email failure", {
          ...logContext,
          registrationId,
          error,
        });
      }
    } else {
      console.error("[AWENE] Event confirmation skipped: event payload unavailable", {
        ...logContext,
        registrationId,
      });
    }

    const registration = buildRegistrationSuccessPayload({
      locale,
      body,
      event,
      registrationId,
      confirmationEmailSent,
    });

    return NextResponse.json(
      {
        ...payload,
        confirmation_email_sent: confirmationEmailSent,
        confirmation_email_error: confirmationEmailError,
        registration,
      },
      { status: response.status },
    );
  } catch (error) {
    console.error("[AWENE] Registration request failed", error);
    return NextResponse.json(
      { message: "The registration could not be sent." },
      { status: 500 },
    );
  }
}
