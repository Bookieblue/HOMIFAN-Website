import { IMember } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const prayerRequestIdSchema = z.string().uuid();

export const GET = async (
    _request: Request,
    { params }: { params: Promise<{ prayer_request_id: string }> }
) => {
    const prayerRequestId = (await params).prayer_request_id;

    try {
        const validation = prayerRequestIdSchema.safeParse(prayerRequestId);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }

        const prayerRequest = await prisma.prayerRequest.findUnique({
            where: { id: prayerRequestId },
        });

        if (!prayerRequest) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Prayer Request not found!",
                404
            );
        }

        return sendSuccessResponse(
            NextResponse,
            prayerRequest,
            "Prayer Request retrieved successfully"
        );
    } catch (error) {
        console.error("Error retrieving prayer request:", error);
        throw error;
    }
};
