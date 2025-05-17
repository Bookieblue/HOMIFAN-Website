import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Status } from "../../enum";
import { extractTokenFromRequest, verifyToken } from "@/app/utils/auth";

const sermonIdsSchema = z.object({
  sermonIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
  const token = extractTokenFromRequest(request);
  const decodedToken = verifyToken(token);
  // Now you can use decodedToken.userId or other properties
  if (decodedToken.role !== "admin") {
    return sendErrorResponse(NextResponse, "Unauthorized", 401);
  }
  const payload = await request.json();

  const sermonIds = payload.sermonIds as string[];

  const validation = sermonIdsSchema.safeParse(payload);

  if (!validation.success) {
    return sendErrorResponse(
      NextResponse,
      formatZodError(validation.error),
      400
    );
  }

  const sermons = await prisma.sermon.findMany({
    where: {
      id: {
        in: sermonIds,
      },
      status: Status.publish,
    },
  });

  if (sermons.length !== sermonIds.length) {
    return sendErrorResponse(
      NextResponse,
      "Oops...An sermon is missing or already unpublished",
      404
    );
  }

  const unpublishedSermons = await prisma.sermon.updateMany({
    where: {
      id: {
        in: sermonIds,
      },
    },
    data: {
      status: Status.unpublish,
    },
  });

  return sendSuccessResponse(
    NextResponse,
    unpublishedSermons,
    "Sermons unpublished successfully"
  );
}
