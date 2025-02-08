import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextResponse } from "next/server";

export const PUT = async (
    _request: Request,
    { params }: { params: Promise<{ prayer_request_id: string }> }
) => {
    const prayerRequestId = (await params).prayer_request_id;

    try {
        const prayerRequest = await prisma.prayerRequest.findUnique({
            where: { id: prayerRequestId },
        });

        if (!prayerRequest) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Article not found",
                404
            );
        }

        const repliedprayerRequest = await prisma.prayerRequest.update({
            where: { id: prayerRequest.id },
            data: {
                replied: !prayerRequest.replied,
            },
        });

        return sendSuccessResponse(
            NextResponse,
            repliedprayerRequest,
            "PrayerRequest replied successfully"
        );
    } catch (error) {
        throw error;
    }
};
