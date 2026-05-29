import type { NextConfig } from "next";
import path from "path";

const wordpressApiUrl = process.env.WORDPRESS_API_URL;
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
