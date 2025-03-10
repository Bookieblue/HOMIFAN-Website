import { IEvent } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../../enum";
import { uploadFile } from "@/app/utils/file";

// GET: Fetch event by ID
export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ event_id: string }> }
) => {
  const eventId = (await params).event_id;
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return sendErrorResponse(NextResponse, "Oops... Event not found", 404);
    }

    return sendSuccessResponse(
      NextResponse,
      event,
      "Event retrieved successfully"
    );
  } catch (error: any) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// PUT: Update event by ID
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ event_id: string }> }
) => {
  const eventId = (await params).event_id;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const date = formData.get("date") as Date | null;
  const time = formData.get("time") as string | null;
  const location = formData.get("location") as string | null;
  const meetingLink = formData.get("meetingLink") as string | null;
  const status = formData.get("status") as Status | null;
  const file = formData.get("eventImage") as File | null;

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return sendErrorResponse(NextResponse, "Oops... Event not found", 404);
    }

    const payload: Partial<IEvent> = {
      title: title || event.title,
      description: description || (event.description as string),
      date: date || (event.date as Date),
      time: time || event.time,
      location: location || event.location,
      meetingLink: meetingLink || event.meetingLink,
      status: status || (event.status as Status),
    };

    if (file) {
      const result = await uploadFile(file, "events");
      payload.eventImage = result.secure_url as string;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: { ...payload },
    });

    return sendSuccessResponse(
      NextResponse,
      updatedEvent,
      "Event updated successfully"
    );
  } catch (error: any) {
    console.error("Error updating event:", error);
    throw error;
  }
};
