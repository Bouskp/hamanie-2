// components/sections/SectionPaysRouter.tsx
import { getPostsPaginated } from '@/lib/wordpress'
import { pays } from '@/lib/utils'
import SectionMosaiquePaysAccueil from './SectionMosaiquePaysAccueil'

interface SectionPaysRouterProps {
  countrySlug: string // Le slug recherché (ex: 'cote-divoire', 'maroc', 'senegal')
}

export default async function SectionPaysRouter({
  countrySlug,
}: SectionPaysRouterProps) {
  // 1. Recherche et sécurisation du pays cible dans votre configuration locale
  const paysTrouve = pays.find(
    (p) =>
      p.name === countrySlug ||
      p.name.toLowerCase() === countrySlug.toLowerCase(),
  )

  // Si le pays demandé n'existe pas dans votre tableau utils, le routeur ne rend rien
  if (!paysTrouve) return null

  // 2. Requête API WordPress optimisée (On demande uniquement 5 articles pour la mosaïque)
  const postsPerPage = 5
  const currentPage = 1

  let articlesFormatted = []

  try {
    const dataResponse = await getPostsPaginated(currentPage, postsPerPage, {
      search: paysTrouve.name, // WordPress cherche les articles liés au nom du pays
    })

    const { data: posts } = dataResponse

    if (!posts || posts.length === 0) return null

    // 3. Formatage et nettoyage chirurgical des données pour les composants graphiques
    articlesFormatted = posts.map((post: any) => ({
      id: post.id || post.slug,
      title: post.title?.rendered || post.title || '',
      slug: post.slug,
      // Nettoyage strict des résidus et crochets HTML [...] de l'extrait
      excerpt: post.excerpt?.rendered || post.excerpt || '',
      image:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        post.image ||
        null,
      date: post.date
        ? new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      // Récupération sécurisée du Media Focus Point de l'API REST
      focusX: post._embedded?.['wp:featuredmedia']?.[0]?.focus_point?.x ?? 50,
      focusY: post._embedded?.['wp:featuredmedia']?.[0]?.focus_point?.y ?? 50,
      altStr: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
    }))
  } catch (error) {
    console.error(
      `Erreur d'extraction API WordPress pour le pays ${paysTrouve.name}:`,
      error,
    )
    return null // Évite de faire planter toute la page d'accueil si l'API WordPress est temporairement indisponible
  }

  // 4. Configuration dynamique de la couleur de la charte selon le pays
  let colorClass = 'border-red-600 text-red-600' // Secours par défaut
  if (paysTrouve.code === 'ci') colorClass = 'border-orange-500 text-orange-600'
  if (paysTrouve.code === 'ma')
    colorClass = 'border-emerald-800 text-emerald-800'
  if (paysTrouve.code === 'sn')
    colorClass = 'border-emerald-600 text-emerald-600'
  if (paysTrouve.code === 'cd') colorClass = 'border-sky-600 text-sky-600'
  if (paysTrouve.code === 'ng') colorClass = 'border-green-700 text-green-700'

  const countryConfig = {
    name: paysTrouve.name,
    slug: paysTrouve.name.toLocaleLowerCase(),
    colorClass,
    genre: paysTrouve.genre,
  }

  // 5. Envoi des données prêtes et nettoyées au composant de mise en page Mosaïque
  return (
    <SectionMosaiquePaysAccueil
      articles={articlesFormatted}
      country={countryConfig}
    />
  )
}
