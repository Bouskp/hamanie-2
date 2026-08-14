import { formatHtml, formatMediaDate } from '@/lib/utils'
import { getPostsByCategoryPaginated } from '@/lib/wordpress'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PortraitsGridBgLayout from '../SectionPortraitLayout'
import SeriesEnquetesLayout from '../SeriesLayout'
import StartupArticlesRegistry from '../StartupLayout'

// Interface unifiée pour la donnée des articles WordPress
interface Rubrique {
  title: string
  slug: string
  id: number
}

interface SectionRouterProps {
  rubrique: Rubrique
  // Déclaration explicite des layouts disponibles pour l'autocomplétion
  layout:
    | 'grand-format'
    | 'grid-3'
    | 'split-eco'
    | 'opinions'
    | 'video'
    | 'fil-info'
    | 'top-5'
    | 'bento'
    | 'minimalist'
    | 'tabs'
    | 'une-asymetrique'
    | 'ligne-dense'
    | 'focus-central'
    | 'ephemeride'
    | 'cards-immersive-scroll' // Le nouveau layout immersif
    | 'SeriesEnquetesLayout'
    | 'PortraitsGridBgLayout'
    | 'startup'
}

export default async function SectionRouter({
  rubrique,
  layout,
}: SectionRouterProps) {
  const { data: posts } = await getPostsByCategoryPaginated(rubrique.id, 1, 6)
  const postRendered = posts.map((post) => ({
    ...post,
    id: post.id.toString(),
    title: formatHtml(post.title.rendered),
    content: formatHtml(post.content.rendered),
    excerpt: formatHtml(post.excerpt.rendered),
    date: formatMediaDate(post.date),
    featuredImage:
      post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full
        ?.source_url || '',
    titre: post._embedded?.['wp:featuredmedia']?.[0].caption.rendered || '',
    focalPoint: {
      x: post.focal_point.x,
      y: post.focal_point.y,
    },
  }))

  if (!posts || posts.length === 0)
    return (
      <section className='my-16 border-t border-gray-100 pt-6 w-full'>
        <div className='flex justify-between items-center mb-6 px-1'>
          <h2
            className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
          >
            {rubrique.title}
          </h2>
          <span className='text-xs font-condensed font-bold text-gray-400 uppercase tracking-widest hidden sm:block'>
            voir plus
          </span>
        </div>
      </section>
    )

  const rubriqueUrl = `/rubrique/${rubrique.slug}`

  switch (layout) {
    // =========================================================================
    // 1. CARDS IMMERSIVE SCROLL (Image fond + Scroll horizontal complet)
    // =========================================================================
    case 'cards-immersive-scroll':
      return (
        <section className='my-16 border-t border-gray-100 pt-6 w-full'>
          <div className='flex justify-between items-center mb-6 px-1'>
            <h2
              className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
            >
              {rubrique.title}
            </h2>
            <span className='text-xs font-condensed font-bold text-gray-400 uppercase tracking-widest hidden sm:block'>
              Faire défiler &rarr;
            </span>
          </div>
          <div className='relative w-full'>
            <div className='flex gap-6 overflow-x-auto scroll-smooth scrollbar-none overscroll-x-contain pb-4 -mx-4 px-4'>
              {postRendered.map((post) => {
                return (
                  <div
                    key={post.id}
                    className='min-w-[290px] w-[290px] sm:min-w-[340px] sm:w-[340px] aspect-[3/4] relative rounded-2xl overflow-hidden border border-gray-200/50 bg-gray-950 shadow-md group shrink-0'
                  >
                    {
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes='(max-w-768px) 100vw, 33vw'
                        className={`object-cover opacity-70 group-hover:scale-105 transition-transform duration-500 ease-out object`}
                        style={{
                          objectPosition: post.focal_point
                            ? `${post.focal_point.x} ${post.focal_point.y}`
                            : '50% 50%',
                        }}
                      />
                    }
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
                    <div className='absolute inset-x-0 bottom-0 p-6 space-y-2 flex flex-col justify-end text-white'>
                      <span className='font-condensed text-xs font-black uppercase tracking-widest text-red-500'>
                        {post.date}
                      </span>
                      <Link href={`/posts/${post.slug}`} className='block'>
                        <h3 className='font-serif text-sm sm:text-sm font-bold leading-snug group-hover:underline decoration-red-500 underline-offset-4 decoration-2'>
                          {formatHtml(post.title)}
                        </h3>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )

    // =========================================================================
    // 2. GRAND FORMAT (Style Rubrique Éditoriale Classique)
    // =========================================================================
    case 'grand-format':
      const [hero, ...heroSide] = postRendered

      return (
        <section className='border-t-2 border-gray-900 pt-6 mb-16'>
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
                xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-4'>
              {hero.featuredImage && (
                <div className='relative aspect-video w-full overflow-hidden rounded-xl border bg-muted'>
                  <Image
                    src={hero.featuredImage}
                    alt={hero.title}
                    fill
                    className='object-cover'
                    style={{
                      objectPosition: hero.focal_point
                        ? `${hero.focal_point.x} ${hero.focal_point.y}`
                        : '50% 50%',
                    }}
                  />
                </div>
              )}
              <Link
                href={`/posts/${hero.slug}`}
                className='block hover:text-red-600 transition-colors'
              >
                <h3 className='font-serif text-2xl font-bold leading-tight'>
                  {hero.title}
                </h3>
              </Link>
              <p
                className='text-gray-600 text-sm leading-relaxed line-clamp-3'
                dangerouslySetInnerHTML={{
                  __html: hero.excerpt,
                }}
              />
            </div>
            <div className='space-y-6 border-t lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0'>
              {heroSide.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className='border-b pb-4 last:border-b-0 last:pb-0'
                >
                  <span className='text-xs font-bold text-red-600'>
                    {post.date}
                  </span>
                  <Link
                    href={`/posts/${post.slug}`}
                    className='block font-serif text-lg font-bold hover:text-red-600 mt-1'
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    // =========================================================================
    // 3. UNE ASYMÉTRIQUE (75% / 25% Ratio Presse Week-end)
    // =========================================================================
    case 'une-asymetrique':
      const [bigPost, ...sidePosts] = postRendered
      return (
        <section className='border-t border-gray-950 pt-6 mb-16'>
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='lg:col-span-3 space-y-4'>
              <div className='relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted'>
                <Image
                  src={bigPost.featuredImage}
                  alt={bigPost.title}
                  fill
                  className='object-cover'
                  style={{
                    objectPosition: bigPost.focal_point
                      ? `${bigPost.focal_point.x} ${bigPost.focal_point.y}`
                      : '50% 50%',
                  }}
                />
              </div>
              <Link href={`/posts/${bigPost.slug}`} className='block group'>
                <h3
                  className='font-condensed text-2xl md:text-3xl font-bold group-hover:text-red-600 transition-colors leading-tight'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(bigPost.title),
                  }}
                />
              </Link>
              <p
                className='font-condensed text-gray-600 text-sm leading-relaxed line-clamp-2'
                dangerouslySetInnerHTML={{
                  __html: formatHtml(bigPost.excerpt),
                }}
              />
            </div>
            <div className='space-y-4 border-t lg:border-t-0 lg:border-l lg:pl-6 pt-4 lg:pt-0'>
              {sidePosts.slice(0, 4).map((post) => {
                const image = post.featuredImage

                return (
                  <div
                    key={post.id}
                    className='flex lg:flex-col gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0'
                  >
                    <div className='relative w-20 h-20 lg:w-full lg:aspect-video shrink-0 overflow-hidden rounded bg-muted'>
                      <Image
                        src={image}
                        alt={post.title}
                        fill
                        className='object-cover'
                        style={{
                          objectPosition: post.focal_point
                            ? `${post.focal_point.x} ${post.focal_point.y}`
                            : '50% 50%',
                        }}
                      />
                    </div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className='font-condensed text-xs font-bold text-gray-950 hover:text-red-600 line-clamp-2 leading-snug'
                    >
                      {formatHtml(post.title)}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )

    // =========================================================================
    // 4. LIGNE DENSE (Format Textuel Fluide - Spécial Macro-Éco)
    // =========================================================================
    case 'ligne-dense':
      return (
        <section className='border-gray-200 bg-gray-50/50 py-8 px-6 my-16 rounded-xl'>
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:gap-x-8'>
            {postRendered.slice(0, 4).map((post, idx) => (
              <div
                key={post.id}
                className={`pt-4 sm:pt-0 ${idx > 0 ? 'lg:border-l lg:pl-6 border-gray-200' : ''}`}
              >
                <span
                  className='text-3xl font-condensed
                 font-black text-red-600 block mb-1'
                >
                  0{idx + 1}
                </span>
                <Link href={`/posts/${post.slug}`} className='block group'>
                  <h3 className='font-serif text-base font-bold text-gray-950 group-hover:text-red-600 transition-colors leading-snug line-clamp-3'>
                    {post.title}
                  </h3>
                </Link>
                <span className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-2 block font-sans'>
                  {post.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )

    // =========================================================================
    // 5. SPLIT ÉCONOMIE (50/50 Visuel et Flux de titres)
    // =========================================================================
    case 'split-eco':
      const [ecoMain, ...ecoList] = postRendered

      return (
        <section className='border-t border-gray-300 pt-6 mb-16'>
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed 
              text-2xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              {ecoMain._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className='relative aspect-video w-full overflow-hidden bg-gray-100 rounded-xl border'>
                  <Image
                    src={
                      ecoMain._embedded?.['wp:featuredmedia']?.[0]?.source_url
                    }
                    alt={ecoMain.title}
                    fill
                    className='object-cover'
                    style={{
                      objectPosition: ecoMain.focal_point
                        ? `${ecoMain.focal_point.x} ${ecoMain.focal_point.y}`
                        : '50% 50%',
                    }}
                  />
                </div>
              )}
              <Link
                href={`/posts/${ecoMain.slug}`}
                className='block font-condensed text-xl font-bold hover:text-red-600'
              >
                {ecoMain.title}
              </Link>
            </div>
            <div className='divide-y divide-gray-200 flex flex-col justify-between h-full'>
              {ecoList.slice(0, 5).map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className='font-condensed font-bold hover:text-red-600 text-xl  py-3 first:pt-0 last:pb-0'
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )
    //
    //====================================================================== //6. TRIBUNE OPINIONS & DÉBATS (Style Minimaliste Littéraire)// =========================================================================
    //
    case 'opinions':
      return (
        <section className='bg-amber-50/60 dark:bg-amber-950/10 border-y border-amber-200/70 dark:border-amber-900/30 py-10 px-6 my-16 rounded-2xl shadow-xs'>
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
                xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>

          {/* Grille de distribution sur 3 colonnes horizontales avec séparateurs fins */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-amber-200/60 dark:divide-amber-900/40'>
            {postRendered.slice(0, 3).map((post, idx) => (
              <div
                key={post.id}
                className={`
              flex flex-col justify-between space-y-3
              ${idx > 0 ? 'md:pl-8' : ''} 
              ${idx > 0 ? 'pt-6 md:pt-0' : ''}
            `}
              >
                <div className='space-y-2'>
                  {/* Nom de l'auteur mis en valeur */}
                  {post.author && (
                    <span className='text-xs font-condensed font-black uppercase tracking-widest text-amber-700 dark:text-amber-500 block'>
                      {post.author}
                    </span>
                  )}

                  {/* Le Titre de la tribune au format littéraire (Italique et guillemets) */}
                  <Link href={`/posts/${post.slug}`} className='block group'>
                    <h3 className='font-serif text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 italic leading-snug transition-colors duration-200'>
                      « {post.title} »
                    </h3>
                  </Link>
                </div>

                {/* Date ou métadonnée secondaire optionnelle au format discret */}
                {post.date && (
                  <span className='text-[10px] font-sans font-semibold uppercase tracking-wider text-amber-600/60 dark:text-amber-500/40 block pt-2'>
                    {post.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )

    case 'grid-3':
      return (
        <section className='border-t border-gray-200 pt-6 mb-16 w-full'>
          {/* En-tête épuré de la rubrique */}
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
                xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>

          {/* Grille symétrique stricte sur 3 colonnes */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8'>
            {postRendered.slice(0, 5).map((post) => {
              const image = post.featuredImage
              return (
                <div key={post.id} className='space-y-3 flex flex-col group'>
                  {/* Miniature d'illustration au format 16/10 stable sans déformation */}
                  {post.featuredImage && (
                    <div className='relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-100 bg-muted shadow-xs'>
                      <Image
                        src={image}
                        alt={formatHtml(post.title)}
                        fill
                        sizes='(max-w-768px) 100vw, 33vw'
                        className='object-cover group-hover:scale-102 transition-transform duration-300 ease-out'
                        style={{
                          objectPosition: post.focal_point
                            ? `${post.focal_point.x} ${post.focal_point.y}`
                            : '50% 50%',
                        }}
                      />
                    </div>
                  )}

                  {/* Zone textuelle de la carte */}
                  <div className='space-y-1.5 flex-1 flex flex-col justify-start'>
                    {/* Date de publication en police compacte */}
                    <span className='text-xs font-condensed font-black uppercase tracking-wider text-gray-400 block'>
                      {post.date}
                    </span>

                    {/* Titre de l'article en police Serif journalistique */}
                    <Link href={`/posts/${post.slug}`} className='block'>
                      <h3
                        className='text-condensed text-base font-bold text-gray-950 group-hover:text-red-600 transition-colors leading-snug line-clamp-3'
                        dangerouslySetInnerHTML={{
                          __html: formatHtml(post.title),
                        }}
                      />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )

    // BENTO
    case 'bento':
      return (
        <section className='my-16 border-t border-gray-100 pt-6 w-full'>
          {/* En-tête épuré */}
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
                xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>

          {/* Grille Bento réactive : 1 colonne sur mobile, 4 colonnes sur ordinateur */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]'>
            {postRendered.slice(0, 5).map((post, idx) => {
              const isMain = idx === 0

              return (
                <div
                  key={post.id}
                  className={`
                    relative 
                    overflow-hidden 
                    bg-gray-950 
                    rounded-2xl 
                    border 
                    border-gray-200/10 
                    group 
                    shadow-xs
                    /* Premier article : prend 2 colonnes et 2 lignes sur ordinateur */
                    ${isMain ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 lg:col-span-1'}
                  `}
                >
                  {/* Image en arrière-plan avec opacité ajustée pour le texte */}
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes={
                        isMain
                          ? '(max-w-768px) 100vw, 50vw'
                          : '(max-w-768px) 100vw, 25vw'
                      }
                      className='object-cover opacity-60 group-hover:scale-102 transition-transform duration-500 ease-out'
                      style={{
                        objectPosition: post.focal_point
                          ? `${post.focal_point.x} ${post.focal_point.y}`
                          : '50% 50%',
                      }}
                    />
                  )}

                  {/* Dégradé noir pour protéger la lisibilité des textes blancs */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />

                  {/* Contenu textuel superposé calé en bas */}
                  <div className='absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white z-10'>
                    <span className='text-[10px] font-condensed font-black text-red-400 uppercase tracking-widest block mb-1'>
                      {post.date}
                    </span>

                    <Link href={`/posts/${post.slug}`} className='block'>
                      <h3
                        className={`
                          font-serif 
                          font-bold 
                          hover:underline 
                          decoration-red-500 
                          underline-offset-4 
                          decoration-2 
                          leading-tight
                          /* Le grand titre s'affiche plus large */
                          ${isMain ? 'text-xl sm:text-2xl md:text-3xl' : 'text-sm sm:text-base line-clamp-3'}
                        `}
                        dangerouslySetInnerHTML={{
                          __html: post.title,
                        }}
                      />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )

    case 'focus-central':
      const [leftPost, centerPost, rightPost] = postRendered
      const image = centerPost.featuredImage
      return (
        <section className='border-y border-gray-200 dark:border-gray-800 py-12 my-16 w-full bg-white dark:bg-transparent'>
          {/* Titre de la rubrique centré */}
          <div className='flex items-end justify-between border-b border-gray-100 pb-3 mb-6 gap-4'>
            <Link href={rubriqueUrl} className='group flex items-center gap-2'>
              <h2
                className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
              >
                {rubrique.title}
              </h2>
            </Link>

            {/* Lien direct "Voir tout" vers /rubrique/[slug] */}
            <Link
              href={rubriqueUrl}
              className='inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group'
            >
              <span>Voir tout</span>
              <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 items-center max-w-6xl mx-auto'>
            {/* COLONNE GAUCHE : Article secondaire (Texte seul aligné à droite) */}
            <div className='text-right hidden lg:flex flex-col justify-center space-y-2 border-r border-gray-100 dark:border-gray-900 pr-8 h-full'>
              <Link href={`/posts/${leftPost.slug}`} className='block group'>
                <h3
                  className='font-serif text-lg font-bold text-gray-950 dark:text-gray-100 group-hover:text-red-600 transition-colors leading-snug'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(leftPost.title),
                  }}
                />
              </Link>
              {leftPost.excerpt && (
                <p
                  className='text-gray-500 dark:text-gray-400 text-xs line-clamp-3 leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: leftPost.excerpt }}
                />
              )}
            </div>

            {/* COLONNE CENTRALE : L'Élément Majeur (Prend 2 colonnes sur ordinateur) */}
            <div className='lg:col-span-2 text-center space-y-6 flex flex-col items-center'>
              {centerPost.featuredImage && (
                <div className='relative aspect-square w-full max-w-[260px] sm:max-w-[300px] overflow-hidden rounded-full border-4 border-gray-100 dark:border-gray-900 shadow-md bg-muted group'>
                  <Image
                    src={image}
                    alt={formatHtml(centerPost.title)}
                    fill
                    sizes='(max-w-768px) 100vw, 50vw'
                    className='object-cover group-hover:scale-103 transition-transform duration-500 ease-out'
                    style={{
                      objectPosition: centerPost.focal_point
                        ? `${centerPost.focal_point.x} ${centerPost.focal_point.y}`
                        : '50% 50%',
                    }}
                  />
                </div>
              )}

              <div className='space-y-3 max-w-lg mx-auto'>
                <span className='text-[10px] font-condensed font-black tracking-widest text-red-600 dark:text-red-500 uppercase px-2 py-0.5 bg-red-50 dark:bg-red-950/30 rounded inline-block'>
                  L'Entretien
                </span>
                <Link
                  href={`/posts/${centerPost.slug}`}
                  className='block group'
                >
                  <h3 className='font-serif text-2xl sm:text-3xl font-black text-gray-950 dark:text-white group-hover:text-red-600 transition-colors leading-tight px-2'>
                    {formatHtml(centerPost.title)}
                  </h3>
                </Link>
                {centerPost.excerpt && (
                  <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 px-4 font-sans'>
                    {formatHtml(centerPost.excerpt)}
                  </p>
                )}
              </div>
            </div>

            {/* COLONNE DROITE : Article secondaire (Texte seul aligné à gauche) */}
            <div className='text-left flex flex-col justify-center space-y-2 lg:border-l lg:border-gray-100 dark:lg:border-gray-900 lg:pl-8 h-full'>
              {/* Sur mobile, on affiche le titre du premier article s'il était masqué */}
              <div className='lg:hidden border-t pt-6 mt-2 border-gray-100 dark:border-gray-900' />

              <Link href={`/posts/${rightPost.slug}`} className='block group'>
                <h3 className='font-serif text-lg font-bold text-gray-950 dark:text-gray-100 group-hover:text-red-600 transition-colors leading-snug'>
                  {formatHtml(rightPost.title)}
                </h3>
              </Link>
              {rightPost.excerpt && (
                <p className='text-gray-500 dark:text-gray-400 text-xs line-clamp-3 leading-relaxed'>
                  {formatHtml(rightPost.excerpt)}
                </p>
              )}

              {/* Rappel du premier article uniquement visible en bas sur mobile */}
              <div className='lg:hidden border-t pt-6 mt-4 border-gray-100 dark:border-gray-900 space-y-2'>
                <Link href={`/posts/${leftPost.slug}`} className='block group'>
                  <h3 className='font-serif text-lg font-bold text-gray-950 dark:text-gray-100 group-hover:text-red-600 transition-colors leading-snug'>
                    {formatHtml(leftPost.title)}
                  </h3>
                </Link>
                {leftPost.excerpt && (
                  <p className='text-gray-500 dark:text-gray-400 text-xs line-clamp-3 leading-relaxed'>
                    {formatHtml(leftPost.excerpt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )

    case 'ephemeride':
      return (
        <section className='my-16 border-t border-gray-200 dark:border-gray-800 pt-6 w-full'>
          {/* En-tête minimaliste de la rubrique */}
          <div className='flex justify-between items-center mb-6'>
            <h2
              className='font-condensed text-2
              xl md:text-2xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors'
            >
              {rubrique.title}
            </h2>
          </div>

          {/* Ligne de cartes horizontales asymétriques (1 colonne mobile, 3 sur ordi) */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch'>
            {postRendered.slice(0, 6).map((post, index) => {
              // La carte du milieu (index 1) prend un style inversé sombre hyper percutant
              const isCenter = index === 1 || index === 3

              return (
                <div
                  key={post.id}
                  className={`
                  flex-1 
                  p-6 
                  rounded-2xl 
                  border 
                  transition-all 
                  duration-300
                  hover:shadow-md 
                  flex 
                  flex-col 
                  justify-between
                  min-h-[180px]
                  ${
                    isCenter
                      ? 'bg-gray-950 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-950 border-gray-100 dark:bg-transparent dark:border-gray-800 dark:text-gray-100'
                  }
                `}
                >
                  <div className='space-y-3'>
                    {/* Badge temporel / Heure de la dépêche */}
                    <span
                      className={`
                      text-[10px] 
                      font-sans 
                      font-bold 
                      uppercase 
                      tracking-widest 
                      ${isCenter ? 'text-red-400' : 'text-red-600'}
                    `}
                    >
                      • {post.date}
                    </span>

                    {/* Titre éditorial au format Serif presse */}
                    <Link href={`/posts/${post.slug}`} className='block group'>
                      <h3
                        className='font-serif text-base font-bold leading-snug group-hover:underline decoration-red-500 underline-offset-4 decoration-2'
                        dangerouslySetInnerHTML={{
                          __html: formatHtml(post.title),
                        }}
                      />
                    </Link>

                    {/* Résumé court (Extrait) de la brève */}
                    {post.excerpt && (
                      <p
                        className={`
                        text-xs 
                        line-clamp-2 
                        font-sans 
                        leading-relaxed
                        ${isCenter ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}
                      `}
                        dangerouslySetInnerHTML={{
                          __html: formatHtml(post.excerpt),
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )

    case 'SeriesEnquetesLayout':
      return (
        <SeriesEnquetesLayout
          posts={postRendered}
          title='Séries & Enquêtes'
          linkUrl={rubriqueUrl}
        />
      )

    case 'PortraitsGridBgLayout':
      return <PortraitsGridBgLayout posts={postRendered} />

    case 'startup':
      return (
        <StartupArticlesRegistry
          posts={postRendered}
          title='start-up'
          linkUrl={rubriqueUrl}
        />
      )
  }
}
