import { searchTerms, truncateHtml } from '@/lib/metada'
import { getPostsPaginated } from '@/lib/wordpress'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return searchTerms.map((term) => ({ slug: term.term }))
}

export default async function RubriquePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const { page } = await searchParams
  const currentPage = page ? parseInt(page) : 1

  if (!searchTerms.some((term) => term.term === slug)) {
    return notFound()
  }

  const dataResponse = await getPostsPaginated(currentPage, 10, {
    search: slug,
  })
  const { data: posts, headers } = dataResponse
  const { total, totalPages } = headers

  return (
    <div className='container'>
      <h1>Rubrique: {slug}</h1>
      <h2>Page: {currentPage}</h2>
      <h3>Total Posts: {total}</h3>
      <h3>Total Pages: {totalPages}</h3>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <div key={post.id} className='post-item'>
              <Link href={`/posts/${post.slug}`}>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(post.excerpt.rendered, 55),
                  }}
                />
              </Link>
            </div>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}
