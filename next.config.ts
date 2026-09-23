import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/**/*",
    ],
  },
  images: { remotePatterns: [ { protocol: "https", hostname: "images.unsplash.com", }, ], },
};

export default nextConfig;