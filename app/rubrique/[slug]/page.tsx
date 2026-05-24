import { truncateHtml } from '@/lib/metada'
import { getPostsByCategoryPaginated } from '@/lib/wordpress'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export const categories = [
  { id: 68, slug: 'economie' },
  { id: 76, slug: 'sport' },
  { id: 74, slug: 'societe' },
  { id: 72, slug: 'politique' },
  { id: 609, slug: 'international' },
  { id: 70, slug: 'culture' },
]

// Create pagination URL helper
const createPaginationUrl = (newPage: number, slug: string) => {
  const params = new URLSearchParams()
  if (newPage > 1) params.set('page', newPage.toString())
  return `/rubrique/${slug}${params.toString() ? `?${params.toString()}` : ''}`
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const category = categories.find((category) => category.slug === slug)
  const { page } = await searchParams

  const currentPage = page ? parseInt(page) : 1

  if (!categories.some((category) => category.slug === slug)) {
    return notFound()
  }

  const dataResponse = await getPostsByCategoryPaginated(
    category?.id || 0,
    currentPage,
    10,
  )

  const { data: posts, headers } = dataResponse
  const { total, totalPages } = headers

  return (
    <section>
      <div className='container'>
        <div>
          <h1>Categorie: {slug.toLocaleUpperCase()}</h1>
        </div>

        <div>
          {posts.length > 0 ? (
            <>
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
            </>
          ) : (
            <p>Aucun article trouvé pour cette catégorie.</p>
          )}
        </div>

        <div className='pagination'>
          {totalPages > 1 && (
            <Link href={createPaginationUrl(currentPage - 1, slug)}>
              Précédent
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNum) =>
                pageNum === currentPage ||
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) == 1,
            )
            .map((pageNum, index, array) => {
              const showEllipsis = index > 0 && pageNum - array[index - 1] > 1

              return (
                <div key={pageNum}>
                  {showEllipsis && <span>{'... '}</span>}
                  <Link
                    href={createPaginationUrl(pageNum, slug)}
                    className={pageNum === currentPage ? 'active' : ''}
                  >
                    {pageNum}
                  </Link>
                </div>
              )
            })}

          {currentPage < totalPages && (
            <Link href={createPaginationUrl(currentPage + 1, slug)}>
              Suivant
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}
