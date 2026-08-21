import { formatMediaDate } from '@/lib/utils'
import { getFeaturedMediaById } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'

export interface MagazineProps {
  title: string
  issueNumber: string
  publishDate: string
  coverImageUrl: string
  summary: string
  highlights?: string[]
  linkUrl: string
}

interface HeroMagazineComponentProps {
  magazine: MagazineProps
}

export default async function HeroMagazine({
  magazine,
}: HeroMagazineComponentProps) {
  if (!magazine) return null
  const imageUrl = await (
    await getFeaturedMediaById(Number(magazine.coverImageUrl))
  ).source_url

  return (
    <section className='bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white rounded-2xl my-8 overflow-hidden shadow-xl border border-gray-800 w-full'>
      <div className='max-w-7xl mx-auto px-6 py-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        {/* COLONNE GAUCHE (5/12) : Visuel de la couverture du magazine (ZÉRO ROUPAGE) */}
        <div className='lg:col-span-5 flex justify-center lg:justify-end relative group z-10'>
          {/* Halo lumineux d'ambiance en arrière-plan */}
          <div className='absolute w-64 h-80 bg-red-600/10 blur-3xl rounded-full -z-10 pointer-events-none' />

          {/* Conteneur rigide aux proportions A4 adaptatives */}
          <div className='relative w-64 sm:w-72 h-[360px] sm:h-[420px] transition-transform duration-500 ease-out group-hover:scale-102 group-hover:rotate-1 shadow-[25px_25px_50px_-15px_rgba(0,0,0,0.8)] rounded-r-md overflow-hidden border-l-4 border-black/40 bg-gray-950'>
            <Image
              src={imageUrl}
              alt={`Couverture du numéro ${magazine.issueNumber}`}
              fill
              priority
              className='object-contain'
              sizes='(max-w-768px) 100vw, 33vw'
            />
          </div>
        </div>

        {/* COLONNE DROITE (7/12) : Titre, Sommaire et Boutons de conversion */}
        <div className='lg:col-span-7 space-y-6 text-left'>
          <div className='flex items-center justify-center md:justify-start gap-3'>
            <span className='bg-red-600 text-white text-[10px] font-condensed font-black uppercase tracking-widest px-3 py-1 rounded-sm'>
              Numérique
            </span>
            <span className='text-gray-400 text-xs font-condensed font-bold uppercase tracking-wider'>
              N°{magazine.issueNumber} — {formatMediaDate(magazine.publishDate)}
            </span>
          </div>

          <h2 className='font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight text-white text-center md:text-left'>
            {magazine.title}
          </h2>

          <p className='text-gray-300 text-sm md:text-base leading-relaxed font-normal font-sans text-center md:text-left'>
            {magazine.summary}
          </p>

          {/* Les grands titres du dossier central (Sommaire) */}
          {magazine.highlights && magazine.highlights.length > 0 ? (
            <div className='border-y border-gray-800 py-4 my-2'>
              <h3 className='text-[10px] font-condensed font-black uppercase tracking-widest text-gray-400 mb-3'>
                Au sommaire de ce numéro :
              </h3>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3'>
                {magazine?.highlights?.map((item, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-2.5 text-xs sm:text-sm text-gray-200'
                  >
                    <span className='text-red-500 font-bold mt-0.5 select-none'>
                      •
                    </span>
                    <span className='font-medium line-clamp-2'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}

          {/* Boutons d'Appels à l'action principaux */}
          <div className='flex items-center justify-center md:justify-start sm:flex-row gap-4 pt-2'>
            <Link
              href={magazine.linkUrl}
              className='bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-condensed font-black px-6 py-3.5 rounded-lg text-center text-xs tracking-wider uppercase transition-colors shadow-lg shadow-yellow-500/5 cursor-pointer'
            >
              lire le numéro
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
