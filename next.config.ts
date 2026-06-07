import type { NextConfig } from "next";
import path from "path";

const wordpressApiUrl =
  process.env.NEXT_PUBLIC_AWENE_CMS_URL
    ? `${process.env.NEXT_PUBLIC_AWENE_CMS_URL.replace(/\/$/, "")}/wp-json/wp/v2`
    :
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  "https://cms.awene.net/wp-json/wp/v2";
const wordpressImageHostname = wordpressApiUrl
  ? new URL(wordpressApiUrl).hostname
  : undefined;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/articles/:slug",
        destination: "/fr/articles/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/fr/articles/:slug",
        destination: "/fr/article?slug=:slug",
      },
      {
        source: "/en/articles/:slug",
        destination: "/en/article?slug=:slug",
      },
      {
        source: "/fr/formations/:slug",
        destination: "/fr/formation?slug=:slug",
      },
      {
        source: "/fr/evenements/:slug",
        destination: "/fr/evenement?slug=:slug",
      },
      {
        source: "/en/training/:slug",
        destination: "/en/formation?slug=:slug",
      },
      {
        source: "/en/events/:slug",
        destination: "/en/event?slug=:slug",
      },
      {
        source: "/en/formations/:slug",
        destination: "/en/formation?slug=:slug",
      },
    ];
  },
  images: {
    qualities: [75, 95],
    remotePatterns: wordpressImageHostname
      ? [
          {
            protocol: "https",
            hostname: wordpressImageHostname,
          },
        ]
      : [],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
