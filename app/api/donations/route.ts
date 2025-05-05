// Import necessary modules
import prisma from "@/app/lib/prisma";
import { generateTransRef } from "@/app/utils";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { donationSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus, PaymentType } from "../enum";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const rawPayload = await request.json();

    // Ensure amount is a number
    const sanitizedPayload = {
      ...rawPayload,
      amount:
        typeof rawPayload.amount === "string"
          ? parseFloat(rawPayload.amount)
          : rawPayload.amount,
    };

    // Validate the payload
    const validation = donationSchema.safeParse(sanitizedPayload);
    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    // Extract validated data
    const {
      email,
      amount,
      donationType,
      firstName,
      lastName,
      phoneNumber,
      country,
      cityAndState,
    } = sanitizedPayload;

    // Check for existing pending donation with same email and amount
    let donation;
    const pendingDonation = await prisma.donation.findFirst({
      where: {
        email,
        amount,
        paymentStatus: "initiated",
      },
    });

    if (pendingDonation) {
      donation = pendingDonation;
    } else {
      // Generate a unique transaction reference
      const trxRef = generateTransRef();

      // Create a new donation
      donation = await prisma.donation.create({
        data: {
          email,
          amount,
          donationType,
          firstName,
          lastName,
          phoneNumber,
          country,
          cityAndState,
          trxfReference: trxRef,
        },
      });
    }

    // Create a payment record
    await prisma.payment.create({
      data: {
        amount,
        metadata: {
          firstName: donation.firstName,
          lastName: donation.lastName,
          email: donation.email,
          phoneNumber: donation.phoneNumber,
        },
        paymentType: PaymentType.DONATION,
        reference: donation.trxfReference || "",
        donationId: donation.id,
      },
    });

    return sendSuccessResponse(
      NextResponse,
      {
        ...donation,
        paymentReference: donation.trxfReference,
      },
      "Donation initialized successfully"
    );
  } catch (error: any) {
    console.error("Donation error:", error);
    return sendErrorResponse(
      NextResponse,
      error.message || "An error occurred while processing your donation",
      500
    );
  }
}

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const text = searchParams.get("search") || "";

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return sendErrorResponse(
        NextResponse,
        "Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100.",
        400
      );
    }

    // Query donations with pagination and search
    const result = await paginateQuery({
      where: text
        ? {
            OR: [
              {
                firstName: {
                  contains: text,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: text,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: text,
                  mode: "insensitive",
                },
              },
              {
                donationType: {
                  contains: text,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      model: prisma.donation,
      options: {
        page,
        limit,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Rename data to donations for clarity
    const { data: donations, ...metadata } = result;

    return sendSuccessResponse(
      NextResponse,
      { donations, ...metadata },
      "Donations retrieved successfully"
    );
  } catch (error: any) {
    console.error("Error fetching donations:", error);
    return sendErrorResponse(
      NextResponse,
      error.message || "An error occurred while fetching donations",
      500
    );
  }
};
