import { useState, type FC } from 'react'
import Section from '../Section'
import { H1, H2 } from '../ui/typography'
import { Button } from '../ui/button'

interface DonutQuizSectionProps {}

const DonutQuizSection: FC<DonutQuizSectionProps> = () => {
  const [donuts, setDonuts] = useState([
    { name: 'Glazed', count: 0 },
    { name: 'White Chocolate', count: 0 },
    { name: 'Boston Cream', count: 0 },
    { name: 'Maple Bacon', count: 0 },
  ])

  const incrementDonutCount = (donutName: string) => {
    setDonuts(prevDonuts =>
      prevDonuts.map(donut => (donut.name === donutName ? { ...donut, count: donut.count + 1 } : donut))
    )
  }

  return (
    <>
      <Section.Root type={'card'}>
        <Section.Content>
          <div>
            <ul className="grid grid-cols-4">
              {donuts.map(stat => {
                return (
                  <li className="flex flex-col gap-2 items-center">
                    <H1 className="">{stat.count}</H1>
                    <span>{stat.name}</span>
                    <Button variant={'accent'} onClick={() => incrementDonutCount(stat.name)}>
                      Increment
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div></div>
        </Section.Content>
      </Section.Root>
    </>
  )
}

export default DonutQuizSection
