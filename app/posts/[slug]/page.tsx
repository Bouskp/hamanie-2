import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  return await getAllPostSlugs()
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

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const category = post._embedded?.['wp:term']?.[0]
  const date = new Date(post.date).toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className='container'>
      <article>
        <h1>
          <span
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></span>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        <p>Publié le {date}</p>
        {category && <p>Catégorie: {category.map((c) => c.name).join(', ')}</p>}
        {featuredMedia && (
          <img
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text || 'Image à la une'}
          />
        )}
      </article>
    </div>
  )
}
