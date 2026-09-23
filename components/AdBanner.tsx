'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import bannerDesktop from '@/app/images/bannere.png'
import bannerMobile from '@/app/images/Banniere_Mobile.png'

type AdBannerProps = {
  href?: string
  alt?: string
  /** La bannière disparaît à cette date (ISO). Abidjan = UTC, donc fin du 17 octobre 2026. */
  expiresAt?: string
}

const DEFAULT_HREF = 'https://urlr.me/vuQH5N'

export function AdBanner({
  href = DEFAULT_HREF,
  alt = 'Tipping Point 2026 - Le Cercle des Pas Seuls - 17 octobre 2026, Abidjan',
  expiresAt = '2026-10-18T00:00:00Z',
}: AdBannerProps) {
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    setExpired(Date.now() >= new Date(expiresAt).getTime())
  }, [expiresAt])

  if (expired) return null

  return (
    <aside
      aria-label='Publicité'
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '16px auto',
        padding: '0 16px',
      }}
    >
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer sponsored'
        style={{ display: 'block', lineHeight: 0 }}
      >
        {/* Version mobile (portrait) sous 640px, version large au-dessus */}
        <picture>
          <source
            media='(max-width: 640px)'
            srcSet={bannerMobile.src}
            width={bannerMobile.width}
            height={bannerMobile.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerDesktop.src}
            alt={alt}
            width={bannerDesktop.width}
            height={bannerDesktop.height}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 1200,
              height: 'auto',
              margin: '0 auto',
              borderRadius: 12,
            }}
          />
        </picture>
      </Link>
    </aside>
  )
}
