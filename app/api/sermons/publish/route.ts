import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Status } from "../../enum";

const sermonIdsSchema = z.object({
  sermonIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
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
      status: Status.unpublish,
    },
  });

  if (sermons.length !== sermonIds.length) {
    return sendErrorResponse(
      NextResponse,
      "Oops...An sermon is missing or already published",
      404
    );
  }

  const publishedSermons = await prisma.sermon.updateMany({
    where: {
      id: {
        in: sermonIds,
      },
    },
    data: {
      status: Status.publish,
      publishedDate: new Date(),
    },
  });

  return sendSuccessResponse(
    NextResponse,
    publishedSermons,
    "Sermons published successfully"
  );
}
