import { categories } from '../rubrique/[slug]/page'
import { notFound } from 'next/navigation'
import { getRecentPosts } from '@/lib/wordpress'

interface SectionContainerProps {
  sectionTitle?: string
}

export default async function SectionContainer({
  sectionTitle,
}: SectionContainerProps) {
  const category = categories.find(
    (cat) => cat.slug === sectionTitle?.toLowerCase(),
  )
  const dataResponse = getRecentPosts({ category: category?.id.toString() })
  const posts = await dataResponse

  if (
    !categories.some(
      (category) =>
        category.slug?.toLocaleLowerCase() === sectionTitle?.toLowerCase(),
    )
  ) {
    return notFound()
  }

  return (
    <section className='section-container rubrique-section'>
      <div className='container'>
        {sectionTitle && <h2 className='section-title'>{sectionTitle}</h2>}
        {posts.length > 0 ? (
          <>
            <ul className='post-list'>
              {posts.map((post) => (
                <li key={post.id} className='post-item'>
                  <a href={`/posts/${post.slug}`}>
                    <h3
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`/rubrique/${sectionTitle?.toLowerCase()}`}
              className='view-all'
            >
              Voir tous les articles
            </a>
          </>
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
    </section>
  )
}
