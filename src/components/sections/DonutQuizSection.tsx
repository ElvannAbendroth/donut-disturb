import { useState, type FC } from 'react'
import Section from '../Section'
import { H1, H2 } from '../ui/typography'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import type { CollectionEntry } from 'astro:content'

type DonutTopping = 'Glazed' | 'White Chocolate' | 'Boston Cream' | 'Maple Bacon'

type Answer = null | DonutTopping

type Option = { topping: DonutTopping; text: string }

type Question = {
  id: number
  question: string
  options: Option[]
  answer: Answer
}

type QuestionDefinition = CollectionEntry<'question'>

interface DonutQuizSectionProps {
  donuts: CollectionEntry<'donut'>[]
  questions: QuestionDefinition[]
}

const DonutQuizSection: FC<DonutQuizSectionProps> = ({ donuts, questions }) => {
  const [answers, setAnswers] = useState<Map<QuestionDefinition, DonutTopping>>(new Map())

  const answerQuestion = (question: QuestionDefinition, selectedTopping: DonutTopping) => {
    const clonedAnswers = new Map(answers)
    setAnswers(clonedAnswers.set(question, selectedTopping))
  }

  const score = Array.from(answers.values()).reduce((acc, topping) => {
    const curScoreForTopping = acc[topping] ?? 0
    return { ...acc, [topping]: curScoreForTopping + 1 }
  }, {} as { [key: string]: number })

  const topDonutName = Object.entries(score).toSorted((a, b) => b[1] - a[1])[0]?.[0]
  const topDonut = donuts.find(d => d.data.title === topDonutName)

  const hasUnansweredQuestions = answers.size < questions.length

  return (
    <>
      {/* <Section.Root type={'card'}>
        <Section.Content>
          <div>
            <ul className="grid grid-cols-4">
              {Object.entries(score).map(([name, count]) => {
                return (
                  <li key={name} className="flex flex-col gap-2 items-center">
                    <H1 className="">{count}</H1>
                    <span>{name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Section.Content>
      </Section.Root> */}

      {questions.map(question => {
        return (
          <Section.Root type={'card'} key={question.data.question} className="max-w-layout mx-auto">
            <Section.Content>
              <H2>{question.data.question}</H2>

              <RadioGroup onValueChange={value => answerQuestion(question, value as DonutTopping)}>
                {Object.entries(question.data.options).map(option => {
                  return (
                    <div key={option[0] + option[1]} className="flex items-center space-x-2">
                      <RadioGroupItem value={option[0]} id={option[1] + option[0]} />
                      <Label htmlFor={option[1] + option[0]}>{option[1]}</Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </Section.Content>
          </Section.Root>
        )
      })}
      {!hasUnansweredQuestions && (
        <Section.Root type={'card'}>
          <Section.Content>
            <H2>Your Donut Personality</H2>
            <p>{topDonut?.data.title}</p>
            <a href={`/quiz/${topDonut?.slug}`}>
              <Button>Check your donut personality</Button>
            </a>
          </Section.Content>
        </Section.Root>
      )}
    </>
  )
}

export default DonutQuizSection
