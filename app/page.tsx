import SectionRouter from '@/components/sections/SectionRouter'
import HeroSlider from '@/components/home/HeroSlider'
import HeroMagazine from '@/components/magazines/HeroMagazine'
import {
  getFeaturedMediaById,
  getMagazinePaginated,
  getPostsPaginated,
} from '@/lib/wordpress'
import { categories, pays } from '@/lib/utils'
import YoutubeSectionAccueil from '@/components/YoutubeSectionAccueil'
import { Metadata } from 'next'
import SectionPaysRouter from '@/components/home/SectionPaysRouter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '',
  description: '',
  metadataBase: new URL('https://hamanie.news'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hamanie.news',
    description: "site d'infos pour l'Afrique, par l'Afrique",
    type: 'website',
    url: 'https://hamanie.news',
    images: [
      {
        url: '/images/ogImage.jpg', // Image de partage par défaut de votre média (1200x630px)
        width: 1200,
        height: 630,
        alt: 'hamanie.news',
      },
    ],
    siteName: 'hamanie.news',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'https://hamanie.news',
    description: "site d'infos pour l'Afrique, par l'Afrique",
    images: ['/images/ogHome.jpg'],
  },
}
// 2. LE COMPOSANT DE LA PAGE PRINCIPALE
export default async function HomePage() {
  // Récupération de tous les flux WordPress en parallèle pour des performances maximales
  const response = await getPostsPaginated(1, 3)
  const { data: recentPost } = response

  const responseMag = await getMagazinePaginated(1, 1)
  const latestMagazine = responseMag.data[0]

  // On isole les 3 premiers articles globaux de la politique pour le HeroSlider tout en haut
  const sliderPosts = recentPost.slice(0, 3).map((post, idx) => {
    const featuredImage =
      post._embedded?.['wp:featuredmedia']?.[0].source_url ||
      (post.featured_media > 0
        ? getFeaturedMediaById(post.featured_media).then(
            (data) => data.source_url,
          )
        : ''
      ).toString()
    return {
      ...post,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      id: idx.toString(),
      category: post.categories,
      featuredImage: featuredImage,
    }
  })

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 space-y-12'>
      {/* NIVEAU 1 : Le Grand Slider d'actualités chaudes Above the Fold */}
      <HeroSlider posts={sliderPosts} />

      {/* NIVEAU 2 : Encart de coupure avec la présentation du Magazine Papier/Numérique */}
      <HeroMagazine
        magazine={{
          title: `Hamaniè #${latestMagazine.acf.numero_magazine}`,
          issueNumber: latestMagazine.acf.numero_magazine.toString(),
          publishDate: latestMagazine.date,
          coverImageUrl: latestMagazine.acf.image.toString(),
          summary:
            "Le mensuel des leaders et décideurs qui façonnent l'afrique",
          linkUrl: latestMagazine.acf.lien_,
        }}
      />

      {/* NIVEAU 3 : Section Politique au format premium asymétrique */}
      <SectionRouter layout='grid-3' rubrique={categories[0]} />

      {/* NIVEAU 4 : Rupture visuelle avec le Carrousel Immersif à fond noir défilant */}
      <SectionRouter rubrique={categories[1]} layout='cards-immersive-scroll' />

      {/* NIVEAU 6 : Mise en page dense sans photo dédiée aux flux Économie */}
      <SectionRouter rubrique={categories[2]} layout='split-eco' />

      {/* NIVEAU 7 : Espace littéraire épuré sur fond crème pour les chroniques */}
      <SectionRouter rubrique={categories[3]} layout='grand-format' />

      {/* NIVEAU 8 : Fermeture de page rythmée style Dépêches d'agence (Éphéméride) */}
      <SectionRouter rubrique={categories[4]} layout='grid-3' />

      <YoutubeSectionAccueil />

      <SectionRouter rubrique={categories[5]} layout='bento' />
      <SectionRouter rubrique={categories[6]} layout='ephemeride' />
      <SectionRouter rubrique={categories[7]} layout='grid-3' />
      <SectionRouter rubrique={categories[8]} layout='split-eco' />
      <SectionRouter rubrique={categories[9]} layout='split-eco' />
      <SectionRouter rubrique={categories[10]} layout='split-eco' />
      <SectionRouter rubrique={categories[11]} layout='split-eco' />
      {pays.map((pays) => (
        <SectionPaysRouter key={pays.code} countrySlug={pays.name} />
      ))}
    </main>
  )
}
