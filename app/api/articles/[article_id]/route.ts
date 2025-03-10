import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../../enum";
import { uploadFile } from "@/app/utils/file";

// GET: Fetch all article by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ article_id: string }> }
) {
  const articleId = (await params).article_id;
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return sendErrorResponse(NextResponse, "Oops...Article not found", 404);
    }
    return sendSuccessResponse(
      NextResponse,
      article,
      "Article retrieved successfully"
    );
  } catch (error: any) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ article_id: string }> }
) => {
  const articleId = (await params).article_id;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const author = formData.get("author") as string | null;
  const status = formData.get("status") as Status | null;
  const language = formData.get("language") as string | null;
  const file = formData.get("articleImage") as File | null;

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return sendErrorResponse(NextResponse, "Oops...Article not found", 404);
    }

    const payload: Partial<IArticle> = {
      title: title || article.title,
      content: content || article.content,
      author: author || article.author,
      status: status || (article.status as Status),
      imageUrl: article.imageUrl,
      language: language || article.language,
    };

    if (file) {
      const result = await uploadFile(file, "articles");
      payload.imageUrl = result.secure_url as string;
    }

    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: { ...payload },
    });

    return sendSuccessResponse(
      NextResponse,
      updatedArticle,
      "Article updated successfully"
    );
  } catch (error: any) {
    console.error("Error fetching article:", error);
    throw error;
  }
};
