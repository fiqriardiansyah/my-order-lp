import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.kasigo.online",
      },
    ],
  },
};

export default nextConfig;
