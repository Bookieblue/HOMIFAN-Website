import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const referenceSchema = z.string();

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) => {
  const reference = (await params).reference;

  try {
    const validation = referenceSchema.safeParse(reference);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const donation = await prisma.donation.findFirst({
      where: { trxfReference: reference },
    });

    if (!donation) {
      return sendErrorResponse(NextResponse, "Oops...Donation not found!", 404);
    }

    const updatedRecord = await prisma.donation.update({
      where: { id: donation.id },
      data: { paymentStatus: "completed" },
    });

    return sendSuccessResponse(
      NextResponse,
      updatedRecord,
      "Donation completed successfully"
    );
  } catch (error) {
    console.error("Error retrieving member:", error);

    throw error;
  }
};
