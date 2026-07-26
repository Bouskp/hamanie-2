import { ForbesGrid } from '@/components/forbes/forbesGrid'
import { ForbesHero } from '@/components/forbes/forbesHero'
import { ForbesPagination } from '@/components/forbes/forbesPagination'
import { categories } from '@/lib/utils'
import { getPostsByCategoryPaginated } from '@/lib/wordpress'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const category = categories.find((category) => category.slug === slug)
  const { page } = await searchParams
  console.log(page, category)

  const currentPage = page ? parseInt(page) : 1
  const isFirstPage = currentPage === 1

  if (!category) <p>{"La category n'existe pas"}</p>

  const dataResponse = await getPostsByCategoryPaginated(
    category?.id || 0,
    currentPage,
    15,
  )

  const { data: posts, headers } = dataResponse
  const { total, totalPages } = headers

  if (!posts) notFound()

  return (
    <main className='container max-w-7xl mx-auto px-4 py-10 space-y-12'>
      {/* En-tête Institutionnel style Forbes */}
      <div className='text-center py-6 border-b-4 border-black mb-6'>
        <h1 className='text-4xl md:text-6xl font-serif font-black uppercase tracking-tight text-foreground'>
          {category?.title}
        </h1>
      </div>

      {/* 🚀 CONDITION DE PAGE : Le gros bloc asymétrique s'affiche UNIQUEMENT sur la page 1 */}
      {isFirstPage && <ForbesHero posts={posts} />}

      {/* La grille de flux s'affiche sur toutes les pages, s'adaptant automatiquement */}
      <ForbesGrid posts={posts} isFirstPage={isFirstPage} />

      {/* 🚀 LE COMPOSANT DE NAVIGATION BAS DE PAGE */}
      <ForbesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        categorySlug={slug}
      />
    </main>
  )
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}
