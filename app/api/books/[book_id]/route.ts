import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextResponse } from "next/server";

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

        return sendSuccessResponse(
            NextResponse,
            book,
            "Book retrieved successfully"
        );
    } catch (error) {
        throw error;
    }
}
