import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const memberIdSchema = z.string().uuid();

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ member: string }> }
) => {
  const memberId = (await params).member;

  try {
    const validation = memberIdSchema.safeParse(memberId);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return sendErrorResponse(NextResponse, "Oops...Member not found!", 404);
    }

    return sendSuccessResponse(
      NextResponse,
      member,
      "Member retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving member:", error);

    throw error;
  }
};
