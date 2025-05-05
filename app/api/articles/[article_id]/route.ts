import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../../enum";
import { uploadFile } from "@/app/utils/file";
import { articleSchema, idSchema } from "@/app/validators";

// GET: Fetch article by ID
export const GET = withErrorHandler(
  async (
    _req: Request,
    { params }: { params: Promise<{ article_id: string }> }
  ) => {
    const articleId = (await params).article_id;

    // Validate article ID
    const idValidation = idSchema.safeParse(articleId);
    if (!idValidation.success) {
      throw new ApiError("Invalid article ID format", 400);
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new ApiError("Article not found", 404);
    }

    return sendSuccessResponse(
      NextResponse,
      article,
      "Article retrieved successfully"
    );
  }
);

// PUT: Update article by ID
export const PUT = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ article_id: string }> }
  ) => {
    const articleId = (await params).article_id;

    // Validate article ID
    const idValidation = idSchema.safeParse(articleId);
    if (!idValidation.success) {
      throw new ApiError("Invalid article ID format", 400);
    }

    const formData = await req.formData();

    // Extract and sanitize form data
    const title = formData.get("title")
      ? String(formData.get("title")).trim()
      : null;
    const content = formData.get("content")
      ? String(formData.get("content")).trim()
      : null;
    const author = formData.get("author")
      ? String(formData.get("author")).trim()
      : null;
    const status = formData.get("status") as Status | null;
    const language = formData.get("language")
      ? String(formData.get("language")).trim()
      : null;
    const file = formData.get("articleImage") as File | null;

    // Find the article
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new ApiError("Article not found", 404);
    }

    // Prepare update payload
    const payload: Partial<IArticle> = {
      title: title || article.title,
      content: content || article.content,
      author: author || article.author,
      status: status || (article.status as Status),
      imageUrl: article.imageUrl,
      language: language || article.language,
    };

    // Validate the updated payload
    const validation = articleSchema.safeParse(payload);
    if (!validation.success) {
      throw new ApiError(JSON.stringify(validation.error.format()), 400);
    }

    // Upload new image if provided
    if (file && file instanceof Blob) {
      const result = await uploadFile(file, "articles");
      payload.imageUrl = result.secure_url as string;
    }

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: { ...payload },
    });

    return sendSuccessResponse(
      NextResponse,
      updatedArticle,
      "Article updated successfully"
    );
  }
);

// DELETE: Delete article by ID
export const DELETE = withErrorHandler(
  async (
    _req: Request,
    { params }: { params: Promise<{ article_id: string }> }
  ) => {
    const articleId = (await params).article_id;

    // Validate article ID
    const idValidation = idSchema.safeParse(articleId);
    if (!idValidation.success) {
      throw new ApiError("Invalid article ID format", 400);
    }

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new ApiError("Article not found", 404);
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: articleId },
    });

    return sendSuccessResponse(
      NextResponse,
      null,
      "Article deleted successfully"
    );
  }
);
