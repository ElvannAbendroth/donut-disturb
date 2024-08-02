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

interface DonutQuizSectionProps {
  donuts: CollectionEntry<'donut'>[]
  questions: CollectionEntry<'question'>[]
}

const DonutQuizSection: FC<DonutQuizSectionProps> = ({ donuts, questions }) => {
  const quizInit: Question[] = [
    {
      id: 1,
      question: "What's your favorite color?",
      options: [
        { topping: 'Glazed', text: 'Pink' },
        { topping: 'White Chocolate', text: 'White' },
        { topping: 'Boston Cream', text: 'Brown' },
        { topping: 'Maple Bacon', text: 'Gold' },
      ],
      answer: null,
    },
    {
      id: 2,
      question: 'Where are you from?',
      options: [
        { topping: 'Glazed', text: 'Finland' },
        { topping: 'White Chocolate', text: 'Russia' },
        { topping: 'Boston Cream', text: 'USA' },
        { topping: 'Maple Bacon', text: 'Canada' },
      ],
      answer: null,
    },
  ]

  const [quiz, setQuiz] = useState(quizInit)

  const answerQuestion = (questionIndex: number, selectedTopping: DonutTopping) => {
    const updatedQuiz = quiz.map((question, index) =>
      index === questionIndex ? { ...question, answer: selectedTopping } : question
    )
    setQuiz(updatedQuiz)
  }

  const score = quiz
    .filter(question => question.answer !== null)
    .reduce((acc, curQuestion) => {
      const topping = curQuestion.answer!
      const curScoreForTopping = acc[topping] ?? 0
      return { ...acc, [topping]: curScoreForTopping + 1 }
    }, {} as { [key: string]: number })

  const topDonutName = Object.entries(score).toSorted((a, b) => b[1] - a[1])[0]?.[0]
  const topDonut = donuts.find(d => d.data.title === topDonutName)

  const hasUnansweredQuestions = quiz.some(question => question.answer === null)

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

      {quiz.map((question, questionIndex) => {
        return (
          <Section.Root type={'card'} key={question.question}>
            <Section.Content>
              <H2>{question.question}</H2>

              <RadioGroup onValueChange={value => answerQuestion(questionIndex, value as DonutTopping)}>
                {question.options.map(option => {
                  return (
                    <div key={option.text + option.topping} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.topping} id={option.text + option.topping} />
                      <Label htmlFor={option.text + option.topping}>{option.text}</Label>
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
