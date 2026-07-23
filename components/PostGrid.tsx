import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

interface PostGridProps {
  posts: any[]
}

export function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className='w-full text-center py-20 bg-muted/20 border border-dashed rounded-none'>
        <p className='text-muted-foreground text-sm font-medium'>
          Aucun article ne correspond à ces critères de filtrage.
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10'>
      {posts.map((post) => {
        // 🧙‍♂️ Extraction des données du double encodage REST native via les embeds
        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        const imageAlt =
          post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ||
          post.title.rendered

        // Extraction de la première catégorie liée
        const category = post._embedded?.['wp:term']

        const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })

        return (
          <Card
            key={post.id}
            className='rounded-none border-0 bg-transparent shadow-none flex flex-col justify-between group'
          >
            <div className='space-y-4'>
              {/* 🚀 ZONE VISUELLE SÉCURISÉE (Plus de bug height 0 ni de décalage CLS) */}
              {imageUrl && (
                <div className='relative w-full aspect-video bg-muted border overflow-hidden'>
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'
                    className='object-cover transition-transform duration-500 group-hover:scale-102'
                    loading='lazy'
                  />
                  {category && (
                    <Badge className='absolute top-3 left-3 rounded-none bg-red-700 hover:bg-red-800 text-white font-sans uppercase font-bold text-[9px] tracking-wider border-0 px-2 py-0.5'>
                      <Link href={`/posts/${category.slug}`}>
                        {category.name}
                      </Link>
                    </Badge>
                  )}
                </div>
              )}

              {/* MÉTADONNÉES JOURNALISTIQUES */}
              <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-sans font-medium text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <CalendarDays className='h-3.5 w-3.5' />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* TITRE STYLE PRESSE ÉCRITE */}
              <CardHeader className='p-0 space-y-2'>
                <CardTitle className='text-lg font-serif font-black tracking-tight group-hover:text-red-700 transition-colors line-clamp-2 leading-snug'>
                  <Link
                    href={`/posts/${post.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </CardTitle>
              </CardHeader>

              {/* EXTRAIT NETTOYÉ */}
              <CardContent className='p-0'>
                <div
                  className='text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </CardContent>
            </div>

            {/* ACTION DE LECTURE COMPACTE */}
            <CardFooter className='p-0 pt-3'>
              <Button
                asChild
                variant='link'
                className='p-0 h-auto group text-xs font-sans font-black uppercase tracking-widest text-foreground hover:text-red-700 hover:no-underline'
              >
                <Link href={`/posts/${post.slug}`}>
                  Lire l'article
                  <ArrowRight className='ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
