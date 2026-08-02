import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.enum([
      'programming',
      'finance',
      'mathematics',
      'trading',
      'learning',
      'career',
      'essay'
    ]),
    kind: z.enum(['note', 'tutorial', 'review', 'essay', 'report', 'field-note']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    visibility: z.enum(['private', 'unlisted', 'public']).default('private'),
    recommended: z.boolean().default(false)
  })
});

export const collections = { writing };
