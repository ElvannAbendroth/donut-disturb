import type { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Icon from './ui/icon'
import type { icons } from 'lucide-react'
import type { CollectionEntry, CollectionKey } from 'astro:content'
import type { AstroImage } from '@/utils/types'
import { H2 } from './ui/typography'

interface ProjectCardProps {
  project: CollectionEntry<'project'>
  i: number
}

const ProjectCard: FC<ProjectCardProps> = ({ project, i }) => {
  const {
    data: { image, title, description },
    slug,
  } = project
  return (
    <div className=" max-w-layout w-full hover:opacity-85 transition-all">
      <a href={`/projects/${slug}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 w-full">
        <img
          src={image?.src.src}
          alt={title}
          className={`${
            i % 2 === 0 ? 'md:order-last' : 'order-first'
          } bg-secondary rounded-lg min-h-64 aspect-video object-cover`}
        />
        <span className="flex flex-col gap-4 justify-center w-full">
          <span className={`flex flex-col gap-2  ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
            <H2>{title}</H2>
            <p>{description}</p>
            <span>Read More</span>
          </span>
        </span>
      </a>
    </div>
  )
}

export default ProjectCard
