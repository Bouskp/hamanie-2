import Navbar from '../components/navigation/navbar'
import './styles/index.css'
import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Footer } from '@/components/footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr' className={cn('font-sans', geist.variable)}>
      <head>
        <title>Hamaniè-site d'infos</title>
      </head>

      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
