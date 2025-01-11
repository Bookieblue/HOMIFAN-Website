import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { NextResponse } from "next/server";

// GET: Fetch all articles
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ article_id: string }> }
) {
  const articleId = (await params).article_id;
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
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
