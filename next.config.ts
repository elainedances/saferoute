import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/live-flights",
        destination: "http://77.42.76.176:3847/api/live-flights",
      },
    ];
  },
};

export default nextConfig;
