import prisma from "@/app/lib/prisma";
import { generateTransRef } from "@/app/utils";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ book_id: string }> }
) {
  const bookId = (await params).book_id;

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return sendErrorResponse(NextResponse, "Book not found!", 404);
    }

    if (book.status == "unpublish") {
      return sendErrorResponse(
        NextResponse,
        "This book is not published yet!",
        403
      );
    }
    const trxRef = generateTransRef();

    return sendSuccessResponse(
      NextResponse,
      book,
      "Book retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}
