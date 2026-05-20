import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "framer-motion",
      "lucide-react",
    ],
  },

  allowedDevOrigins: [
    "169.254.153.109",
    "localhost",
    "127.0.0.1",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;