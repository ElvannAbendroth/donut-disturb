import type { FC } from 'react'
import Section from '../Section'
import { H2 } from '../ui/typography'
import { Button } from '../ui/button'
import type { CollectionEntry } from 'astro:content'
import Prose from '../Prose'
import { icons } from 'lucide-react'

interface ImageAndTextProps extends React.HTMLAttributes<HTMLDivElement> {
  block: CollectionEntry<'block'>
  order?: 'default' | 'reverse'
}

const ImageAndText: FC<ImageAndTextProps> = ({ block, children, order = 'default' }) => {
  const {
    data: { title, primaryCta, secondaryCta },
  } = block

  return (
    <Section.Root>
      <Section.Content className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-layout">
        <img
          src={block.data.image?.src.src}
          alt={title}
          className={`h-full rounded-lg object-cover  ${order === 'default' ? 'order-first' : 'order-last'}`}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {title && <H2>{title}</H2>}
            <Prose size={'md'}>{children}</Prose>
          </div>

          <div className="flex gap-6">
            {primaryCta && primaryCta?.icon in icons && (
              <a href={primaryCta.href}>
                <Button icon={primaryCta?.icon as keyof typeof icons}>{primaryCta.label}</Button>
              </a>
            )}
            {secondaryCta && secondaryCta?.icon in icons && (
              <a href={secondaryCta.href}>
                <Button icon={secondaryCta.icon as keyof typeof icons} variant={'secondary'}>
                  {secondaryCta.label}
                </Button>
              </a>
            )}
          </div>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default ImageAndText
