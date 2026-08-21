import { getMagazinePaginated } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { MagGrid } from '@/components/magazines/MagGrid'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title:
    "Hamaniè Mag : Le mensuel des leaders et décideurs qui façonnent l'afrique",
  description:
    'Découvrez les grands entretiens, analyses de la transformation locale et enquêtes exclusives sur plusieurs domaines.',
  metadataBase: new URL('https://hamanie.news'),
  alternates: {
    canonical: 'https://hamanie.news/magazine', // Force l'URL principale pour éviter le contenu dupliqué
  },
  openGraph: {
    title:
      "Hamaniè Mag : Le mensuel des leaders et décideurs qui façonnent l'afrique",
    description:
      'Découvrez les grands entretiens, analyses de la transformation locale et enquêtes exclusives sur plusieurs domaines.',
    type: 'website',
    url: 'https://hamanie.news',
    siteName: 'hamanie.news',
    locale: 'fr_FR',
    images: [
      {
        url: '/images/og-magazine.jpg', // Image de couverture officielle du magazine (Format idéal : 1200x630px)
        width: 1200,
        height: 630,
        alt: "Hamaniè Mag : Le mensuel des leaders et décideurs qui façonnent l'afrique",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      "Hamaniè Mag : Le mensuel des leaders et décideurs qui façonnent l'afrique",
    description:
      'Découvrez les grands entretiens, analyses de la transformation locale et enquêtes exclusives sur plusieurs domaines.',
    images: ['/images/og-magazine.jpg'],
  },
}

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function MagPage({ searchParams }: Props) {
  const { page } = await searchParams

  // h_mags
  const currentPage = page ? parseInt(page) : 1
  const dataResponse = await getMagazinePaginated(currentPage, 100)
  const { data: magazines } = dataResponse
  const latestMag = currentPage === 1 ? magazines[0] : null
  const archives = currentPage === 1 ? magazines.slice(1) : magazines
  const latestMagImage =
    magazines[0]._embedded?.['wp:featuredmedia']?.[0].source_url

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 font-sans antialiased text-gray-900'>
      <header className='mb-12 border-b border-gray-200 pb-6'>
        <h1 className='text-4xl font-extrabold tracking-tight md:text-5xl mb- uppercase'>
          Hamaniè - le journal
        </h1>
        <p className='text-lg text-gray-500'>
          Retrouvez toutes nos éditions mensuelles et nos dossiers spéciaux.
        </p>
      </header>

      {/*1. Le Dernier Numéro (À la Une) */}
      {latestMag && (
        <section className='mb-16 bg-gray-50 rounded-2xl p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center border border-gray-100 shadow-sm'>
          <div className='relative aspect-[3/4] w-full max-w-sm mx-auto shadow-2xl rounded-lg overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300'>
            <Image
              src={latestMagImage || ''}
              alt={'hamaniè Mag ' + latestMag.acf.numero_magazine.toString()}
              fill
              className='object-cover'
              priority
            />
          </div>
          <div className='flex flex-col justify-center space-y-4'>
            <h2 className='text-3xl font-bold md:text-4xl'>
              Le mensuel des leaders et décideurs qui façonnent l'Afrique.
            </h2>

            <span className='text-xs font-bold tracking-widest text-red-600 uppercase'>
              Dernier numéro en kiosque
            </span>
            <h2 className='text-3xl font-bold md:text-4xl'>
              {`Hamaniè ${latestMag?.acf?.numero_magazine}`}
            </h2>
            <div className='pt-4'>
              <Link
                href={latestMag.acf.lien_}
                className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors'
              >
                Lire le mag
              </Link>
            </div>
          </div>
        </section>
      )}

      {archives.length > 0 && (
        <MagGrid
          archives={archives
            .sort((a, b) => b.acf.numero_magazine - a.acf.numero_magazine)
            .map((mag) => {
              return {
                numero: mag.acf.numero_magazine,
                date: mag.date_gmt,
                link: mag.acf.lien_,
                imageUrl:
                  mag._embedded?.['wp:featuredmedia']?.[0].source_url || '',
              }
            })}
        />
      )}
    </div>
  )
}
