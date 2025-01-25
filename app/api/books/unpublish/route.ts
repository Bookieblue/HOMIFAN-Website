import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Status } from "../../enum";

const bookIdsSchema = z.object({
    bookIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
    const payload = await request.json();

    const bookIds = payload.bookIds as string[];

    const validation = bookIdsSchema.safeParse(payload);

    if (!validation.success) {
        return sendErrorResponse(
            NextResponse,
            formatZodError(validation.error),
            400
        );
    }

    const books = await prisma.book.findMany({
        where: {
            id: {
                in: bookIds,
            },
            status: Status.publish,
        },
    });

    if (books.length !== bookIds.length) {
        return sendErrorResponse(
            NextResponse,
            "Oops...An book is missing or already unpublished",
            404
        );
    }

    const publishedbooks = await prisma.book.updateMany({
        where: {
            id: {
                in: bookIds,
            },
        },
        data: {
            status: Status.unpublish,
        },
    });

    return sendSuccessResponse(
        NextResponse,
        publishedbooks,
        "Books unpublished successfully"
    );
}
