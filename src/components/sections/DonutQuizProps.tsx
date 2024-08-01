import type { FC } from 'react'
import Section from '../Section'
import { H2 } from '../ui/typography'

interface DonutQuizSectionProps {}

const DonutQuizSection: FC<DonutQuizSectionProps> = () => {
  return (
    <Section.Root>
      <Section.Content>
        <div>
          <H2>Donut counter:</H2>
          <ul className="grid grid-cols-5">
            <li>
              Glazed:<H2>3</H2>
            </li>
            <li>
              White Chocolate: <H2>3</H2>
            </li>
            <li>
              Boston Cream: <H2>3</H2>
            </li>
            <li>
              Maple Bacon: <H2>3</H2>
            </li>
            <li>
              Jelly-Filled: <H2>3</H2>
            </li>
          </ul>
        </div>
        <div></div>
      </Section.Content>
    </Section.Root>
  )
}

export default DonutQuizSection
