import { cn } from '@/utils/utils'

interface ProseProps extends React.HtmlHTMLAttributes<HTMLElement> {
  size?: 'md' | 'lg'
}

export const Prose: React.FC<ProseProps> = ({ className, children, size = 'lg', ...props }) => {
  return (
    <div
      className={cn(
        `prose prose-headings:text-foreground prose-p:text-foreground prose-slate prose-img:rounded-md max-w-content mx-auto w-full prose-a:text-accent hover:prose-a:text-accent/80 ${
          size === 'lg' ? 'prose-lg' : 'prose-md'
        }`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Prose
