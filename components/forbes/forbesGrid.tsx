import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatHtml } from '@/lib/utils'
import { getFeaturedMediaById } from '@/lib/wordpress'

export function ForbesGrid({
  posts,
  isFirstPage,
}: {
  posts: any[]
  isFirstPage: boolean
}) {
  // En page 1, on ignore les 5 premiers articles (déjà affichés dans le Hero)
  // En page 2+, on affiche la totalité des 10 articles de la page
  const gridPosts = isFirstPage ? posts.slice(5, 10) : posts

  if (gridPosts.length === 0) return null

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-8'>
      {/* ZONE ARTICLES (2/3) */}
      <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10'>
        {gridPosts.map(async (post: any) => {
          const imgUrl = (await getFeaturedMediaById(post.featured_media))
            .source_url
          return (
            <Card
              key={post.id}
              className='rounded-none border-0 bg-transparent shadow-none flex flex-col justify-between group'
            >
              <div className='space-y-3'>
                {imgUrl && (
                  <div className='relative w-full aspect-video bg-muted border'>
                    <Image
                      src={imgUrl}
                      alt={post.title.rendered}
                      fill
                      sizes='(max-width: 768px) 100vw, 380px'
                      className='object-cover'
                      loading='lazy'
                    />
                  </div>
                )}
                <CardHeader className='p-0 space-y-1'>
                  <CardTitle className='text-lg font-serif font-bold group-hover:text-red-700 transition-colors line-clamp-2'>
                    <Link
                      href={`/posts/${post.slug}`}
                      dangerouslySetInnerHTML={{
                        __html: formatHtml(post.title.rendered),
                      }}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className='p-0 text-sm text-muted-foreground line-clamp-3'
                  dangerouslySetInnerHTML={{
                    __html: formatHtml(post.excerpt.rendered),
                  }}
                />
              </div>
            </Card>
          )
        })}
      </div>

      {/* ZONE PUBLICITÉ (1/3) */}
      <div className='lg:sticky lg:top-24 space-y-2'>
        <div className='w-full aspect-[4/3] bg-muted/40 border rounded-none flex flex-col items-center justify-center p-4 text-center text-xs text-muted-foreground relative'>
          <span className='absolute top-1 right-2 text-[9px] uppercase tracking-widest font-bold text-muted-foreground/50'>
            Publicité
          </span>
          <p className='font-sans font-bold text-foreground'>
            Espace Partenaire Premium
          </p>
        </div>
      </div>
    </div>
  )
}
