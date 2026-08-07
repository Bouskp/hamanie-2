// components/pays/layouts/NigeriaLayout.tsx
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CustomPagination } from '@/components/rubriques/CustomPagination'
import { cleanWordPressExcerpt } from '@/lib/utils'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: string
  date: string
  altStr?: string
  focusX?: number
  focusY?: number
}

interface LayoutProps {
  articles: Post[]
  title: string
  currentPage: number
  totalPages: number
  slug: string
}

export function NigeriaLayout({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: LayoutProps) {
  // Découpage géométrique harmonieux des 40 articles
  const leadArticle = articles[0] // L'article principal (Prend 8/12)
  const secondaryArticles = articles.slice(1, 3) // Les deux articles d'accompagnement (Prend 4/12)
  const gridArticles = articles.slice(3) // Le reste du flux réparti proprement en 3 colonnes

  return (
    <div className='space-y-10 w-full font-sans text-neutral-900 antialiased bg-white'>
      {/* 1. EN-TÊTE ÉDITORIAL HARMONIEUX (Ligne fine Vert Nigeria) */}
      <header className='w-full bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto pt-8 pb-3  flex justify-between items-baseline gap-4'>
          <div>
            <h1
              className='text-3xl md:text-5xl font-bold font-condensed tracking-tight text-neutral-900 capitalize'
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
      </header>

      {articles.length === 0 ? (
        <div className='text-center py-20 text-gray-400 italic font-sans border border-dashed border-gray-200 rounded-xl bg-neutral-50/50'>
          Aucun contenu disponible pour ce pays pour le moment.
        </div>
      ) : (
        <>
          {/* 2. ZONE DE TÊTE BLEND : Équilibre Parfait 8/12 vs 4/12 */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            {/* GAUCHE : Le grand format de Une (8/12) */}
            {leadArticle && (
              <div className='lg:col-span-8 group space-y-4'>
                {leadArticle.image && (
                  <Link href={`/posts/${leadArticle.slug}`} className='block'>
                    <AspectRatio
                      ratio={16 / 9}
                      className='bg-neutral-50 overflow-hidden rounded-xl border border-neutral-100 shadow-xs'
                    >
                      <Image
                        src={leadArticle.image}
                        alt={leadArticle.title}
                        fill
                        priority
                        className='object-cover group-hover:scale-[1.01] transition-transform duration-500 opacity-95 group-hover:opacity-100'
                        style={{
                          objectPosition: `${leadArticle.focusX ?? 50}% ${leadArticle.focusY ?? 50}%`,
                        }}
                        sizes='(max-width: 1024px) 100vw, 66vw'
                      />
                    </AspectRatio>
                  </Link>
                )}

                <div className='space-y-2'>
                  <Link href={`/posts/${leadArticle.slug}`}>
                    <h2
                      className='font-condensed text-xl md:text-2xl font-extrabold tracking-tight leading-tight text-neutral-900 group-hover:text-red-600 transition-colors mb-4'
                      dangerouslySetInnerHTML={{ __html: leadArticle.title }}
                    />
                  </Link>
                  <p className='text-gray-800 text-lg md:text-base font-normal leading-relaxed line-clamp-3'>
                    {cleanWordPressExcerpt(leadArticle.excerpt)}
                  </p>
                  <span className='text-[12px] text-gray-700 font-medium block pt-1 font-condensed'>
                    {leadArticle.date}
                  </span>
                </div>
              </div>
            )}

            {/* DROITE : Les 2 articles secondaires verticaux empilés (4/12) */}
            <div className='lg:col-span-4 flex flex-col gap-6 lg:border-l lg:pl-8 border-gray-100 h-full justify-between'>
              <h4 className='font-sans text-sm font-black uppercase tracking-wider text-red-600 border-b border-gray-100 pb-2'>
                Autres articles
              </h4>
              <div className='space-y-6 divide-y divide-gray-100'>
                {secondaryArticles.map((post, idx) => (
                  <article
                    key={post.id}
                    className={`group space-y-3 ${idx > 0 ? 'pt-5' : ''}`}
                  >
                    <Link href={`/posts/${post.slug}`}>
                      <h3
                        className='font-condensed font-bold text-base md:text-lg leading-snug text-neutral-800 group-hover:text-red-600 transition-colors line-clamp-2'
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </Link>
                    <p className='text-gray-500 text-sm font-normal line-clamp-2 leading-relaxed'>
                      {cleanWordPressExcerpt(post.excerpt)}
                    </p>
                    <span className='text-[12px] text-gray-700 font-medium block font-condensed'>
                      {post.date}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <Separator className='bg-gray-100 my-8' />

          {/* 3. ZONE BASSE : Grille de fond fluide et symétrique en 3 colonnes */}
          {gridArticles.length > 0 && (
            <section className='space-y-6'>
              <h3 className='font-sans text-xs font-black uppercase tracking-widest text-neutral-400 mb-6'>
                Plus d'articles
              </h3>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {gridArticles.map((post) => (
                  <Card
                    key={post.id}
                    className='overflow-hidden border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xs transition-all duration-200 group flex flex-col h-full rounded-xl'
                  >
                    <CardHeader className='p-0 shrink-0 relative aspect-[16/10] bg-neutral-50 w-full overflow-hidden'>
                      {post.image && (
                        <Link
                          href={`/posts/${post.slug}`}
                          className='block w-full h-full'
                        >
                          <Image
                            src={post.image}
                            alt=''
                            fill
                            className='object-cover group-hover:scale-[1.01] transition-transform duration-500 opacity-95 group-hover:opacity-100'
                            style={{
                              objectPosition: `${post.focusX ?? 50}% ${post.focusY ?? 50}%`,
                            }}
                            sizes='(max-width: 768px) 100vw, 33vw'
                          />
                        </Link>
                      )}
                    </CardHeader>

                    <CardContent className='p-4 flex flex-col flex-1 justify-between space-y-3'>
                      <div className='space-y-2'>
                        <Link href={`/posts/${post.slug}`} className='block'>
                          <h4
                            className='font-condensed font-bold text-lg md:text-base text-neutral-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug'
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                        </Link>
                        <p className='text-gray-700 text-sm font-normal line-clamp-2 leading-relaxed'>
                          {cleanWordPressExcerpt(post.excerpt)}
                        </p>
                      </div>

                      <div className='text-[12px] text-black font-medium pt-2 border-t border-gray-50 font-condensed'>
                        {post.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* 4. ZONE DE NAVIGATION ET PAGINATION */}
          <div className='mt-12 flex justify-center border-t border-gray-100 pt-6'>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/pays/${slug}`}
            />
          </div>
        </>
      )}
    </div>
  )
}
