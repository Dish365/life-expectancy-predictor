/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: 'https://fsroas.com',
  images: {
    domains: ['fsroas.com'],
    unoptimized: true,
    path: '/_next/image'
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://fsroas.com/api'
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false
}

module.exports = nextConfig 