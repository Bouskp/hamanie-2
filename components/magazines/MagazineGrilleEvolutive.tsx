'use client'

import { getPostsPaginatedBySearch } from '@/lib/wordpress'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function MagazineGrilleEvolutive({
  initialBuffer,
  pays = '',
}: {
  initialBuffer: any[]
  pays: string
}) {
  const [buffer, setBuffer] = useState(initialBuffer)
  const [affiches, setAffiches] = useState(initialBuffer.slice(0, 15))
  const [nextIndex, setNextIndex] = useState(15)
  const [apiPage, setApiPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialBuffer.length > 0)

  const gererVoirPlus = async () => {
    if (loading) return

    // ÉTAPE A : Extraction locale immédiate (Zéro latence)
    if (nextIndex < buffer.length) {
      const finDuLot = nextIndex + 15
      setAffiches([...affiches, ...buffer.slice(nextIndex, finDuLot)])
      setNextIndex(finDuLot)
      if (finDuLot >= buffer.length && buffer.length < 100) {
        setHasMore(false)
      }
      return
    }

    // ÉTAPE B : Buffer vide, fetch du bloc de 100 suivant (Côté client)
    setLoading(true)
    try {
      const res = await getPostsPaginatedBySearch(apiPage, 15, {
        search: pays,
      })

      if (!res) {
        setHasMore(false)
        return
      }

      const nouveauxArticles = res.data
      if (nouveauxArticles.length === 0) {
        setHasMore(false)
        return
      }

      setBuffer(nouveauxArticles)
      setAffiches([...affiches, ...nouveauxArticles.slice(0, 10)])
      setNextIndex(10)
      setApiPage(apiPage + 1)

      if (nouveauxArticles.length <= 10) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Erreur de chargement du flux :', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full'>
      {/* Grille Principale : Style Journal de Presse */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
        {affiches.map((article) => {
          const couverture =
            article._embedded?.['wp:featuredmedia']?.source_url ||
            '/placeholder.jpg'
          // Récupération dynamique du nom de la catégorie (wp:term) s'il existe via le _embed
          const categoriePrincipale =
            article._embedded?.['wp:term']?.[0]?.name || 'Actualité'

          return (
            <article
              key={article.id}
              className='bg-white border border-gray-200/60 p-4 rounded-sm shadow-sm hover:shadow-md transition-all duration-200 flex gap-4 group items-start'
            >
              {/* Visuel Miniature Gauche */}
              <div className='relative w-28 h-28 md:w-32 md:h-32 shrink-0 bg-gray-50 overflow-hidden border border-gray-100'>
                {/* <Image
             src={couverture}
             alt={article.title.rendered}
             fill
             sizes="(max-w-768px) 120px, 150px"
             className="object-cover group-hover:scale-102 transition-transform duration-300"
           /> */}
              </div>

              {/* Contenu Éditorial Droite */}
              <div className='flex flex-col justify-between h-28 md:h-32 flex-1'>
                <div>
                  <span className='text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1'>
                    {categoriePrincipale}
                  </span>
                  <h3
                    className='font-bold text-sm md:text-base text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 font-serif'
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  />
                  <div
                    className='text-gray-500 text-xs line-clamp-2 mt-1 hidden md:block'
                    dangerouslySetInnerHTML={{
                      __html: article.excerpt.rendered,
                    }}
                  />
                </div>

                {/* Lien d'action minimaliste type Presse */}
                <Link
                  href={`/article/${article.slug || article.id}`}
                  className='inline-flex items-center gap-1 text-[11px] font-bold text-gray-900 uppercase tracking-wider group/link hover:underline mt-2'
                >
                  <span>Lire l'article</span>
                  <ArrowUpRight className='w-3.5 h-3.5 text-gray-400 group-hover/link:text-red-600 transition-colors' />
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      {/* BOUTON "VOIR PLUS" CENTRÉ - STYLE JEUNE AFRIQUE */}
      <div className='flex justify-center items-center pt-8 border-t-2 border-black w-full'>
        {hasMore ? (
          <button
            onClick={gererVoirPlus}
            disabled={loading}
            className='px-8 py-3 bg-black text-white hover:bg-red-600 disabled:bg-gray-400 font-extrabold text-xs uppercase tracking-widest rounded-none transition-colors duration-200 inline-flex items-center gap-2 min-w-[220px] justify-center'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <svg
                  className='animate-spin h-3.5 w-3.5 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Mise à jour...
              </span>
            ) : (
              <>
                <span>
                  {nextIndex >= buffer.length
                    ? 'Plus d’actualités'
                    : 'Voir plus d’articles'}
                </span>
                <Plus className='w-3.5 h-3.5 stroke-[3]' />
              </>
            )}
          </button>
        ) : (
          <div className='flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-wider bg-gray-100 px-6 py-3 rounded-none border border-gray-200'>
            <Check className='w-3.5 h-3.5 text-red-600 stroke-[3]' />
            <span>Fin des archives pour ce pays</span>
          </div>
        )}
      </div>
    </div>
  )
}
