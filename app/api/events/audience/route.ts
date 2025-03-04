import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { paginateQuery } from "@/app/utils/paginate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number((searchParams.get("page") as string) || 1);
  const limit = Number((searchParams.get("limit") as string) || 20);
  const text = searchParams.get("search") as string;
  try {
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
      model: prisma.eventForm,
      options: {
        page,
        limit,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const { data: events, ...metadata } = result;
    return sendSuccessResponse(
      NextResponse,
      { events, ...metadata },
      "Event audience retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}
