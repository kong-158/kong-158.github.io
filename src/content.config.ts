import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.enum(['programming', 'ai-systems', 'finance', 'mathematics', 'trading', 'career']),
    kind: z.enum(['note', 'tutorial', 'project-log', 'review', 'essay', 'field-note']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { writing };
