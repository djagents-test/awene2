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
    const body = (await request.json()) as { eventId?: number | string };
    if (!body.eventId) {
      return NextResponse.json({ message: "Missing event id." }, { status: 400 });
    }

    const response = await fetch(restUrl(`awene/v1/satisfaction/${body.eventId}/submit`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "The survey could not be submitted." },
      { status: 500 },
    );
  }
}
