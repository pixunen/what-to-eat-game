/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imageproxy.wolt.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig