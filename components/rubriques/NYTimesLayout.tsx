// components/layouts/NYTimesInternationalLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CustomPagination } from './CustomPagination'
import {
  calculateReadingTime,
  cleanWordPressExcerpt,
  formatHtml,
  formatMediaDate,
} from '@/lib/utils' // Votre fonction de nettoyage

interface Post {
  id: string
  title: string
  excerpt: string
  path: string
  date: string
  image?: string
  subCategory?: string
  readingTime?: string
  content: string
  altStr: string
}

export function NYTimesLayout({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: {
  articles: Post[]
  title: string
  currentPage: number
  totalPages: number
  slug: string
}) {
  // Découpage chirurgical des articles à la manière du NYT
  const mainStory = articles[0] // La Top Story (Grand angle)
  const sidebarStories = articles.slice(1, 6) // Le bloc d'analyses ou "Live Tracker"
  const gridStories = articles.slice(6) // La grille de récits internationaux

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 bg-[#fbfbfb] text-[#121212] antialiased'>
      {/* 1. En-tête Global de la Rubrique */}
      <div className='border-b border-neutral-300 pb-1.5 mb-6 flex justify-between items-baseline'>
        <h1
          className='font-condensed text-3xl md:text-4xl font-black tracking-tight'
          dangerouslySetInnerHTML={{ __html: formatHtml(title) }}
        />
      </div>

      {/* 2. LE BLOC MAJEUR (Top Story + Live Tracker Lateral) */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12'>
        {/* Colonne Principale (8/12) : La Une du Jour */}
        {mainStory && (
          <div className='lg:col-span-8 group border-b lg:border-b-0 pb-8 lg:pb-0 border-neutral-200'>
            <Link href={mainStory.path} className='space-y-4 block'>
              <h2
                className='font-condensed text-3xl md:text-4xl font-bold tracking-tight leading-tight hover:text-red-600 transition-colors'
                dangerouslySetInnerHTML={{
                  __html: formatHtml(mainStory.title),
                }}
              />

              <p
                className='text-gray-700 text-sm md:text-base font-normal leading-relaxed max-w-2xl'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(mainStory.excerpt),
                }}
              />

              <div className='flex items-center gap-3 text-sm text-gray-800 font-sans'>
                <span>{formatMediaDate(mainStory.date)}</span>

                <span>
                  • {calculateReadingTime(mainStory.content)} min de lecture
                </span>
              </div>
              {mainStory.image && (
                <div className='mt-4 space-y-1.5'>
                  {/* Conteneur de l'image avec AspectRatio */}
                  <AspectRatio
                    ratio={16 / 10}
                    className='bg-neutral-100 overflow-hidden rounded-xs'
                  >
                    <img
                      src={mainStory.image}
                      alt={mainStory.title}
                      className='object-cover w-full h-full opacity-95 group-hover:opacity-100 transition-opacity radius-xs'
                    />
                  </AspectRatio>

                  {/* Légende de l'image style NYT (Petite, grise et discrète) */}
                  {mainStory.altStr && (
                    <p
                      className='text-sm text-black font-sans italic leading-tight pl-1 border-l border-neutral-200'
                      dangerouslySetInnerHTML={{ __html: mainStory.altStr }}
                    />
                  )}
                </div>
              )}
            </Link>
          </div>
        )}

        {/* Colonne Latérale (4/12) : Le Widget de Suivi / "In Case You Missed It" */}
        <div className='lg:col-span-4 space-y-6 lg:border-l lg:pl-8 border-neutral-200'>
          <div className='flex items-center gap-2 border-b border-neutral-900 pb-1.5'>
            <h3 className='font-condensed text-xs font-black uppercase tracking-widest text-red-600'>
              Articles similaires
            </h3>
          </div>

          <div className='space-y-6 divide-y divide-neutral-200'>
            {sidebarStories.map((post, idx) => (
              <div key={post.id} className={`group ${idx > 0 ? 'pt-5' : ''}`}>
                <Link href={post.path} className='space-y-2 block'>
                  {post.subCategory && (
                    <span className='text-[10px] font-black tracking-wider text-red-600 uppercase font-sans'>
                      {post.subCategory}
                    </span>
                  )}
                  <h4
                    className='font-serif text-base font-bold leading-snug group-hover:text-red-600 transition-colors'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />

                  <p
                    className='text-gray-600 text-sm font-condensed line-clamp-2 leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: cleanWordPressExcerpt(post.excerpt),
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className='my-8 bg-neutral-300' />

      {/* 3. GRILLE SECONDAIRE MULTI-COLONNES (Le Reste du Monde) */}
      <div className='space-y-6'>
        <h3 className='font-condensed text-sm font-black uppercase tracking-widest text-red-600 mb-6'>
          Nos lecteurs ont aimé
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
          {gridStories.map((post) => (
            <article
              key={post.id}
              className='group flex flex-col justify-between h-full space-y-3'
            >
              <Link href={post.path} className='space-y-3 block flex-1'>
                {post.image && (
                  <AspectRatio
                    ratio={16 / 9}
                    className='bg-neutral-50 overflow-hidden rounded-xs mb-1'
                  >
                    <img
                      src={post.image}
                      alt=''
                      className='object-cover w-full h-full'
                    />
                  </AspectRatio>
                )}
                <div className='space-y-1.5'>
                  {post.subCategory && (
                    <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-sans'>
                      {post.subCategory}
                    </span>
                  )}
                  <h4
                    className='font-condensed text-base font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />
                  <p
                    className='text-gray-600 text-sm font-serif line-clamp-3 leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: cleanWordPressExcerpt(post.excerpt),
                    }}
                  />
                </div>
              </Link>
              <div className='text-[10px] text-neutral-400 font-sans pt-2 border-t border-neutral-100'>
                {formatMediaDate(post.date)}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 4. Pagination Premium */}
      <div className='mt-16 flex justify-center border-t border-neutral-200 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/rubrique/${slug}`}
        />
      </div>
    </main>
  )
}
