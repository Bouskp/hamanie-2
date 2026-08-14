// components/layouts/DefaultLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CustomPagination } from '../rubriques/CustomPagination'
import { formatMediaDate } from '@/lib/utils'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  excerpt: string
  path: string
  date: string
  image?: string
  subCategory?: string
  focalPoint: {
    x: string
    y: string
  }
}

export function DefaultLayout({
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
  // Séparation du flux pour le modèle par défaut
  const primaryArticles = articles.slice(0, 15) // Grille principale (6 articles)
  const popularArticles = articles.slice(15, 40) // Sidebar : Les plus consultés

  return (
    <main className='max-w-7xl mx-auto px-4 py-8 bg-white text-gray-900 antialiased font-sans'>
      {/* 1. En-tête de Rubrique Universel */}
      <div className='flex items-baseline justify-between border-b border-gray-200 pb-4 mb-8'>
        <h1
          className='text-3xl font-extrabold tracking-tight text-gray-900 capitalize'
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* 2. Corps Principal : Grille + Barre Latérale */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* ZONE DE GAUCHE : La Grille Principale (Prend 8/12) */}
        <div className='lg:col-span-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {primaryArticles.map((post) => (
              <Card
                key={post.id}
                className='overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-300 group flex flex-col h-full'
              >
                <CardHeader className='p-0 shrink-0'>
                  <Link href={post.path}>
                    <AspectRatio
                      ratio={16 / 10}
                      className='bg-gray-50 overflow-hidden'
                    >
                      <Image
                        src={post.image || ''}
                        alt={post.title}
                        fill
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                        style={{
                          objectPosition: post.focalPoint
                            ? `${post.focalPoint.x} ${post.focalPoint.y}`
                            : '50% 50%',
                        }}
                      />
                    </AspectRatio>
                  </Link>
                </CardHeader>
                <CardContent className='p-4 flex flex-col flex-1 justify-between space-y-3'>
                  <div className='space-y-2'>
                    {post.subCategory && (
                      <span className='text-[10px] font-bold text-red-600 tracking-widest uppercase'>
                        {post.subCategory}
                      </span>
                    )}
                    <Link href={post.path} className='block'>
                      <h3
                        className='font-bold text-base md:text-lg leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </Link>
                    <p
                      className='text-gray-500 text-xs md:text-sm font-normal line-clamp-2 leading-relaxed'
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </div>
                  <div
                    className='text-[11px] text-gray-400 font-medium pt-1 border-t border-gray-50'
                    dangerouslySetInnerHTML={{
                      __html: formatMediaDate(post.date),
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ZONE DE DROITE : La Sidebar Collante (Prend 4/12) */}
        <aside className='lg:col-span-4 lg:sticky lg:top-20 space-y-6'>
          <div className='border border-gray-100 rounded-lg p-5 bg-gray-50/50'>
            <h4 className='text-xs font-black uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2'>
              <span className='w-1.5 h-3 bg-red-600 block rounded-full' />À lire
              également
            </h4>

            <div className='space-y-4 divide-y divide-gray-100'>
              {popularArticles.map((post, idx) => (
                <div key={post.id} className={`group ${idx > 0 ? 'pt-4' : ''}`}>
                  <Link href={post.path} className='space-y-1 block'>
                    <h5
                      className='font-bold text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <p
                      className='text-[10px] text-gray-400 font-medium'
                      dangerouslySetInnerHTML={{
                        __html: formatMediaDate(post.date),
                      }}
                    />
                  </Link>
                </div>
              ))}

              {popularArticles.length === 0 && (
                <p className='text-xs text-gray-400 italic'>
                  Aucun autre article disponible pour le moment.
                </p>
              )}
            </div>
          </div>

          {/* Encart d'appel à l'action ou d'information générale */}
          <div className='bg-neutral-900 text-white p-6 rounded-lg text-center space-y-3'>
            <h5 className='font-bold text-sm tracking-tight'>
              Suivez toute l'actualité sectorielle
            </h5>
            <p className='text-xs text-neutral-400 leading-relaxed'>
              Analyses approfondies, décryptages économiques et tendances à
              portée de main.
            </p>
          </div>
        </aside>
      </div>

      {/* 3. Pagination Centrée */}
      <div className='mt-16 flex justify-center border-t border-gray-100 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/rubrique/${slug}`}
        />
      </div>
    </main>
  )
}
