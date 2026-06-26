/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000", "tasweeqat.com"] }
  },
  images: {
    domains: ["localhost", "tasweeqat.com"],
  },
};

module.exports = nextConfig;
