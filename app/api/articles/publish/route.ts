import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Status } from "../../enum";

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
        where:  {
            id: {
                in: articleIds,
            },
            status: Status.unpublish,
        },
    });

    if (articles.length !== articleIds.length) {
        return sendErrorResponse(
            NextResponse,
            "Oops...An article is missing or already published",
            404
        );
    }

    const publishedArticles = await prisma.article.updateMany({
        where: {
            id: {
                in: articleIds,
            },
        } as any,
        data: {
            status: Status.publish,
            datePublished: new Date(Date.now()),
        }, 
    }); 

    return sendSuccessResponse(
        NextResponse,
        publishedArticles,
        "Articles published successfully"
    );
}
