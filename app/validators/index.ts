import { z } from "zod";
import { BookType, PaymentMethod, Status } from "../api/enum";

// Common validation patterns
const phoneRegex = /^\+\d{1,3}\d{10}$/; // International format: +[country code][number]
const nameRegex = /^[a-zA-Z\s'-]{2,50}$/; // Letters, spaces, hyphens, apostrophes, 2-50 chars

// Common field validators
const nameValidator = (fieldName: string) =>
  z
    .string()
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(50, `${fieldName} must be at most 50 characters`)
    .regex(nameRegex, `${fieldName} contains invalid characters`);

const phoneValidator = z
  .string()
  .regex(
    phoneRegex,
    "Phone number must be in international format (e.g., +234XXXXXXXXXX)"
  );

// Base schema for common fields
const personBaseSchema = z.object({
  firstName: nameValidator("First name"),
  lastName: nameValidator("Last name"),
  email: z.string().email("Invalid email format"),
  phoneNumber: phoneValidator,
  country: z.string().min(2, "Country must be at least 2 characters"),
  cityAndState: z.string().min(2, "City & State must be at least 2 characters"),
});

export const memberSchema = personBaseSchema.extend({
  areaOfInterest: z
    .string()
    .min(2, "Area of interest must be at least 2 characters"),
  methodOfContact: z
    .string()
    .min(2, "Method of contact must be at least 2 characters"),
});

export const articleSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  author: nameValidator("Author name"),
  status: z.enum([Status.publish, Status.unpublish]),
  language: z.string().min(2, "Language must be at least 2 characters"),
});

export const bookSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().positive("Price must be a positive number"),
  status: z.enum([Status.publish, Status.unpublish]),
  bookType: z.string().min(2, "Book type must be at least 2 characters"),
  pages: z
    .number()
    .int("Pages must be an integer")
    .positive("Pages must be a positive number"),
  dimension: z.string().min(2, "Dimension must be at least 2 characters"),
  language: z.string().min(2, "Language must be at least 2 characters"),
  authorName: nameValidator("Author name"),
  authorBio: z.string().min(10, "Author bio must be at least 10 characters"),
});

export const eventSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  date: z.string().datetime("Invalid date format"),
  time: z.string().time("Invalid time format"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  meetingLink: z.string().url("Meeting link must be a valid URL"),
  status: z.enum([Status.unpublish, Status.publish]),
});

export const prayerRequestSchema = personBaseSchema.extend({
  methodOfContact: z
    .string()
    .min(2, "Method of contact must be at least 2 characters"),
  prayerRequest: z
    .string()
    .min(10, "Prayer request must be at least 10 characters"),
});

export const contactUsSchema = personBaseSchema.extend({
  methodOfContact: z
    .string()
    .min(2, "Method of contact must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const eventRegistrationSchema = personBaseSchema.extend({
  methodOfContact: z
    .string()
    .min(2, "Method of contact must be at least 2 characters"),
  eventId: z.string().uuid("Invalid event ID format"),
});

export const donationSchema = personBaseSchema.extend({
  donationType: z
    .string()
    .min(2, "Donation type must be at least 2 characters"),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .gt(100, "Amount must be greater than 100 Naira"),
});

export const sermonSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  preacher: nameValidator("Preacher name"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  link: z.string().url("Link must be a valid URL"),
  status: z.enum([Status.unpublish, Status.publish]),
});

// Schema for validating IDs
export const idSchema = z.string().uuid("Invalid ID format");

// Address schema for delivery
const addressSchema = z
  .object({
    street: z.string().min(3, "Street address must be at least 3 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
  })
  .optional();

// Schema for book purchase
export const buyBookSchema = personBaseSchema.extend({
  bookId: z.string().uuid("Invalid book ID format"),
  publicationType: z.enum([BookType.EBOOK, BookType.PRINT], {
    errorMap: () => ({
      message: "Publication type must be either EBook or Print",
    }),
  }),
  additionalInfo: z.string().optional(),
  // Optional delivery address - only required for print books
  deliveryAddress: z.union([addressSchema, z.literal(""), z.null()]).optional(),
  // Flag to indicate if delivery address is same as customer address
  useCustomerAddress: z.boolean().optional(),
});
