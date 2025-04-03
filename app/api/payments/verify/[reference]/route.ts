import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";
import { PaymentStatus, PaymentType } from "@/app/api/enum";

const referenceSchema = z.string();

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    amount: number;
    status: string;
    reference: string;
    customer: {
      email: string;
      name: string;
    };
    // Add other fields as needed
  };
}

async function verifyPaystackPayment(
  secretKey: string,
  transactionReference: string
): Promise<PaystackVerificationResponse | null> {
  // Paystack API endpoint for transaction verification
  const url = `https://api.paystack.co/transaction/verify/${transactionReference}`;

  // Set up the headers with the secret key
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };

  try {
    // Make the GET request to Paystack API
    const response: AxiosResponse<PaystackVerificationResponse> =
      await axios.get(url, { headers });

    // Return the JSON response
    return response.data;
  } catch (error: any) {
    // Handle any errors that occur during the request
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return {
      status: false,
      message: "Failed to verify payment",
      data: error.response?.data || error.message,
    };
  }
}

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) => {
  const reference = (await params).reference;
  let donation: any;
  try {
    const validation = referenceSchema.safeParse(reference);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }
    const payment = await prisma.payment.findUnique({ where: { reference } });

    if (!payment) {
      return sendErrorResponse(NextResponse, "Payment record not found", 404);
    }

    if (payment?.paymentType == PaymentType.DONATION) {
      donation = await prisma.donation.findFirst({
        where: { trxfReference: reference },
      });

      if (!donation) {
        return sendErrorResponse(
          NextResponse,
          "Oops...Donation not found!",
          404
        );
      }
    }
    const response = await verifyPaystackPayment(
      process.env.PAYSTACK_SECRET_KEY!,
      reference
    );

    if (!response?.status) {
      return sendErrorResponse(
        NextResponse,
        JSON.stringify(response?.data),
        400
      );
    }
    let updatedRecord: any;
    if (payment?.paymentType) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { paymentStatus: "success" },
      });
      updatedRecord = await prisma.payment.update({
        where: { donationId: payment.id, id: payment.id },
        data: { paymentDate: new Date(), paymentStatus: "success" },
      });
    } else {
      updatedRecord = await prisma.payment.update({
        where: { id: payment.id },
        data: { paymentDate: new Date(), paymentStatus: "success" },
      });
    }
    return sendSuccessResponse(
      NextResponse,
      updatedRecord,
      "Payment completed successfully"
    );
  } catch (error) {
    console.error("Error retrieving member:", error);
    throw error;
  }
};
