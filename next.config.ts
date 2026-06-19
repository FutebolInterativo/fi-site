import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.54"],
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
