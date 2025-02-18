import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:4000/graphql", // Apollo Gateway endpoint
      },
    ];
  },
};

export default nextConfig;
