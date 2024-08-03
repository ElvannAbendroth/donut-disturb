import type { FC } from 'react'
import Icon from './ui/icon'
import { footerLinksCol1, footerLinksCol2, siteConfig, socials } from '@/utils/config'
import Logo from './Logo'

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="light p-4  mx-auto w-full bg-primary-dark text-primary-foreground">
      <div className="grid grid-cols-1  gap-12 py-10 px-8 mb-6 max-w-layout mx-auto">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-primary-foreground/60">{siteConfig.description}</p>
          <div className="flex flex-row gap-4">
            {socials.map(social => {
              return (
                <a href="/" target={social.target}>
                  <Icon name={social.icon} size={21} />
                </a>
              )
            })}
          </div>
        </div>
        {/* <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{footerLinksCol1.title}</h3>
            <ul>
              {footerLinksCol1.links.map(link => {
                return (
                  <li className="text-sm text-primary-foreground/60 hover:text-primary-foreground hover:underline">
                    <a href={link.href}>{link.label}</a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{footerLinksCol2.title}</h3>
            <ul>
              {footerLinksCol2.links.map(link => {
                return (
                  <li className="text-sm text-primary-foreground/60 hover:text-primary-foreground hover:underline">
                    <a href={link.href}>{link.label}</a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Contact</h3>
            <div className="text-sm text-primary-foreground/60">
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.city}, {siteConfig.address.zip}
              </p>
              <p>{siteConfig.address.country}</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-center py-3">
        <p className="text-muted text-sm">{siteConfig.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
