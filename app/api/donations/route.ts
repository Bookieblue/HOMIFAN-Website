import prisma from "@/app/lib/prisma";
import { generateTransRef } from "@/app/utils";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";
import { paginateQuery } from "@/app/utils/paginate";
import { donationSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus, PaymentType } from "../enum";

export const POST = withErrorHandler(async (request: NextRequest) => {
  // Parse and sanitize request body
  const rawPayload = await request.json();

  // Ensure amount is a number
  const sanitizedPayload = {
    ...rawPayload,
    amount:
      typeof rawPayload.amount === "string"
        ? parseFloat(rawPayload.amount)
        : rawPayload.amount,
    email: String(rawPayload.email || "")
      .trim()
      .toLowerCase(),
    firstName: String(rawPayload.firstName || "").trim(),
    lastName: String(rawPayload.lastName || "").trim(),
    phoneNumber: String(rawPayload.phoneNumber || "").trim(),
    country: String(rawPayload.country || "").trim(),
    cityAndState: String(rawPayload.cityAndState || "").trim(),
    donationType: String(rawPayload.donationType || "").trim(),
  };

  // Validate with Zod schema
  const validation = donationSchema.safeParse(sanitizedPayload);
  if (!validation.success) {
    throw new ApiError(JSON.stringify(validation.error.format()), 400);
  }

  const {
    email,
    amount,
    firstName,
    lastName,
    phoneNumber,
    country,
    cityAndState,
    donationType,
  } = sanitizedPayload;

  // Check for existing pending donation with same details
  const pendingDonation = await prisma.donation.findFirst({
    where: {
      email,
      amount,
      donationType,
      paymentStatus: PaymentStatus.initiated,
    },
    include: {
      payments: true,
    },
  });

  let donation;

  // Use existing donation or create a new one
  if (pendingDonation) {
    donation = pendingDonation;

    // Check if there's already a payment record
    if (
      !(pendingDonation.payments && pendingDonation.payments.length > 0) &&
      pendingDonation.trxfReference
    ) {
      // Create a new payment record if none exists
      await prisma.payment.create({
        data: {
          amount,
          metadata: {
            firstName: donation.firstName,
            lastName: donation.lastName,
            email,
            phoneNumber,
          },
          paymentType: PaymentType.DONATION,
          reference: pendingDonation.trxfReference,
          donationId: donation.id,
        },
      });
    }
  } else {
    // Generate a unique transaction reference
    const trxRef = generateTransRef();

    // Create a new donation record
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
        paymentStatus: PaymentStatus.initiated,
        trxfReference: trxRef,
      },
    });

    // Create a new payment record
    await prisma.payment.create({
      data: {
        amount,
        metadata: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        paymentType: PaymentType.DONATION,
        reference: trxRef,
        donationId: donation.id,
      },
    });
  }

  return sendSuccessResponse(
    NextResponse,
    { ...donation, paymentReference: donation.trxfReference },
    "Donation initialized successfully"
  );
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const text = searchParams.get("search") || "";

  // Validate pagination parameters
  if (page < 1 || limit < 1 || limit > 100) {
    throw new ApiError("Invalid pagination parameters", 400);
  }

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

  const { data: donations, ...metadata } = result;

  return sendSuccessResponse(
    NextResponse,
    { donations, ...metadata },
    "Donations retrieved successfully"
  );
});
