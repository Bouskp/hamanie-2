// components/new-magazine-popup.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type Magazine = {
  title: string
  numero: number
  lienPdf: string
  coverUrl: string
  focalPoint: { x: string; y: string }
}

export function NewMagazinePopup() {
  const [open, setOpen] = useState(false)
  const [magazine, setMagazine] = useState<Magazine | null>(null)

  useEffect(() => {
    async function fetchLatestMagazine() {
      try {
        const res = await fetch(
          'https://api.hamanie.news/wp-json/wp/v2/h_magazine?per_page=1&orderby=date&order=desc&_embed',
        )
        const data = await res.json()
        const item = data[0]
        if (!item) return

        const media = item._embedded?.['wp:featuredmedia']?.[0]

        const mag: Magazine = {
          title: item.title.rendered,
          numero: item.acf.numero_magazine,
          lienPdf: item.acf.lien_,
          coverUrl: media?.source_url ?? '',
          focalPoint: {
            x: media?.focal_point?.x ?? '50%',
            y: media?.focal_point?.y ?? '50%',
          },
        }

        setMagazine(mag)

        const sessionKey = 'seen_magazine_' + mag.numero
        const seen = sessionStorage.getItem(sessionKey)
        if (!seen) {
          setTimeout(() => setOpen(true), 800)
        }
      } catch (err) {
        console.error('Erreur récupération magazine :', err)
      }
    }

    fetchLatestMagazine()
  }, [])

  const handleClose = () => {
    if (magazine) {
      sessionStorage.setItem('seen_magazine_' + magazine.numero, 'true')
    }
    setOpen(false)
  }

  if (!magazine) return null

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className='w-[calc(100%-2rem)] sm:w-full sm:max-w-md h-[70vh] max-h-[560px] sm:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden p-0 gap-0 border-border'>
        {/* Image en fond, plein cadre */}
        {magazine.coverUrl && (
          <Image
            src={magazine.coverUrl}
            alt={magazine.title}
            fill
            className='object-cover'
            style={{
              objectPosition: `${magazine.focalPoint.x} ${magazine.focalPoint.y}`,
            }}
            priority
          />
        )}

        {/* Dégradé pour la lisibilité du texte */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40' />

        {/* Contenu superposé, ancré en bas */}
        <div className='relative flex h-full flex-col justify-end p-4 sm:p-6'>
          <DialogHeader className='text-center'>
            <DialogTitle className='text-xl sm:text-2xl font-heading tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'>
              Hamaniè {`#${magazine.numero}`} est disponible !
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className='flex-col-reverse sm:flex-row sm:justify-between gap-2 mt-4 sm:mt-5'>
            <Button
              variant='outline'
              onClick={handleClose}
              className='rounded-full w-full sm:w-auto bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white'
            >
              Plus tard
            </Button>
            <Button
              asChild
              onClick={handleClose}
              className='rounded-full w-full sm:w-auto bg-white text-black hover:bg-white/90'
            >
              <a href='/magazine' rel='noopener noreferrer'>
                Lire maintenant
              </a>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
