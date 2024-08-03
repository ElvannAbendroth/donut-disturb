import type { Feature, NavItem, SiteConfig, Social, Testimonial, FooterLinksCol } from '@/utils/types'

export const siteConfig: SiteConfig = {
  name: 'Donut Disturb',
  description: 'Donut Disturb is a series of mini donut-related games for donut lovers.',
  url: 'http://rock-your-astro.vercel.app/',
  ogImage: 'https://tx.shadcn.com/og.jpg',
  links: {
    github: 'https://github.com/elvannabendroth',
    twitter: 'https://twitter.com/ElvannMusic',
    behance: 'https://www.behance.net/elvann',
  },
  author: {
    name: 'Oodri',
    href: 'http://www.oodri.dev',
    image: 'https://avatars.githubusercontent.com/u/28565227?v=4',
  },
  copyright: 'Website designed by Oodri at Rock Your Design',
  address: {
    street: 'PL100',
    city: 'Vantaa',
    zip: '00310',
    country: 'Finland',
  },
}

export const navItems: NavItem[] = [{ label: 'Take the Quiz', href: '/quiz', type: 'button' }]

export const footerLinksCol1 = {
  title: 'Links',
  links: [
    { label: 'Thank You', href: '/thank-you' },
    { label: '404', href: '/404' },
    { label: 'Login', href: '/login' },
    { label: 'Colors', href: '/style/colors' },
  ],
}

export const footerLinksCol2: FooterLinksCol = {
  title: 'Pages',
  links: [
    { label: 'About', href: '/about', type: 'link' },
    { label: 'Team', href: '/team', type: 'link' },
    { label: 'Blog', href: '/blog', type: 'link' },
    { label: 'Contact', href: '/contact', type: 'link' },
  ],
}

export const socials: Social[] = [
  { icon: 'Github', href: 'https://github.com/ElvannAbendroth', target: '_bank' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/oodri/', target: '_bank' },
  { icon: 'Globe', href: 'http://www.oodri.dev', target: '_bank' },
]
