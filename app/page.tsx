import { HeroSection } from '@/components/home/heroSection'
import { RecentPosts } from '@/components/home/recentPosts'
import { PopularPosts } from '@/components/home/popularPosts'
import { NewsletterForm } from '@/components/home/newsletterForm'
import { CategorySection } from '@/components/home/CategorySection'
import { Rss } from 'lucide-react'
import { getPostsPaginated } from '@/lib/wordpress'
import { categories } from '@/lib/utils'

export const revalidate = 3600 // Revalidation every 60 seconds

// Simulation de fetch API WordPress
export default async function HomePage() {
  const data = await getPostsPaginated(1, 16)
  const posts = data.data.map((post: any) => ({
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    image: post._embedded['wp:featuredmedia'].at(0)?.source_url,
    excerpt: post.excerpt.rendered,
    categories: post.categories.map(async (catId: number) => {
      const category = categories.find((cat) => cat.id === catId)
      return category ? category.slug : 'Inconnu'
    }),
  }))

  return (
    <>
      <div className='space-y-16 md:space-y-24 pb-20'>
        {/* 1. Hero unique */}
        <HeroSection
          post={{
            ...posts[0],
            excerpt: posts[0].excerpt,
            category: posts[0].categories,
          }}
        />

        {/* 2. Zone double colonne avec grille de mise en page */}
        <section className='container max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 px-4'>
          {/* Colonne Principale (Flux d'actualités) */}
          <div className='lg:col-span-2 space-y-8'>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight border-b pb-4 flex items-center gap-2'>
              <Rss className='h-6 w-6 text-primary' />
              Dernières publications
            </h2>
            <RecentPosts
              posts={data.data.slice(1, 10).map((post: any) => ({
                ...post,
                title: post.title.rendered,
                image: post._embedded['wp:featuredmedia'].at(0)?.source_url,
                slug: post.slug,
                date: post.date,
              }))}
            />
          </div>

          {/* Barre latérale (Sidebar) */}
          <aside className='space-y-8 lg:sticky lg:top-24 h-fit'>
            <PopularPosts
              posts={data.data.slice(10, 12).map((post: any) => ({
                ...post,
                title: post.title.rendered,
                slug: post.slug,
              }))}
            />
            <NewsletterForm />
          </aside>
        </section>
      </div>
      <div className='container max-w-7xl mx-auto px-4 py-12 space-y-16'>
        {/* 3. Sections par catégorie */}
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            title={category.title}
            categoryId={category.id}
            categorySlug={category.slug}
            adImageUrl='https://via.placeholder.com/400x300?text=Publicité'
            adLinkUrl='https://hamanie.news/contact/regie-pub'
          />
        ))}
      </div>
    </>
  )
}
