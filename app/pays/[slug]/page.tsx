// app/pays/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GrilleActualitesPays from '@/components/pays/GrilleActualitePays'
import { CustomPagination } from '@/components/rubriques/CustomPagination'
import { formatHtml, formatMediaDate, pays } from '@/lib/utils'
import { getPostsPaginated } from '@/lib/wordpress'
import { RdcLayout } from '@/components/pays/Congo'
import { NigeriaLayout } from '@/components/pays/Nigeria'
import { MarocLayout } from '@/components/pays/Maroc'
import { CoteDivoireLayout } from '@/components/pays/Ivoire'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export const revalidate = 3600

// 1. GÉNERATION DUSTATIC PARAMS POUR LE BUILD INITIAL SUR VERCEL
export async function generateStaticParams() {
  return pays.map((p) => ({
    slug: p.name,
  }))
}

// 2. GÉNERATION AUTOMATIQUE DU SEO POUR CHAQUE PAYS
export async function generateMetadata({
  params,
}: Omit<Props, 'searchParams'>): Promise<Metadata> {
  const { slug } = await params
  const nomPays = decodeURIComponent(slug)

  const seoTitle = `Focus ${nomPays} : Actualités, Analyses et Économie | Hamaniè news`
  const seoDesc = `Retrouvez toute l'actualité sectorielle, les décryptages industriels, financiers, les opportunités de marché et la transformation locale en ${nomPays}.`

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `https://hamanie.news/${slug}`, // Évite le contenu dupliqué avec la pagination ?page=2
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: 'website',
      url: `https://hamanie.news/${slug}`,
      siteName: 'hamanie.news',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
    },
  }
}

// 3. RENDU COMPOSANT DE LA PAGE PAYS
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { page } = await searchParams

  const nomPaysNettoye = decodeURIComponent(slug)

  // Recherche du pays dans le fichier utilitaire
  const paysTrouve = pays.find(
    (p) => p.name.toLowerCase() === nomPaysNettoye.toLowerCase(),
  )

  // FIX : Renvoi propre d'une page 404 si le pays n'existe pas dans la configuration locale
  if (!paysTrouve) {
    notFound()
  }

  const currentPage = page ? parseInt(page, 10) : 1
  const postsPerPage = 40

  // Appel de l'API WordPress mémoïsée
  const dataResponse = await getPostsPaginated(currentPage, postsPerPage, {
    search: nomPaysNettoye,
  })

  const { data: posts, headers } = dataResponse
  const renderedPosts = posts.map((item) => ({
    ...item,
    id: item.id.toString(),
    slug: item.slug,
    excerpt: formatHtml(item.excerpt.rendered),
    image: item._embedded?.['wp:featuredmedia']?.[0].source_url || '',
    date: formatMediaDate(item.date),
    title: formatHtml(item.title.rendered),
  }))

  switch (paysTrouve.name.toLowerCase()) {
    case "côte d'ivoire":
      return (
        <CoteDivoireLayout
          articles={renderedPosts}
          currentPage={currentPage}
          totalPages={headers.totalPages}
          title="Côte d'Ivoire"
          slug="côte d'ivoire"
        />
      )
    case 'maroc':
      return (
        <MarocLayout
          articles={renderedPosts}
          currentPage={currentPage}
          totalPages={headers.totalPages}
          title='Maroc'
          slug='maroc'
        />
      )
    case 'nigeria':
      return (
        <NigeriaLayout
          articles={renderedPosts}
          currentPage={currentPage}
          totalPages={headers.totalPages}
          title='Nigeria'
          slug='nigeria'
        />
      )
    case 'rdc':
      return (
        <RdcLayout
          articles={renderedPosts}
          currentPage={currentPage}
          totalPages={headers.totalPages}
          title='RDC'
          slug='rdc'
        />
      )
    default:
      // Modèle de secours (votre grille standard d'actualités par défaut)
      return (
        <GrilleActualitesPays
          articles={renderedPosts}
          currentPage={currentPage}
          totalPages={headers.totalPages}
          title={paysTrouve.name}
          slug={paysTrouve.code}
        />
      )
  }
}
