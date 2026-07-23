import {
  getPostBySlug,
  getAllPostSlugs,
  getTagsByPost,
  getCategoryById,
} from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, User, Folder, Tag } from 'lucide-react'
import { formatHtml } from '@/lib/utils'

export async function generateStaticParams() {
  return await getAllPostSlugs()
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await getPostBySlug(slug)
  const tags = await getTagsByPost(post?.id || 0)
  const categories =
    post?.categories.map(function (cat, index) {
      getCategoryById(cat).then((res) => res)
    }) || []

  if (!post) {
    notFound()
  }

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0].source_url

  return (
    <main className='container max-w-7xl mx-auto px-4 py-10 space-y-8'>
      {/* EN-TÊTE : Titre et Métadonnées de base */}
      <div className='space-y-4 max-w-4xl'>
        <h1
          className='text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight'
          dangerouslySetInnerHTML={{ __html: formatHtml(post.title.rendered) }}
        />
        <div className='flex flex-wrap items-center gap-4 text-base md:text-sm text-muted-foreground border-b pb-4'>
          <div className='flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4' />
            <span>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                dateStyle: 'long',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* RE-SOUDATION DU BUG DE HAUTEUR : Image principale pleine largeur */}

      <div className='relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border bg-muted shadow-xs'>
        <Image
          src={featuredMedia || ''}
          alt={formatHtml(post.title.rendered)}
          fill
          priority // Charge instantanément l'image de tête (SEO)
          sizes='100vw'
          className='object-cover'
        />
      </div>

      {/* =========================================================================
        ARCHITECTURE À DEUX COLONNES (2/3 Contenu, 1/3 Taxonomies)
        ========================================================================= */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-4'>
        {/* COLONNE GAUCHE (2/3) : Le corps de l'article */}
        <div className='lg:col-span-2'>
          <div
            className='prose prose-xl dark:prose-invert max-w-none prose-p:mt-0 prose-p:mb-4 prose-headings:mt-6 prose-headings:mb-3 prose-headings:font-serif '
            dangerouslySetInnerHTML={{
              __html: formatHtml(post.content.rendered),
            }}
          />
        </div>

        {/* COLONNE DROITE (1/3) : Barre latérale collante pour Catégories & Tags */}
        <aside className='space-y-8 lg:sticky lg:top-24 h-fit'>
          {/* Bloc Catégories */}
          {categories.length > 0 && (
            <div className='space-y-3 border p-6 rounded-2xl bg-muted/20 shadow-xs'>
              <h3 className='text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b pb-2'>
                <Folder className='h-4 w-4 text-orange-600' />
                CATEGORIES
              </h3>
              <div className='flex flex-col space-y-2'>
                {categories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/rublique/${cat.slug}`}
                    className='text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors py-1 block border-b border-dashed last:border-0'
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bloc Étiquettes (Tags style Nuage de mots-clés avec Badge shadcn/ui) */}
          {tags.length > 0 && (
            <div className='space-y-3 border p-6 rounded-2xl bg-muted/20 shadow-xs'>
              <h3 className='text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b pb-2'>
                <Tag className='h-4 w-4 text-orange-600' />
                Mots-clés
              </h3>
              <div className='flex flex-wrap gap-2 pt-1'>
                {tags.map((tag: any) => (
                  <Badge
                    key={tag.id}
                    variant='outline'
                    className='rounded-xl px-3 py-1 bg-background text-xs hover:border-orange-600 hover:text-orange-600 transition-colors'
                  >
                    <Link href={`/tags/${tag.slug}`}>#{tag.name}</Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
