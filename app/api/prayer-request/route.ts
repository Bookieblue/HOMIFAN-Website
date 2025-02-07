import { IPrayerRequest } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { prayerRequestSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const payload: IPrayerRequest = await request.json();

    try {
        const { email, phoneNumber } = payload;
        const validation = prayerRequestSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }

        const prayerReq = await prisma.prayerRequest.findFirst({
            where: { OR: [{ email }, { phoneNumber }] },
        });

        if (prayerReq) {
            return sendErrorResponse(
                NextResponse,
                "Oops...This prayer Request already exists",
                409
            );
        }

        const newPrayerReq = await prisma.prayerRequest.create({
            data: payload,
        });

        return sendSuccessResponse(
            NextResponse,
            newPrayerReq,
            "Prayer request added successfully"
        );
    } catch (error) {
        throw error;
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    try {
        const page = Number((searchParams.get("page") as string) || 1);
        const limit = Number((searchParams.get("limit") as string) || 20);
        const search = searchParams.get("search") as string;

        const result = await paginateQuery({
            where:
                search !== null
                    ? {
                          OR: [
                              {
                                  firstName: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  lastName: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  email: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {},
            model: prisma.prayerRequest,
            options: { page, limit },
        });

        const { data, ...metadata } = result;
        const prayerRepests = data;
        return sendSuccessResponse(
            NextResponse,
            { prayerRepests, ...metadata },
            "Prayer requests retrieved successfully"
        );
    } catch (error: any) {
        console.error("Error fetching prayer requests:", error);
        throw error;
    }
}
