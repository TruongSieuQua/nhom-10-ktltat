import { z } from "zod";

/// sign In
export const PostValidatorSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(100, { message: "Must be 100 or less characters long" }),
  description: z
    .string()
    .max(250, { message: "Exceeds Character Limit! Maximum 250 charaters" }),
  categories: z.string().array().default([]),
  URL: z.optional(z.string().min(2, { message: "Invalid URL" })),
  fileName: z.optional(z.string()),
});

export type PostForm = z.infer<typeof PostValidatorSchema>;
// sign up
export const CommentValidatorSchema = z.object({
  comment: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(250, { message: "Exceeds Character Limit! Maximum 250 charaters" }),
});
export type CommentForm = z.infer<typeof CommentValidatorSchema>;

export const DetectSchema = z.object({
  URL: z.optional(z.string().min(2, { message: "Invalid URL" })),
});
