// components/sections/SectionPaysRouter.tsx
import { getPostsByZonePaginated, getPostsPaginated } from '@/lib/wordpress'
import { zones } from '@/lib/utils'
import SectionMosaiquePaysAccueil from './SectionMosaiquePaysAccueil'
import { notFound } from 'next/navigation'

interface SectionPaysRouterProps {
  slug: string
}

export default async function SectionPaysRouter({
  slug,
}: SectionPaysRouterProps) {
  // 1. Recherche et sécurisation du pays cible dans votre configuration locale
  const zoneTrouve = zones.find((p) => p.slug === slug)

  // Si le pays demandé n'existe pas dans votre tableau utils, le routeur ne rend rien
  if (!zoneTrouve) return notFound()

  // 2. Requête API WordPress optimisée (On demande uniquement 5 articles pour la mosaïque)
  const postsPerPage = 6
  const currentPage = 1

  let articlesFormatted = []

  try {
    const response = await getPostsByZonePaginated(
      zoneTrouve.id,
      currentPage,
      postsPerPage,
    )
    const { data: posts, headers } = response
    // 3. Formatage et nettoyage chirurgical des données pour les composants graphiques
    articlesFormatted = posts.map((post: any) => ({
      id: post.id || post.slug,
      title: post.title?.rendered || post.title || '',
      slug: post.slug,
      // Nettoyage strict des résidus et crochets HTML [...] de l'extrait
      excerpt: post.excerpt?.rendered || post.excerpt || '',
      image:
        post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full
          .source_url ||
        post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large
          .source_url,
      date: post.date
        ? new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      // Récupération sécurisée du Media Focus Point de l'API REST
      focalPoint: {
        x: post.focal_point.x,
        y: post.focal_point.y,
      },
      altStr: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
    }))
  } catch (error) {
    console.error(
      `Erreur d'extraction API WordPress pour le pays ${zoneTrouve.name}:`,
      error,
    )
    return null // Évite de faire planter toute la page d'accueil si l'API WordPress est temporairement indisponible
  }

  const zoneConfig = {
    id: zoneTrouve.id,
    name: zoneTrouve.name,
    slug: zoneTrouve.slug,
  }

  // 5. Envoi des données prêtes et nettoyées au composant de mise en page Mosaïque
  return (
    <SectionMosaiquePaysAccueil
      articles={articlesFormatted}
      zone={zoneConfig}
    />
  )
}
