import React from 'react'
import { Bookmark, Lock, Layers, ArrowRight } from 'lucide-react'
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
  focalPoint: FocalPoint
}

interface SeriesProps {
  posts: Post[]
  title: string
  linkUrl: string
}
export default function SeriesEnquetesLayout(SeriesProps: SeriesProps) {
  return (
    <section className='bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        {/* En-tête de la section */}
        <div className='flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800 pb-6 mb-10'>
          <div>
            <h2 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-100'>
              {SeriesProps.title}
            </h2>
          </div>
          <Link
            href={SeriesProps.linkUrl}
            className='group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mt-4 sm:mt-0 transition-colors'
          >
            Toutes les enquêtes
            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* Grille des articles immersifs */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {SeriesProps.posts.map((article) => (
            <article
              key={article.id}
              className='group relative flex flex-col justify-end min-h-[450px] rounded-md overflow-hidden border border-zinc-900 bg-zinc-950 transition-all duration-300 shadow-2xl'
            >
              {/* Image en arrière-plan complet */}
              <div className='absolute inset-0 z-0'>
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className='object-cover w-full h-full opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700'
                  loading='lazy'
                  style={{
                    objectPosition: article.focalPoint
                      ? `${article.focalPoint.x} ${article.focalPoint.y}`
                      : '50% 50%',
                  }}
                />
                {/* Double overlay pour garantir le contraste et la lisibilité du texte blanc */}
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10' />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10' />
              </div>

              {/* Badges supérieurs (au-dessus du fond) */}
              <div className='absolute top-4 left-4 right-4 flex items-center justify-between z-20'>
                {/* <span className='bg-red-600 text-white font-bold text-[10px] tracking-widest px-2.5 py-1 uppercase rounded-xs'>
                  {article.category}
                </span> */}

                {/* {article.isPremium && (
                  <span className='bg-amber-500 text-zinc-950 font-bold text-[10px] px-2 py-1 flex items-center gap-1 rounded-xs uppercase tracking-wider shadow-md'>
                    <Lock className='w-3 h-3 fill-current' />
                    Abonnés
                  </span>
                )} */}
              </div>

              {/* Contenu textuel positionné en bas */}
              <div className='relative p-6 z-20 w-full flex flex-col justify-end'>
                {/* Meta : Nombre de volets & Date */}
                <div className='flex items-center gap-4 text-zinc-400 text-xs font-medium mb-3'>
                  {/* {article.volets > 1 && (
                    <span className='flex items-center gap-1.5 text-amber-400 font-semibold'>
                      <Layers className='w-3.5 h-3.5' />
                      Série en {article.volets} volets
                    </span>
                  )} */}
                  <span className='text-zinc-400'>{article.date}</span>
                </div>

                {/* Titre éditorial (Style Serif) */}
                <h3 className='text-xl sm:text-2xl font-condensed font-bold text-white leading-snug group-hover:text-red-400 transition-colors line-clamp-2 mb-3'>
                  <Link
                    href={`/posts/${article.slug}`}
                    className='hover:underline focus:outline-none'
                  >
                    {article.title}
                  </Link>
                </h3>

                {/* Description / Chapeau */}
                <p
                  className='text-sm text-zinc-300 leading-relaxed line-clamp-3 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300'
                  dangerouslySetInnerHTML={{
                    __html: article.excerpt,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
