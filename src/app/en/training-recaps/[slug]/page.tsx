import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getFormationBySlug, getFormationPvBySlug, getFormationPvs } from "@/lib/cms";
import { absoluteUrl } from "@/lib/jsonld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pv = await getFormationPvBySlug(slug);
  if (!pv) return {};

  return {
    title: `${pv.pvTitle} | AWENE`,
    description:
      pv.shortSummary ||
      "A recap of this AWENE training, with key learnings, shared resources and participant feedback.",
    openGraph: {
      title: `${pv.pvTitle} | AWENE`,
      description:
        pv.shortSummary ||
        "A recap of this AWENE training, with key learnings, shared resources and participant feedback.",
      images: [pv.featuredImage?.large || absoluteUrl("/icon.png")],
    },
  };
}

export default async function TrainingRecapDetailPage({ params }: Props) {
  const { slug } = await params;
  const pv = await getFormationPvBySlug(slug);
  if (!pv) notFound();

  const related = (await getFormationPvs({ language: "en", limit: 6 }))
    .filter((item) => item.id !== pv.id && item.audience === pv.audience)
    .slice(0, 3);
  const linkedFormation = pv.formationSlug ? await getFormationBySlug(pv.formationSlug) : null;

  const statItems = [
    { label: "Participants", value: String(pv.participantsCount || 0) },
    { label: "Satisfaction", value: pv.satisfactionScore ? `${pv.satisfactionScore}%` : "—" },
    { label: "Average rating", value: pv.averageRating ? `${pv.averageRating}/5` : "—" },
    { label: "Recommendation", value: pv.recommendationRate ? `${pv.recommendationRate}%` : "—" },
  ];

  const resources = [
    { label: "Presentation PDF", url: pv.presentationPdf },
    { label: "Workbook PDF", url: pv.workbookPdf },
    { label: "Certificate sample", url: pv.certificateSamplePdf },
    { label: "Training report", url: pv.formationReportPdf },
  ].filter((item) => item.url);

  return (
    <main className="bg-[#FCFAF8] pb-24 pt-32 md:pt-36">
      <Container>
        <section className="grid gap-8 rounded-[2.5rem] border bg-white p-6 shadow-[0_20px_70px_rgba(75,31,122,0.08)] md:grid-cols-[1.1fr_0.9fr] md:p-10" style={{ borderColor: "#E8DFF0" }}>
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Training recap
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.04] md:text-5xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              {pv.pvTitle}
            </h1>
            <p className="max-w-3xl text-base leading-8 md:text-lg" style={{ color: "#6E6478" }}>
              {pv.shortSummary || "An AWENE case study documenting the delivered training, the shared learning points, resources and educational outcomes."}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Date</p>
                <p>{pv.formationDate || "To be confirmed"}</p>
              </div>
              <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Trainer</p>
                <p>{pv.trainer || "AWENE"}</p>
              </div>
              <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Audience</p>
                <p>{pv.audienceLabel || "To be confirmed"}</p>
              </div>
              <div className="rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>Duration</p>
                <p>{pv.duration || "To be confirmed"}</p>
              </div>
            </div>
          </div>
          {pv.featuredImage?.large ? (
            <img src={pv.featuredImage.large} alt={pv.pvTitle} className="h-full min-h-[20rem] w-full rounded-[2rem] object-cover" />
          ) : (
            <div className="min-h-[20rem] rounded-[2rem]" style={{ background: "linear-gradient(135deg, #F3ECFB 0%, #FEF3E8 100%)" }} />
          )}
        </section>

        <section className="mt-10 grid gap-4 rounded-[2rem] border bg-white p-6 md:grid-cols-4 md:p-8" style={{ borderColor: "#E8DFF0" }}>
          {statItems.map((item) => (
            <div key={item.label} className="rounded-[1.35rem] border p-4" style={{ borderColor: "#EFE7F6", background: "#FFFEFD" }}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B8EA8" }}>{item.label}</p>
              <p className="text-2xl font-bold" style={{ color: "#2E2438", fontFamily: "var(--font-playfair)" }}>{item.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-10">
            <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
              <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Overview</h2>
              <div className="prose max-w-none [&_p]:leading-8" dangerouslySetInnerHTML={{ __html: pv.fullRecap || "<p>The full recap will be available soon.</p>" }} />
            </section>

            {pv.topicsCovered ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Topics Covered</h2>
                <p className="leading-8" style={{ color: "#6E6478" }}>{pv.topicsCovered}</p>
              </section>
            ) : null}

            {pv.keyLearnings ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Key Learnings</h2>
                <p className="leading-8" style={{ color: "#6E6478" }}>{pv.keyLearnings}</p>
              </section>
            ) : null}

            {pv.gallery.length ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Gallery</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {pv.gallery.map((image) => (
                    <img key={image} src={image} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
                  ))}
                </div>
              </section>
            ) : null}

            {resources.length ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Resources</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {resources.map((resource) => (
                    <a key={resource.label} href={resource.url} className="rounded-[1.25rem] border px-5 py-4 font-semibold" style={{ borderColor: "#EFE7F6", color: "#6F3FD6" }}>
                      {resource.label}
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            {(pv.participantHighlights || pv.resultsAchieved || pv.challengesEncountered) ? (
              <section className="rounded-[2rem] border bg-white p-6 md:p-8" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-5 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>Participant Feedback</h2>
                <div className="space-y-4">
                  {pv.participantHighlights ? <p style={{ color: "#6E6478" }}><strong>Highlights:</strong> {pv.participantHighlights}</p> : null}
                  {pv.resultsAchieved ? <p style={{ color: "#6E6478" }}><strong>Results achieved:</strong> {pv.resultsAchieved}</p> : null}
                  {pv.challengesEncountered ? <p style={{ color: "#6E6478" }}><strong>Challenges:</strong> {pv.challengesEncountered}</p> : null}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6">
            {linkedFormation ? (
              <section className="rounded-[2rem] border bg-white p-6" style={{ borderColor: "#E8DFF0" }}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#6F3FD6" }}>
                  Related Training
                </p>
                <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  {linkedFormation.title}
                </h2>
                <p className="mb-4 text-sm leading-7" style={{ color: "#6E6478" }}>
                  {linkedFormation.description}
                </p>
                <Link href={`/en/training/${linkedFormation.slug}`} className="font-semibold" style={{ color: "#6F3FD6" }}>
                  View training
                </Link>
              </section>
            ) : null}

            {related.length ? (
              <section className="rounded-[2rem] border bg-white p-6" style={{ borderColor: "#E8DFF0" }}>
                <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                  Related Formations
                </h2>
                <div className="space-y-4">
                  {related.map((item) => (
                    <Link key={item.id} href={`/en/training-recaps/${item.slug}`} className="block rounded-[1.25rem] border p-4" style={{ borderColor: "#EFE7F6" }}>
                      <p className="font-semibold" style={{ color: "#2E2438" }}>{item.pvTitle}</p>
                      <p className="text-sm" style={{ color: "#6E6478" }}>{item.formationDate}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-[2rem] border p-6" style={{ borderColor: "#E8DFF0", background: "linear-gradient(135deg, rgba(243,236,251,0.95) 0%, rgba(255,247,239,0.95) 100%)" }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#F68B2C" }}>
                Next step
              </p>
              <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
                Discover our upcoming training
              </h2>
              <div className="flex flex-col gap-3">
                <Link href="/en/training" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)" }}>
                  View training
                </Link>
                <Link href="/en/contact?subject=Book%20a%20call" className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#DCCBFF", color: "#2E2438" }}>
                  Book a call
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </main>
  );
}
