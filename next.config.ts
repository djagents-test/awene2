import type { NextConfig } from "next";
import path from "path";

const wordpressApiUrl =
  process.env.WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  "https://cms.awene.net/wp-json/wp/v2";
const wordpressImageHostname = wordpressApiUrl
  ? new URL(wordpressApiUrl).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
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
