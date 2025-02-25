import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

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

    const updatedRecord = await prisma.donation.update({
      where: { id: donation.id },
      data: { paymentStatus: response.data.status },
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
