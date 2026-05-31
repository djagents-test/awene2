import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const META_PIXEL_ID = "4228205960762852";
const GOOGLE_TAG_ID = "G-77KN5YJ39D";
const AHREFS_ANALYTICS_KEY = "TcLOOogWTAV6YbTnOA3Xrg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AWENE",
    default: "AWENE | Coaching ménopause et périménopause, Comprendre, Réguler, Incarner",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  description:
    "Bouffées de chaleur, fatigue, brouillard mental, sommeil perturbé, ce n'est pas une fatalité. AWENE accompagne les femmes en périménopause et ménopause avec une approche scientifique et humaine. En ligne, région MENA et au-delà.",
  keywords: [
    "coaching ménopause",
    "coaching périménopause",
    "accompagnement ménopause en ligne",
    "bouffées de chaleur",
    "fatigue ménopause",
    "brain fog",
    "troubles du sommeil",
    "prise de poids ménopause",
    "cycles irréguliers",
    "MENA",
    "Tunisie",
    "Maroc",
    "Algérie",
    "France",
    "AWENE",
  ],
  openGraph: {
    title: "AWENE | Coaching ménopause et périménopause",
    description:
      "Bouffées de chaleur, fatigue, brouillard mental, sommeil perturbé, ce n'est pas une fatalité. AWENE vous accompagne avec rigueur et humanité. En ligne, région MENA et au-delà.",
    siteName: "AWENE",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key={AHREFS_ANALYTICS_KEY}
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <body className="antialiased">
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
