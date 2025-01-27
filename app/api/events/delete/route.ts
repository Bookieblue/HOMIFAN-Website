import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const eventIdsSchema = z.object({
    eventIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
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
        },
    });

    if (!events.length) {
        return sendErrorResponse(
            NextResponse,
            "Oops...Events are already deleted",
            404
        );
    }

    const deletedEvents = await prisma.event.deleteMany({
        where: {
            id: {
                in: eventIds,
            },
        },
    });

    return sendSuccessResponse(
        NextResponse,
        deletedEvents,
        "Events deleted successfully"
    );
}
