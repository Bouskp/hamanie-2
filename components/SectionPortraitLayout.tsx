'use client'

import React from 'react'
import { User, ArrowUpRight, Bookmark } from 'lucide-react'
import Link from 'next/link'

interface FocalPoint {
  x: string
  y: string
}

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  featuredImage: string
  slug: string
  titre: string
  focalPoint: FocalPoint
}

export default function PortraitsGridBgLayout({ posts }: { posts: Post[] }) {
  return (
    <section className='bg-[#fcfbf9] text-zinc-900 py-16 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        {/* En-tête minimaliste de la section */}
        <div className='flex flex-col mb-10 border-b border-zinc-200 pb-6'>
          <h2
            className='font-condensed text-2xl md:text-2xl font-bold uppercase
        tracking-tight text-black group-hover:text-red-600 transition-colors'
          >
            Portraits
          </h2>
        </div>
        {/* Grille Responsive de cartes à fond photo */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {posts.map((portrait) => (
            <Link
              href={'/posts/' + portrait.slug}
              key={portrait.id}
              className='group relative flex flex-col justify-end min-h-[420px] rounded-md overflow-hidden bg-zinc-900 border border-zinc-200/50 shadow-md cursor-pointer transition-all duration-300'
            >
              {/* Photo en arrière-plan complet */}
              <div className='absolute inset-0 z-0'>
                <img
                  src={portrait.featuredImage}
                  alt={portrait.title}
                  className='object-cover w-full h-full grayscale-[40%] contrast-[1.1] opacity-75 group-hover:opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700'
                  loading='lazy'
                  style={{
                    objectPosition: portrait.focalPoint
                      ? `${portrait.focalPoint.x} ${portrait.focalPoint.y}`
                      : '50% 50%',
                  }}
                />
                {/* Dégradé doux : plus clair en haut pour voir les visages, très sombre en bas pour le texte */}
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 z-10' />
              </div>

              {/* Informations textuelles superposées en bas */}
              <div className='relative p-5 z-20 w-full text-white'>
                {/* Fonction / Poste */}
                {/* Nom de la personnalité (Style très prononcé) */}
                <h3 className='text-2xl font-serif font-bold tracking-tight mb-2 text-zinc-100 group-hover:text-white transition-colors'>
                  {portrait.title}
                </h3>
                {/* Titre de l'article / Citation descriptive */}
                <p
                  className='text-sm text-zinc-300 font-sans leading-snug line-clamp-3 mb-4 opacity-90 group-hover:opacity-100 transition-opacity'
                  dangerouslySetInnerHTML={{
                    __html: portrait.titre.replaceAll(portrait.title + ',', ''),
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
