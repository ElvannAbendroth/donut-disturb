import { cn } from '@/utils/utils'
import React from 'react'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export const Title: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <h1 className={cn('typo-title', className)} {...props}>
      {children}
    </h1>
  )
}

export const H1: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <h1 className={cn('typo-h1', className)} {...props}>
      {children}
    </h1>
  )
}

export const H2: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <h2 className={cn('typo-h2', className)} {...props}>
      {children}
    </h2>
  )
}

export const H3: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={cn('typo-h3', className)} {...props}>
      {children}
    </h3>
  )
}

export const H4: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={cn('typo-h4', className)} {...props}>
      {children}
    </h3>
  )
}

export const P: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <p className={cn('typo-p', className)} {...props}>
      {children}
    </p>
  )
}

export const A: React.FC<TypographyProps & { href: string }> = ({ children, href, className, ...props }) => {
  return (
    <a href={href} className={cn('typo-a', className)} {...props}>
      {children}
    </a>
  )
}

export const Ul: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <ul className={cn('typo-ul', className)} {...props}>
      {children}
    </ul>
  )
}

export const Ol: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <ol className={cn('typo-ol', className)} {...props}>
      {children}
    </ol>
  )
}

export const Li: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  )
}

export const Blockquote: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <blockquote className={cn('typo-blockquote', className)} {...props}>
      {children}
    </blockquote>
  )
}

export const Table: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <table className={cn('typo-table', className)} {...props}>
      {children}
    </table>
  )
}

export const THead: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <thead className={cn(className)} {...props}>
      {children}
    </thead>
  )
}

export const TBody: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return (
    <tbody className={cn(className)} {...props}>
      {children}
    </tbody>
  )
}

export const Th: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <th className={cn('typo-th', className)}>{children}</th>
}

export const Td: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <td className={cn('typo-td', className)}>{children}</td>
}

export const Tr: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <tr className={cn('typo-tr', className)}>{children}</tr>
}

export const Lead: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <p className={cn('typo-lead', className)}>{children}</p>
}

export const Large: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <div className={cn('typo-large', className)}>{children}</div>
}

export const Small: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <small className={cn('typo-small', className)}>{children}</small>
}

export const Muted: React.FC<TypographyProps> = ({ children, className, ...props }) => {
  return <p className={cn('typo-muted', className)}>{children}</p>
}

const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  A,
  Ul,
  Ol,
  Li,
  Blockquote,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
  Lead,
  Large,
  Small,
  Muted,
}

export default Typography
