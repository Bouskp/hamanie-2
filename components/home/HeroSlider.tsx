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
  focalPoint?: {
    x: string
    y: string
  }
}

// Décode les entités HTML WordPress pour du texte brut (alt, noms de catégories)
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function getObjectPosition(focalPoint?: SliderPost['focalPoint']): string {
  return focalPoint ? `${focalPoint.x} ${focalPoint.y}` : '50% 50%'
}

function getCategoryLabel(categoryIds?: number[]): string {
  const valid = (categoryIds ?? [])
    .map((id) => categories.find((cat) => String(cat.id) === String(id)))
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat))

  if (valid.length === 0) return 'À la une'

  // Utilise cat.name si ta liste en a un, sinon remplace par cat.slug
  return valid.map((cat) => toPlainText(cat.title)).join(', ')
}

export default function HeroSlider({ posts }: { posts: SliderPost[] }) {
  // Boucle infinie et défilement automatique
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (!posts || posts.length === 0) return null

  const slides = posts.slice(0, 4)

  return (
    <section className='relative w-full overflow-hidden bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900'>
      {/* Zone principale de défilement Embla */}
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {slides.map((post, index) => (
            <div
              key={post.id}
              className='flex-[0_0_100%] min-w-0 relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] w-full'
            >
              {/* Image d'arrière-plan */}
              {post.featuredImage && (
                <Image
                  src={post.featuredImage}
                  alt={toPlainText(post.title)}
                  fill
                  priority={index === 0} // Première image chargée immédiatement (LCP)
                  className='object-cover opacity-75'
                  sizes='100vw'
                  style={{ objectPosition: getObjectPosition(post.focalPoint) }}
                />
              )}

              {/* Voile dégradé pour la lisibilité du texte blanc */}
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent' />

              {/* Contenu éditorial superposé, pleine largeur */}
              <div className='absolute inset-x-0 bottom-0 w-full p-6 md:px-16 md:py-12 space-y-3 text-white z-10'>
                <div className='flex flex-wrap items-center gap-3 text-xs font-condensed font-black uppercase tracking-widest text-red-500'>
                  <span>{getCategoryLabel(post.category)}</span>
                  <span className='w-1 h-1 rounded-full bg-gray-500' />
                  <span className='text-gray-300 normal-case font-serif text-sm md:text-lg'>
                    {formatMediaDate(post.date)}
                  </span>
                </div>

                <Link href={`/posts/${post.slug}`} className='block group'>
                  <h2
                    className='font-serif text-xl md:text-2xl lg:text-3xl font-black leading-tight tracking-tight break-words group-hover:underline decoration-red-500 underline-offset-4 decoration-2'
                    dangerouslySetInnerHTML={{ __html: formatHtml(post.title) }}
                  />
                </Link>

                {post.excerpt && (
                  <div
                    className='w-full text-gray-300 text-xs md:text-sm font-normal line-clamp-2 hidden sm:block font-sans leading-relaxed'
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

      {/* Flèches de navigation (masquées sur mobile) */}
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
