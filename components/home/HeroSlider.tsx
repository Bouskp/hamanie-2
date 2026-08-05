'use client'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { categories, formatHtml, formatMediaDate } from '@/lib/utils'

export interface SliderPost {
  id: string
  title: string
  excerpt?: string
  slug: string
  featuredImage: string
  category: number[]
  date: string
}

export default function HeroSlider({ posts }: { posts: SliderPost[] }) {
  // Initialisation du carrousel avec boucle infinie et défilement automatique
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ])

  // Commandes pour les flèches de navigation
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (!posts || posts.length === 0) return null

  return (
    <section className='relative w-full overflow-hidden bg-gray-950 rounded-2xl my-6 shadow-sm border border-gray-100 dark:border-gray-900'>
      {/* Zone principale de défilement Embla */}
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {posts.slice(0, 3).map((post, index) => (
            <div
              key={index}
              className='flex-[0_0_100%] min-w-0 relative aspect-[16/10] md:aspect-[21/9] w-full'
            >
              {/* Image d'arrière-plan avec dégradé opacifiant texturé */}
              {post.featuredImage && (
                <Image
                  src={post.featuredImage}
                  alt={formatHtml(post.title)}
                  fill
                  priority={index === 0} // Charge immédiatement la toute première image (Performance SEO LCP)
                  className='object-cover opacity-75'
                  sizes='100vw'
                />
              )}

              {/* Voile dégradé noir pour protéger la lisibilité des textes blancs en bas */}
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent' />

              {/* Contenu éditorial superposé calé en bas à gauche */}
              <div className='absolute inset-x-0 bottom-0 p-6 md:p-12 max-w-4xl space-y-3 text-white z-10'>
                <div className='flex items-center gap-3 text-xs font-condensed font-black uppercase tracking-widest text-red-500'>
                  <span>
                    {post.category.map((item, idx) => (
                      <span key={idx} className='mr-2'>
                        {categories.find((fc) => fc.id == item)?.slug + '  '}
                      </span>
                    ))}
                  </span>
                  <span className='w-1 h-1 rounded-full bg-gray-500' />
                  <span className='text-gray-300 font-normal normal-case font-sans'>
                    {formatMediaDate(post.date)}
                  </span>
                </div>

                <Link href={`/posts/${post.slug}`} className='block group'>
                  <h1
                    className='font-serif text-xl md:text-2xl lg:text-3xl font-black leading-tight tracking-tight group-hover:underline decoration-red-500 underline-offset-4 decoration-2 font-condensed'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />
                </Link>

                {post.excerpt && (
                  <p
                    className='text-gray-300 text-xs md:text-sm font-normal line max-w-2xl hidden sm:block font-sans leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: formatHtml(post.excerpt),
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flèches de navigation directionnelles (Masquées sur écran tactile mobile) */}
      <button
        onClick={scrollPrev}
        className='hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-red-600 transition-colors z-20 cursor-pointer'
        aria-label='Article précédent'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2.5'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className='hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-red-600 transition-colors z-20 cursor-pointer'
        aria-label='Article suivant'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2.5'
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
    </section>
  )
}
