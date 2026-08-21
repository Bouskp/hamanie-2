// app/sitemap.ts
import { categories, zones } from '@/lib/utils'
import { getAllPostsForSitemap } from '@/lib/wordpress'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer la liste complète ou paginée de vos articles (uniquement les slugs et dates de modification)
  const posts = await getAllPostsForSitemap()

  const staticPages = [
    ...categories.map((rubrique) => ({
      url: `https://hamanie.news/rubrique/${rubrique}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...zones.map((zone) => ({
      url: `https://hamanie.news/rubrique/${zone.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    {
      url: `https://hamanie.news/abonnement`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.1,
    },
    {
      url: `https://hamanie.news/magazine`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.3,
    },
  ]

  const postUrls = posts.map((post: any) => ({
    url: `https://hamanie.news/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://hamanie.news',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...postUrls,
    ...staticPages,
  ]
}
