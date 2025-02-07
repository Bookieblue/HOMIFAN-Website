import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextResponse } from "next/server";

export const PUT = async (
    _request: Request,
    { params }: { params: Promise<{ member: string }> }
) => {
    const memberId = (await params).member;

    try {
        const member = await prisma.member.findUnique({
            where: { id: memberId },
        });

        if (!member) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Article not found",
                404
            );
        }

        const repliedMember = await prisma.member.update({
            where: { id: member.id },
            data: {
                replied: !member.replied,
            },
        });

        return sendSuccessResponse(
            NextResponse,
            repliedMember,
            "Member replied successfully"
        );
    } catch (error) {
        throw error;
    }
};
