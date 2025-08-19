/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Enable SWC minification
  swcMinify: true,
};

module.exports = nextConfig; 