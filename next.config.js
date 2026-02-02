/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable static exports for ISR
  output: 'standalone',
}

module.exports = nextConfig
