import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getPostsPaginated } from '@/lib/wordpress'

// Fonction de nettoyage pour retirer les [...] des extraits
const nettoyerExcerpt = (htmlString: string) => {
  if (!htmlString) return ''
  return htmlString.replace(/\[&hellip;\]|\[\.\.\.\]|&hellip;/g, '')
}

export default async function PaysSectionAccueil({ paysSlug = 'senegal' }) {
  const data = await getPostsPaginated(1, 7, {
    search: paysSlug,
  })

  const { data: posts, headers } = data

  if (!data || posts.length === 0) return null

  const articleUne = posts[0]
  const autresArticles = posts.slice(1)

  return (
    <section className='w-full bg-white border-y border-gray-200 py-12 my-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* En-tête de la section Pays */}
        <div className='border-b-4 border-black pb-3 mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-[11px] font-black tracking-widest text-red-600 uppercase'>
              Grand Format
            </span>
            <span className='text-gray-300'>|</span>
            <h2 className='text-2xl font-black font-serif tracking-tight uppercase text-gray-900'>
              Focus : {paysSlug}
            </h2>
          </div>

          <Link
            href={`/pays/${paysSlug}`}
            className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 transition-colors group'
          >
            <span>Toute l'actualité</span>
            <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
          </Link>
        </div>

        {/* Grille de contenu style Presse */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Article Vedette (Occupe 2 colonnes) */}
          <div className='lg:col-span-2 group'>
            <Link
              href={`/posts/${articleUne.slug}`}
              className='block space-y-4'
            >
              <div className='relative aspect-[16/9] w-full overflow-hidden bg-gray-50 border border-gray-100'>
                <Image
                  src={
                    articleUne._embedded?.['wp:featuredmedia']?.[0]
                      ?.source_url || '/placeholder.jpg'
                  }
                  alt={articleUne.title.rendered}
                  fill
                  sizes='(max-w-1024px) 100vw, 800px'
                  className='object-cover'
                />
              </div>
              <div>
                <h3
                  className='text-xl md:text-2xl font-bold font-serif leading-tight text-gray-900 group-hover:text-red-600 transition-colors'
                  dangerouslySetInnerHTML={{
                    __html: articleUne.title.rendered,
                  }}
                />
                <p
                  className='text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: nettoyerExcerpt(articleUne.excerpt.rendered),
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Flux d'accompagnement (Occupe 1 colonne) */}
          <div className='space-y-5 divide-y divide-gray-100 lg:divide-y-0 lg:space-y-5'>
            {autresArticles.map((article, index) => (
              <div
                key={article.id}
                className={`group pt-4 first:pt-0 lg:pt-0 ${
                  index !== 0 ? 'lg:border-t lg:border-gray-100 lg:pt-4' : ''
                }`}
              >
                <Link
                  href={`/posts/${article.slug}`}
                  className='block space-y-1.5'
                >
                  <div className='flex items-center gap-2 text-[10px] font-medium text-gray-400'>
                    <Clock className='w-3 h-3 text-red-600' />
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <h4
                    className='font-bold text-sm text-gray-900 font-serif leading-snug group-hover:text-red-600 transition-colors line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
