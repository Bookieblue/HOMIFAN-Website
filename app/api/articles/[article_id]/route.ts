import prisma from "@/app/lib/prisma";
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
    return NextResponse.json(
      { message: "Article retrieved successfully", data: article },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { message: "Failed to fetch article", error: error.message || error },
      { status: 500 }
    );
  }
}
