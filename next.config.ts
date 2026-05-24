import type { NextConfig } from 'next'

const wordpressHostname = process.env.WORDPRESS_HOSTNAME
const wordpressUrl = process.env.WORDPRESS_URL

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hamanie.news',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
