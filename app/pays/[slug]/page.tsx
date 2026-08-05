import GrilleActualitesPays from '@/components/pays/GrilleActualitePays'

import { pays } from '@/lib/utils'
import { getPostsPaginated } from '@/lib/wordpress'
import Link from 'next/link'

// Fonction pour générer les numéros de page visibles (ex: [1, '...', 4, 5, 6, '...', 200])
function obtenirPagesVisibles(currentPage: number, totalPages: number) {
  const delta = 1 // Nombre de pages à afficher avant et après la page courante
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l > 2) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const paysFinded = pays.find(
    (pays) =>
      pays.name.toLocaleLowerCase() ===
      decodeURIComponent(slug).toLocaleLowerCase(),
  )
  const { page } = await searchParams
  console.log(page, paysFinded, slug)

  const currentPage = page ? parseInt(page) : 1

  if (!paysFinded) <p>{"Le pays n'existe pas"}</p>

  const dataResponse = await getPostsPaginated(currentPage, 15, {
    search: decodeURIComponent(slug),
  })
  const { data: posts, headers } = dataResponse

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <header className='w-full bg-white border-b border-gray-200 mb-10'>
        <div className='max-w-7xl mx-auto px-4 pt-8'>
          <div className='border-b-4 border-black pb-3'>
            <span className='text-[10px] font-black tracking-widest text-red-600 uppercase block mb-1'>
              Focus Pays
            </span>
            <h1 className='text-4xl md:text-5xl font-extrabold font-serif tracking-tighter uppercase text-gray-900 capitalize'>
              {decodeURIComponent(slug)}
            </h1>
          </div>
        </div>
      </header>
      <GrilleActualitesPays articles={posts} />
      {headers.totalPages > 1 && (
        <nav className='flex justify-between items-center border-t border-gray-200 pt-6 mt-12 w-full'>
          {/* Bouton Précédent */}
          <Link
            href={`/pays/${slug}?page=${currentPage - 1}`}
            className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest rounded-none transition-colors ${
              currentPage <= 1
                ? 'pointer-events-none opacity-20 border-gray-200 text-gray-300'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Précédent
          </Link>

          {/* Numéros de pages numériques (Masqués sur très petits mobiles pour éviter les chevauchements) */}
          <div className='hidden sm:flex items-center gap-1'>
            {obtenirPagesVisibles(currentPage, headers.totalPages).map((p) => (
              <Link
                key={p}
                href={`/pays/${slug}?page=${p}`}
                className={`w-9 h-9 flex items-center justify-center text-xs font-bold border rounded-none transition-colors ${
                  p === currentPage
                    ? 'bg-black border-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Indicateur de secours textuel visible uniquement sur mobile */}
          <span className='sm:hidden text-xs font-black text-gray-500 tracking-wider'>
            {currentPage} / {headers.totalPages}
          </span>

          {/* Bouton Suivant */}
          <Link
            href={`/pays/${slug}?page=${currentPage + 1}`}
            className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest rounded-none transition-colors ${
              currentPage >= headers.totalPages
                ? 'pointer-events-none opacity-20 border-gray-200 text-gray-300'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Suivant
          </Link>
        </nav>
      )}
    </div>
  )
}

export function generateStaticParams() {
  return pays.map((pays) => ({
    slug: pays.name,
  }))
}
