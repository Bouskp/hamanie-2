// components/pays/layouts/CoteDivoireLayout.tsx
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Zap } from 'lucide-react'
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

export function CoteDivoireLayout({
  articles,
  title,
  currentPage,
  totalPages,
  slug,
}: LayoutProps) {
  const leadArticle = articles[0]
  const popularArticles = articles.slice(0, 5)
  const feedArticles = articles.slice(1)

  return (
    <div className='space-y-12 w-full'>
      <header className='w-full bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto pb-3 border-b-4 border-black flex justify-between items-end gap-4'>
          <div>
            <span className='text-[10px] font-black tracking-widest text-orange-600 uppercase block mb-1 font-sans'>
              Focus Pays
            </span>
            <h1
              className='text-3xl md:text-5xl font-black font-serif tracking-tight text-gray-900 capitalize'
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
          <span className='hidden sm:block text-xs font-mono uppercase tracking-widest text-gray-400 font-bold'>
            CI • Page {currentPage}
          </span>
        </div>
      </header>

      {/* ZONE 1 : Grand Angle & Bloc "Les plus lus" */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {leadArticle && (
          <div className='lg:col-span-8 group space-y-4'>
            {leadArticle.image && (
              <Link href={`/posts/${leadArticle.slug}`} className='block'>
                <AspectRatio
                  ratio={16 / 9}
                  className='bg-neutral-100 overflow-hidden rounded-xl shadow-xs'
                >
                  <Image
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    fill
                    priority
                    className='object-cover'
                    style={{
                      objectPosition: `${leadArticle.focusX ?? 50}% ${leadArticle.focusY ?? 50}%`,
                    }}
                    sizes='(max-width: 1024px) 100vw, 66vw'
                  />
                </AspectRatio>
              </Link>
            )}
            <div className='space-y-2'>
              <span className='text-[10px] font-black text-orange-600 uppercase tracking-widest block font-sans'>
                Grand Angle
              </span>
              <Link href={`/posts/${leadArticle.slug}`}>
                <h2
                  className='font-serif text-2xl md:text-4xl font-extrabold tracking-tight leading-tight group-hover:text-orange-600 transition-colors'
                  dangerouslySetInnerHTML={{ __html: leadArticle.title }}
                />
              </Link>
              <p className='text-gray-600 text-sm md:text-base font-normal leading-relaxed'>
                {cleanWordPressExcerpt(leadArticle.excerpt)}
              </p>
              {leadArticle.altStr && (
                <p className='text-[11px] text-neutral-400 italic mt-2 font-sans pl-2 border-l-2 border-orange-500'>
                  {leadArticle.altStr}
                </p>
              )}
            </div>
          </div>
        )}

        <aside className='lg:col-span-4 bg-white p-5 border border-gray-200/80 rounded-xl space-y-4 lg:sticky lg:top-24'>
          <div className='flex items-center gap-1.5 border-b border-gray-100 pb-2'>
            <Zap className='w-4 h-4 text-orange-600 fill-orange-600' />
            <h3 className='font-sans text-xs font-black uppercase tracking-wider text-gray-400'>
              Les plus lus Côte d'Ivoire
            </h3>
          </div>
          <div className='space-y-4 divide-y divide-gray-100'>
            {popularArticles.map((post, idx) => (
              <div
                key={post.id}
                className={`group space-y-1 ${idx > 0 ? 'pt-4' : ''}`}
              >
                <Link href={`/posts/${post.slug}`} className='block space-y-1'>
                  <span className='text-xs font-bold text-orange-600 font-mono'>
                    0{idx + 1} .
                  </span>
                  <h4
                    className='font-serif font-bold text-sm text-gray-800 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Separator className='bg-gray-200' />

      {/* ZONE 2 : Économie */}

      {/* ZONE 3 : Politique */}

      {/* ZONE 4 : Flux continu */}
      <section className='space-y-6 border-t border-gray-100 pt-10'>
        <h4 className='font-condensed text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2 font-sans'>
          Toutes les actualités
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {feedArticles.slice(0, 9).map((post) => (
            <div
              key={post.id}
              className='group space-y-2 bg-white p-3 border border-gray-50 rounded-lg hover:shadow-xs transition-shadow'
            >
              {post.image && (
                <Link href={`/posts/${post.slug}`} className='block'>
                  <AspectRatio
                    ratio={16 / 10}
                    className='bg-neutral-50 overflow-hidden rounded-lg border border-gray-100'
                  >
                    <Image
                      src={post.image}
                      alt=''
                      fill
                      className='object-cover'
                      style={{
                        objectPosition: `${post.focusX ?? 50}% ${post.focusY ?? 50}%`,
                      }}
                      sizes='(max-width: 768px) 100vw, 33vw'
                    />
                  </AspectRatio>
                </Link>
              )}
              <Link href={`/posts/${post.slug}`}>
                <h4
                  className='font-sans font-bold text-sm hover:text-orange-600 transition-colors leading-snug line-clamp-2'
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>
              <span className='text-[10px] text-gray-400 block'>
                {post.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className='mt-12 flex justify-center border-t border-gray-100 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/pays/${slug}`}
        />
      </div>
    </div>
  )
}
