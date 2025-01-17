import prisma from "@/app/lib/prisma";
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
      return NextResponse.json(
        { message: formatZodError(validation.error) },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.findFirst({
      where: { trxfReference: reference },
    });

    if (!donation) {
      return NextResponse.json(
        { message: "Oops...Donation not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: donation,
        message: "Donation retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving member:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
