'use client'

import { getMagazinePaginated } from '@/lib/wordpress'
import { BookOpen } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Mag {
  imageUrl: string
  link: string
  numero: number
  date: string
}

export function MagGrid({ archives }: { archives: Mag[] }) {
  // Réserve de magazines téléchargés mais pas encore tous visibles
  const [buffer, setBuffer] = useState(archives)

  // Tableau des magazines actuellement visibles à l'écran (on commence avec les 10 premiers)
  const [affiches, setAffiches] = useState(archives.slice(0, 10))

  // Index du prochain lot de 10 à extraire du buffer
  const [nextIndex, setNextIndex] = useState(10)

  // Suivi de la pagination de l'API WordPress (la page 1 de 100 est déjà dans le buffer, la suivante est la 2)
  const [apiPage, setApiPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(archives.length > 0)

  const gererVoirPlus = async () => {
    if (loading) return

    // ÉTAPE A : Il reste des éléments disponibles dans le buffer actuel
    if (nextIndex < buffer.length) {
      const finDuLot = nextIndex + 10
      const nouveauLot = buffer.slice(nextIndex, finDuLot)

      setAffiches([...affiches, ...nouveauLot])
      setNextIndex(finDuLot)
      return
    }
    // ÉTAPE B : Le buffer est vide, on doit télécharger les 100 magazines suivants
    try {
      const data = await getMagazinePaginated(apiPage, 100)
      if (!data) {
        setHasMore(false)
        return
      }
      const nouveauxMags = data.data.map((mag) => ({
        imageUrl: mag._embedded?.['wp:featuredmedia']?.[0].source_url || '',
        link: mag.acf.lien_,
        numero: mag.acf.numero_magazine,
        date: mag.date,
      }))
      if (nouveauxMags.length === 0) {
        setHasMore(false)
        return
      }
      setBuffer(nouveauxMags.sort((a, b) => b.numero - a.numero))
      setAffiches([...affiches, ...nouveauxMags.slice(0, 10)])
      setNextIndex(10)
      setApiPage(apiPage + 1)
    } catch (e) {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className='mb-12'>
      <h3 className='text-xl font-bold mb-6 text-gray-800'>
        Numéros précédents
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {affiches.map((mag, index) => {
          return (
            <article
              key={index}
              className='group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='relative aspect-[3/4] w-full bg-gray-100 overflow-hidden'>
                <Image
                  src={mag.imageUrl}
                  alt={'hamaniè ' + mag.numero}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='p-5 flex-1 flex flex-col justify-between'>
                <div>
                  <span className='text-xs text-gray-400 font-medium block mb-1 capitalize'>
                    {new Date(mag.date).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <h4 className='font-bold text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors'>
                    {'Hamaniè N°' + mag.numero}
                  </h4>
                </div>
                <Link
                  href={mag.link}
                  className='mt-4 inline-flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider group/btn hover:text-blue-600 transition-colors'
                >
                  <span>Lire le mag</span>
                  <BookOpen className='w-3.5 h-3.5 stroke-[2.5] transform group-hover/btn:scale-110 transition-transform' />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
      <div className='flex justify-center items-center pt-8 border-t border-gray-100 w-full'>
        {hasMore ? (
          <button
            onClick={gererVoirPlus}
            disabled={loading}
            className='px-8 py-3.5 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 font-semibold text-sm rounded-full transition-colors inline-flex items-center gap-2 shadow-md hover:shadow-lg min-w-[200px] justify-center'
          >
            {loading ? (
              <>
                <svg
                  className='animate-spin h-4 w-4 text-white'
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
                Chargement...
              </>
            ) : nextIndex >= buffer.length ? (
              'Charger les 100 prochains numéros'
            ) : (
              'Voir plus'
            )}
          </button>
        ) : (
          <p className='text-gray-500 font-medium text-sm tracking-wide bg-gray-50 px-6 py-2 rounded-full border border-gray-100'>
            Vous avez consulté l'intégralité de notre catalogue.
          </p>
        )}
      </div>
    </section>
  )
}
