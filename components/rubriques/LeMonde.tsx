// components/layouts/LeMondeInternationalLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CustomPagination } from '../rubriques/CustomPagination'
import { formatHtml, formatMediaDate, cleanWordPressExcerpt } from '@/lib/utils'
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

export function LeMondeLayout({
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
  // Le Monde isole toujours le premier article (Le "Grand Format" ou la Une du jour)
  const leadArticle = articles[0]
  // Les 3 articles suivants forment la ligne secondaire avec miniatures
  const secondaryArticles = articles.slice(1, 7)
  // Le reste sert au flux de liste classique ou "Fil Info"
  const feedArticles = articles.slice(7)

  return (
    <main className='max-w-7xl mx-auto px-4 py-8 bg-[#fcfcfc] text-gray-900'>
      {/* En-tête de la Rubrique Style Presse */}
      <div className='border-b-2 border-black pb-2 mb-8'>
        <h1
          className='font-condensed text-4xl font-extrabold tracking-tight capitalize'
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* ZONE UNIQUE : La Une Asymétrique (Inspirée de lemonde.fr/international) */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12'>
        {/* Colonne de Gauche : L'article Principal (Prend 8/12 de la largeur) */}
        {leadArticle && (
          <div className='lg:col-span-8 flex flex-col justify-between group'>
            <Link href={leadArticle.path} className='space-y-4'>
              <AspectRatio
                ratio={16 / 10}
                className='bg-muted overflow-hidden rounded-sm'
              >
                <Image
                  src={leadArticle.image || ''}
                  fill
                  alt={leadArticle.title}
                  className='object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500'
                  style={{
                    objectPosition: leadArticle.focalPoint
                      ? `${leadArticle.focalPoint.x} ${leadArticle.focalPoint.y}`
                      : '',
                  }}
                />
              </AspectRatio>
              <div className='space-y-2'>
                {leadArticle.subCategory && (
                  <span className='text-xs font-bold text-red-600 tracking-wider uppercase font-condensed'>
                    {leadArticle.subCategory}
                  </span>
                )}
                <h2
                  className='font-condensed text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:text-red-600'
                  dangerouslySetInnerHTML={{ __html: leadArticle.title }}
                />

                <p
                  className='text-gray-600 text-base md:text-base font-normal leading-relaxed max-w-3xl'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(
                      cleanWordPressExcerpt(leadArticle.excerpt),
                    ),
                  }}
                />

                <p
                  className='text-xs text-gray-400 font-condensed'
                  dangerouslySetInnerHTML={{
                    __html: formatMediaDate(leadArticle.date),
                  }}
                />
              </div>
            </Link>
          </div>
        )}

        {/* Colonne de Droite : Bloc de Flux Secondaire Vertical (Prend 4/12 de la largeur) */}
        <div className='lg:col-span-4 flex flex-col space-y-6 lg:border-l lg:pl-8 border-gray-200'>
          <h3 className='font-condensed text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-1'>
            À la une de la rubrique
          </h3>
          <div className='space-y-6 divide-y divide-gray-100'>
            {secondaryArticles.map((post, idx) => (
              <div key={post.id} className={`group ${idx > 0 ? 'pt-4' : ''}`}>
                <Link href={post.path} className='flex gap-4'>
                  <div className='flex-1 space-y-1'>
                    <h4
                      className='font-condensed text-base font-bold leading-snug group-hover:text-red-600 line-clamp-3'
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    <p className='text-xs text-gray-700 font-condensed'>
                      {formatMediaDate(post.date)}
                    </p>
                  </div>
                  {post.image && (
                    <div className='w-24 h-16 shrink-0 relative overflow-hidden rounded-sm'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        className='object-cover w-full h-full'
                        style={{
                          objectPosition: post.focalPoint
                            ? `${post.focalPoint.x} ${post.focalPoint.y}`
                            : '50% 50%',
                        }}
                        fill
                      />
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className='my-8 bg-gray-200' />

      {/* ZONE BASSE : Grille de flux standard à double colonne pour l'historique */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {feedArticles.map((post) => (
          <Card
            key={post.id}
            className='bg-transparent border-none shadow-none rounded-none group'
          >
            <Link href={post.path} className='space-y-3 block'>
              {post.image && (
                <AspectRatio
                  ratio={16 / 9}
                  className='bg-muted overflow-hidden rounded-sm mb-2'
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    className='object-cover w-full h-full'
                    style={{
                      objectPosition: post.focalPoint
                        ? `${post.focalPoint.x} ${post.focalPoint.y}`
                        : '50% 50%',
                    }}
                    fill
                  />
                </AspectRatio>
              )}
              <div className='space-y-1'>
                {post.subCategory && (
                  <span className='text-[10px] font-bold text-gray-500 uppercase tracking-widest block font-condensed'>
                    {post.subCategory}
                  </span>
                )}
                <h3
                  className='font-condensed text-lg font-bold leading-snug group-hover:text-red-600 line-clamp-3'
                  dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                />

                <p
                  className='text-base text-gray-500 line-clamp-2 font-condensed'
                  dangerouslySetInnerHTML={{ __html: formatHtml(post.excerpt) }}
                />

                <p
                  className='text-[14px] text-gray-500 font-condensed'
                  dangerouslySetInnerHTML={{
                    __html: formatMediaDate(post.date),
                  }}
                />
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination intégrée au bas pour indexer correctement vos 3 000 articles */}
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
