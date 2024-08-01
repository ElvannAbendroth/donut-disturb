import type { CollectionEntry } from 'astro:content'
import type { FC } from 'react'

interface PostCardProps {
  post: CollectionEntry<'blog'>
  i: number
}

const PostCard: FC<PostCardProps> = ({ post, i }) => {
  return (
    <li>
      <a
        href={`/blog/${post.slug}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-layout w-full items-center hover:opacity-90 transition-all"
      >
        <img
          src={post.data.image.src.src}
          alt={post.data.image.alt}
          sizes="(max-width: 400px) 100vw, 400px"
          loading={i <= 2 ? 'eager' : 'lazy'}
          decoding={i <= 2 ? 'sync' : 'async'}
          className="w-full rounded-md"
        />
        {/* <div className={`bg-secondary rounded-lg w-full aspect-video`} /> */}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <span className="text-accent font-bold uppercase text-sm">{post.data.category}</span>
            <h2 className="typo-h3 mt-0">{post.data.title}</h2>
            <div className="flex items-center gap-2">
              <time className="text-gray-400 text-sm" dateTime={post.data.publishDate.toISOString()}>
                {post.data.publishDate.toDateString()}
              </time>
              <span className="text-muted text-sm">• </span>
              <span className="text-muted text-sm">{post.data.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
}

export default PostCard
