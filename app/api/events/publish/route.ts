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

const eventIdsSchema = z.object({
  eventIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
  const token = extractTokenFromRequest(request);
  const decodedToken = verifyToken(token);
  // Now you can use decodedToken.userId or other properties
  if (decodedToken.role !== "admin") {
    return sendErrorResponse(NextResponse, "Unauthorized", 401);
  }
  const payload = await request.json();

  const eventIds = payload.eventIds as string[];

  const validation = eventIdsSchema.safeParse(payload);

  if (!validation.success) {
    return sendErrorResponse(
      NextResponse,
      formatZodError(validation.error),
      400
    );
  }

  const events = await prisma.event.findMany({
    where: {
      id: {
        in: eventIds,
      },
      status: Status.unpublish,
    },
  });

  if (events.length !== eventIds.length) {
    return sendErrorResponse(
      NextResponse,
      "Oops...An event is missing or already published",
      404
    );
  }

  const publishedevents = await prisma.event.updateMany({
    where: {
      id: {
        in: eventIds,
      },
    },
    data: {
      status: Status.publish,
    },
  });

  return sendSuccessResponse(
    NextResponse,
    publishedevents,
    "Events published successfully"
  );
}
