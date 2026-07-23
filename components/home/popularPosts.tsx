import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface PopularPost {
  slug: string
  title: string
  image: string
}

export function PopularPosts({ posts }: { posts: PopularPost[] }) {
  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-bold flex items-center gap-2'>
          <TrendingUp className='h-5 w-5 text-primary' />
          Les plus lus
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {posts.map((post, idx) => (
          <div
            key={idx}
            className='flex gap-4 items-start border-b pb-3 last:border-0 last:pb-0'
          >
            <span className='text-2xl font-black text-muted-foreground/30 font-mono leading-none'>
              0{idx + 1}
            </span>
            <Link
              href={`/posts/${post.slug}`}
              className='text-sm font-medium hover:text-primary transition-colors line-clamp-2'
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
