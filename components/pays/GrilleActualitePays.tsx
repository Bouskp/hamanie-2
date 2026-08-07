// components/pays/GrilleActualitePays.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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

interface GrilleProps {
  articles: Post[]
  title: string
  currentPage: number
  totalPages: number
  slug: string
}

export default function GrilleActualitesPays({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: GrilleProps) {
  return (
    <div className='space-y-8'>
      {/* 1. En-tête Universel de Secours (Ligne Noire Standard) */}
      <header className='w-full bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto pt-8 pb-3 border-b-4 border-black flex justify-between items-baseline gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold font-condensed tracking-tighter  text-gray-900 capitalize'>
              {title}
            </h1>
          </div>
        </div>
      </header>

      {/* 2. Gestion de l'état vide */}
      {articles.length === 0 ? (
        <div className='text-center py-20 text-gray-400 italic font-sans border border-dashed border-gray-200 rounded-xl'>
          Aucun article disponible pour ce pays pour le moment.
        </div>
      ) : (
        <>
          {/* 3. Grille Standard Universelle en 3 colonnes */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.map((post) => (
              <Card
                key={post.id}
                className='overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-300 group flex flex-col h-full rounded-xl'
              >
                {/* Conteneur d'image avec recadrage adaptatif par Point Focal */}
                <CardHeader className='p-0 shrink-0 relative aspect-[16/10] bg-muted w-full overflow-hidden'>
                  <Link
                    href={`/posts/${post.slug}`}
                    className='block w-full h-full'
                  >
                    <Image
                      src={post.image || '/api/placeholder/400/250'}
                      alt={post.title}
                      fill
                      className='object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-95 group-hover:opacity-100'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      style={{
                        objectPosition: `${post.focusX ?? 50}% ${post.focusY ?? 50}%`,
                      }}
                    />
                  </Link>
                </CardHeader>

                <CardContent className='p-4 flex flex-col flex-1 justify-between space-y-3'>
                  <div className='space-y-2'>
                    <Link href={`/posts/${post.slug}`} className='block'>
                      <h3 className='font-serif font-bold text-base md:text-lg leading-snug text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2'>
                        {post.title}
                      </h3>
                    </Link>
                    <p className='text-gray-600 text-xs md:text-sm font-normal line-clamp-3 leading-relaxed'>
                      {cleanWordPressExcerpt(post.excerpt)}
                    </p>
                  </div>

                  <div className='text-[11px] text-gray-400 font-medium pt-2 border-t border-gray-50 font-sans flex justify-between items-center'>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 4. Injection de la Pagination en bas de grille */}
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
