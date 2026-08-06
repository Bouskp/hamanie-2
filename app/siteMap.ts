// app/sitemap.ts
import { getAllPostsForSitemap } from '@/lib/wordpress'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer la liste complète ou paginée de vos articles (uniquement les slugs et dates de modification)
  const posts = await getAllPostsForSitemap()

  const postUrls = posts.map((post: any) => ({
    url: `https://hamanie.news/{post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://hamanie.news',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...postUrls,
  ]
}
