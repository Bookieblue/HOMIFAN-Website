import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { extractTokenFromRequest, verifyToken } from "@/app/utils/auth";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const memberIdsSchema = z.object({
  memberIds: z.array(z.string().uuid()),
});

export const POST = async (request: NextRequest) => {
  // Extract and verify token
  const token = extractTokenFromRequest(request);
  const decodedToken = verifyToken(token);
  // Now you can use decodedToken.userId or other properties
  if (decodedToken.role !== "admin") {
    return sendErrorResponse(NextResponse, "Unauthorized", 401);
  }

  const payload = await request.json();

  const memberIds = payload.memberIds as string[];

  try {
    const validation = memberIdsSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }
    const members = await prisma.member.findMany({
      where: {
        id: {
          in: memberIds,
        },
        replied: true,
      },
    });

    if (members.length !== memberIds.length) {
      return sendErrorResponse(
        NextResponse,
        "Oops...A member is missing or already pending",
        404
      );
    }

    const pendingMembers = await prisma.member.updateMany({
      where: {
        id: {
          in: memberIds,
        },
      },
      data: {
        replied: false,
      },
    });

    return sendSuccessResponse(
      NextResponse,
      pendingMembers,
      `${pendingMembers.count > 1 ? "Members" : "Member"} pending successfully`
    );
  } catch (error) {
    throw error;
  }
};
