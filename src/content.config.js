import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/blog",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        created: z.coerce.date(),
        modified: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        slug: z.string(),
        tags: z.string().optional(),
    }),
});

export const collections = { blog };
