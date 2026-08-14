import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { footerLinks, RsLinksHamanie, RsLinksMianMedia } from '@/lib/utils'

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

export function LinkedinIcon({
  className = 'h-5 w-5',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://w3.org'
      viewBox='0 0 24 24'
      fill='currentColor' // Permet de changer la couleur avec text-red-600 ou text-gray-400
      className={className}
    >
      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
    </svg>
  )
}

// Données de navigation typiques d'un grand site média
export function Footer() {
  return (
    <footer className='w-full bg-black text-gray-900 border-t-4 border-gray-900 mt-20 font-sans'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* NIVEAU 1 : Identité et Réseaux sociaux */}
        <div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-8 mb-8 gap-4'>
          {/* Logo style grand journal */}
          <Link
            href='/'
            className='font-serif text-2xl font-black tracking-tight text-white uppercase'
          >
            HAMANIè.NEWS
          </Link>

          {/* Liens vers les réseaux sociaux officiels */}
          <div className='flex space-x-6 text-sm font-semibold text-white'>
            <a
              href={RsLinksHamanie.find((p) => p.nom.includes('twitter'))?.url}
              className='hover:text-red-600 transition-colors'
            >
              X (Twitter)
            </a>
            <a
              href={RsLinksHamanie.find((p) => p.nom.includes('facebook'))?.url}
              className='hover:text-red-600 transition-colors'
            >
              Facebook
            </a>
            <a
              href={
                RsLinksHamanie.find((p) => p.nom.includes('instagram'))?.url
              }
              className='hover:text-red-600 transition-colors'
            >
              Instagram
            </a>
            <a
              href={RsLinksHamanie.find((p) => p.nom.includes('youtube'))?.url}
              className='hover:text-red-600 transition-colors'
            >
              YouTube
            </a>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-8 mb-8 gap-4'>
          {/* Logo style grand journal */}
          <Link
            href='/'
            className='font-serif text-2xl font-black tracking-tight text-white uppercase'
          >
            MIAN MEDIA
          </Link>

          {/* Liens vers les réseaux sociaux officiels */}
          <div className='flex space-x-6 text-sm font-semibold text-white'>
            <a
              href={
                RsLinksMianMedia.find((p) => p.nom.includes('twitter'))?.url
              }
              className='hover:text-red-600 transition-colors'
            >
              X (Twitter)
            </a>
            <a
              href={
                RsLinksMianMedia.find((p) => p.nom.includes('facebook'))?.url
              }
              className='hover:text-red-600 transition-colors'
            >
              Facebook
            </a>
            <a
              href={
                RsLinksMianMedia.find((p) => p.nom.includes('instagram'))?.url
              }
              className='hover:text-red-600 transition-colors'
            >
              Instagram
            </a>
            <a
              href={
                RsLinksMianMedia.find((p) => p.nom.includes('youtube'))?.url
              }
              className='hover:text-red-600 transition-colors'
            >
              YouTube
            </a>
          </div>
        </div>

        {/* NIVEAU 2 : Le Grand Maillage de Rubriques (Grille) */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12'>
          {footerLinks.map((section, idx) => (
            <div key={idx} className='space-y-3'>
              {/* Titre en Roboto Condensed pour un effet dense et structuré */}
              <h3 className='font-condensed text-xs font-black uppercase tracking-wider text-red-800'>
                {section.title}
              </h3>
              <ul className='space-y-2'>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className='text-sm text-white hover:text-red-600 transition-colors font-medium leading-snug'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Bloc d'appel à l'abonnement Premium (Style Le Monde) */}
          {/* <div className='col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 flex flex-col justify-between'>
            <div className='space-y-1'>
              <h4 className='font-serif text-lg font-bold text-gray-950'>
                L'information de référence
              </h4>
              <p className='text-xs text-gray-600 leading-relaxed'>
                Suivez l'actualité en continu, accédez à nos enquêtes exclusives
                et lisez le magazine numérique chaque mois.
              </p>
            </div>
            <Link
              href='/abonnement'
              className='block w-full bg-gray-950 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider text-center py-3 rounded-lg transition-colors shadow-xs'
            >
              S'abonner dès 1€
            </Link>
          </div> */}
        </div>

        {/* NIVEAU 3 : Barre de conformité et Copyright légal */}
        <div className='border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white gap-4'>
          <div className='flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1'>
            <Link href='/cgv' className='hover:underline'>
              CGV
            </Link>
            <Link href='/confidentialite' className='hover:underline'>
              Confidentialité
            </Link>
            <Link href='/cookies' className='hover:underline'>
              Gestion des cookies
            </Link>
            <Link href='/plan-du-site' className='hover:underline'>
              Plan du site
            </Link>
          </div>

          <p className='text-center md:text-right font-medium uppercase'>
            © {new Date().getFullYear()} HAMANIè. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
