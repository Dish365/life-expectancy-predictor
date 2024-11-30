/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://fsroas.com' : '',
  images: {
    domains: ['fsroas.com'],
    unoptimized: process.env.NODE_ENV === 'production',
    path: '/_next/image'
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  }
}

module.exports = nextConfig 