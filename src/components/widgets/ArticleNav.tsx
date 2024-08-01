import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import { removeFirstPart } from '@/utils/utils'
import Icon from '@/ui/icon'

interface ArticleNavProps {
  previous?: CollectionEntry<'blog' | 'project'>
  next?: CollectionEntry<'blog' | 'project'>
}

const ArticleNav: FC<ArticleNavProps> = ({ previous, next }) => {
  return (
    <div className={`grid ${previous && next ? 'grid-cols-2' : 'grid-cols-2'} gap-8`}>
      {next ? (
        <a
          href={removeFirstPart(next.slug)}
          className="bg-secondary rounded-lg p-6 hover:opacity-80 transition-all flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <Icon name="ChevronLeft" size={16} className="text-muted" />
            <p className="typo-small text-muted">next</p>
          </div>
          <p className="typo-h4 mt-0 flex-grow">{next?.data.title}</p>
        </a>
      ) : (
        <div className="border-secondary border-2 rounded-lg"></div>
      )}
      {previous ? (
        <a
          href={removeFirstPart(previous.slug)}
          className="bg-secondary rounded-lg p-6 hover:opacity-80 transition-all flex flex-col gap-4 items-end"
        >
          <div className="flex items-center gap-3">
            <p className="typo-small text-muted ">previous</p>
            <Icon name="ChevronRight" size={16} className="text-muted" />
          </div>
          <p className="typo-h4 mt-0 flex-grow">{previous?.data.title}</p>
        </a>
      ) : (
        <div className="border-secondary border-2 rounded-lg"></div>
      )}
    </div>
  )
}

export default ArticleNav
