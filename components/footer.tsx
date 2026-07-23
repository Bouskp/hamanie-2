import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { categories, pays } from '@/lib/utils'

export function YoutubeIcon({
  className = 'h-5 w-5',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://w3.org'
      viewBox='0 0 24 24'
      fill='currentColor' // Permet d'utiliser la classe text-red-600 de Tailwind
      className={className}
      {...props}
    >
      <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
    </svg>
  )
}

export function FacebookIcon({
  className = 'h-5 w-5',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor' // Se lie aux classes text-* de Tailwind (ex: text-blue-600)
      className={className}
      {...props}
    >
      <path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z' />
    </svg>
  )
}

export function TwitterXIcon({
  className = 'h-5 w-5',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor' // S'adapte dynamiquement aux classes text-* de Tailwind
      className={className}
      {...props}
    >
      {/* Tracé vectoriel officiel du logo X (fka Twitter) */}
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  )
}

// Données de navigation typiques d'un grand site média
const footerNavigation = {
  services: [
    { name: "Offres d'emploi", href: '/services/jobs' },
    { name: "Appels d'offres", href: '/services/tenders' },
    { name: 'Boutique & Magazine', href: '/services/shop' },
    { name: 'Espace Partenaire', href: '/services/partners' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Données personnelles', href: '/privacy' },
    { name: 'Gestion des cookies', href: '/cookies' },
    { name: 'Aide & FAQ', href: '/faq' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full border-t bg-muted/30 text-foreground font-sans'>
      <div className='container max-w-7xl px-4 py-12 md:py-16'>
        {/* ==========================================
            1. SECTION SUPÉRIEURE : MARQUE & RÉSEAUX
            ========================================== */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10'>
          <div className='space-y-2'>
            <Link href='/' className='inline-block'>
              <span className='font-serif font-black text-2xl tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent'>
                HAMANIE<span className='text-foreground'>.NEWS</span>
              </span>
            </Link>
            <p className='text-base text-muted-foreground max-w-md'>
              Le grand média d'actualité et d'analyses indépendantes. Suivez en
              temps réel les transformations de l'écosystème numérique,
              économique et politique africain.
            </p>
          </div>

          {/* Icônes de Réseaux Sociaux (Boutons shadcn/ui) */}
          <div className='flex flex-wrap gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-xl h-9 w-9'
              asChild
            >
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookIcon className='h-4 w-4' />
              </a>
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='rounded-xl h-9 w-9'
              asChild
            >
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <TwitterXIcon className='h-4 w-4' />
              </a>
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='rounded-xl h-9 w-9'
              asChild
            >
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* <Linkedin className='h-4 w-4' /> */}
              </a>
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='rounded-xl h-9 w-9'
              asChild
            >
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <YoutubeIcon className='h-4 w-4' />
              </a>
            </Button>
          </div>
        </div>

        <Separator className='bg-border' />

        {/* ==========================================
            2. SECTION CENTRALE : LIENS MAILLAGE (GRILLE)
            ========================================== */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-10'>
          {/* Colonne Thématiques */}
          <div className='space-y-3 text-base'>
            <h4 className='text-base font-black uppercase tracking-wider text-orange-600'>
              Thématiques
            </h4>
            <ul className='space-y-2.5'>
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/rubrique/${item.slug}`}
                    className='text-base text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Pays */}
          <div className='space-y-3'>
            <h4 className='text-base font-black uppercase tracking-wider text-orange-600'>
              Focus Pays
            </h4>
            <ul className='space-y-2.5'>
              {pays.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/pays/${item.name}`}
                    className='text-base text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Services */}
          <div className='space-y-3'>
            <h4 className='text-base font-black uppercase tracking-wider text-foreground'>
              Services Pro
            </h4>
            <ul className='space-y-2.5'>
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group'
                  >
                    {item.name}
                    <ArrowUpRight className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Qui sommes-nous / Encart Rédaction */}
          <div className='space-y-3 p-4 bg-muted/60 rounded-2xl border border-dashed'>
            <h4 className='text-base font-black uppercase tracking-wider text-foreground flex items-center gap-1.5'>
              <ShieldCheck className='h-4 w-4 text-orange-600' />
              La Rédaction
            </h4>
            <p className='text-base text-muted-foreground leading-relaxed'>
              Une question ? Un communiqué de presse ? Rejoignez nos équipes
              éditoriales basées à Abidjan et Paris.
            </p>
            <Button
              variant='link'
              size='sm'
              className='p-0 text-base font-bold text-primary'
              asChild
            >
              <Link href='/contact'>Nous contacter →</Link>
            </Button>
          </div>
        </div>

        <Separator className='bg-border' />

        {/* ==========================================
            3. SECTION INFÉRIEURE : JURIDIQUE & COPYRIGHT
            ========================================== */}
        <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-8 text-base text-muted-foreground'>
          <div>
            © {currentYear}{' '}
            <span className='font-bold text-foreground/80'>HAMANIE.NEWS</span>.
            Tous droits réservés.
          </div>

          {/* Liens légaux horizontaux */}
          <ul className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
            {footerNavigation.legal.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className='hover:text-foreground transition-colors'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
