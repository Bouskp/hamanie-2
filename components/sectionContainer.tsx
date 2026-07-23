import { categories } from '../app/rubrique/[slug]/page'
import { notFound } from 'next/navigation'
import { getRecentPosts } from '@/lib/wordpress'
import { searchTerms } from '@/lib/metada'

interface SectionContainerProps {
  sectionTitle?: string
  searchTerm?: string
}

export default async function SectionContainer({
  sectionTitle,
  searchTerm,
}: SectionContainerProps) {
  let term, category

  if (sectionTitle) {
    category = categories.find(
      (cat) => cat.slug === sectionTitle?.toLowerCase(),
    )
  } else if (searchTerm) {
    term = searchTerms.find((term) => term.term === searchTerm?.toLowerCase())
  }

  const dataResponse = getRecentPosts(
    sectionTitle
      ? { category: category?.id.toString() }
      : { search: term?.term },
  )

  const posts = await dataResponse

  if (
    (category &&
      !categories.some(
        (category) =>
          category.slug?.toLocaleLowerCase() === sectionTitle?.toLowerCase(),
      )) ||
    (searchTerm &&
      !searchTerms.some((term) => term.term === searchTerm?.toLowerCase()))
  ) {
    return notFound()
  }

  return (
    <section className=''>
      <div className='container'>
        {(sectionTitle || searchTerm) && (
          <h2 className='text-5xl capitalize'>{sectionTitle || term?.desc}</h2>
        )}
        {posts.length > 0 ? (
          <>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
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
              href={
                sectionTitle
                  ? `/rubrique/${sectionTitle?.toLowerCase()}`
                  : `/${searchTerm?.toLowerCase()}`
              }
              className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-8 px-6 rounded mt-16 inline-block'
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
