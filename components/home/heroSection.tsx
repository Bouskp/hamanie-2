import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowRight } from 'lucide-react'

interface Post {
  title: string
  excerpt: string
  slug: string
  date: string
  category: string[] | string
  image: string
}

export function HeroSection({ post }: { post: Post }) {
  return (
    <section className='container max-w-7xl px-4 pt-6 md:pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-muted/40 rounded-3xl border p-6 md:p-8 lg:p-12 overflow-hidden shadow-sm'>
        <div className='flex flex-col space-y-4 md:space-y-6 order-2 lg:order-1'>
          <div>
            {Array.isArray(post.category) ? (
              post.category.map((cat, idx) => (
                <Badge
                  key={idx}
                  variant='secondary'
                  className='text-xs md:text-sm font-medium mr-2'
                >
                  {cat}
                </Badge>
              ))
            ) : (
              <Badge
                variant='secondary'
                className='text-xs md:text-sm font-medium'
              >
                {post.category}
              </Badge>
            )}
          </div>
          <h1
            className='text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground'
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p
            className='text-muted-foreground text-sm md:text-base max-w-xl line-clamp-3 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className='flex items-center gap-2 text-xs md:text-sm text-muted-foreground'>
            <CalendarDays className='h-4 w-4' />
            <span>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                dateStyle: 'long',
              })}
            </span>
          </div>
          <div className='flex flex-wrap gap-4 pt-2'>
            <Button asChild size='lg' className='rounded-xl group shadow-sm'>
              <Link href={`/posts/${post.slug}`}>
                Lire l'article
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>

        <div className='relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden shadow-md order-1 lg:order-2 border'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover transition-transform duration-700 hover:scale-105'
          />
        </div>
      </div>
    </section>
  )
}
