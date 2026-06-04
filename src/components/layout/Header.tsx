"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import {
  localeFromPath,
  localizedPath,
  pathWithoutLocale,
  translations,
  type Locale,
} from "@/lib/i18n";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const basePath = pathWithoutLocale(pathname);
  const t = translations[locale];
  const navItems = [
    { label: t.nav.home, href: localizedPath("/", locale), base: "/" },
    { label: t.nav.coaching, href: localizedPath("/coaching", locale), base: "/coaching" },
    { label: t.nav.about, href: localizedPath("/a-propos", locale), base: "/a-propos" },
    { label: t.nav.formations, href: localizedPath("/formations", locale), base: "/formations" },
    { label: t.nav.articles, href: localizedPath("/articles", locale), base: "/articles" },
    { label: t.nav.events, href: localizedPath("/evenements", locale), base: "/evenements" },
    { label: t.nav.contact, href: localizedPath("/contact", locale), base: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? basePath === "/" : basePath === href || basePath.startsWith(href + "/");

  const switchHref = (targetLocale: Locale) => localizedPath(basePath, targetLocale);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(110,100,120,0.1)]"
    >
      <Container>
        <div className="flex h-24 items-center justify-between gap-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center">
          {/* Logo */}
          <Link
            href={localizedPath("/", locale)}
            className="flex shrink-0 items-center"
            aria-label={`AWENE, ${t.nav.home}`}
          >
            <div className="relative h-[4.6rem] w-[4.6rem] shrink-0 md:h-[5rem] md:w-[5rem] lg:h-[5.35rem] lg:w-[5.35rem]">
              <Image
                src="/AWENE.png"
                alt="AWENE"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 5.35rem, (min-width: 768px) 5rem, 4.6rem"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center justify-center gap-2"
            aria-label={t.nav.label}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-w-[6.5rem] items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-center text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(item.base)
                    ? "bg-[#F3ECFB] text-[#6F3FD6]"
                    : "text-[#2E2438] hover:bg-[#FCFAF8] hover:text-[#6F3FD6]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA — red button */}
          <div className="hidden lg:flex items-center justify-end gap-4">
            <div
              className="flex items-center rounded-full border border-[#E8DFF0] px-1 py-1"
            >
              {(["fr", "en"] as Locale[]).map((item) => (
                <Link
                  key={item}
                  href={switchHref(item)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                    item === locale
                      ? "bg-[#6F3FD6] text-white"
                      : "text-[#6E6478] hover:text-[#6F3FD6]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                  hrefLang={item}
                >
                  {item}
                </Link>
              ))}
            </div>
            <Link
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[11rem] items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #E02B20 0%, #C0221A 100%)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="ml-auto lg:hidden p-2 rounded-xl text-[#2E2438] transition-colors hover:bg-[#F3ECFB]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.nav.close : t.nav.open}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-[#E8DFF0] px-6 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-base font-medium border-b border-[#E8DFF0] last:border-0 ${
                isActive(item.base) ? "text-[#6F3FD6]" : "text-[#2E2438]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-4">
            {(["fr", "en"] as Locale[]).map((item) => (
              <Link
                key={item}
                href={switchHref(item)}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase ${
                  item === locale ? "bg-[#6F3FD6] text-white" : "bg-[#F3ECFB] text-[#6E6478]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
                hrefLang={item}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="pt-4">
            <Link
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-6 py-3.5 rounded-full text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #E02B20 0%, #C0221A 100%)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
