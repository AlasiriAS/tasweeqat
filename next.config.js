/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000", "tasweeqat.com"] }
  },
  images: {
    domains: ["localhost", "tasweeqat.com"],
  },
};

module.exports = nextConfig;
