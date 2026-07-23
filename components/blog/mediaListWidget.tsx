import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface MinimalPost {
  id: string
  title: string
  slug: string
  category?: string
}

export function MediaListWidget({ posts }: { posts: MinimalPost[] }) {
  return (
    <Card className='rounded-none border-t-4 border-t-foreground shadow-none bg-transparent border-x-0 border-b-0'>
      <CardHeader className='px-0 pt-4 pb-2'>
        <CardTitle className='text-base font-black uppercase tracking-wider font-sans'>
          Les plus consultés
        </CardTitle>
      </CardHeader>
      <CardContent className='px-0 divide-y'>
        {posts.slice(0, 5).map((post, idx) => (
          <div
            key={post.id}
            className='flex gap-4 items-start py-4 group first:pt-2 last:pb-0'
          >
            {/* Grand numéro d'ordre façon média */}
            <span className='text-2xl font-serif font-black text-orange-600/20 group-hover:text-orange-600 transition-colors leading-none'>
              {idx + 1}
            </span>

            <div className='space-y-1'>
              {post.category && (
                <span className='block text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                  {post.category}
                </span>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className='text-sm font-serif font-bold leading-snug hover:underline block'
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
