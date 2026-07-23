import { formatHtml } from '@/lib/utils'
import { getFeaturedMediaById } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'

export async function ForbesHero({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null

  const mainPost = posts[0]
  const sidePosts = posts.slice(1, 5)

  // Extraction de l'image de couverture du grand article
  const mainImageId = mainPost.featured_media
  let mainImageUrl = (await getFeaturedMediaById(mainImageId)).source_url

  const mainImageAlt = formatHtml(mainPost.title.rendered)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 border-b pb-12'>
      {/* GAUCHE (2/3) : L'article Star de la Rubrique */}
      <div className='lg:col-span-2 space-y-4 group'>
        {mainImageUrl && (
          <Link
            href={`/posts/${mainPost.slug}`}
            className='block relative w-full aspect-[16/9] overflow-hidden bg-muted border'
          >
            <Image
              src={mainImageUrl}
              alt={mainImageAlt}
              fill
              priority // Priorité SEO absolue sur la rubrique
              sizes='(max-width: 1024px) 100vw, 800px'
              className='object-cover transition-transform duration-700 group-hover:scale-101'
            />
          </Link>
        )}
        <div className='space-y-2'>
          <h2 className='text-2xl md:text-4xl font-serif font-black tracking-tight leading-tight group-hover:text-red-700 transition-colors'>
            <Link
              href={`/posts/${mainPost.slug}`}
              dangerouslySetInnerHTML={{ __html: mainPost.title.rendered }}
            />
          </h2>
          <div
            className='text-muted-foreground text-sm md:text-base line-clamp-3 leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: formatHtml(mainPost.excerpt.rendered),
            }}
          />
        </div>
      </div>

      {/* DROITE (1/3) : Le fil de texte premium (Forbes Wire) */}
      <div className='space-y-6 border-t pt-6 lg:border-t-0 lg:pt-0 lg:pl-6 lg:border-l divide-y divide-border'>
        <h3 className='text-xs font-sans font-black uppercase tracking-widest text-red-700 pb-2'>
          Derniers Articles
        </h3>
        {sidePosts.map((post: any, idx: number) => (
          <article key={post.id} className='pt-4 first:pt-0 group'>
            <h4 className='text-base font-serif font-bold leading-snug group-hover:text-red-700 transition-colors line-clamp-3'>
              <Link
                href={`/posts/${post.slug}`}
                dangerouslySetInnerHTML={{
                  __html: formatHtml(post.title.rendered),
                }}
              />
            </h4>
            <span className='text-[12px] font-sans text-muted-foreground font-medium block mt-1'>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                dateStyle: 'long',
              })}
            </span>
          </article>
        ))}
      </div>
    </div>
  )
}
