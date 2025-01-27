import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { eventSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";
import { IEvent } from "@/app/interface";
import { uploadFile } from "@/app/utils/file";
import { paginateQuery } from "@/app/utils/paginate";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number((searchParams.get("page") as string) || 1);
    const limit = Number((searchParams.get("limit") as string) || 20);
    const text = searchParams.get("search") as string;
    try {
        const result = await paginateQuery({
            where: text
                ? {
                      OR: [
                          {
                              title: {
                                  contains: text,
                              },
                          },
                          {
                              description: {
                                  contains: text,
                              },
                          },
                      ],
                  }
                : {},
            model: prisma.event,
            options: {
                page,
                limit,
            },
        });
        const { data: events, ...metadata } = result;
        return sendSuccessResponse(
            NextResponse,
            { events, ...metadata },
            "Events retrieved successfully"
        );
    } catch (error) {
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const location = formData.get("location") as string;
        const date = formData.get("date") as any;
        const time = formData.get("time") as string;
        const meetingLink = formData.get("meetingLink") as string;
        const status = formData.get("status") as Status;

        const payload: Partial<IEvent> = {
            title,
            date,
            description,
            time,
            meetingLink,
            location,
            status,
        };

        const validation = eventSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }
        const event = await prisma.event.findFirst({
            where: {
                title,
                description,
                date,
                location,
                time,
            },
        });

        if (event) {
            return sendErrorResponse(
                NextResponse,
                "Oops..Event already exist",
                409
            );
        }

        const eventImage = formData.get("eventImage") as File | null;
        if (eventImage) {
            const result = await uploadFile(eventImage, "events");
            payload.eventImage = result.secure_url;
        }

        const newEvent = await prisma.event.create({
            data: payload as any,
        });

        return sendSuccessResponse(
            NextResponse,
            newEvent,
            "Event added successfully",
            201
        );
    } catch (error) {
        throw error;
    }
}
