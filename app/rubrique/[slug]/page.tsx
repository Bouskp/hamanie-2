import { BBCNewsLayout } from '@/components/rubriques/BBCLayout'
import { DefaultLayout } from '@/components/rubriques/DefaultLayout'
import { ForbesLayout } from '@/components/rubriques/ForbesLayout'
import { LeMondeLayout } from '@/components/rubriques/LeMonde'
import { LesEchosLayout } from '@/components/rubriques/LesEchosLayout'
import { NYTimesLayout } from '@/components/rubriques/NYTimesLayout'
import { categories } from '@/lib/utils'
import { getPostsByCategoryPaginated } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import { title } from 'process'

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
  const category = categories.find(
    (category) => category.slug === decodeURIComponent(slug),
  )
  const { page } = await searchParams

  const currentPage = page ? parseInt(page) : 1

  if (!category) <p>{"La category n'existe pas"}</p>

  const dataResponse = await getPostsByCategoryPaginated(
    category?.id || 0,
    currentPage,
    40,
  )

  const { data: posts, headers } = dataResponse
  const { total, totalPages } = headers
  const renderdPosts = posts.map((item) => ({
    ...item,
    title: item.title.rendered,
    id: item.id.toString(),
    excerpt: item.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    path: `/posts/${item.slug}`,
    date: item.date,
    content: item.content.rendered,
    image: item._embedded?.['wp:featuredmedia']?.[0].source_url,
    slug: item.slug,
    altStr:
      item._embedded?.['wp:featuredmedia']?.[0].caption.rendered ||
      item.title.rendered,
  }))

  if (!posts || posts.length == 0) <p>{"Pas d'articles"}</p>
  switch (slug) {
    case 'economie':
      return (
        <LeMondeLayout
          articles={renderdPosts}
          title={category?.title || 'economie'}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={category?.slug || ''}
        />
      )

    case 'societe':
      return (
        <ForbesLayout
          articles={renderdPosts}
          title={category?.title || 'société'}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={category?.slug || ''}
        />
      )

    case 'international':
      return (
        <LesEchosLayout
          articles={renderdPosts}
          title={category?.title || 'international'}
          currentPage={currentPage}
          totalPages={totalPages}
          slug='international'
        />
      )

    case 'politique':
      return (
        <NYTimesLayout
          articles={renderdPosts}
          title={category?.title || 'politique'}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={slug}
        />
      )

    case 'entreprises':
      return (
        <BBCNewsLayout
          articles={renderdPosts}
          title={category?.title || 'entreprise'}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={slug}
        />
      )
    default:
      return (
        <DefaultLayout
          articles={renderdPosts}
          title={category?.title || ''}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={category?.slug || ''}
        />
      )
  }

  // return (
  //   <main className='container max-w-7xl mx-auto px-4 py-10 space-y-12'>
  //     {/* En-tête Institutionnel style Forbes */}
  //     <div className='text-center py-6 border-b-4 border-black mb-6'>
  //       <h1 className='text-4xl md:text-6xl font-serif font-black uppercase tracking-tight text-foreground'>
  //         {category?.title}
  //       </h1>
  //     </div>

  //     {/* 🚀 CONDITION DE PAGE : Le gros bloc asymétrique s'affiche UNIQUEMENT sur la page 1 */}
  //     {isFirstPage && <ForbesHero posts={posts} />}

  //     {/* La grille de flux s'affiche sur toutes les pages, s'adaptant automatiquement */}
  //     <ForbesGrid posts={posts} isFirstPage={isFirstPage} />

  //     {/* 🚀 LE COMPOSANT DE NAVIGATION BAS DE PAGE */}
  //     <ForbesPagination
  //       currentPage={currentPage}
  //       totalPages={totalPages}
  //       categorySlug={slug}
  //     />
  //   </main>
  // )
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}
