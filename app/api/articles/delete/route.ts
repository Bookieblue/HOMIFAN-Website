import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const articleIdsSchema = z.object({
    articleIds: z.array(z.string().uuid()),
});

export async function POST(request: NextRequest) {
    const payload = await request.json();

    const articleIds = payload.articleIds as string[];

    const validation = articleIdsSchema.safeParse(payload);

    if (!validation.success) {
        return sendErrorResponse(
            NextResponse,
            formatZodError(validation.error),
            400
        );
    }

    const articles = await prisma.article.findMany({
        where: {
            id: {
                in: articleIds,
            },
        },
    });

    if (!articles.length) {
        return sendErrorResponse(
            NextResponse,
            "Oops...articles are already deleted",
            404
        );
    }

    const deletedArticles = await prisma.article.deleteMany({
        where: {
            id: {
                in: articleIds,
            },
        },
    });

    return sendSuccessResponse(
        NextResponse,
        deletedArticles,
        "Articles deleted successfully"
    );
}
