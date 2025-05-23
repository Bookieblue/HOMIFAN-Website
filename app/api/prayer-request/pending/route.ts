import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const prayerRequestIdsSchema = z.object({
    prayerRequestIds: z.array(z.string().uuid()),
});

export const POST = async (request: Request) => {
    const payload = await request.json();

    const prayerRequestIds = payload.prayerRequestIds as string[];

    try {
        const validation = prayerRequestIdsSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }
        console.log({ prayerRequestIds });
        const prayerRequests = await prisma.prayerRequest.findMany({
            where: {
                id: {
                    in: prayerRequestIds,
                },
                replied: true,
            },
        });

        if (prayerRequests.length !== prayerRequestIds.length) {
            return sendErrorResponse(
                NextResponse,
                "Oops...An request is missing or already unreplied",
                404
            );
        }

        const repliedprayerRequests = await prisma.prayerRequest.updateMany({
            where: {
                id: {
                    in: prayerRequestIds,
                },
            },
            data: {
                replied: false,
            },
        });

        return sendSuccessResponse(
            NextResponse,
            repliedprayerRequests,
            `${
                repliedprayerRequests.count > 1
                    ? "PrayerRequests"
                    : "PrayerRequest"
            } unreplied successfully`
        );
    } catch (error) {
        throw error;
    }
};
