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
}

const DonutQuizSection: FC<DonutQuizSectionProps> = ({ donuts }) => {
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
  const scoreInit = [
    { name: 'Glazed', count: 0 },
    { name: 'White Chocolate', count: 0 },
    { name: 'Boston Cream', count: 0 },
    { name: 'Maple Bacon', count: 0 },
  ]
  const [quiz, setQuiz] = useState(quizInit)
  const [score, setScore] = useState(scoreInit)

  const answerQuestion = (questionIndex: number, selectedTopping: DonutTopping) => {
    const updatedQuiz = quiz.map((question, index) =>
      index === questionIndex ? { ...question, answer: selectedTopping } : question
    )
    setQuiz(updatedQuiz)
    updateScore(updatedQuiz)
  }

  const updateScore = (updatedQuiz: Question[]) => {
    const newScore = scoreInit.map(donut => ({
      ...donut,
      count: updatedQuiz.filter(question => question.answer === donut.name).length,
    }))
    setScore(newScore)
  }

  const calculateTotalPoints = () => {
    return score.reduce((total, donut) => (total += donut.count), 0)
  }

  const getTopDonut = () => {
    const maxScore = Math.max(...score.map(donut => donut.count))
    const topDonuts = score.filter(donut => donut.count === maxScore)

    if (topDonuts.length === 1) {
      return topDonuts[0].name
    }

    const randomIndex = Math.floor(Math.random() * topDonuts.length)
    const topDonutName = topDonuts[randomIndex].name
    return topDonutName
  }

  const getDonutEntry = () => donuts.find(donut => donut.data.title === getTopDonut())

  return (
    <>
      <Section.Root type={'card'}>
        <Section.Content>
          <div>
            <ul className="grid grid-cols-4">
              {score.map(stat => {
                return (
                  <li key={stat.name} className="flex flex-col gap-2 items-center">
                    <H1 className="">{stat.count}</H1>
                    <span>{stat.name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Section.Content>
      </Section.Root>

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
      {quiz.length === calculateTotalPoints() && (
        <Section.Root type={'card'}>
          <Section.Content>
            <H2>Your Donut Personality</H2>
            <p>{getTopDonut()}</p>
            <a href={`/quiz/${getDonutEntry()?.slug}`}>
              <Button>Check your donut personality</Button>
            </a>
          </Section.Content>
        </Section.Root>
      )}
    </>
  )
}

export default DonutQuizSection
