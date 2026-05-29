import { NextResponse } from "next/server";

const CMS_API_BASE =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      formation_id?: number;
      [key: string]: unknown;
    };

    if (!body.formation_id) {
      return NextResponse.json(
        { message: "Formation introuvable." },
        { status: 400 },
      );
    }

    const response = await fetch(
      restUrl(`awene/v1/formations/${body.formation_id}/register`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const payload = await response.json().catch(() => ({}));

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "L'inscription n'a pas pu être envoyée." },
      { status: 500 },
    );
  }
}
