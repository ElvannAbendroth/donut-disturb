import { siteConfig } from '@/utils/config'
import type { FC } from 'react'
import Icon from './ui/icon'

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <a
      className="text-xl tracking-wider font-display hover:text-foreground-hover flex gap-3 place-items-center"
      href="/"
    >
      <Icon name="Donut" size={28} strokeWidth={2.5} /> <span>{siteConfig.name}</span>
    </a>
  )
}

export default Logo
