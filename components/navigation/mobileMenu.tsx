'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface MenuItem {
  label: string
  path: string
}

export function MobileMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Évite que le menu reste ouvert en tâche de fond si on passe sur un écran PC
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 768px correspond au breakpoint 'md:' de Tailwind
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 🚀 CORRECTION : Utilisation de asChild pour fusionner proprement avec le Button */}
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-xl'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Ouvrir le menu</span>
        </Button>
      </SheetTrigger>

      {/* Contenu coulissant */}
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <SheetHeader className='text-left pb-6 border-b'>
          <SheetTitle className='font-black text-lg'>Navigation</SheetTitle>
        </SheetHeader>

        <nav className='flex flex-col space-y-4 pt-6'>
          {items.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)} // Ferme le menu au clic sur un lien
                className={cn(
                  'text-lg font-medium p-2 rounded-xl transition-colors hover:bg-muted',
                  isActive && 'text-primary font-bold bg-primary/5',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
