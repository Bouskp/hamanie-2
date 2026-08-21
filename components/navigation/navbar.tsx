'use client'

import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import logo from '../../app/images/logo.png'

const menuLinks = [
  { id: 1, label: 'Accueil', path: '/' },
  ...categories
    .map((item) => ({
      id: item.id,
      path: `/rubrique/${decodeURIComponent(item.slug)}`,
      label: item.title,
    }))
    .filter((item) => ![1533, 1531, 1529].includes(item.id)),
  { id: 9, label: 'Magazines', path: '/magazine' },
]

export function Navbar() {
  const pathname = usePathname()

  const dateDuJour = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className='w-full bg-white border-b border-gray-200 sticky top-0 z-50 font-sans'>
      {/* =========================================================================
      PREMIER NIVEAU : BARRE COMPACTE UTILITAIRE (Logo & Actions)
      ========================================================================= */}
      <div className='border-b border-gray-100 bg-gray-50/50'>
        <div className='max-w-7xl mx-auto px-4 h-14 flex items-center justify-between text-xs text-gray-600 relative'>
          {/* Date style presse (Masquée uniquement sur tout petit écran) */}
          <div className='hidden sm:block font-condensed uppercase tracking-wider font-semibold text-gray-400'>
            {dateDuJour}
          </div>

          {/* Logo Central / Gauche */}
          <div className='absolute left-1/4 -translate-x-1/2 md:static md:translate-x-0'>
            <Link
              href='/'
              className='font-serif text-xl md:text-3xl font-black tracking-tighter text-gray-950 uppercase'
            >
              <Image
                src={logo} // Chemin de votre image dans le dossier public/
                alt='Nom de votre média'
                width={150} // Ajustez la largeur selon votre logo
                height={80} // Ajustez la hauteur selon votre logo
                priority // Charge le logo immédiatement (LCP critique)
                className='object-contain block dark:hidden'
              />
            </Link>
          </div>

          {/* Actions : Connexion & Abonnement */}
          <div className='flex items-center space-x-3 md:space-x-4 font-condensed font-bold uppercase tracking-wider ml-auto md:ml-0'>
            <Link
              href='/abonnement'
              className='text-gray-950 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-[11px] md:text-xs transition-colors shadow-xs'
            >
              S'abonner
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
      DEUXIÈME NIVEAU : LA BARRE DES RUBRIQUES SCROLLABLE HORIZONTALEMENT (ALL DEVICES)
      ========================================================================= */}
      <div className='bg-white border-b border-gray-100 w-full'>
        <div className='max-w-7xl mx-auto relative px-4 py-2 flex items-center'>
          {/* Zone de navigation scrollable */}
          <nav
            className='
          flex 
          items-center 
          gap-1 
          md:gap-4 
          h-12 
          w-full 
          overflow-x-auto 
          scroll-smooth 
          scrollbar-none 
          overscroll-x-contain
          -mx-4 
          px-4
        '
          >
            {menuLinks.map((rubrique) => {
              const isActive =
                rubrique.path === decodeURIComponent(pathname) ||
                (rubrique.path !== '/' && pathname.startsWith(rubrique.path))

              return (
                <Link
                  key={rubrique.id}
                  href={rubrique.path}
                  className={
                    `font-condensed 
                    text-sm 
                    font-black 
                    uppercase 
                    tracking-wide 
                    px-3 
                    py-6
                    border-b-2 
                    border-transparent 
                    transition-all 
                    whitespace-nowrap 
                    inline-block` +
                    (isActive ? ' border-red-600 text-red-600' : '')
                  }
                >
                  {rubrique.label}
                </Link>
              )
            })}
          </nav>

          {/* Effet d'ombrage fondu à droite pour indiquer visuellement le défilement */}
          <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none' />
        </div>
      </div>
    </header>
  )
}
