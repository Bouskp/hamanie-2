import { getMagazinePaginated, getAllMagazineSlugs } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import LoadMore from '../../components/LoadMore'

export const revalidate = 3600

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateStaticParams() {
  return await getAllMagazineSlugs()
}

export default async function MagPage({ searchParams }: Props) {
  const { page } = await searchParams

  const currentPage = page ? parseInt(page) : 1
  const dataResponse = await getMagazinePaginated(currentPage, 10)
  const { data: magazines, headers } = dataResponse

  return (
    <section>
      <div className='container'>
        <h1>Bienvenue sur la page Magazine</h1>
        <p>
          Découvrez les dernières actualités et articles sur notre magazine.
        </p>
        <div>
          {magazines.length > 0 ? (
            <div className='mag-list'>
              {magazines.map((mag) => {
                const featuredMedia = mag._embedded?.['wp:featuredmedia']?.[0]
                return (
                  <div key={mag.id} className='mag-item'>
                    <Link href={`/magazine/${mag.slug}`} key={mag.id}>
                      <h2 className='mag-title'>{mag.title.rendered}</h2>
                      {featuredMedia && (
                        <Image
                          src={featuredMedia.source_url}
                          alt={mag.title.rendered}
                          className='img-mag'
                          width={500}
                          height={300}
                          loading='eager'
                        />
                      )}
                    </Link>
                    <Link
                      href={mag.acf.lien_}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Lire plus
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <p>Aucun magazine trouvé.</p>
          )}
        </div>
        <LoadMore initialPage={{ page: currentPage }} />
      </div>
    </section>
  )
}
