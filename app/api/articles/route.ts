import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { articleSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";
import { uploadFile } from "@/app/utils/file";

// GET: Fetch all articles
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number((searchParams.get("page") as string) || 1);
        const limit = Number((searchParams.get("limit") as string) || 20);
        const search = searchParams.get("search") as string;

        const result = await paginateQuery({
            where: search
                ? {
                      OR: [
                          {
                              title: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                          {
                              content: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                          {
                              author: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                      ],
                  }
                : {},
            model: prisma.article,
            options: { page, limit },
        });

        const { data, ...metadata } = result;
        const articles = data;

        return sendSuccessResponse(
            NextResponse,
            { articles, ...metadata },
            "Articles retrieved successfully"
        );
    } catch (error: any) {
        console.error("Error fetching articles:", error);
        throw error;
    }
}

// POST: Create a new article
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const author = formData.get("author") as string;
        const status = formData.get("status") as Status;

        const payload: Partial<IArticle> = {
            title,
            content,
            author,
            status,
        };

        // Validate payload with Zod schema
        const validation = articleSchema.safeParse(payload);
        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }

        // Check for existing article with the same title, content, and author
        const existingArticle = await prisma.article.findFirst({
            where: { title, content, author },
        });

        if (existingArticle) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Article already exists",
                409
            );
        }

        const file = formData.get("articleImage") as File | null;
        if (!file || !(file instanceof Blob)) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Article image is required",
                409
            );
        }

        const result = await uploadFile(file, "articles");

        payload.imageUrl = result.secure_url as string;

        // Create a new article
        const newArticle = await prisma.article.create({
            data: payload as any,
        });

        return sendSuccessResponse(
            NextResponse,
            newArticle,
            "Article created successfully",
            201
        );
    } catch (error: any) {
        console.error("Error creating article:", error);
        throw error;
    }
}
