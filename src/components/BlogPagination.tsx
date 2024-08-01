import type { FC } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface BlogPaginationProps {
  lastPage: number
  prev?: string
  next?: string
  currentPage: number
}

const BlogPagination: FC<BlogPaginationProps> = ({ lastPage, next, prev, currentPage }) => {
  const sizeArray = Array.from({ length: lastPage }, (_, i) => i + 1)
  if (lastPage > 1)
    return (
      <Pagination>
        <PaginationContent>
          {prev && (
            <PaginationItem>
              <PaginationPrevious href={prev} />
            </PaginationItem>
          )}
          {sizeArray.map(page => {
            if (page === 1)
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={`/blog/`} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            else
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={`/blog/${page}`} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
          })}
          {next && (
            <PaginationItem>
              <PaginationNext href={next} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
}

export default BlogPagination
