import { navItems } from '@/utils/config'
import Icon from '@/ui/icon'
import { type FC } from 'react'
import { cn } from '@/utils/utils'
import type { NavItem } from '@/utils/types'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import Logo from './Logo'
import { actions } from 'astro:actions'

import { isInputError } from 'astro:actions'

interface NavbarProps {
  pathname: string
  user:
    | {
        name: string | null
        email: string | null
      }
    | undefined
}

export const Navbar: FC<NavbarProps> = ({ pathname, user }) => {
  return (
    <nav className="px-4 py-4 md:py-4 md:px-8 m-2 ">
      <div className="flex justify-between max-w-layout mx-auto">
        <Logo />
        <div className="flex flex-gap-12 items-center gap-4 ">
          <DesktopMenu navItems={navItems} className="hidden md:block" pathname={pathname} user={user} />
          <MobileMenu navItems={navItems} className="block md:hidden" pathname={pathname} user={user} />
        </div>
      </div>
    </nav>
  )
}

interface DesktopMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[]
  pathname: string
  user:
    | {
        name: string | null
        email: string | null
      }
    | undefined
}

export const DesktopMenu: FC<DesktopMenuProps> = ({ navItems, className, pathname, user, ...props }) => {
  return (
    <div className={cn('flex gap-4', className)} {...props}>
      <ul className="flex gap-4  ">
        {navItems.map(item => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          if (item.type === 'link')
            return (
              <li key={item.label} className="align-middle self-center">
                <a
                  className={`hover:underline underline-offset-4 hover:text-primary ${
                    isActive ? 'underline text-primary' : ''
                  }`}
                  href={item.href}
                  target={item.target || '_self'}
                >
                  {item.label}
                </a>
              </li>
            )
          if (item.type === 'button')
            return (
              <li key={item.label} className="align-middle self-center">
                <a href={item.href} target={item.target || '_self'}>
                  <Button icon={item.icon} size={'sm'}>
                    {item.label}
                  </Button>
                </a>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[]
  pathname: string
  user:
    | {
        name: string | null
        email: string | null
      }
    | undefined
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, className, pathname, user, ...props }) => {
  return (
    <div className={cn('flex gap-4 align-center items-center', className)} {...props}>
      <Sheet>
        <SheetTrigger className="p-2 rounded-md hover:bg-input-hover data-[state=open]:bg-input-hover">
          <Icon name="Menu" size={21} strokeWidth={2.3} />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-center text-center items-center md:hidden h-screen">
          <ul className="md:hidden flex flex-col gap-4 align-center">
            {navItems.map(item => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              if (item.type === 'link')
                return (
                  <li key={item.label}>
                    <a
                      className={`lowercase font-bold text-lg hover:underline underline-offset-4 hover:text-primary ${
                        isActive ? 'underline text-primary' : ''
                      }`}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              if (item.type === 'button')
                return (
                  <li key={item.label}>
                    <a href={item.href} target={item.target || '_self'}>
                      <Button icon={item.icon} size={'lg'}>
                        {item.label}
                      </Button>
                    </a>
                  </li>
                )
            })}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
