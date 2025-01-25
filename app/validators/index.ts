import { z } from "zod";
import { Status } from "../api/enum";
import { IBook } from "../interface";

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

export const eventSchema = z.object({});
