"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import FooterEmailForm from "./FooterEmailForm";
import { localeFromPath, localizedPath, translations } from "@/lib/i18n";

export default function Footer() {
  const locale = localeFromPath(usePathname());
  const t = translations[locale];
  const navigation = {
    explore: [
      { label: locale === "fr" ? "Pourquoi AWENE" : locale === "en" ? "Why AWENE" : "لماذا AWENE", href: "/a-propos/pourquoi-awene" },
      { label: locale === "fr" ? "Mon histoire" : locale === "en" ? "My story" : "قصتي", href: "/a-propos/mon-histoire" },
      { label: locale === "fr" ? "Chemine avec moi" : locale === "en" ? "Walk with me" : "رافِقيني", href: "/chemine-avec-moi" },
      { label: t.nav.formations, href: "/formations" },
      { label: t.nav.articles, href: "/articles" },
      { label: t.nav.events, href: "/evenements" },
    ],
    accompagnement: [
      { label: locale === "fr" ? "Le rôle du coach" : locale === "en" ? "The coach role" : "دور الكوتش", href: "/chemine-avec-moi/role-du-coach" },
      { label: t.nav.cta, href: "/contact" },
    ],
    legal: [
      { label: locale === "fr" ? "Politique de confidentialité" : locale === "en" ? "Privacy policy" : "سياسة الخصوصية", href: "/politique-de-confidentialite" },
    ],
  };

  return (
    <footer
      style={{ background: "linear-gradient(160deg, #2E1A4A 0%, #1C0F2E 100%)" }}
    >
      {/* Main footer content */}
      <Container className="pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/AWENE.png"
                alt="AWENE"
                width={40}
                height={40}
                className="h-9 w-auto"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(243,236,251,0.65)", fontFamily: "var(--font-inter)" }}
            >
              {t.footer.description}
            </p>
            <div className="flex items-center gap-1">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(243,236,251,0.4)", fontFamily: "var(--font-inter)" }}
              >
                Neuro Wellness in Menopause
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Image
                src="/images/INHC.jpg"
                alt="INHC certification badge"
                width={92}
                height={92}
                className="h-auto w-[4.75rem] rounded-md"
              />
              <Image
                src="/images/IWHI_CERTIFIED.jpg"
                alt="IWHI Certified badge"
                width={92}
                height={92}
                className="h-auto w-[4.75rem] rounded-md"
              />
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {t.footer.explore}
            </h3>
            <ul className="space-y-3">
              {navigation.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizedPath(item.href, locale)}
                    className="text-sm transition-colors duration-200 hover:text-[#F3ECFB]"
                    style={{
                      color: "rgba(243,236,251,0.65)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accompagnement */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {t.footer.support}
            </h3>
            <ul className="space-y-3">
              {navigation.accompagnement.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizedPath(item.href, locale)}
                    className="text-sm transition-colors duration-200 hover:text-[#F3ECFB]"
                    style={{
                      color: "rgba(243,236,251,0.65)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rejoins le mouvement */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: "#F68B2C", fontFamily: "var(--font-inter)" }}
            >
              {t.footer.movement}
            </h3>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(243,236,251,0.65)", fontFamily: "var(--font-inter)" }}
            >
              {t.footer.movementText}
            </p>
            <FooterEmailForm />
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <Container>
        <div
          className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(243,236,251,0.1)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(243,236,251,0.4)", fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} AWENE. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(item.href, locale)}
                className="text-xs transition-colors duration-200 hover:text-[#F3ECFB]"
                style={{
                  color: "rgba(243,236,251,0.4)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
