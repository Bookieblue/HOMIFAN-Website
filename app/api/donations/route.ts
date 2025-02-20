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
import paystack from "paystack";

const secretKey = process.env.PAYSTACK_SECRET_KEY!;
const paystackClient = paystack(secretKey);

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
      where: { ...payload, paymentStatus: "pending" },
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
          paymentStatus: "pending",
          trxfReference: trxRef,
        },
      });
    }
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
  const page = Number((searchParams.get("page") as string) || 1);
  const limit = Number((searchParams.get("limit") as string) || 20);
  const text = searchParams.get("search") as string;
  try {
    const result = await paginateQuery({
      where: text
        ? {
            OR: [
              {
                firstName: {
                  contains: text,
                },
              },
              {
                lastName: {
                  contains: text,
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
