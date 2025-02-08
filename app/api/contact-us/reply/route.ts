import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactIdsSchema = z.object({
    contactIds: z.array(z.string().uuid()),
});

export const POST = async (request: Request) => {
    const payload = await request.json();

    const contactIds = payload.contactIds as string[];

    try {
        const validation = contactIdsSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }
        const contacts = await prisma.contact.findMany({
            where: {
                id: {
                    in: contactIds,
                },
                replied: false,
            },
        });

        if (contacts.length !== contactIds.length) {
            return sendErrorResponse(
                NextResponse,
                "Oops...An request is missing or already replied",
                404
            );
        }

        const repliedcontacts = await prisma.contact.updateMany({
            where: {
                id: {
                    in: contactIds,
                },
            },
            data: {
                replied: true,
            },
        });

        return sendSuccessResponse(
            NextResponse,
            repliedcontacts,
            `${
                repliedcontacts.count > 1 ? "Contacts" : "Contact"
            } replied successfully`
        );
    } catch (error) {
        throw error;
    }
};
