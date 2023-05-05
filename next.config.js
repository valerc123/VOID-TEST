/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'loremflickr.com', 'cloudflare-ipfs.com', 'media.valorant-api.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
