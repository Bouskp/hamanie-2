import type { NextConfig } from 'next'

const wordpressHostname = process.env.WORDPRESS_HOSTNAME
const wordpressUrl = process.env.WORDPRESS_URL

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.hamanie.news',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: 'https://api.hamanie.news/wp-admin/:path*',
        permanent: true,
      },
      // Catch-all pour les anciens liens d'articles (doit rester APRÈS les règles spécifiques)
      {
        source:
          '/:slug((?!posts|abonnement|api|favicon.ico|wp-admin|wp-login.php|wp-json|about|contact|rubrique|zones|magazine|_next)[^/]+)',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
