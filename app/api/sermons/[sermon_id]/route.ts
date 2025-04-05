import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { NextResponse } from "next/server";

// GET: Fetch all article by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sermon_id: string }> }
) {
  const sermonId = (await params).sermon_id;
  try {
    const sermon = await prisma.sermon.findUnique({
      where: { id: sermonId },
    });

    if (!sermon) {
      return sendErrorResponse(NextResponse, "Oops...Sermon not found", 404);
    }
    return sendSuccessResponse(
      NextResponse,
      sermon,
      "Sermon retrieved successfully"
    );
  } catch (error: any) {
    console.error("Error fetching sermon:", error);
    throw error;
  }
}
