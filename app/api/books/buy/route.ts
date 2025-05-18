import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { BookType, PaymentType, Status } from "../../enum";
import { generateTransRef } from "@/app/utils";

const buyBookSchema = z.object({
  bookId: z.string().uuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(6, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  country: z.string().min(1, "Country is required"),
  cityAndState: z.string().min(1, "City/State is required"),
  publicationType: z.nativeEnum(BookType),
  additionalInfo: z.string().optional(),
  delieveryAddress: z.string().optional(),
});

interface IBuyBookSchema extends z.infer<typeof buyBookSchema> {}

export async function POST(request: NextRequest) {
  try {
    const payload: IBuyBookSchema = await request.json();

    const validation = buyBookSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        id: payload.bookId,
      },
    });

    if (!book) {
      return sendErrorResponse(NextResponse, "Oops...Book not found", 404);
    }

    if (book.status === Status.unpublish) {
      return sendErrorResponse(
        NextResponse,
        "Oops...Book has not been published",
        404
      );
    }

    const reference = generateTransRef();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      additionalInfo,
      publicationType,
      delieveryAddress,
    } = payload;

    const payment = await prisma.payment.create({
      data: {
        amount: book.price,
        metadata: {
          firstName,
          lastName,
          email,
          phoneNumber,
          additionalInfo,
          publicationType,
          delieveryAddress,
        },
        paymentType: PaymentType.ORDER_BOOK,
        reference,
        bookId: book.id,
      },
    });

    return sendSuccessResponse(
      NextResponse,
      { ...payment },
      "Book purchase initiated successfully" // Fixed: Correct success message
    );
  } catch (error: any) {
    console.error("Error in POST /api/buy-book:", error);
    return sendErrorResponse(NextResponse, error.message, 500);
  }
}
