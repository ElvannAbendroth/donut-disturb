import { cn } from '@/utils/utils'
import type { FC } from 'react'

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'card'
}

const Root: FC<RootProps> = ({ className, type, children }) => {
  return (
    <section className={cn(`w-full  ${type === 'card' && 'py-12 px-8 rounded-3xl bg-secondary'}`, className)}>
      {children}
    </section>
  )
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Content: FC<ContentProps> = ({ className, children }) => {
  return <div className={cn('mx-auto', className)}>{children}</div>
}

const Section = { Root, Content }

export default Section
