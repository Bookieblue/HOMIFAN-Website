import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";
import { paginateQuery } from "@/app/utils/paginate";
import { articleSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";
import { uploadFile } from "@/app/utils/file";

// GET: Fetch all articles
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const search = searchParams.get("search") || "";

  // Validate pagination parameters
  if (page < 1 || limit < 1 || limit > 100) {
    throw new ApiError("Invalid pagination parameters", 400);
  }

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
});

// POST: Create a new article
export const POST = withErrorHandler(async (request: NextRequest) => {
  const formData = await request.formData();

  // Extract and sanitize form data
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const author = String(formData.get("author") || "").trim();
  const status = formData.get("status") as Status;
  const language = String(formData.get("language") || "").trim();
  const file = formData.get("articleImage") as File | null;

  // Validate file
  if (!file || !(file instanceof Blob)) {
    throw new ApiError("Article image is required", 400);
  }

  const payload: Partial<IArticle> = {
    title,
    content,
    author,
    status,
    imageUrl: "",
    language,
  };

  // Validate payload with Zod schema
  const validation = articleSchema.safeParse(payload);
  if (!validation.success) {
    throw new ApiError(JSON.stringify(validation.error.format()), 400);
  }

  // Check for existing article with the same title, content, and author
  const existingArticle = await prisma.article.findFirst({
    where: { title, content, author },
  });

  if (existingArticle) {
    throw new ApiError(
      "Article with the same title, content, and author already exists",
      409
    );
  }

  // Upload the image
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
});
