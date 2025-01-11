import { IArticle } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { articleSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json(
      {
        message: "Articles retrieved successfully",
        data: { articles, ...metadata },
      },
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
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;

    const payload: IArticle = {
      title,
      content,
      author,
    };

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

    // Check for existing article with the same title, content, and author
    const existingArticle = await prisma.article.findFirst({
      where: { title, content, author },
    });

    if (existingArticle) {
      return NextResponse.json(
        { message: "Article already exists" },
        { status: 409 }
      );
    }

    const files = formData.get("articleImage") as File[] | null;
    if ((files && !files[0]) || (files && !(files[0] instanceof Blob))) {
      return NextResponse.json(
        { message: "File is required" },
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
