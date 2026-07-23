import Image from 'next/image'
import Link from 'next/link'

interface PostProps {
  post: {
    title: string
    slug: string
    excerpt: string
    date: string
    category?: string
    featuredImage?: { node: { sourceUrl: string; altText: string } }
  }
}

export function MediaRowCard({ post }: PostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className='group grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-6 border-b last:border-b-0 items-start'>
      {/* Mini Vignette Image */}
      {post.featuredImage?.node && (
        <div className='relative w-full aspect-video md:aspect-[4/3] rounded-sm overflow-hidden bg-muted border'>
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            sizes='(max-width: 768px) 100vw, 250px'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}

      {/* Métadonnées et Textes */}
      <div className='md:col-span-2 space-y-2'>
        <div className='flex items-center gap-3 text-xs'>
          {post.category && (
            <span className='font-bold text-orange-600 uppercase tracking-wider'>
              {post.category}
            </span>
          )}
          <span className='text-muted-foreground'>{formattedDate}</span>
        </div>

        <h3 className='text-lg md:text-xl font-bold font-serif leading-snug group-hover:text-orange-600 transition-colors'>
          <Link
            href={`/blog/${post.slug}`}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </h3>

        <div
          className='text-muted-foreground text-sm line-clamp-2 md:line-clamp-3 leading-relaxed'
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      </div>
    </article>
  )
}
