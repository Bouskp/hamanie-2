'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

interface MenuItem {
  label: string
  path: string
}

export function DesktopMenu({ items }: { items: MenuItem[] }) {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          const isActive = pathname === item.path
          return (
            <NavigationMenuItem key={item.path}>
              <Link href={item.path} passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent font-medium transition-colors hover:text-primary text-lg',
                    isActive && 'text-primary font-bold',
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
