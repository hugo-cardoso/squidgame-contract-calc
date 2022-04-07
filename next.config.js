/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['squid-nft.io'],
  },
  redirects: async () => ([
    {
      source: '/',
      destination: '/contract-calc',
      permanent: true,
    }
  ]),
}

module.exports = nextConfig
