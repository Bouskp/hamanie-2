// components/layouts/ForbesInnovationLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CustomPagination } from '../rubriques//CustomPagination'
import { cleanWordPressExcerpt, formatHtml, formatMediaDate } from '@/lib/utils'

interface Post {
  id: string
  title: string
  excerpt: string
  path: string
  date: string
  image?: string
  subCategory?: string
  content: string
}

export function ForbesLayout({
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
  // Découpage du flux de données à la manière de Forbes
  const mainFeature = articles[0] // Le grand article à la Une
  const gridArticles = articles.slice(1, 10) // La grille centrale de tendances
  const opinionStream = articles.slice(10) // Le flux vertical d'analyses d'experts

  return (
    <main className='max-w-7xl mx-auto px-4 py-8 bg-white text-neutral-900 antialiased font-sans'>
      {/* 1. Titre de la Rubrique Style "Forbes Tech" */}
      <div className='border-b border-neutral-800 pb-2 mb-8'>
        <h1
          className='text-4xl font-extrabold tracking-tighter capitalize font-condensed'
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* 2. ZONE SUPÉRIEURE : L'article vedette horizontal */}
      {mainFeature && (
        <div className='group border-b border-neutral-200 pb-10 mb-10'>
          <Link
            href={mainFeature.path}
            className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
          >
            <div className='lg:col-span-7'>
              {mainFeature.image && (
                <AspectRatio
                  ratio={16 / 9}
                  className='bg-neutral-100 overflow-hidden rounded-md'
                >
                  <img
                    src={mainFeature.image}
                    alt={mainFeature.title}
                    className='object-cover w-full h-full group-hover:opacity-90 transition-opacity'
                  />
                </AspectRatio>
              )}
            </div>
            <div className='lg:col-span-5 space-y-4'>
              {mainFeature.subCategory && (
                <Badge className='bg-neutral-900 hover:bg-neutral-800 text-white rounded-none uppercase text-[10px] tracking-widest px-2 py-0.5'>
                  {mainFeature.subCategory}
                </Badge>
              )}
              <h2
                className='text-3xl font-black tracking-tight leading-tight group-hover:text-red-600  decoration-2'
                dangerouslySetInnerHTML={{
                  __html: formatHtml(mainFeature.title),
                }}
              />

              <p
                className='text-neutral-600 text-sm leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(mainFeature.excerpt),
                }}
              />
            </div>
          </Link>
        </div>
      )}

      {/* 3. ZONE CENTRALE : La Grille Forbes "Trending" (4 Colonnes) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        {gridArticles.map((post) => (
          <article
            key={post.id}
            className='group flex flex-col justify-between space-y-3 bg-neutral-50/50 p-4 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-all'
          >
            <Link href={post.path} className='space-y-3 block flex-1'>
              {post.image && (
                <AspectRatio
                  ratio={16 / 10}
                  className='bg-neutral-100 overflow-hidden rounded-sm'
                >
                  <img
                    src={post.image}
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </AspectRatio>
              )}

              <h3
                className='font-bold text-sm text-condensed leading-snug group-hover:text-red-600 transition-colors line-clamp-3'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(post.title),
                }}
              />
            </Link>
            <div className='pt-2 border-t border-neutral-100 text-[11px]'>
              <span className='font-semibold text-neutral-800'>
                Par{' '}
                {post.content.includes('Thom Biakpa')
                  ? 'Thomas Biakpa'
                  : 'La Rédaction'}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 4. ZONE INFÉRIEURE : Flux vertical "More from Innovation" avec focus contributeurs */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-neutral-200 pt-8'>
        <div className='lg:col-span-8 space-y-8'>
          <h3 className='text-lg font-black uppercase tracking-tight border-b-2 border-neutral-900 pb-1 mb-6'>
            Les Lecteurs ont aimé
          </h3>
          <div className='space-y-8 divide-y divide-neutral-100'>
            {opinionStream.map((post, idx) => (
              <div key={post.id} className={`group ${idx > 0 ? 'pt-8' : ''}`}>
                <Link
                  href={post.path}
                  className='flex flex-col sm:flex-row gap-6'
                >
                  {post.image && (
                    <div className='w-full sm:w-44 h-28 shrink-0 relative overflow-hidden rounded-md bg-neutral-50 border border-neutral-100'>
                      <img
                        src={post.image}
                        alt=''
                        className='object-cover w-full h-full'
                      />
                    </div>
                  )}
                  <div className='space-y-2 flex-1'>
                    <div className='flex items-center gap-2 text-[11px] text-neutral-400 font-medium'>
                      <span className='text-gray-900 font-bold uppercase'>
                        {post.subCategory}
                      </span>
                      <span>•</span>
                      <span>{formatMediaDate(post.date)}</span>
                    </div>
                    <h4
                      className='text-xl font-condensed font-bold group-hover:text-red-500 transition-colors'
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    <p
                      className='text-neutral-500 text-sm font-normal line-clamp-3'
                      dangerouslySetInnerHTML={{
                        __html: cleanWordPressExcerpt(post.excerpt),
                      }}
                    />

                    <p className='text-[11px] font-semibold text-neutral-800 pt-1 text-mono'>
                      Par{' '}
                      <span className='hover:underline'>
                        {post.content.includes('Thom Biakpa')
                          ? 'Thomas Biakpa'
                          : 'La Rédaction'}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Espace Publicitaire ou Widget Latéral (24% de l'écran) */}
        <aside className='lg:col-span-4 space-y-6 lg:border-l lg:pl-8 border-neutral-200'>
          <div className='bg-neutral-100 p-4 text-center rounded-sm border border-neutral-200'>
            <span className='text-[9px] font-bold text-neutral-400 uppercase tracking-widest block mb-2'>
              Publicité / Newsletter
            </span>
            <div className='h-60 flex items-center justify-center bg-neutral-200/50 rounded text-xs text-neutral-500 font-medium'>
              Espace encart ou CTA d'inscription
            </div>
          </div>
        </aside>
      </div>

      {/* 5. Pagination Robuste pour vos 3 000 Articles */}
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
