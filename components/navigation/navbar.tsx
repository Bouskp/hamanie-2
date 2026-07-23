import Link from 'next/link'
import { DesktopMenu } from './desktopMenu'
import { MobileMenu } from './mobileMenu'
import { Button } from '@/components/ui/button'

// Simulation de la réponse de l'API WordPress (À lier avec votre fetch GraphQL)

async function getMenuItems() {
  return [
    { id: 1, label: 'Accueil', path: '/' },
    { id: 2, label: 'Politique', path: '/rubrique/politique' },
    { id: 3, label: 'Economie', path: '/rubrique/economie' },
    { id: 4, label: 'Société', path: '/rubrique/societe' },
    { id: 5, label: 'Culture', path: '/rubrique/culture' },
    { id: 6, label: 'Sports', path: '/rubrique/sport' },
    { id: 7, label: 'International', path: '/rubrique/international' },
    { id: 8, label: 'Agromakers', path: '/rubrique/agromakers' },
    { id: 9, label: 'Magazines', path: '/magazine' },
  ]
}

export default async function Navbar() {
  const menuItems = await getMenuItems()

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container max-w-7xl flex h-16 items-center justify-between px-4'>
        {/* LOGO */}
        <Link href='/' className='flex items-center space-x-2'>
          <span className='font-black text-xl tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent'>
            HAMANIE<span className='text-foreground'>.NEWS</span>
          </span>
        </Link>

        {/* MENU DESKTOP (Masqué sur mobile) */}
        <div className='hidden md:flex items-center space-x-6'>
          <DesktopMenu items={menuItems} />
        </div>

        {/* BOUTON D'ACTION PRINCIPAL + MENU MOBILE */}
        <div className='flex items-center space-x-4'>
          <Button
            asChild
            variant='default'
            size='sm'
            className='hidden sm:flex rounded-xl'
          >
            <Link href='/newsletter'>S'abonner</Link>
          </Button>

          {/* Menu Mobile (Masqué sur desktop) */}
          <div className='md:hidden'>
            <MobileMenu items={menuItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
