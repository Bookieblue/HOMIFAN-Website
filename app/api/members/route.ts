import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IMember } from "../../interface";
import { memberSchema } from "@/app/validators";
import { formatZodError } from "@/app/utils/formatter";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";

export async function POST(req: NextRequest) {
  const payload: IMember = await req.json();
  const { email } = payload;
  try {
    const validation = memberSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const member = await prisma.member.findUnique({ where: { email } });

    if (member) {
      return sendErrorResponse(
        NextResponse,
        "Oops...Email is already registered",
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

export async function GET() {
  try {
    const members = await prisma.member.findMany();
    return sendSuccessResponse(
      NextResponse,
      members,
      "Members retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}
