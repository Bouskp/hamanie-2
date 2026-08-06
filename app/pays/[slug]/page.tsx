// app/pays/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GrilleActualitesPays from '@/components/pays/GrilleActualitePays'
import { CustomPagination } from '@/components/rubriques/CustomPagination'
import { pays } from '@/lib/utils'
import { getPostsPaginated } from '@/lib/wordpress'

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

  return (
    <div className='max-w-7xl mx-auto px-4 py-10 text-gray-900 antialiased'>
      {/* En-tête de la Rubrique Focus Pays Style Presse */}
      <header className='w-full bg-white border-b border-gray-200 mb-10'>
        <div className='max-w-7xl mx-auto pt-8 pb-3 border-b-4 border-black'>
          <span className='text-[10px] font-black tracking-widest text-red-600 uppercase block mb-1 font-sans'>
            Focus Pays
          </span>
          <h1 className='text-4xl md:text-5xl font-extrabold font-serif tracking-tighter uppercase text-gray-900 capitalize'>
            {nomPaysNettoye}
          </h1>
        </div>
      </header>

      {/* Grille d'actualités du pays concerné */}
      <GrilleActualitesPays articles={posts} />

      {/* PAGINATION UNIFIÉE : Utilisation de CustomPagination en remplacement du bloc nav artisanal */}
      <div className='mt-12 flex justify-center border-t border-gray-100 pt-6'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={headers.totalPages}
          basePath={`/pays/${slug}`}
        />
      </div>
    </div>
  )
}
