import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import EventsHub, { type EventItem } from "@/components/ui/EventsHub";
import NewsletterSignupForm from "@/components/ui/NewsletterSignupForm";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { breadcrumbSchema, cmsEventSchema, webPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Ateliers et événements AWENE | AWENE",
  description:
    "Des femmes engagées dans un atelier collaboratif favorisant l’apprentissage, l’échange d’expériences et le développement personnel autour de la santé et du bien-être.",
  keywords: [
    "atelier ménopause",
    "événement ménopause MENA",
    "webinaire périménopause",
    "atelier santé féminine",
    "conférence ménopause",
    "rencontre femmes 40 ans",
    "webinaire hormones",
  ],
};

function normalizeStatus(value?: string): EventItem["status"] {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("closed") || normalized.includes("fermé")) {
    return "closed";
  }
  if (normalized.includes("complet") || normalized.includes("full") || normalized.includes("sold")) {
    return "full";
  }
  if (normalized.includes("past") || normalized.includes("termin") || normalized.includes("ended")) {
    return "past";
  }
  return "open";
}

function isPastEvent(event: CmsEvent) {
  if (event.eventStatus === "past") return true;
  if (!event.startsAt) return false;
  const date = new Date(event.startsAt);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return date.getTime() < midnight;
}

function normalizeFormat(event: CmsEvent): EventItem["format"] | undefined {
  const normalized = `${event.locationType ?? event.format ?? ""} ${event.location ?? ""}`.toLowerCase();
  if (normalized.includes("ligne") || normalized.includes("online")) return "online";
  if (normalized.includes("présentiel") || normalized.includes("presentiel") || normalized.includes("tunis") || normalized.includes("nabeul")) return "in_person";
  if (normalized.includes("hybride") || normalized.includes("hybrid")) return "hybrid";
  return undefined;
}

export default async function EvenementsPage() {
  const events = await getEvents({ perPage: 100, language: "fr" });
  const normalizedEvents: EventItem[] = events.map((event) => ({
    id: String(event.id),
    title: event.title,
    date: event.date,
    location: event.location || "Lieu à confirmer",
    type: event.type || "Atelier",
    status: normalizeStatus(isPastEvent(event) ? "past" : event.registrationStatus ?? event.status),
    description: event.shortDescription || event.description || "Plus d’informations à venir sur cet événement.",
    ctaLabel: isPastEvent(event) ? "En savoir plus" : event.ctaLabel || "Je m'inscris",
    ctaHref: isPastEvent(event) ? `/fr/evenements/${event.slug}` : event.url ?? "/fr/contact",
    format: normalizeFormat(event),
    startsAt: event.startsAt,
    availableSeats: event.availableSeats,
    capacity: event.capacity,
    language: event.language,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "Événements", path: "/fr/evenements" },
          ]),
          webPageSchema({
            path: "/fr/evenements",
            title: "Ateliers et événements AWENE | AWENE",
            description:
              "Des femmes engagées dans un atelier collaboratif favorisant l’apprentissage, l’échange d’expériences et le développement personnel autour de la santé et du bien-être.",
            type: "CollectionPage",
          }),
          ...events.map((event) => cmsEventSchema(event)),
        ]}
      />
      <section className="relative min-h-[76vh] overflow-hidden">
        <Image
          src="/images/awene-evenement-atelier-participation.jpg"
          alt=""
          title="Atelier AWENE et participation active"
          fill
          priority
          aria-hidden="true"
          className="object-cover object-[25%_50%] md:object-[30%_50%] xl:object-[35%_10%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/70 md:bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.68)_35%,rgba(255,255,255,0.18)_100%)]" />
        <Container className="relative z-10 flex min-h-[76vh] items-end pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}>
              <span className="block h-px w-8" style={{ background: "#F68B2C" }} />
              Événements
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.08] md:text-6xl" style={{ fontFamily: "var(--font-playfair)", color: "#2E2438" }}>
              Des espaces de rencontre
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#6E6478", fontFamily: "var(--font-inter)" }}>
              Ateliers, webinaires et rencontres autour de la ménopause et de la périménopause, pour comprendre, partager et avancer ensemble.
            </p>
          </div>
        </Container>
      </section>

      <EventsHub
        locale="fr"
        labels={{
          filtersTitle: "Filtres",
          upcomingTitle: "Prochains événements",
          pastTitle: "Événements passés",
          emptyUpcoming:
            "Aucun événement programmé pour le moment. Inscrivez-vous à la newsletter pour être informée en premier.",
          date: "Date",
          location: "Lieu",
          type: "Type",
          status: "Statut",
          all: "Tous",
          upcoming: "À venir",
          thisMonth: "Ce mois-ci",
          past: "Passés",
          online: "En ligne",
          inPerson: "Présentiel",
          hybrid: "Hybride",
          tunis: "Tunis",
          nabeul: "Nabeul",
          workshop: "Atelier",
          webinar: "Webinaire",
          meetup: "Rencontre",
          discussionCircle: "Cercle de discussion",
          training: "Formation",
          open: "Ouvert",
          full: "Complet",
          ended: "Terminé",
          register: "Je m'inscris",
          closed: "Fermé",
          registrationClosed: "Inscriptions fermées",
          learnMore: "En savoir plus",
          firstName: "Prénom",
          lastName: "Nom",
          email: "Email",
          phone: "Téléphone",
          message: "Message",
          consent: "J’accepte que mes informations soient utilisées pour traiter mon inscription à cet événement.",
          submit: "Envoyer mon inscription",
          submitting: "Envoi…",
          success: "Votre inscription a bien été envoyée. Vous recevrez bientôt une confirmation.",
          error: "L’inscription n’a pas pu être envoyée. Veuillez réessayer.",
          noPastResults: "Aucun événement passé ne correspond à ces filtres.",
          seatsLeft: "{count} places restantes",
        }}
        events={normalizedEvents}
      />

      {/* ── NEWSLETTER ── */}
      <section
        className="relative overflow-x-hidden overflow-y-hidden py-20 md:py-24"
        style={{ background: "linear-gradient(135deg, #4B1F7A 0%, #6F3FD6 50%, #8B52E8 100%)" }}
      >
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <h2
              className="mb-4 text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#F3ECFB",
                fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
                lineHeight: 1.1,
                maxWidth: "min(100%, 48rem)",
                marginInline: "auto",
                overflowWrap: "normal",
                wordBreak: "normal",
              }}
            >
              Je m&apos;inscris à la newsletter pour être informée en premier
            </h2>
            <p
              className="mb-8 text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}
            >
              Inscrivez-vous à la newsletter AWENE pour recevoir les annonces d&apos;événements avant tout le monde.
            </p>
            <div className="w-full max-w-sm">
              <NewsletterSignupForm locale="fr" variant="dark" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
