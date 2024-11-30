/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://fsroas.com' : '',
  images: {
    domains: ['fsroas.com'],
  },
}

module.exports = nextConfig 