import {
  getPostBySlug,
  getTagsByPost,
  getCategoriesByPost,
  getPostsByCategoryPaginated,
  getPostsPaginated,
} from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Folder, Tag, User, Clock, RefreshCw } from 'lucide-react'
import { calculateReadingTime, formatHtml } from '@/lib/utils'
import { Metadata } from 'next'

export const revalidate = 3600

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  // Extraction de l'image mise en avant via la syntaxe _embedded
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  // Utilisation de vos métadonnées personnalisées issues de WordPress
  const seoTitle = post.title.rendered
  const seoDesc = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      // Évite le contenu dupliqué (Indispensable pour le SEO)
      canonical: `https://hamanie.news/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: 'article',
      url: `https://hamanie.news/${slug}`,
      images: featuredMedia ? [{ url: featuredMedia }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: featuredMedia ? [featuredMedia] : [],
    },
  }
}

export async function generateStaticParams() {
  const response = await getPostsPaginated(1, 100)
  const { data: posts } = response
  return posts.map((p) => ({
    slug: p.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const tags = await getTagsByPost(post.id || 0)
  const categories = await getCategoriesByPost(post.id || 0)

  const featuredMedia =
    post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large
      ?.source_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full
      ?.source_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  ;('')

  const caption = post._embedded?.['wp:featuredmedia']?.[0]?.caption?.rendered
  const readingTime = calculateReadingTime(post.content?.rendered || '')

  const isModified =
    new Date(post.modified).getTime() - new Date(post.date).getTime() >
    1000 * 60 * 60 * 12

  const authorName = post.content?.rendered?.includes('Thom Biakpa')
    ? 'Thomas Biakpa'
    : 'la Rédaction'

  const cleanExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered
        .replace(/\[.*?\]/g, '...')
        .replace(/\s+\.\.\./g, '...')
    : ''

  const response =
    categories.length === 0
      ? await getPostsPaginated(1, 5)
      : await getPostsByCategoryPaginated(categories[0].id, 1, 7)

  const { data } = response
  const relatedPosts = data.filter((p) => p.id !== post.id)

  return (
    <main className='container max-w-7xl mx-auto px-4 py-10 space-y-8'>
      {/* EN-TÊTE : Titre, Chapeau et Métadonnées */}
      <div className='space-y-5 max-w-4xl border-b pb-4'>
        {/* Titre Principal */}
        <h1
          className='text-2xl md:text-3xl font-condensed font-black tracking-tight leading-tight uppercase'
          dangerouslySetInnerHTML={{
            __html: formatHtml(post.title?.rendered || ''),
          }}
        />

        {/* LE CHAPEAU (Déplacé ici, juste sous le titre) */}
        {cleanExcerpt && (
          <div
            className='font-serif text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic'
            dangerouslySetInnerHTML={{
              __html: formatHtml(cleanExcerpt),
            }}
          />
        )}

        {/* Métadonnées de l'article */}
        <div className='flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-muted-foreground pt-2'>
          <div className='flex items-center gap-1.5 font-semibold'>
            <User className='h-4 w-4' />
            <span>Par {authorName}</span>
          </div>

          <div className='flex items-center gap-1.5 font-semibold'>
            <CalendarDays className='h-4 w-4' />
            <span>
              Publié le{' '}
              {new Date(post.date).toLocaleDateString('fr-FR', {
                dateStyle: 'long',
              })}
            </span>
          </div>

          {isModified && (
            <div className='flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium'>
              <RefreshCw className='h-3 w-3' />
              <span>
                Mis à jour le{' '}
                {new Date(post.modified).toLocaleDateString('fr-FR', {
                  dateStyle: 'short',
                })}
              </span>
            </div>
          )}

          <div className='flex items-center gap-1.5 ml-auto lg:ml-0 font-medium text-gray-600 dark:text-gray-400 font-semibold'>
            <Clock className='h-4 w-4' />
            <span>Lecture : {readingTime} min</span>
          </div>
        </div>
      </div>

      {/* ARCHITECTURE SUPÉRIEURE : IMAGE + PUBLICITÉ */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        <div className='lg:col-span-9 space-y-6 w-full'>
          {/* Image principale uniquement */}
          <div className='space-y-2'>
            {featuredMedia && (
              <div className='relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden border bg-muted shadow-xs'>
                <Image
                  src={featuredMedia}
                  alt={formatHtml(post.title?.rendered || "Image de l'article")}
                  fill
                  priority
                  quality={85}
                  sizes='(max-width: 1024px) 100vw, 75vw'
                  className='object-cover'
                  style={{
                    objectPosition: post.focal_point
                      ? `${post.focal_point.x} ${post.focal_point.y}`
                      : '50% 50%',
                  }}
                />
              </div>
            )}

            {caption && (
              <div
                className='text-xs md:text-sm text-muted-foreground italic text-left max-w-4xl px-1 leading-relaxed [&_p]:m-0 [&_strong]:text-foreground [&_strong]:font-bold font-condensed'
                dangerouslySetInnerHTML={{
                  __html: formatHtml(caption),
                }}
              />
            )}
          </div>
        </div>

        {/* Publicité Pavé */}
        <div className='lg:col-span-3 flex flex-col items-center justify-center lg:h-full lg:min-h-[250px] w-full lg:sticky lg:top-24'>
          <div className='w-full max-w-[300px] bg-muted/40 border border-dashed border-muted-foreground/30 rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[250px] relative overflow-hidden group'>
            <span className='absolute top-2 right-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 select-none'>
              Publicité
            </span>
            <div className='text-xs text-muted-foreground/80 font-medium space-y-1 z-10'>
              <p className='font-bold text-gray-400 group-hover:text-orange-600 transition-colors'>
                Format Pavé
              </p>
              <p className='text-[10px] text-gray-400/70'>300 x 250 px</p>
            </div>
            <div className='absolute inset-0 bg-linear-to-br from-transparent via-muted/10 to-transparent group-hover:scale-105 transition-transform duration-500' />
          </div>
        </div>
      </div>

      {/* CORPS DE L'ARTICLE + BARRE LATÉRALE */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-4'>
        <div className='lg:col-span-2'>
          <div
            className='prose prose-base max-w-none prose-p:mt-0 prose-p:mb-4 prose-headings:mt-6 prose-headings:mb-3 prose-headings:font-serif prose-justify prose-p:text-black dark:prose-p:text-gray-100 prose-headings:text-black dark:prose-headings:text-white prose-strong:text-black dark:prose-strong:text-white'
            dangerouslySetInnerHTML={{
              __html: formatHtml(
                post.content?.rendered.replaceAll('Thom Biakpa', '') || '',
              ),
            }}
          />
        </div>

        <aside className='space-y-8 lg:sticky lg:top-[100px] h-fit'>
          {categories.length > 0 && (
            <div className='space-y-3 border p-6 rounded-2xl bg-muted/20 shadow-xs'>
              <h3 className='text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b pb-2'>
                <Folder className='h-4 w-4' />
                <span>Catégories</span>
              </h3>
              <div className='flex flex-wrap gap-2'>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/rubrique/${cat.slug}`}>
                    <Badge
                      variant='secondary'
                      className='hover:bg-muted transition-colors'
                      dangerouslySetInnerHTML={{ __html: cat.name }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div className='space-y-3 border p-6 rounded-2xl bg-muted/20 shadow-xs'>
              <h3 className='text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b pb-2'>
                <Tag className='h-4 w-4' />
                <span>Mots-clés</span>
              </h3>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant='outline'
                    className='hover:bg-muted transition-colors'
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div className='space-y-4 border p-6 rounded-2xl bg-muted/20 shadow-xs'>
              <h3 className='text-sm font-black uppercase tracking-wider border-b pb-2'>
                À lire aussi
              </h3>
              <div className='space-y-3 divide-y divide-border'>
                {relatedPosts.slice(0, 5).map((p) => (
                  <Link
                    key={p.id}
                    href={`/posts/${p.slug}`}
                    className='block pt-3 first:pt-0 group'
                  >
                    <p
                      className='text-sm font-serif font-bold group-hover:text-red-600 transition-colors line-clamp-2'
                      dangerouslySetInnerHTML={{
                        __html: formatHtml(p.title?.rendered || ''),
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
