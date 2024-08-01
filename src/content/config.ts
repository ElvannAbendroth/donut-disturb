// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content'

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      title: z.string(),
      snippet: z.string().max(200),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      publishDate: z.string().transform(str => new Date(str)),
      author: reference('team'),
      category: z.string(),
      tags: z.array(z.string()),
    }),
})

const pageCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      draft: z.boolean(),
    }),
})

const projectCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      publishDate: z.string().transform(str => new Date(str)),
      title: z.string(),
      description: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
    }),
})

const featureCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
})

const teamCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string().max(72),
      role: z.string().max(72),
      bio: z.string().optional(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
    }),
})

const blockCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      image: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      primaryCta: z
        .object({
          label: z.string(),
          icon: z.string(),
          href: z.string(),
        })
        .optional(),
      secondaryCta: z
        .object({
          label: z.string(),
          icon: z.string(),
          href: z.string(),
        })
        .optional(),
    }),
})

const testimonialCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      message: z.string(),
      author: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
    }),
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
  page: pageCollection,
  team: teamCollection,
  project: projectCollection,
  block: blockCollection,
  feature: featureCollection,
  testimonial: testimonialCollection,
}
