// components/pays/layouts/MarocLayoutAeco.tsx
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, BarChart3 } from 'lucide-react'
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
  focalPoint: {
    x: string
    y: string
  }
}

interface LayoutProps {
  articles: Post[]
  title: string
  currentPage: number
  totalPages: number
  slug: string
}

export function MarocLayout({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: LayoutProps) {
  if (articles.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500 italic font-sans'>
        Aucun rapport économique disponible pour le moment.
      </div>
    )
  }

  // Distribution asymétrique des articles (Façon Les Échos / Financial Times)
  const mainReport = articles[0] // L'Analyse Maître (Une)
  const subReports = articles.slice(1, 4) // Les deux focus de soutien au centre
  const remainingGrid = articles.slice(4) // Grille de fond pour l'historique

  return (
    <div className='space-y-10 w-full text-slate-900 antialiased font-sans bg-white p-2'>
      {/* 1. EN-TÊTE PREMIUM STYLE CONGLOMÉRAT */}
      <header className='w-full bg-white border-b border-slate-200'>
        <div className='max-w-7xl mx-auto pt-6 pb-2 flex justify-between items-baseline gap-4'>
          <div className='flex items-center gap-2'>
            <h1
              className='text-2xl md:text-3xl font-condensed capitalize tracking-tight font-bold'
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
      </header>

      {/* 2. BLOC DE TÊTE TRIPARTITE (3 COLONNES D'IMPORTANCE ASYMÉTRIQUE) */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-200 pb-10'>
        {/* COLONNE GAUCHE (3/12) : Les 2 Analyses de soutien */}
        <div className='md:col-span-3 flex flex-col space-y-6'>
          {subReports.map((post) => (
            <article
              key={post.id}
              className='group border-b border-slate-100 pb-5 last:border-none last:pb-0 space-y-2'
            >
              <Link href={`/posts/${post.slug}`}>
                <h3
                  className='text-base font-bold leading-snug group-hover:text-red-500 transition-colors line-clamp-3 mb-2 font-condensed'
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>
              <p
                className='text-gray-800 text-sm line-clamp-3 font-normal leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: cleanWordPressExcerpt(post.excerpt),
                }}
              />
              <span className='text-[10px] text-slate-400 font-medium block'>
                {post.date}
              </span>
            </article>
          ))}
        </div>

        {/* COLONNE CENTRALE (6/12) : L'Analyse Maître (La Une Éco) */}
        {mainReport && (
          <div className='md:col-span-6 md:border-x md:border-slate-200 px-0 md:px-6 group space-y-4'>
            {mainReport.image && (
              <Link href={`/posts/${mainReport.slug}`} className='block'>
                <AspectRatio
                  ratio={16 / 10}
                  className='bg-slate-50 overflow-hidden rounded-xs border border-slate-100'
                >
                  <Image
                    src={mainReport.image}
                    alt={mainReport.title}
                    fill
                    priority
                    className='object-cover opacity-95 group-hover:opacity-100 transition-opacity'
                    style={{
                      objectPosition: mainReport.focalPoint
                        ? `${mainReport.focalPoint.x} ${mainReport.focalPoint.y}`
                        : '50% 50%',
                    }}
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </AspectRatio>
              </Link>
            )}
            <div className='space-y-2'>
              <Link href={`/posts/${mainReport.slug}`}>
                <h2
                  className='text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:text-red-500 transition-colors font-condensed mb-2'
                  dangerouslySetInnerHTML={{ __html: mainReport.title }}
                />
              </Link>
              <p className='text-slate-600 text-sm font-normal leading-relaxed'>
                {cleanWordPressExcerpt(mainReport.excerpt)}
              </p>
              {mainReport.altStr && (
                <p className='text-[10px] text-gray-700 italic font-normal mt-1 pl-2 border-l border-slate-200'>
                  {mainReport.altStr}
                </p>
              )}
            </div>
          </div>
        )}

        {/* COLONNE DROITE (3/12) : Fil des Tendances & Entreprises */}
        <div className='md:col-span-3 bg-slate-50/60 p-4 border border-slate-100 space-y-4'>
          <h4 className='text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2 flex justify-between items-center'></h4>
          <div className='bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-4 h-full flex flex-col justify-between'>
            {/* En-tête réglementaire obligatoire (SEO / Déontologie) */}
            <div className='flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase'>
              <span>Espace Partenaire</span>
              <span className='px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded-xs font-sans text-[9px]'>
                Annonce
              </span>
            </div>

            {/* CORPS DE L'ANNONCE : Image cliquable à haut taux de clic (CTR) */}
            <div className='space-y-4 flex-1 flex flex-col justify-center'>
              <Link
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='block relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 shadow-xs group/pub'
              >
                {/* Remplacez par votre image de bannière publicitaire ou d'émission */}
                <Image
                  src='/images/pub-mian-tv.jpg'
                  alt='Regardez Mian TV en direct'
                  fill
                  className='object-cover group-hover/pub:scale-102 group-hover/pub:opacity-90 transition-all duration-500'
                  sizes='(max-width: 768px) 100vw, 25vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4'>
                  <span className='text-[9px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded-xs w-fit mb-1 tracking-wider animate-pulse'>
                    En direct
                  </span>
                  <h5 className='text-white font-serif font-bold text-sm leading-tight line-clamp-2'>
                    Suivez nos grands entretiens et analyses sur la
                    transformation locale
                  </h5>
                </div>
              </Link>

              {/* Texte descriptif et Call to Action (CTA) */}
              <div className='space-y-2'>
                <p className='text-slate-500 text-xs font-normal leading-relaxed'>
                  Analyses sans langue de bois avec les décideurs économiques et
                  industriels africains. Abonnez-vous pour ne manquer aucun
                  numéro.
                </p>

                <Link
                  href='https://youtube.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full bg-black hover:bg-red-600 text-white font-sans text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs'
                >
                  <span>Découvrir Mian TV</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ZONE BASSE : Grille standard épurée à 3 colonnes pour le reste du catalogue */}
      {remainingGrid.length > 0 && (
        <section className='space-y-6 pt-4'>
          <h3 className='text-sm font-black uppercase tracking-widest text-red-600 mb-6'>
            Autres infos sur le Maroc
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {remainingGrid.map((post) => (
              <article
                key={post.id}
                className='group flex flex-col justify-between h-full bg-white border border-slate-100 p-4 hover:border-slate-200 hover:shadow-xs transition-all duration-200'
              >
                <div className='space-y-3 flex-1 flex flex-col justify-between'>
                  <div className='space-y-2'>
                    {post.image && (
                      <Link href={`/posts/${post.slug}`} className='block mb-2'>
                        <AspectRatio
                          ratio={16 / 10}
                          className='bg-slate-50 overflow-hidden rounded-xs border border-slate-100'
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className='object-cover'
                            style={{
                              objectPosition: post.focalPoint
                                ? `${post.focalPoint.x} ${post.focalPoint.y}`
                                : '50% 50%',
                            }}
                            sizes='(max-width: 768px) 100vw, 33vw'
                          />
                        </AspectRatio>
                      </Link>
                    )}
                    <Link href={`/posts/${post.slug}`}>
                      <h4
                        className='text-sm md:text-base font-bold leading-snug text-slate-900 group-hover:text-red-500 transition-colors line-clamp-2 mb-2 font-condensed'
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </Link>
                    <p className='text-gray-800 text-xs font-normal line-clamp-3 leading-relaxed'>
                      {cleanWordPressExcerpt(post.excerpt)}
                    </p>
                  </div>
                  <div className='text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100'>
                    {post.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 4. ZONE DE NAVIGATION ET PAGINATION */}
      <div className='mt-12 flex justify-center border-t border-slate-100 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/pays/${slug}`}
        />
      </div>
    </div>
  )
}
