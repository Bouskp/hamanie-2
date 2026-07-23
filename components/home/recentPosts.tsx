import Image from 'next/image'
import Link from 'next/link'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface RecentPost {
  id: string
  title: string
  slug: string
  date: string
  image: string
}

export async function RecentPosts({ posts }: { posts: RecentPost[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {posts.map((post, index) => (
        <Card
          key={index}
          className='flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'
        >
          <div>
            <div className='relative w-full aspect-video'>
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes='(max-width: 768px) 100vw, 400px'
                className='object-cover'
                loading='lazy'
              />
            </div>
            <CardHeader className='space-y-2'>
              <span className='text-xs text-muted-foreground py-2'>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  dateStyle: 'long',
                })}
              </span>
              <CardTitle className='text-lg line-clamp-2 hover:text-primary transition-colors'>
                <Link
                  href={`/posts/${post.slug}`}
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </CardTitle>
            </CardHeader>
          </div>
          <CardFooter className='pt-0'>
            <Button asChild variant='link' className='px-0 group text-primary'>
              <Link href={`/posts/${post.slug}`}>
                Lire la suite
                <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
