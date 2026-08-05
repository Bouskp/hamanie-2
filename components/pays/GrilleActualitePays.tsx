'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowUpRight } from 'lucide-react'
import { formatHtml, imagePlaceholderBase64 } from '@/lib/utils'

export default function GrilleActualitesPays({
  articles,
}: {
  articles: any[]
}) {
  if (!articles || articles.length === 0) return null

  // Extraction éditoriale basée sur la position dans le tableau
  const articleMajeur = articles[0]
  const articlesSecondaires = articles.slice(1, 3)
  const articlesFluxNormal = articles.slice(3)

  // Fonction utilitaire pour extraire proprement l'image mise en avant
  const getImageUrl = (article: any): string => {
    return (
      article._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      imagePlaceholderBase64()
    )
  }

  // Fonction utilitaire pour extraire le nom de la catégorie (wp:term)
  const getCategoryName = (article: any): string | string[] => {
    return article._embedded?.['wp:term']?.[0]?.[0]?.name || 'Actualité'
  }

  return (
    <div className='w-full space-y-8'>
      {/* 1. ZONE HAUTE : MISE EN SCÈNE ÉDITORIALE ASYMÉTRIQUE */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* L'ARTICLE MAJEUR (Prend 2 colonnes sur 3 sur grand écran) */}
        <div className='lg:col-span-2 bg-white border border-gray-200 p-5 rounded-none flex flex-col justify-between group shadow-sm'>
          <Link href={`/posts/${articleMajeur.slug}`} className='block'>
            <div className='relative aspect-[16/9] w-full overflow-hidden mb-4 bg-gray-50 border border-gray-100'>
              <Image
                src={getImageUrl(articleMajeur)}
                alt={articleMajeur.title.rendered}
                fill
                priority
                className='object-cover group-hover:scale-[1.01] transition-transform duration-500'
                blurDataURL={imagePlaceholderBase64()}
              />
            </div>
            <span className='text-[11px] font-black text-red-600 uppercase tracking-widest block mb-2'>
              {getCategoryName(articleMajeur)}
            </span>
            <h2
              className='text-2xl md:text-3xl font-bold font-serif leading-tight text-gray-900 group-hover:text-red-600 transition-colors'
              dangerouslySetInnerHTML={{
                __html: formatHtml(articleMajeur.title.rendered),
              }}
            />
            <div
              className='text-gray-600 mt-3 text-base line-clamp-3 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: formatHtml(
                  articleMajeur.excerpt.rendered.replace(
                    /\[&hellip;\]|\[\.\.\.\]|&hellip;/g,
                    '',
                  ),
                ),
              }}
            />
          </Link>
          <div className='flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-6 pt-4 border-t border-gray-100'>
            <Clock className='w-3.5 h-3.5' />
            <span className='capitalize'>
              {new Date(articleMajeur.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>

        {/* LES ARTICLES SECONDAIRES (Colonne de droite empilée) */}
        <div className='space-y-6 flex flex-col justify-between'>
          {articlesSecondaires.map((article) => (
            <div
              key={article.id}
              className='bg-white border border-gray-200 p-4 rounded-none flex flex-col justify-between flex-1 group shadow-sm'
            >
              <Link href={`/article/${article.slug}`} className='block'>
                <div className='relative aspect-[16/10] w-full overflow-hidden mb-3 bg-gray-50 border border-gray-100'>
                  <Image
                    src={getImageUrl(article)}
                    alt={article.title.rendered}
                    fill
                    className='object-cover'
                    blurDataURL={imagePlaceholderBase64()}
                  />
                </div>
                <span className='text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1'>
                  {getCategoryName(article)}
                </span>
                <h3
                  className='font-bold text-base text-gray-900 font-serif leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                  dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Barre de séparation visuelle textuelle */}
      <div className='w-full h-px bg-gray-200 my-8'></div>

      {/* 2. ZONE BASSE : GRILLE STANDARD DE FLUX CONTINU (2 Colonnes) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {articlesFluxNormal.map((article) => (
          <article
            key={article.id}
            className='bg-white border border-gray-200/80 p-4 rounded-none flex gap-4 group items-start shadow-sm hover:shadow-md transition-shadow'
          >
            {/* Vignette carrée gauche */}
            <div className='relative w-24 h-24 md:w-28 md:h-28 shrink-0 bg-gray-50 overflow-hidden border border-gray-100'>
              <Image
                src={getImageUrl(article)}
                alt={article.title.rendered}
                fill
                sizes='120px'
                className='object-cover'
                blurDataURL={imagePlaceholderBase64()}
              />
            </div>

            {/* Contenu éditorial droit */}
            <div className='flex flex-col justify-between h-24 md:h-28 flex-1 min-w-0'>
              <div>
                <span className='text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-0.5'>
                  {getCategoryName(article)}
                </span>
                <h4
                  className='font-bold text-sm md:text-base text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 font-serif'
                  dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                />
              </div>

              <Link
                href={`/posts/${article.slug}`}
                className='inline-flex items-center gap-1 text-[11px] font-bold text-gray-900 uppercase tracking-wider group/link hover:underline mt-1'
              >
                <span>Lire l’article</span>
                <ArrowUpRight className='w-3.5 h-3.5 text-gray-400 group-hover/link:text-red-600 transition-colors' />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
