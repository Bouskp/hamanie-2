// components/sections/SectionMosaiquePaysAccueil.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cleanWordPressExcerpt } from '@/lib/utils'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: string
  date: string
  focalPoint: {
    x: string
    y: string
  }
}

interface SectionMosaiqueProps {
  articles: Post[]
  country: {
    name: string
    slug: string
    colorClass?: string // Ex: "border-orange-600 text-orange-600" pour la CI
  }
}

export default function SectionMosaiquePaysAccueil({
  articles,
  country,
}: SectionMosaiqueProps) {
  // Sécurité : Il faut au moins des articles pour rendre le composant
  if (!articles || articles.length === 0) return null

  // Découpage strict pour obtenir exactement 5 articles maximum
  const leadArticle = articles[0] // 1er article : La grande Une
  const gridArticles = articles.slice(1, 5) // Les 4 articles secondaires à droite

  const countryUrl = `/zones/${country.slug}`
  // Petite astuce pour n'extraire QUE la classe de texte (ex: text-orange-600) ou de bordure

  return (
    <section
      className={`border-t-2 border-neutral-900 pt-6 mb-16 antialiased w-full`}
    >
      {/* EN-TÊTE ÉDITORIAL : Titre cliquable + Lien "Voir tout" */}
      <div className='flex items-end justify-between border-b border-neutral-100 pb-3 mb-6 gap-4'>
        <Link href={countryUrl} className='group flex items-center gap-2'>
          <h2
            className={`font-condensed text-xl md:text-2xl font-black uppercase tracking-tight text-black group-hover transition-colors hover:text-red-600`}
          >
            {country.name}
          </h2>
        </Link>

        {/* Le lien vers la page pays globale */}
        <Link
          href={countryUrl}
          className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-neutral-400 transition-colors group font-sans hover:text-red-600`}
        >
          <span>Toutes les infos sur l'{country.name}</span>
          <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
        </Link>
      </div>

      {/* LA MOSAÏQUE DES 5 ARTICLES */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* NIVEAU 1 : L'article Principal (Prend 7/12 de la largeur) */}
        {leadArticle && (
          <div className='lg:col-span-7 group space-y-4'>
            {leadArticle.image && (
              <Link href={`/posts/${leadArticle.slug}`} className='block'>
                <AspectRatio
                  ratio={16 / 10}
                  className='bg-neutral-50 overflow-hidden rounded-xl border border-neutral-100 shadow-xs'
                >
                  <Image
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    fill
                    className='object-cover group-hover:scale-[1.01] transition-transform duration-500 opacity-95 group-hover:opacity-100'
                    style={{
                      objectPosition: leadArticle.focalPoint
                        ? `${leadArticle.focalPoint.x} ${leadArticle.focalPoint.y}`
                        : '50% 50%',
                    }}
                    sizes='(max-width: 1024px) 100vw, 55vw'
                  />
                </AspectRatio>
              </Link>
            )}

            <div className='space-y-2'>
              <Link href={`/posts/${leadArticle.slug}`}>
                <h3
                  className='font-condensed text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900 group-hover:text-red-600 transition-colors mb-4'
                  dangerouslySetInnerHTML={{ __html: leadArticle.title }}
                />
              </Link>
              <p
                className='text-gray-600 text-sm font-normal leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(leadArticle.excerpt),
                }}
              />

              <span className='text-[12px] text-black font-condensed block pt-1 font-condensed'>
                {leadArticle.date}
              </span>
            </div>
          </div>
        )}

        {/* NIVEAU 2 : Les 4 articles secondaires (Prend 5/12 de la largeur) */}
        <div className='lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:border-l lg:pl-8 border-neutral-100 w-full'>
          {gridArticles.map((post) => (
            <article
              key={post.id}
              className='bg-neutral-50/40 border border-neutral-100/60 p-3 hover:border-neutral-200/80 hover:bg-white rounded-xl transition-all duration-200 group flex flex-col justify-between h-full'
            >
              <div className='space-y-2.5'>
                {post.image && (
                  <Link
                    href={`/posts/${post.slug}`}
                    className='block shrink-0 aspect-[16/10] relative w-full overflow-hidden rounded-lg bg-neutral-100'
                  >
                    <Image
                      src={post.image}
                      alt=''
                      fill
                      className='object-cover opacity-95 group-hover:opacity-100 transition-opacity'
                      sizes='(max-width: 768px) 100vw, 20vw'
                      style={{
                        objectPosition: leadArticle.focalPoint
                          ? `${leadArticle.focalPoint.x} ${leadArticle.focalPoint.y}`
                          : '50% 50%',
                      }}
                    />
                  </Link>
                )}

                <Link href={`/posts/${post.slug}`}>
                  <h4
                    className='font-sans font-bold text-xs md:text-sm text-neutral-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </Link>
              </div>

              <span className='text-[12px] text-black block pt-2 border-t border-neutral-100/60 font-condensed mt-2 shrink-0'>
                {post.date}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
