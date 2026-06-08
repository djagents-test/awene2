import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getFormationPvs } from "@/lib/cms";
import { absoluteUrl } from "@/lib/jsonld";

type Props = {
  searchParams: Promise<{
    q?: string;
    audience?: string;
    language?: string;
    year?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Formation PV | AWENE",
  description:
    "Retour sur les formations AWENE déjà réalisées : participantes, enseignements clés, ressources, galerie et impact pédagogique.",
};

export default async function FormationPvPage({ searchParams }: Props) {
  const filters = await searchParams;
  const items = await getFormationPvs({ language: "fr", limit: 100 });
  const query = (filters.q ?? "").trim().toLowerCase();
  const audience = filters.audience ?? "";
  const language = filters.language ?? "";
  const year = filters.year ?? "";

  const filtered = items.filter((item) => {
    if (query) {
      const haystack = [
        item.pvTitle,
        item.formationTitle,
        item.shortSummary,
        item.trainer,
        item.audienceLabel,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    if (audience && item.audience !== audience) return false;
    if (language && item.language !== language) return false;
    if (year && item.startDate && !item.startDate.startsWith(year)) return false;

    return true;
  });

  const featured = filtered.find((item) => item.featured) ?? filtered[0] ?? null;
  const gridItems = featured ? filtered.filter((item) => item.id !== featured.id) : filtered;
  const years = Array.from(new Set(items.map((item) => item.startDate?.slice(0, 4)).filter(Boolean))).sort().reverse();

  return (
    <main className="bg-[#FCFAF8] pb-24 pt-32 md:pt-36">
      <Container>
        <section className="relative overflow-hidden rounded-[2.5rem] border px-6 py-10 shadow-[0_20px_70px_rgba(75,31,122,0.08)] md:px-10 md:py-14" style={{ borderColor: "#E8DFF0", background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(243,236,251,0.95) 100%)" }}>
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(246,139,44,0.22) 0%, rgba(246,139,44,0.08) 45%, transparent 75%)" }} />
          <div className="relative z-10 max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Formation PV
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.04] md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Les formations déjà réalisées, documentées comme preuves d’impact.
            </h1>
            <p className="max-w-3xl text-base leading-8 md:text-lg" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Une bibliothèque de retours d’expérience AWENE pour montrer les formations délivrées, l’engagement des participantes, les ressources partagées et les résultats obtenus.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
          <form className="grid gap-4 md:grid-cols-4" action="/fr/formations-pv">
            <input
              type="search"
              name="q"
              defaultValue={filters.q ?? ""}
              placeholder="Rechercher une formation"
              className="rounded-full border px-5 py-3"
              style={{ borderColor: "#E8DFF0" }}
            />
            <select name="audience" defaultValue={audience} className="rounded-full border px-5 py-3" style={{ borderColor: "#E8DFF0" }}>
              <option value="">Tous les publics</option>
              <option value="particuliers">Particuliers</option>
              <option value="entreprises">Entreprises</option>
              <option value="professionnels">Professionnels</option>
            </select>
            <select name="language" defaultValue={language} className="rounded-full border px-5 py-3" style={{ borderColor: "#E8DFF0" }}>
              <option value="">Toutes les langues</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">Arabe</option>
            </select>
            <select name="year" defaultValue={year} className="rounded-full border px-5 py-3" style={{ borderColor: "#E8DFF0" }}>
              <option value="">Toutes les années</option>
              {years.map((itemYear) => (
                <option key={itemYear} value={itemYear}>
                  {itemYear}
                </option>
              ))}
            </select>
          </form>
        </section>

        {featured ? (
          <section className="mt-10 grid gap-8 rounded-[2rem] border bg-white p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8" style={{ borderColor: "#E8DFF0" }}>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6" }}>
                Formation PV mise en avant
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                {featured.pvTitle}
              </h2>
              <p className="mb-6 text-base leading-8" style={{ color: "#6E6478" }}>
                {featured.shortSummary || "Une synthèse complète de la formation, des enseignements partagés et des retours des participantes."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Date</p>
                  <p>{featured.formationDate || "À confirmer"}</p>
                </div>
                <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Formatrice</p>
                  <p>{featured.trainer || "AWENE"}</p>
                </div>
                <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Participants</p>
                  <p>{featured.participantsCount}</p>
                </div>
                <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Satisfaction</p>
                  <p>{featured.satisfactionScore ? `${featured.satisfactionScore}%` : "À venir"}</p>
                </div>
              </div>
              <Link
                href={`/fr/formations-pv/${featured.slug}`}
                className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full px-7 py-4 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)" }}
              >
                Lire le retour complet
              </Link>
            </div>
            {featured.featuredImage?.large ? (
              <img src={featured.featuredImage.large} alt={featured.pvTitle} className="h-full min-h-[18rem] w-full rounded-[1.75rem] object-cover" />
            ) : (
              <div className="min-h-[18rem] rounded-[1.75rem]" style={{ background: "linear-gradient(135deg, #F3ECFB 0%, #FEF3E8 100%)" }} />
            )}
          </section>
        ) : null}

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6" }}>
                Existing Formation PV
              </p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                Bibliothèque de retours d’expérience
              </h2>
            </div>
            <p style={{ color: "#6E6478" }}>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {gridItems.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1.75rem] border bg-white" style={{ borderColor: "#E8DFF0" }}>
                {item.featuredImage?.medium ? (
                  <img src={item.featuredImage.medium} alt={item.pvTitle} className="h-56 w-full object-cover" />
                ) : (
                  <div className="h-56 w-full" style={{ background: "linear-gradient(135deg, #F3ECFB 0%, #FEF3E8 100%)" }} />
                )}
                <div className="p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#F68B2C" }}>
                    {item.formationDate || "Formation réalisée"}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                    {item.pvTitle}
                  </h3>
                  <p className="mb-5 text-sm leading-7" style={{ color: "#6E6478" }}>
                    {item.shortSummary || "Retour d’expérience, ressources partagées, résultats et galerie de la formation."}
                  </p>
                  <dl className="mb-6 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Formatrice</dt>
                      <dd>{item.trainer || "AWENE"}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Participants</dt>
                      <dd>{item.participantsCount}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Public</dt>
                      <dd>{item.audienceLabel || "À confirmer"}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold" style={{ color: "#4B1F7A" }}>Satisfaction</dt>
                      <dd>{item.satisfactionScore ? `${item.satisfactionScore}%` : "À venir"}</dd>
                    </div>
                  </dl>
                  <Link href={`/fr/formations-pv/${item.slug}`} className="font-semibold" style={{ color: "#6F3FD6" }}>
                    Lire le retour →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
