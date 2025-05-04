import prisma from "@/app/lib/prisma";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";
import { PaymentStatus, PaymentType } from "@/app/api/enum";

const referenceSchema = z.string().min(5, "Invalid reference format");

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    amount: number;
    status: string;
    reference: string;
    channel: string;
    customer: {
      email: string;
      name: string;
    };
    // Add other fields as needed
  };
}

/**
 * Verify a payment with Paystack
 *
 * @param secretKey - Paystack secret key
 * @param transactionReference - Transaction reference to verify
 * @returns Verification response from Paystack
 */
async function verifyPaystackPayment(
  secretKey: string,
  transactionReference: string
): Promise<PaystackVerificationResponse> {
  if (!secretKey) {
    throw new ApiError("Payment provider configuration is missing", 500);
  }

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
      console.error(
        "Paystack API error:",
        error.response?.data || error.message
      );
      throw new ApiError(
        `Payment verification failed: ${
          error.response?.data?.message || error.message
        }`,
        error.response?.status || 500
      );
    } else {
      console.error("Unexpected error during payment verification:", error);
      throw new ApiError(
        "Payment verification failed due to an unexpected error",
        500
      );
    }
  }
}

export const GET = withErrorHandler(
  async (
    _request: Request,
    { params }: { params: Promise<{ reference: string }> }
  ) => {
    const reference = (await params).reference;

    // Validate reference format
    const validation = referenceSchema.safeParse(reference);
    if (!validation.success) {
      throw new ApiError("Invalid payment reference format", 400);
    }

    // Find payment record
    const payment = await prisma.payment.findFirst({
      where: { reference },
      include: {
        donation: true,
      },
    });

    if (!payment) {
      throw new ApiError("Payment record not found", 404);
    }

    // For donation payments, verify the donation exists
    let donation = payment.donation;
    if (payment.paymentType === PaymentType.DONATION && !donation) {
      donation = await prisma.donation.findFirst({
        where: { trxfReference: reference },
      });

      if (!donation) {
        throw new ApiError("Donation record not found for this payment", 404);
      }
    }

    // Verify payment with Paystack
    const response = await verifyPaystackPayment(
      process.env.PAYSTACK_SECRET_KEY!,
      reference
    );

    if (!response.status) {
      throw new ApiError(
        `Payment verification failed: ${response.message}`,
        400
      );
    }

    // Check payment status from Paystack
    const paystackStatus = response.data.status.toLowerCase();
    const paymentStatus =
      paystackStatus === "success"
        ? PaymentStatus.success
        : paystackStatus === "failed"
        ? PaymentStatus.failed
        : PaymentStatus.initiated;

    // Update records based on payment type
    let updatedRecord;
    if (payment.paymentType === PaymentType.DONATION && donation) {
      // Update donation status
      await prisma.donation.update({
        where: { id: donation.id },
        data: { paymentStatus },
      });

      // Update payment record
      updatedRecord = await prisma.payment.update({
        where: { id: payment.id, donationId: donation.id },
        data: {
          paymentDate: new Date(),
          paymentStatus,
          method: response.data.channel,
        },
      });
    } else {
      // Update payment record only
      updatedRecord = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          paymentDate: new Date(),
          paymentStatus,
          method: response.data.channel,
        },
      });
    }

    // Return success response with updated record
    return sendSuccessResponse(
      NextResponse,
      {
        ...updatedRecord,
        verificationDetails: {
          status: response.data.status,
          amount: response.data.amount / 100, // Convert from kobo to naira
          channel: response.data.channel,
          customer: response.data.customer,
        },
      },
      paymentStatus === PaymentStatus.success
        ? "Payment completed successfully"
        : "Payment verification completed"
    );
  }
);
