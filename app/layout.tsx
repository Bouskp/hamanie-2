import Footer from './components/footer'
import Navbar from './components/navbar'
import './styles/index.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr'>
      <head>
        <title>Hamaniè-site d'infos</title>
      </head>

      <body>
        <Navbar
          params={Promise.resolve({
            links: [
              { label: 'Accueil', url: '/' },
              { label: 'Politique', url: '/rubrique/politique' },
              { label: 'Economie', url: '/rubrique/economie' },
              { label: 'Société', url: '/rubrique/societe' },
              { label: 'Culture', url: '/rubrique/culture' },
              { label: 'Sports', url: '/rubrique/sport' },
              { label: 'International', url: '/rubrique/international' },
              { label: 'Magazines', url: '/magazine' },
            ],
            buttons: [
              { label: 'Nous contacter', url: '/contact', primary: true },
              { label: 'En savoir plus', url: '/about', primary: false },
            ],
          })}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
