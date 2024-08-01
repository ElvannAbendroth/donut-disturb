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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'firebase/auth'
import { projectAuth } from '@/utils/firebase'
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

//React version of Navbar
export const Navbar: FC<NavbarProps> = ({ pathname, user }) => {
  const logout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    // @ts-ignore:next-line
    const { error, data } = await actions.logoutAccount.safe()
    if (error) {
      console.log(error)
      if (isInputError(error)) {
        console.log(error.fields)
      }
      return
    }

    window.location.reload()
    console.log('het')
  }
  return (
    <nav className="bg-background px-4 py-4 md:py-6 md:px-8 ">
      <div className="flex justify-between max-w-layout mx-auto">
        <Logo />
        <div className="flex flex-gap-12 items-center gap-4 ">
          <DesktopMenu navItems={navItems} className="hidden md:block" pathname={pathname} user={user} />
          <MobileMenu navItems={navItems} className="block md:hidden" pathname={pathname} user={user} />
          <div className="flex flex-row items-center gap-2 font-bold text-sm flex-wrap">
            {user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  {' '}
                  <p className="size-8 bg-input rounded-full flex items-center justify-center font-bold">
                    {user.email[0].toUpperCase()}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={12}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={e => logout(e)}>
                    <Icon name="LogOut" className="size-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href="/login">
                <Button variant={'ghost'} className="px-3">
                  <Icon name="LogIn" size={16} strokeWidth={2.3} />
                </Button>
              </a>
            )}
          </div>
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
                  <Button icon={item.icon}>{item.label}</Button>
                </a>
              </li>
            )
        })}
        <li className="flex flex-row items-center gap-2 lowercase font-bold text-sm">
          <ThemeToggle variant="desktop" />
        </li>
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

            <hr />
            <li className="flex flex-row justify-center gap-2 lowercase font-bold text-sm">
              <ThemeToggle variant="mobile" />
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
