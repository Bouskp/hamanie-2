// components/ui/CustomPagination.tsx
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface CustomPaginationProps {
  currentPage: number
  totalPages: number
  basePath: string // Ex: "/rubrique/industrie"
}

export function CustomPagination({
  currentPage,
  totalPages,
  basePath,
}: CustomPaginationProps) {
  const searchParams = useSearchParams()

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : '',
    )
    params.set('page', pageNumber.toString())
    return `${basePath}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  // Correction des limites pour éviter la duplication des pages 1, 2, totalPages-1 et totalPages
  const getPageNumbers = () => {
    const pages: number[] = []
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className='my-12' aria-label='Navigation dans les articles'>
      <PaginationContent className='flex-wrap justify-center gap-1'>
        {/* BOUTON PRÉCÉDENT */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
            aria-disabled={currentPage === 1}
            aria-label='Aller à la page précédente'
            className={
              currentPage === 1
                ? 'pointer-events-none opacity-40 font-condensed uppercase text-xs font-black'
                : 'font-condensed uppercase text-xs font-black hover:text-red-600 transition-colors'
            }
          >
            Précédent
          </PaginationPrevious>
        </PaginationItem>

        {/* PREMIÈRE PAGE (Toujours visible) */}
        <PaginationItem>
          <PaginationLink
            href={getPageUrl(1)}
            isActive={currentPage === 1}
            aria-label='Page 1'
            className={
              currentPage === 1
                ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white font-black'
                : 'font-bold text-gray-800'
            }
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* ELLIPSE GAUCHE */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis className='text-gray-400' aria-hidden='true' />
          </PaginationItem>
        )}

        {/* PAGES CENTRALES DYNAMIQUES */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={getPageUrl(page)}
              isActive={currentPage === page}
              aria-label={`Page ${page}`}
              className={
                currentPage === page
                  ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white font-black'
                  : 'font-bold text-gray-800'
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ELLIPSE DROITE */}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis className='text-gray-400' aria-hidden='true' />
          </PaginationItem>
        )}

        {/* DERNIÈRE PAGE */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href={getPageUrl(totalPages)}
              isActive={currentPage === totalPages}
              aria-label={`Page ${totalPages}`}
              className={
                currentPage === totalPages
                  ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white font-black'
                  : 'font-bold text-gray-800'
              }
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* BOUTON SUIVANT */}
        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
            aria-disabled={currentPage === totalPages}
            aria-label='Aller à la page suivante'
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-40 font-condensed uppercase text-xs font-black'
                : 'font-condensed uppercase text-xs font-black hover:text-red-600 transition-colors'
            }
          >
            Suivant
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
