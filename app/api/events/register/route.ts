import { IEventForm } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { eventRegistrationSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (requset: NextRequest) => {
    const payload: Partial<IEventForm> = await requset.json();
    try {
        const { eventId, email, phoneNumber } = payload;
        const validation = eventRegistrationSchema.safeParse(payload);

        if (!validation.success) {
            return sendErrorResponse(
                NextResponse,
                formatZodError(validation.error),
                400
            );
        }
        const event = await prisma.event.findUnique({
            where: { id: payload.eventId },
        });

        if (!event) {
            return sendErrorResponse(
                NextResponse,
                "Oops...Event not found",
                404
            );
        }

        const eventReg = await prisma.eventForm.findFirst({
            where: { OR: [{ email }, { phoneNumber }], eventId },
        });

        if (eventReg) {
            return sendErrorResponse(
                NextResponse,
                "Oops...You have already registered for this event"
            );
        }

        const newRegistration = await prisma.eventForm.create({
            data: payload as any,
        });

        return sendSuccessResponse(
            NextResponse,
            newRegistration,
            "Event Registered successfully"
        );
    } catch (error) {
        throw error;
    }
};
