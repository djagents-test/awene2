import { NextResponse } from "next/server";

const CMS_SITE_BASE =
  process.env.NEXT_PUBLIC_AWENE_CMS_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, "") ??
  process.env.WORDPRESS_API_URL?.replace(/\/wp-json\/wp\/v2\/?$/, "") ??
  "https://cms.awene.net";

function restUrl(path: string) {
  const base = CMS_SITE_BASE.replace(/\/$/, "");
  return `${base}/wp-json/${path.replace(/^\//, "")}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const eventId = Number(body.eventId);
    if (!eventId || eventId < 1) {
      return NextResponse.json({ message: "Missing or invalid event id." }, { status: 400 });
    }

    const url = restUrl(`awene/v1/satisfaction/${eventId}/submit`);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok && process.env.NODE_ENV !== "production") {
      console.error("[satisfaction-submit] WP error", { status: response.status, url, payload });
    }

    return NextResponse.json(payload, { status: response.status });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[satisfaction-submit] Unexpected error", err);
    }
    return NextResponse.json({ message: "The survey could not be submitted." }, { status: 500 });
  }
}
