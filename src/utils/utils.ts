import type { CollectionEntry } from 'astro:content'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Heading } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFormattedDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

export const getLocalStorageTheme = () => {
  {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') ?? 'light'
    } else {
      return 'light' // default theme
    }
  }
}

export const removeFirstPart = (url: string): string => {
  const parts = url.split('/')
  if (parts.length > 1) {
    parts.shift() // Remove the first part
    return parts.join('/')
  }
  return url // Return the original URL if there's no part to remove
}

export const findIndexById = (articles: CollectionEntry<'blog' | 'project'>[], id: string): number => {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id === id) {
      return i
    }
  }
  throw new Error(`No article found with id: ${id}`)
}

export const getIDFromHeading = (header: string): string => {
  return `#${header.toLowerCase().replace(/ /g, '-')}`
}

export const getHeadings = (markdown: string): Heading[] | [] => {
  const lines = markdown.split('\n')
  const headings: Heading[] = []

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      const label = line.replace(/^# /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h1' }
      headings.push(heading)
    }
    if (line.startsWith('## ')) {
      const label = line.replace(/^## /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h2' }
      headings.push(heading)
    }
    if (line.startsWith('### ')) {
      const label = line.replace(/^### /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h3' }
      headings.push(heading)
    }
    if (line.startsWith('#### ')) {
      const label = line.replace(/^#### /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h4' }
      headings.push(heading)
    }
    if (line.startsWith('##### ')) {
      const label = line.replace(/^##### /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h5' }
      headings.push(heading)
    }
    if (line.startsWith('###### ')) {
      const label = line.replace(/^###### /, '').trim()
      const heading: Heading = { label: label, id: getIDFromHeading(label), level: 'h6' }
      headings.push(heading)
    }
  })

  return headings
}
