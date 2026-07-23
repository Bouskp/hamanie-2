'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Magazine } from '@/lib/wordpress.d'

interface LoadMoreProps {
  initialPage: {
    page: number
  }
}

export default function LoadMore({ initialPage }: LoadMoreProps) {
  const { page } = initialPage
  const [currentPage, setCurrentPage] = useState(page || 1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [magazines, setMagazines] = useState<Magazine[]>([])

  const loadMore = async () => {
    setLoading(true)
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const nextPage = currentPage + 1
      const responseData = await fetch(
        `https://hamanie.news/wp-json/wp/v2/h_magazine?page=${nextPage}&per_page=10&_embed`,
      )
      const totalPages = parseInt(
        responseData.headers.get('X-WP-TotalPages') || '0',
        10,
      )

      const newMagazines = await responseData.json()
      console.log(newMagazines)
      setMagazines((prev) => [...prev, ...newMagazines])
      setCurrentPage(nextPage)
      setHasMore(currentPage < totalPages)
    } catch (error) {
      console.error('Error loading more magazines:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='load-more-container'>
      <div className='mag-list'>
        {magazines
          .sort((a, b) => b.modified_gmt.localeCompare(a.modified_gmt))
          .map((mag) => {
            const featuredMedia = mag._embedded?.['wp:featuredmedia']?.[0]
            return (
              <div key={mag.id}>
                <Link href={`/magazine/${mag.slug}`}>
                  <h2 className='mag-title'>{mag.title.rendered}</h2>
                  {featuredMedia && (
                    <Image
                      src={featuredMedia.source_url}
                      alt={mag.title.rendered}
                      className='img-mag'
                      width={500}
                      height={300}
                      loading='eager'
                    />
                  )}
                </Link>
                <Link
                  href={mag.acf.lien_}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Lire plus
                </Link>
              </div>
            )
          })}
      </div>

      {hasMore && (
        <button onClick={loadMore} disabled={loading} className='load-more-btn'>
          {loading ? 'chargement...' : 'Voir plus de magazines'}
        </button>
      )}
    </div>
  )
}
