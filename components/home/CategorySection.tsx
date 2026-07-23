import { CategoryPostCard } from './categoryPostCard'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Megaphone } from 'lucide-react'
import { getPostsByCategoryPaginated } from '@/lib/wordpress'

interface CategorySectionProps {
  title: string
  categoryId: number
  categorySlug: string
  adImageUrl?: string // Image optionnelle pour la pub
  adLinkUrl?: string // Lien optionnel pour la pub
}

export async function CategorySection({
  title,
  categoryId,
  categorySlug,
  adImageUrl = 'https://via.placeholder.com/400x300?text=Publicité', // Image par défaut si aucune fournie
  adLinkUrl = 'https://hamanie.news/contact/regie-pub', // Lien par défaut si aucun fourni
}: CategorySectionProps) {
  const response = await getPostsByCategoryPaginated(categoryId, 1, 10)
  const { data: posts } = response
  if (posts.length === 0)
    return (
      <>
        <p>{title}</p>
        <p>Aucun article disponible dans cette catégorie.</p>
      </>
    )

  return (
    <section className='space-y-6'>
      {/* En-tête de la Rubrique */}
      <div className='flex items-end justify-between border-b-2 border-foreground pb-2'>
        <h2 className='text-xl md:text-2xl font-sans font-black uppercase tracking-wider text-foreground'>
          {title}
        </h2>
        <Link
          href={`/rubrique/${categorySlug}`}
          className='text-xs font-bold font-sans text-orange-600 uppercase tracking-widest flex items-center gap-1 hover:underline'
        >
          Voir tout <ArrowRight className='h-3 w-3' />
        </Link>
      </div>

      {/* 🚀 LA GRILLE À 2 COLONNES (2/3 Articles, 1/3 Publicité) */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        {/* COLONNE GAUCHE (2/3) : Sous-grille de 2 colonnes pour les 4 articles */}
        <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {posts.map((post: any, index: number) => (
            <CategoryPostCard
              key={post.id}
              post={{
                ...post,
                id: index,
                title: post.title.rendered,
                excerpt: post.excerpt.rendered,
                slug: post.slug,
                date: post.date,
                imageId: post.featured_media,
              }}
            />
          ))}
        </div>

        {/* COLONNE DROITE (1/3) : L'Espace Publicitaire */}
        {/* <div className='w-full h-full min-h-[250px]'>
          {adImageUrl ? (
            // Variante A : Affichage d'une vraie bannière publicitaire d'un partenaire
            <a
              href={adLinkUrl || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='block relative w-full aspect-[4/3] rounded-2xl overflow-hidden border shadow-xs group'
            >
              <Image
                src={adImageUrl}
                alt='Espace Publicitaire'
                fill
                sizes='(max-width: 1024px) 100vw, 400px'
                className='object-cover transition-transform duration-500 group-hover:scale-102'
                loading='lazy'
              />
              <span className='absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-[9px] text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest'>
                Publicité
              </span>
            </a>
          ) : (
            // Variante B : Encart d'attente si vous n'avez pas encore vendu l'espace
            <div className='w-full aspect-[4/3] bg-muted/60 border border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3'>
              <div className='h-10 w-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600'>
                <Megaphone className='h-5 w-5' />
              </div>
              <div className='space-y-1'>
                <h4 className='text-sm font-bold text-foreground'>
                  Votre publicité ici
                </h4>
                <p className='text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed'>
                  Boostez votre visibilité auprès de nos lecteurs qualifiés.
                </p>
              </div>
              <Link
                href='/contact/regie-pub'
                className='text-xs font-bold text-primary hover:underline'
              >
                Contactez notre régie →
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </section>
  )
}
