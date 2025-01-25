import prisma from "@/app/lib/prisma";
import { sendErrorResponse } from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { eventSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";
import { IEvent } from "@/app/interface";

export async function GET() {
    try {
        const members = await prisma.event.findMany();
        return NextResponse.json({
            message: "Events retrieved successfully",
            data: members,
        });
    } catch (error) {
        throw error;
    }
}

export async function POST(request: NextRequest) {
    const payload = request.json();

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
    } catch (error) {}
}
