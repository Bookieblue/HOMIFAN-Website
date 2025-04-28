import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { paginateQuery } from "@/app/utils/paginate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const text = searchParams.get("search") || "";
  try {
    const result = await paginateQuery({
      where: text
        ? {
            OR: [
              {
                reference: {
                  contains: text,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      model: prisma.payment,
      options: {
        page,
        limit,
      },
    });
    const { data: payments, ...metadata } = result;
    return sendSuccessResponse(
      NextResponse,
      { payments, ...metadata },
      "Payments retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}
