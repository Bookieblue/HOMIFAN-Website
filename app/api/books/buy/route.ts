import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PaymentMethod, PaymentType, Status } from "../../enum";
import { generateTransRef } from "@/app/utils";

const buyBookSchema = z.object({
  bookId: z.string().uuid(),
  customerName: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethod), // Fixed: Proper enum validation
});

interface IBuyBookSchema {
  bookId: string;
  customerName: string;
  paymentMethod: PaymentMethod; // Fixed: Removed `z.EnumLike`
}

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

    const payment = await prisma.payment.create({
      data: {
        amount: book.price,
        customer: payload.customerName,
        paymentType: PaymentType.ORDER_BOOK,
        reference,
        method: payload.paymentMethod, // Fixed: Use the validated paymentMethod
      },
    });

    return sendSuccessResponse(
      NextResponse,
      { ...payment },
      "Book purchase initiated successfully" // Fixed: Correct success message
    );
  } catch (error) {
    console.error("Error in POST /api/buy-book:", error);
    throw error;
  }
}
