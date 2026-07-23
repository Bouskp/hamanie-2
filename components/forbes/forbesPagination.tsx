import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  categorySlug: string
}

export function ForbesPagination({
  currentPage,
  totalPages,
  categorySlug,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center gap-4 border-t pt-8 mt-12'>
      {/* Bouton Page Précédente */}
      <Button
        variant='outline'
        className='rounded-none border-black font-sans font-bold uppercase text-xs tracking-wider'
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={`/rubrique/${categorySlug}?page=${currentPage - 1}`}>
            <ChevronLeft className='h-4 w-4 mr-1' /> Précédent
          </Link>
        ) : (
          <span className='flex items-center opacity-50'>
            <ChevronLeft className='h-4 w-4 mr-1' /> Précédent
          </span>
        )}
      </Button>

      {/* Indicateur de position textuel style Forbes */}
      <span className='font-sans text-xs font-black uppercase tracking-widest'>
        Page {currentPage} sur {totalPages}
      </span>

      {/* Bouton Page Suivante */}
      <Button
        variant='outline'
        className='rounded-none border-black font-sans font-bold uppercase text-xs tracking-wider'
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={`/rubrique/${categorySlug}?page=${currentPage + 1}`}>
            Suivant <ChevronRight className='h-4 w-4 ml-1' />
          </Link>
        ) : (
          <span className='flex items-center opacity-50'>
            Suivant <ChevronRight className='h-4 w-4 ml-1' />
          </span>
        )}
      </Button>
    </div>
  )
}
