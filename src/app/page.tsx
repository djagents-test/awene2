import { headers } from "next/headers";
import { redirect } from "next/navigation";

function preferredLocale(acceptLanguage: string | null): "fr" | "en" {
  if (!acceptLanguage) {
    return "fr";
  }

  const values = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag = "", qualityPart] = entry.trim().split(";q=");
      const quality = qualityPart ? Number.parseFloat(qualityPart) : 1;
      const base = tag.toLowerCase().split("-")[0] ?? "";
      return {
        base,
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.base === "fr" || entry.base === "en")
    .sort((left, right) => right.quality - left.quality);

  return values[0]?.base === "en" ? "en" : "fr";
}

export default async function RootPage() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = preferredLocale(acceptLanguage);

  redirect(`/${locale}`);
}
