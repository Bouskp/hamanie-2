import { Navbar } from '../components/navigation/navbar'
import './styles/index.css'
import { Inter, Lora, Roboto_Condensed } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import StockTicker from '@/components/StockTicker'
import { GoogleAnalytics } from '@next/third-parties/google'

// 1. Police Sans-Serif pour le texte général et l'interface
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const fontCondensed = Roboto_Condensed({
  weight: ['300', '400', '700', '900'], // Sélection des graisses nécessaires
  subsets: ['latin'],
  variable: '--font-condensed', // Nom de la variable CSS
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='fr'
      className={`${fontSans.variable} ${fontSerif.variable} ${fontCondensed.variable}`}
    >
      <head>
        <title>Hamaniè-site d'infos</title>
      </head>

      <body>
        <StockTicker />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
