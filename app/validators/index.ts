import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  cityAndState: z.string(),
  areaOfInterest: z.string(),
  methodOfContact: z.string(),
});

export const articleSchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string()).optional(),
  author: z.string(),
});
