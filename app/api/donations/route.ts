import { IDonation } from "@/app/interface";
import { NextRequest, NextResponse } from "next/server";
import paystack from "paystack";

const secretKey = process.env.PAYSTACK_SECRET_KEY!;
const paystackClient = paystack(secretKey);

export async function POST(request: NextRequest) {
    const payload: IDonation = await request.json();

    try {
        const email = payload.email;
        const amount = payload.amount;

        const response = await paystackClient.transaction.initialize({
            amount: amount * 100,
            email,
            currency: "NGN",
            metadata: {
                email,
            },
        } as any);

        return NextResponse.json({
            status: true,
            data: response,
            message: "Paystack payment initialized successfully",
        });
    } catch (error) {
        throw error;
    }
}
