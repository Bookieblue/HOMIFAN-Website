import { IBook } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { uploadFile } from "@/app/utils/file";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { bookSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const bookType = formData.get("bookType") as string;
        const language = formData.get("language") as string;
        const dimension = formData.get("dimension") as string;
        const pages = formData.get("pages") as string;
        const status = formData.get("status") as Status;
        const authorBio = formData.get("authorBio") as Status;
        const authorName = formData.get("authorName") as Status;

        const payload: Partial<IBook> = {
            title,
            description,
            price: Number(price),
            bookType,
            language,
            dimension,
            pages: Number(pages),
            status,
            authorName,
            authorBio,
        };

        const validation = bookSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }

        const pub = await prisma.book.findFirst({
            where: { title, description },
        });

        if (pub) {
            return sendErrorResponse(
                NextResponse,
                "Publication already exists",
                409
            );
        }
        const coverImage = formData.get("coverImage") as File | null;
        const authorImage = formData.get("authorImage") as File | null;

        if (!coverImage || !(coverImage instanceof Blob)) {
            return sendErrorResponse(
                NextResponse,
                "coverImage field is required",
                400
            );
        }

        if (authorImage) {
            const result = await uploadFile(authorImage, "authors");
            payload.authorImage = result.secure_url;
        }

        const result = await uploadFile(coverImage, "books");

        payload.coverImage = result.secure_url;

        const newPub = await prisma.book.create({
            data: payload as any,
        });

        return sendSuccessResponse(
            NextResponse,
            newPub,
            "Book added successfully",
            201
        );
    } catch (error) {
        throw error;
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number((searchParams.get("page") as string) || 1);
        const limit = Number((searchParams.get("limit") as string) || 20);
        const text = searchParams.get("search") as string;

        const result = await paginateQuery({
            where: text
                ? {
                      OR: [
                          {
                              title: {
                                  contains: text,
                              },
                          },
                          {
                              description: {
                                  contains: text,
                              },
                          },
                      ],
                  }
                : {},
            model: prisma.book,
            options: {
                page,
                limit,
            },
        });
        const { data: books, ...metadata } = result;
        return sendSuccessResponse(
            NextResponse,
            { books, ...metadata },
            "Books retrieved successfully"
        );
    } catch (error) {
        throw error;
    }
}
