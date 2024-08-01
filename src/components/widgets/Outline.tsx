import type { FC } from 'react'
import Icon from '../ui/icon'
import type { Heading } from '@/utils/types'

interface OutlineProps {
  headings: Heading[]
}

const Outline: FC<OutlineProps> = ({ headings }) => {
  if (headings.length === 0) return null
  return (
    <div className="bg-secondary rounded-xl p-6 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Icon name="MenuSquare" size={21} />
        <h3 className="typo-h4 mt-0 font-display font-extrabold">Outline</h3>
      </div>
      <ul className="flex flex-col gap-1">
        {headings.map(heading => {
          if (heading.level === 'h2')
            return (
              <li className="">
                <a href={heading.id} className="text-sm hover:underline hover:text-accent leading-[10%]">
                  {heading.label}
                </a>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Outline
