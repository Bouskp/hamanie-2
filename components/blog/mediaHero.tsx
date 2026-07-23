import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface PostProps {
  post: {
    title: string
    slug: string
    category?: string
    featuredImage?: { node: { sourceUrl: string; altText: string } }
  }
}

export function MediaHero({ post }: PostProps) {
  if (!post) return null

  return (
    <Link href={`/blog/${post.slug}`} className='block group'>
      <Card className='relative w-full aspect-[16/10] md:aspect-[21/9] rounded-none md:rounded-3xl overflow-hidden border-0 shadow-lg'>
        {/* Image de fond responsive */}
        {post.featuredImage?.node && (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            priority
            sizes='100vw'
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
        )}

        {/* Dégradé sombre pour lisibilité du texte */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

        {/* Bloc Contenu positionné en bas */}
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-12 space-y-3 md:space-y-4 text-white'>
          {post.category && (
            <Badge className='bg-orange-600 hover:bg-orange-700 text-white uppercase text-xs tracking-wider font-bold border-0 px-3 py-1 rounded-none'>
              {post.category}
            </Badge>
          )}
          <h2
            className='text-2xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight max-w-4xl'
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </div>
      </Card>
    </Link>
  )
}
