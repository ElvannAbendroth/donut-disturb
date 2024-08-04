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
      {questions.map((question, i) => {
        return (
          <Section.Root type={'card'} key={question.data.question} className="max-w-layout mx-auto">
            <Section.Content className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="uppercase text-secondary font-black text-lg">Question #{i + 1}</p>
                <H2 className="mt-0">{question.data.question}</H2>
              </div>

              <RadioGroup onValueChange={value => answerQuestion(question, value as DonutTopping)}>
                {Object.entries(question.data.options).map(option => {
                  return (
                    <div key={option[0] + option[1]} className="flex items-center space-x-2">
                      <RadioGroupItem className="text-base" value={option[0]} id={option[1] + option[0]} />
                      <Label className="text-base" htmlFor={option[1] + option[0]}>
                        {option[1]}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </Section.Content>
          </Section.Root>
        )
      })}

      <Section.Root type={'card'} className="max-w-layout mx-auto">
        <Section.Content className="flex flex-col gap-4">
          <H2>Your Donut Personality</H2>
          <p>Once you are done answering all the questions, you can check your donut personality here!</p>

          <a
            className={hasUnansweredQuestions ? 'cursor-not-allowed' : ''}
            href={!hasUnansweredQuestions ? `/quiz/${topDonut?.slug}` : undefined}
          >
            <Button disabled={hasUnansweredQuestions} size={'lg'}>
              Check your Donut personality
            </Button>
          </a>
        </Section.Content>
      </Section.Root>
    </>
  )
}

export default DonutQuizSection
