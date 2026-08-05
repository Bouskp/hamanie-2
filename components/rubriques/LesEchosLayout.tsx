// components/layouts/LesEchosLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CustomPagination } from '../rubriques//CustomPagination'
import {
  calculateReadingTime,
  cleanWordPressExcerpt,
  formatHtml,
  formatMediaDate,
} from '@/lib/utils'

interface Post {
  id: string
  title: string
  excerpt: string
  path: string
  content: string
  date: string
  image?: string
  subCategory?: string
  readingTime?: string // Spécifique au style analyse financière
}

export function LesEchosLayout({
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
  // Découpage strict de la data selon la hiérarchie financière des Échos
  const mainArticle = articles[0] // L'Événement (Une centrale)
  const secondaryArticles = articles.slice(1, 3) // Les analyses de soutien
  const sideBarArticles = articles.slice(3, 9) // Colonne de droite : "Le Fil des Marchés"
  const bottomGridArticles = articles.slice(9) // Le reste du flux sectoriel

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 bg-white text-slate-900 antialiased selection:bg-sky-100'>
      {/* 1. En-tête Corporate du Secteur */}
      <div className='flex items-center gap-3 mb-6 border-b border-slate-200 pb-3'>
        {/* L'accent couleur Échos */}
        <h1
          className='font-condensed text-3xl font-black capitalize tracking-tight text-slate-900'
          dangerouslySetInnerHTML={{ __html: formatHtml(title) }}
        />
      </div>

      {/* 2. BLOC MAJEUR ASYMÉTRIQUE : 3 Colonnes de l'Événement Économique */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-10'>
        {/* COLONNE 1 : Les 2 Articles de Soutien (Prend 3/12 de la largeur) */}
        <div className='md:col-span-3 flex flex-col space-y-5'>
          {secondaryArticles.map((post) => {
            return (
              <article
                key={post.id}
                className='group border-b border-slate-100 pb-5 last:border-none last:pb-0'
              >
                <Link href={post.path} className='space-y-2 block'>
                  {post.subCategory && (
                    <span className='text-[10px] font-bold text-sky-700 tracking-wider uppercase'>
                      {post.subCategory}
                    </span>
                  )}
                  <h3
                    className='font-condensed text-base font-bold leading-snug group-hover:text-red-600 transition-colors'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />

                  <p
                    className='text-slate-500 text-xs line-clamp-3 font-normal leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: cleanWordPressExcerpt(post.excerpt),
                    }}
                  />

                  <div className='flex gap-2 text-[10px] text-black font-medium'>
                    <span>{formatMediaDate(post.date)}</span>
                    <span>
                      {calculateReadingTime(post.content) + 'min'} de lecture
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {/* COLONNE 2 : L'Événement à la Une Centrale (Prend 6/12 de la largeur) */}
        {mainArticle && (
          <div className='md:col-span-6 border-x border-slate-200 px-0 md:px-6 group'>
            <Link href={mainArticle.path} className='space-y-4 block'>
              {mainArticle.image && (
                <AspectRatio
                  ratio={16 / 9}
                  className='bg-slate-50 overflow-hidden rounded-xs border border-slate-100'
                >
                  <img
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    className='object-cover w-full h-full group-hover:opacity-95 transition-opacity'
                  />
                </AspectRatio>
              )}
              <div className='space-y-2'>
                <h2
                  className='font-condensed text-xl md:text-2xl font-extrabold tracking-tight leading-tight group-hover:text-red-600 transition-colors'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(mainArticle.title),
                  }}
                />

                <p
                  className='text-slate-600 text-sm font-normal leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(mainArticle.excerpt),
                  }}
                />

                <p className='text-[12px] text-slate-400 font-medium'>
                  {formatMediaDate(mainArticle.date)}
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* COLONNE 3 : Le Fil Info B2B / Analyses Rapides (Prend 3/12 de la largeur) */}
        <div className='md:col-span-3 p-4 rounded-xs border border-slate-100 space-y-4'>
          <h4 className='font-sans text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1.5 flex justify-between items-center'></h4>
          <div className='space-y-3.5 divide-y divide-slate-200/70'>
            {sideBarArticles.map((post, idx) => (
              <div key={post.id} className={`group ${idx > 0 ? 'pt-3' : ''}`}>
                <Link href={post.path} className='space-y-1 block'>
                  <div className='flex justify-between items-center gap-2'>
                    <span className='text-[10px] font-black'>
                      {formatMediaDate(post.date)}
                    </span>
                    {post.subCategory && (
                      <span className='text-[9px] font-medium text-slate-400 uppercase tracking-tight'>
                        {post.subCategory}
                      </span>
                    )}
                  </div>
                  <h3
                    className='font-sans text-xs font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className='my-6 bg-slate-200' />

      {/* 3. FLUX SECONDAIRE : Lignes Épurées à deux colonnes */}
      <div className='space-y-6'>
        <h3 className='font-sans text-sm font-black uppercase tracking-wider text-red-600 mb-4'>
          Nos lecteurs ont aimé
        </h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6'>
          {bottomGridArticles.map((post) => (
            <article
              key={post.id}
              className='group flex gap-4 pb-6 border-b border-slate-100 last:border-none last:pb-0'
            >
              <div className='flex-1 space-y-1.5'>
                <Link href={post.path}>
                  <h4
                    className='font-condensed text-xl font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />
                </Link>
                <p
                  className='text-gray-800 text-sm font-normal line-clamp-2 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: cleanWordPressExcerpt(post.excerpt),
                  }}
                />

                <p className='text-[11px] text-gray-400'>
                  {formatMediaDate(post.date)}
                </p>
              </div>
              {post.image && (
                <div className='w-28 h-20 shrink-0 relative overflow-hidden rounded-xs border border-slate-100'>
                  <img
                    src={post.image}
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* 4. Pagination Technologique pour vos 3 000 Articles */}
      <div className='mt-12 flex justify-center border-t border-slate-200 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/rubrique/${slug}`}
        />
      </div>
    </main>
  )
}
