import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { extractTokenFromRequest, verifyToken } from "@/app/utils/auth";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookIdsSchema = z.object({
  bookIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const token = extractTokenFromRequest(request);
    const decodedToken = verifyToken(token);
    // Now you can use decodedToken.userId or other properties
    if (decodedToken.role !== "admin") {
      return sendErrorResponse(NextResponse, "Unauthorized", 401);
    }

    const payload = await request.json();

    const bookIds = payload.bookIds as string[];

    const validation = bookIdsSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    if (!books.length) {
      return sendErrorResponse(
        NextResponse,
        "Oops...Books are already deleted",
        404
      );
    }

    const deletedBooks = await prisma.book.deleteMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    return sendSuccessResponse(
      NextResponse,
      deletedBooks,
      "Books deleted successfully"
    );
  } catch (error: any) {
    return sendErrorResponse(NextResponse, error.message, 500);
  }
}
