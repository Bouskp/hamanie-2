// components/pays/layouts/RdcLayout.tsx
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { CustomPagination } from '@/components/rubriques/CustomPagination'
import { cleanWordPressExcerpt } from '@/lib/utils'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  image?: string
  date: string
  altStr?: string
  focusX?: number
  focusY?: number
}

interface LayoutProps {
  articles: Post[]
  title: string
  currentPage: number
  totalPages: number
  slug: string
}

export function RdcLayout({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: LayoutProps) {
  return (
    <div className='space-y-8'>
      {/* En-tête du Pays - Style RDC (Bleu Cyan) */}
      <header className='w-full bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto pt-8 pb-3 border-b-4 border-black'>
          <h1 className='text-4xl md:text-5xl font-bold font-condensed tracking-tighter  text-black capitalize'>
            {title}
          </h1>
        </div>
      </header>

      {articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500 italic'>
          Aucun document trouvé.
        </div>
      ) : (
        <>
          {/* Grille 3 colonnes d'investigation */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.map((post) => (
              <Card
                key={post.id}
                className='bg-white border border-neutral-100 shadow-xs rounded-xl overflow-hidden group flex flex-col justify-between h-full hover:shadow-md transition-shadow'
              >
                <CardContent className='p-4 space-y-3 flex-1 flex flex-col justify-between'>
                  <div className='space-y-2'>
                    {post.image && (
                      <Link href={`/posts/${post.slug}`} className='block mb-3'>
                        <AspectRatio
                          ratio={16 / 10}
                          className='bg-neutral-50 overflow-hidden rounded-lg'
                        >
                          <img
                            src={post.image}
                            alt=''
                            className='object-cover w-full h-full'
                            style={{
                              objectPosition: `${post.focusX ?? 50}% ${post.focusY ?? 50}%`,
                            }}
                          />
                        </AspectRatio>
                      </Link>
                    )}
                    <Link href={`/posts/${post.slug}`}>
                      <h3 className='font-condensed font-bold text-base leading-tight hover:text-red-600 transition-colors line-clamp-3 mb-4'>
                        {post.title}
                      </h3>
                    </Link>
                    <p className='text-gray-600 text-sm font-condensed line-clamp-3 leading-relaxed'>
                      {cleanWordPressExcerpt(post.excerpt)}
                    </p>
                  </div>
                  <div className='text-[12px] text-gray-600 font-medium font-condensed pt-2 border-t border-neutral-50'>
                    {post.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination RDC */}
          <div className='mt-12 flex justify-center border-t border-gray-100 pt-6'>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/pays/${slug}`}
            />
          </div>
        </>
      )}
    </div>
  )
}
