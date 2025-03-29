import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IMember } from "../../interface";
import { memberSchema } from "@/app/validators";
import { formatZodError } from "@/app/utils/formatter";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { paginateQuery } from "@/app/utils/paginate";

export async function POST(req: NextRequest) {
  const payload: IMember = await req.json();
  const { email, phoneNumber } = payload;
  try {
    const validation = memberSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const member = await prisma.member.findFirst({
      where: { OR: [{ email }, { phoneNumber }] },
    });

    if (member) {
      return sendErrorResponse(
        NextResponse,
        "Oops...Email or phone number alredy registered",
        409
      );
    }
    const newMenmber = await prisma.member.create({
      data: payload,
    });
    return sendSuccessResponse(
      NextResponse,
      newMenmber,
      "New member join successfully",
      201
    );
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const search = searchParams.get("search") || "";

    const result = await paginateQuery({
      where: search
        ? {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      model: prisma.member,
      options: { page, limit },
    });
    const { data: members, ...metadata } = result;
    return sendSuccessResponse(
      NextResponse,
      { members, ...metadata },
      "Members retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}
