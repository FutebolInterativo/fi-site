import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "futebolinterativo.com",
      },
      {
        protocol: "https",
        hostname: "tonojogo.futebolinterativo.com",
      },
    ],
  },
};

export default nextConfig;