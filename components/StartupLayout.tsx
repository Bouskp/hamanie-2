import { calculateReadingTime } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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
  content: string
  focalPoint: FocalPoint
}

interface StatupProps {
  posts: Post[]
  title: string
  linkUrl: string
}

// Données d'exemple basées sur l'écosystème ivoirien

export default function StartupArticlesRegistry(StatupProps: StatupProps) {
  // On sépare le premier article pour le mettre en vedette
  const [featuredArticle, ...otherArticles] = StatupProps.posts

  return (
    <section className='bg-slate-50 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* En-tête de la section des publications */}
        <div className='flex items-center justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
          <Link
            href={StatupProps.linkUrl}
            className='group flex items-center gap-2'
          >
            <h2 className='font-condensed text-xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'>
              {StatupProps.title}
            </h2>
          </Link>

          {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
          <Link
            href={StatupProps.linkUrl}
            className='hidden text-gray-400 md:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider  hover:text-red-600 transition-colors group'
          >
            <span>Voir tout</span>
            <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
          </Link>
        </div>

        {/* Grille Principale */}
        <div className='grid gap-12 lg:grid-cols-12'>
          {/* COLONNE GAUCHE (7/12) : L'ARTICLE EN VEDETTE */}
          <div className='lg:col-span-7'>
            <article className='group relative flex flex-col justify-between h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'>
              <div>
                {/* Zone Image */}
                <div className='aspect-[16/9] w-full bg-slate-200 overflow-hidden relative'>
                  <img
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    className='w-full h-full object-cover group-hover:scale-102 transition-transform duration-500'
                    style={{
                      objectPosition: featuredArticle.focalPoint
                        ? `${featuredArticle.focalPoint.x} ${featuredArticle.focalPoint.y}`
                        : '50% 50%',
                    }}
                  />
                </div>

                {/* Contenu Texte */}
                <div className='p-6 sm:p-8'>
                  <div className='flex items-center space-x-2 text-xs text-slate-400 font-medium mb-3'>
                    {/* <span>Par {featuredArticle.author}</span> */}
                    <span>{featuredArticle.date}</span>
                  </div>
                  <h3 className='text-xl md:text-2xl font-bold text-slate-900 group-hover:text-red-500 transition-colors leading-tight'>
                    <Link href={`/posts/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h3>
                  <p
                    className='mt-4 text-slate-600 text-sm leading-relaxed line-clamp-3'
                    dangerouslySetInnerHTML={{
                      __html: featuredArticle.excerpt,
                    }}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* COLONNE DROITE (5/12) : LISTE DES AUTRES ARTICLES */}
          <div className='lg:col-span-5 flex flex-col gap-6'>
            <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-2'>
              {otherArticles.length > 0 && 'Récemment publié'}
            </h4>

            {otherArticles.map((article) => (
              <article
                key={article.id}
                className='group bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 items-start hover:border-slate-200 hover:shadow-sm transition-all duration-200'
              >
                {/* Miniature Image */}
                <div className='w-24 h-24 sm:w-28 sm:h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0'>
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-300'
                  />
                </div>

                {/* Contenu Texte Miniature */}
                <div className='flex flex-col justify-between h-full min-w-0'>
                  <div>
                    <h5 className='text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug'>
                      <Link href={`/posts/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h5>
                  </div>

                  {/* Métadonnées bas de ligne */}
                  <div className='mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-medium'>
                    {/* <span className='truncate'>Par {article.author}</span> */}
                    <span>•</span>
                    {/* <span className='shrink-0'>{article.readingTime}</span> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
