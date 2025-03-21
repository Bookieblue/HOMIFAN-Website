import { z } from "zod";
import { Status } from "../api/enum";

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
  author: z.string(),
  status: z.enum([Status.publish, Status.unpublish]),
  language: z.string(),
});

export const bookSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  status: z.enum([Status.publish, Status.unpublish]),
  bookType: z.string(),
  pages: z.number(),
  dimension: z.string(),
  language: z.string(),
  authorName: z.string(),
  authorBio: z.string(),
});

export const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  time: z.string().time(),
  location: z.string(),
  meetingLink: z.string(),
  status: z.enum([Status.unpublish, Status.publish]),
});

export const prayerRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  cityAndState: z.string(),
  methodOfContact: z.string(),
  prayerRequest: z.string(),
});

export const contactUsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  cityAndState: z.string(),
  methodOfContact: z.string(),
  message: z.string(),
});

export const eventRegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  cityAndState: z.string(),
  methodOfContact: z.string(),
  eventId: z.string().uuid(),
});

export const donationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  country: z.string(),
  cityAndState: z.string(),
  email: z.string().email(),
  donationType: z.string(),
  amount: z.number().gt(100, "Oops...Amount must be greater than 100 Naira"),
});

export const sermonSchema = z.object({
  title: z.string(),
  preacher: z.string(),
  description: z.string(),
  link: z.string().url(),
  status: z.enum([Status.unpublish, Status.publish]),
});
