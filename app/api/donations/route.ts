import { IDonation } from "@/app/interface";
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
  const payload: IDonation = await request.json();

  try {
    const email = payload.email;
    const amount = payload.amount;
    const validation = donationSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }
    let donation: any;
    const pendingDonation = await prisma.donation.findFirst({
      where: { ...payload, paymentStatus: PaymentStatus.initiated },
    });

    if (pendingDonation) {
      donation = pendingDonation;
    } else {
      const trxRef = generateTransRef();

      donation = await prisma.donation.create({
        data: {
          email,
          amount,
          donationType: payload.donationType,
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
          country: payload.country,
          cityAndState: payload.cityAndState,
          paymentStatus: PaymentStatus.initiated,
          trxfReference: trxRef,
        },
      });
    }

    await prisma.payment.create({
      data: {
        amount,
        metadata: {
          firstName: donation.firstName,
          lastName: donation.lastName,
        },
        paymentType: PaymentType.DONATION,
        reference: donation.trxfReference,
        donationId: donation.id,
      },
    });
    return sendSuccessResponse(
      NextResponse,
      donation,
      "Donation initialized successfully"
    );
  } catch (error) {
    throw error;
  }
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const text = searchParams.get("search") || "";
  try {
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
    const { data: events, ...metadata } = result;
    return sendSuccessResponse(
      NextResponse,
      { events, ...metadata },
      "Donations retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
};
