// components/layouts/BBCNewsLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CustomPagination } from '../rubriques/CustomPagination'
import { cleanWordPressExcerpt, formatHtml, formatMediaDate } from '@/lib/utils'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  excerpt: string
  path: string
  date: string
  image?: string
  subCategory?: string
  altStr?: string
  focalPoint: {
    x: string
    y: string
  }
}

export function BBCNewsLayout({
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
  // Découpage structurel façon BBC World
  const topStory = articles[0] // L'article principal avec grand visuel
  const subTopStories = articles.slice(1, 4) // La bande des 3 articles de soutien en dessous
  const gridStories = articles.slice(4, 10) // La grille de récits secondaires compacts
  const textOnlyFeed = articles.slice(10) // Le fil d'actualités rapide en texte seul

  return (
    <main className='max-w-7xl mx-auto px-4 py-6  text-[#212121] antialiased font-sans'>
      {/* 1. En-tête Dynamique Style BBC */}
      <div className='flex items-center gap-2 mb-6 border-b border-neutral-300 pb-2'>
        <h1
          className='text-3xl font-black tracking-tight text-neutral-900 capitalize font-condensed'
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* 2. ZONE SUPÉRIEURE : Le Bloc Héro (Top Story) */}
      {topStory && (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-4 md:p-6 border border-neutral-200/60 shadow-xs mb-6 group'>
          <div className='lg:col-span-7'>
            <Link href={topStory.path} className='block'>
              <AspectRatio
                ratio={16 / 9}
                className='overflow-hidden rounded-xs'
              >
                <Image
                  src={topStory.image || ''}
                  alt={topStory.title}
                  className='object-cover w-full h-full group-hover:opacity-95 transition-opacity'
                  fill
                  style={{
                    objectPosition: topStory.focalPoint
                      ? `${topStory.focalPoint.x} ${topStory.focalPoint.y}`
                      : '50% 50%',
                  }}
                />
              </AspectRatio>
            </Link>
            {topStory.altStr && (
              <p
                className='text-[11px] text-gray-700 italic mt-1.5 font-normal pl-2 border-l border-neutral-200'
                dangerouslySetInnerHTML={{ __html: topStory.altStr }}
              />
            )}
          </div>

          <div className='lg:col-span-5 flex flex-col justify-between py-1 space-y-4'>
            <div className='space-y-3'>
              {topStory.subCategory && (
                <span className='text-[11px] font-black text-[#b80000] uppercase tracking-wider block font-condensed'>
                  {topStory.subCategory}
                </span>
              )}
              <Link href={topStory.path}>
                <h2
                  className='text-2xl md:text-3xl font-extrabold tracking-tight leading-tight hover:text-red-600 transition-colors'
                  dangerouslySetInnerHTML={{ __html: topStory.title }}
                />
              </Link>
              <p
                className='text-neutral-600 text-sm font-normal leading-relaxed line-clamp-3'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(topStory.excerpt),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. ZONE INTERMÉDIAIRE : La Ligne des 3 Sous-Top Stories */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {subTopStories.map((post) => (
          <Card
            key={post.id}
            className='bg-white border border-neutral-200/60 shadow-xs rounded-none group flex flex-col justify-between h-full'
          >
            <CardContent className='p-4 space-y-3 flex-1 flex flex-col justify-between'>
              <div className='space-y-2'>
                {post.image && (
                  <Link href={post.path} className='block mb-2'>
                    <AspectRatio
                      ratio={16 / 9}
                      className='bg-neutral-50 overflow-hidden rounded-xs'
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        className='object-cover w-full h-full'
                        fill
                        style={{
                          objectPosition: post.focalPoint
                            ? `${post.focalPoint.x} ${post.focalPoint.y}`
                            : '50% 50%',
                        }}
                      />
                    </AspectRatio>
                  </Link>
                )}
                <Link href={post.path}>
                  <h3
                    className='font-extrabold text-base leading-snug hover:text-red-600 transition-colors line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </Link>
                <p
                  className='text-neutral-500 text-xs font-normal line-clamp-2 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: cleanWordPressExcerpt(post.excerpt),
                  }}
                />
              </div>
              <div className='text-[11px] text-neutral-400 font-medium font-condensed pt-2 border-t border-neutral-100'>
                {formatMediaDate(post.date)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 4. BLOC DU BAS : Grille Mixte + Fil Texte de Gauche (2 Colonnes) */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        {/* Grille d'actualités secondaires (8/12) */}
        <div className='lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {gridStories.map((post) => (
            <div
              key={post.id}
              className='bg-white p-4 border border-neutral-200/60 shadow-xs group flex gap-4 items-start'
            >
              {post.image && (
                <div className='w-24 h-24 sm:w-28 sm:h-20 shrink-0 relative overflow-hidden bg-neutral-50'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover w-full h-full'
                    style={{
                      objectPosition: post.focalPoint
                        ? `${post.focalPoint.x} ${post.focalPoint.y}`
                        : '50% 50%',
                    }}
                  />
                </div>
              )}
              <div className='space-y-1 flex-1'>
                <Link href={post.path}>
                  <h4
                    className='font-bold text-sm leading-snug hover:text-red-600 transition-colors line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </Link>
                <p className='text-[11px] text-neutral-400 font-medium font-condensed'>
                  {formatMediaDate(post.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Le Fil Info Texte Seul (4/12) */}
        <aside className='lg:col-span-4 bg-white p-4 border border-neutral-200/60 shadow-xs space-y-4'>
          <h4 className='font-condensed text-xs font-black uppercase tracking-wider text-red-600 border-b border-neutral-200 pb-2'>
            Nos lecteurs ont aimé
          </h4>
          <div className='space-y-4 divide-y divide-neutral-100'>
            {textOnlyFeed.map((post, idx) => (
              <div key={post.id} className={`group ${idx > 0 ? 'pt-4' : ''}`}>
                <Link href={post.path} className='space-y-1 block'>
                  <h5
                    className='font-bold text-sm leading-snug hover:text-red-600 transition-colors line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <p className='text-[10px] text-neutral-400 font-medium font-condensed'>
                    {formatMediaDate(post.date)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* 5. Pagination Générique */}
      <div className='mt-12 flex justify-center border-t border-neutral-200 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/rubrique/${slug}`}
        />
      </div>
    </main>
  )
}
