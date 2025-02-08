import { IMember } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const messageIdSchema = z.string().uuid();

export const GET = async (
    _request: Request,
    { params }: { params: Promise<{ message_id: string }> }
) => {
    const messageId = (await params).message_id;

    try {
        const validation = messageIdSchema.safeParse(messageId);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }

        const contact = await prisma.contact.findUnique({
            where: { id: messageId },
        });

        if (!contact) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Contact message not found!",
                404
            );
        }

        return sendSuccessResponse(
            NextResponse,
            contact,
            "Contact message retrieved successfully"
        );
    } catch (error) {
        console.error("Error retrieving contact message:", error);
        throw error;
    }
};
