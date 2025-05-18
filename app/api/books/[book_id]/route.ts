import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../../enum";
import { IBook, ISermon } from "@/app/interface";

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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ book_id: string }> }
) {
  const bookId = (await params).book_id;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const price = formData.get("price") as string | null;
  const bookType = formData.get("bookType") as string | null;
  const language = formData.get("language") as string | null;
  const dimension = formData.get("dimension") as string | null;
  const pages = formData.get("pages") as string | null;
  const status = formData.get("status") as Status | null;
  const authorBio = formData.get("authorBio") as string | null;
  const authorName = formData.get("authorName") as string | null;

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return sendErrorResponse(NextResponse, "Book not found!", 404);
    }

    const payload = {
      title: title || book.title,
      description: description || book.description,
      price: Number(price || book.price),
      bookType: bookType || book.bookType,
      language: language || book.language,
      dimension: dimension || book.dimension,
      pages: Number(pages || book.pages),
      authorName: authorName || book.authorName,
      authorBio: authorBio || book.authorBio,
    };

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: payload as any,
    });

    return sendSuccessResponse(
      NextResponse,
      updatedBook,
      "Book updated successfully"
    );
  } catch (error: any) {
    return sendErrorResponse(NextResponse, error.message, 500);
  }
}
