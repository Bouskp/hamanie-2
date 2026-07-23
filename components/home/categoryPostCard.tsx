import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { getFeaturedMediaById } from '@/lib/wordpress'

interface RecentPost {
  id: string
  title: string
  slug: string
  date: string
  imageId: number
  excerpt: string
}

export async function CategoryPostCard({ post }: { post: RecentPost }) {
  // Extraction de l'image de couverture via l'embed native de WordPress
  const image: any = await getFeaturedMediaById(post.imageId)
  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    dateStyle: 'long',
  })

  return (
    <article className='group flex flex-col justify-between space-y-3 pb-4 border-b md:border-b-0 last:border-b-0'>
      <div className='space-y-3'>
        {/* Miniature avec conteneur responsive pour bloquer le bug height: 0 */}

        <div className='relative w-full aspect-video rounded-sm overflow-hidden bg-muted border'>
          <Image
            src={image.guid.rendered}
            alt={post.title}
            fill
            sizes='(max-width: 768px) 100vw, 350px'
            className='object-cover transition-transform duration-500 group-hover:scale-103'
            loading='lazy'
          />
        </div>

        {/* Bloc textes géré proprement avec space-y-2 */}
        <div className='space-y-2'>
          <div className='flex items-center gap-1.5 text-[11px] text-muted-foreground font-sans'>
            <CalendarDays className='h-3.5 w-3.5' />
            <span>{formattedDate}</span>
          </div>
          <h3 className='text-lg font-serif font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2'>
            <Link
              href={`/posts/${post.slug}`}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </h3>
          <div
            className='text-xs text-muted-foreground line-clamp-2 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        </div>
      </div>
    </article>
  )
}
