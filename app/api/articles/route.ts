import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import { formatZodError } from "@/app/utils/formatter";
import { articleSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(
      { message: "Articles retrieved successfully", data: articles },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { message: "Failed to fetch articles", error: error.message || error },
      { status: 500 }
    );
  }
}

// POST: Create a new article
export async function POST(request: NextRequest) {
  try {
    const payload: IArticle = await request.json();

    // Validate payload with Zod schema
    const validation = articleSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: formatZodError(validation.error),
        },
        { status: 400 }
      );
    }

    const { title, content, author } = payload;

    // Check for existing article with the same title, content, and author
    const existingArticle = await prisma.article.findFirst({
      where: { title, content, author },
    });

    if (existingArticle) {
      return NextResponse.json(
        { message: "Article already exists" },
        { status: 400 }
      );
    }

    // Create a new article
    const newArticle = await prisma.article.create({ data: payload });

    return NextResponse.json(
      {
        message: "Article created successfully",
        data: newArticle,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { message: "Failed to create article", error: error.message || error },
      { status: 500 }
    );
  }
}
