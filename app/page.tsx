import { stripHtml, truncateHtml } from '@/lib/metada'
import { getRecentPosts, getPostsPaginated } from '@/lib/wordpress'
import type { Post } from '@/lib/wordpress.d'
import Link from 'next/link'
import SectionContainer from './components/sectionContainer'
import { Suspense } from 'react'

export const revalidate = 3600

export default async function HomePage() {
  const recentPosts: Post[] = await getRecentPosts()

  return (
    <>
      <section>
        <div className='container'>
          <h1>Bienvenue sur mon blog WordPress avec Next.js</h1>
          <p>Découvrez les dernières actualités et articles sur notre site.</p>
        </div>
        <div className='container'>
          <h2>Articles récents</h2>
          <ul>
            {recentPosts.map((post) => (
              <li key={post.id} className='post-item'>
                <Link href={`/posts/${post.slug}`}>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(post.title.rendered, 50),
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(post.excerpt.rendered, 55),
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Suspense fallback={<div>Loading sections...</div>}>
        <SectionContainer sectionTitle='economie' />
        <SectionContainer sectionTitle='societe' />
        <SectionContainer sectionTitle='culture' />
        <SectionContainer sectionTitle='sport' />
      </Suspense>
    </>
  )
}
