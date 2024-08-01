import { siteConfig } from '@/utils/config'
import type { FC } from 'react'
import Icon from './ui/icon'

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <a className="font-bold text-xl font-display hover:text-foreground-hover flex gap-3 place-items-center" href="/">
      <Icon name="Rocket" /> <span>{siteConfig.name}</span>
    </a>
  )
}

export default Logo
