import { z } from 'zod';

// Zod
export const labelSchema = z.object({
  id: z.string(),
  idBoard: z.string(),
  name: z.string(),
  color: z.string(),
});
export const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
  labels: z.array(labelSchema).optional(),
  shortUrl: z.string(),
  desc: z.string(),
});
export const listSchema = z.object({
  id: z.string(),
  name: z.string(),
  cards: z.array(cardSchema).optional(),
});
export const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortUrl: z.string().url(),
  lists: z.array(listSchema).optional(),
});

export type Fields = string[];
export type Board = z.infer<typeof boardSchema>;
export type List = z.infer<typeof listSchema>;

export type Card = z.infer<typeof cardSchema>;
export type Label = z.infer<typeof labelSchema>;
